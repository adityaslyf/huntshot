import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { showToast } from '@/lib/toast-utils';
import { Loader2, Send, Paperclip } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileUpload } from './file-upload';

interface EmailSenderDialogProps {
  subject: string;
  body: string;
  company?: string;
}

export function EmailSenderDialog({ subject, body }: EmailSenderDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [emailContent, setEmailContent] = useState({
    subject,
    body,
  });
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const login = useGoogleLogin({
    onSuccess: (response) => {
      setAccessToken(response.access_token);
      // If we were trying to send an email, continue the process
      if (loading) {
        sendEmailWithToken(response.access_token);
      }
    },
    scope: 'https://www.googleapis.com/auth/gmail.send',
    onError: (error) => {
      console.error('Gmail authorization failed:', error);
      showToast.error('Gmail authorization failed');
      setLoading(false);
    }
  });

  // Function to convert a file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          // Remove the data URL prefix (e.g., "data:application/pdf;base64,")
          const base64 = reader.result.split(',')[1];
          resolve(base64);
        } else {
          reject(new Error('Failed to convert file to base64'));
        }
      };
      reader.onerror = error => reject(error);
    });
  };

  // Function to create a MIME boundary for multipart message
  const generateBoundary = () => {
    return `----=_Part_${Math.random().toString(36).substring(2)}`;
  };

  const sendEmailWithToken = async (token: string) => {
    try {
      const boundary = generateBoundary();
      
      // Start building the email content
      const emailParts = [
        `From: me`,
        `To: ${recipient}`,
        `Subject: ${emailContent.subject}`,
        'MIME-Version: 1.0',
      ];
      
      // If we have attachments, use multipart/mixed
      if (attachments.length > 0) {
        emailParts.push(`Content-Type: multipart/mixed; boundary="${boundary}"`);
        emailParts.push('');
        emailParts.push(`--${boundary}`);
        emailParts.push('Content-Type: text/plain; charset="UTF-8"');
        emailParts.push('Content-Transfer-Encoding: 7bit');
        emailParts.push('');
        emailParts.push(emailContent.body);
        
        // Add each attachment
        for (const file of attachments) {
          const base64Data = await fileToBase64(file);
          emailParts.push(`--${boundary}`);
          emailParts.push(`Content-Type: ${file.type}`);
          emailParts.push('Content-Transfer-Encoding: base64');
          emailParts.push(`Content-Disposition: attachment; filename="${file.name}"`);
          emailParts.push('');
          emailParts.push(base64Data);
        }
        
        // Close the multipart boundary
        emailParts.push(`--${boundary}--`);
      } else {
        // Simple plain text email without attachments
        emailParts.push('Content-Type: text/plain; charset="UTF-8"');
        emailParts.push('Content-Transfer-Encoding: 7bit');
        emailParts.push('');
        emailParts.push(emailContent.body);
      }
      
      const email = emailParts.join('\r\n');
      
      // Convert to base64url format
      const base64EncodedEmail = btoa(email)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

      // Send email using Gmail API
      await axios.post(
        'https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
        { raw: base64EncodedEmail },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      showToast.success('Email sent successfully!');
      setIsOpen(false);
    } catch (error) {
      console.error('Error sending email:', error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setAccessToken(null);
        showToast.error('Gmail authorization expired. Please try again.');
      } else {
        showToast.error('Failed to send email. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmail = async () => {
    if (!recipient) {
      showToast.error('Please enter recipient email');
      return;
    }

    setLoading(true);
    if (!accessToken) {
      // This will trigger the login flow, and the onSuccess callback will continue the process
      login();
    } else {
      await sendEmailWithToken(accessToken);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) {
        // Reset attachments when dialog is closed
        setAttachments([]);
      }
    }}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Send className="h-4 w-4 mr-2" />
          Send Email
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Send Email</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div>
            <label className="text-sm font-medium">To</label>
            <Input
              type="email"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="recipient@example.com"
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Subject</label>
            <Input
              value={emailContent.subject}
              onChange={(e) => setEmailContent(prev => ({ ...prev, subject: e.target.value }))}
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Message</label>
            <Textarea
              value={emailContent.body}
              onChange={(e) => setEmailContent(prev => ({ ...prev, body: e.target.value }))}
              className="mt-1 min-h-[200px]"
            />
          </div>
          <div>
            <label className="text-sm font-medium flex items-center gap-2">
              <Paperclip className="h-4 w-4" />
              Attachments
            </label>
            <div className="mt-1">
              <FileUpload 
                files={attachments}
                onFilesChange={setAttachments}
                maxFiles={5}
                maxSize={10}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendEmail} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send with Gmail'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
