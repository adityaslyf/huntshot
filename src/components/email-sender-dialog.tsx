import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { showToast } from '@/lib/toast-utils';
import { Loader2, Send } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface EmailSenderDialogProps {
  subject: string;
  body: string;
  company?: string;
}

export function EmailSenderDialog({ subject, body }: EmailSenderDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recipient, setRecipient] = useState('');
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

  const sendEmailWithToken = async (token: string) => {
    try {
      // Create email in base64 format
      const email = [
        'Content-Type: text/plain; charset="UTF-8"\n',
        'MIME-Version: 1.0\n',
        'Content-Transfer-Encoding: 7bit\n',
        `To: ${recipient}\n`,
        `Subject: ${emailContent.subject}\n\n`,
        emailContent.body,
      ].join('');

      const base64EncodedEmail = btoa(email).replace(/\+/g, '-').replace(/\//g, '_');

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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
