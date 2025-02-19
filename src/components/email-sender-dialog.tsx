import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { GmailService } from '@/lib/gmail-service';
import { showToast } from '@/lib/toast-utils';
import { Loader2 } from 'lucide-react';
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
  const [isSending, setIsSending] = useState(false);
  const [toEmail, setToEmail] = useState('');
  const [emailContent, setEmailContent] = useState({
    subject,
    body,
  });

  const handleAuth = () => {
    const authUrl = GmailService.getAuthUrl();
    // Store the current email data in localStorage before redirecting
    localStorage.setItem('pendingEmail', JSON.stringify({
      to: toEmail,
      subject: emailContent.subject,
      body: emailContent.body,
    }));
    window.location.href = authUrl;
  };

  const handleSendEmail = async () => {
    if (!toEmail) {
      showToast.error('Please enter recipient email');
      return;
    }

    try {
      setIsSending(true);
      // Check if user is authenticated (you'll need to implement this)
      const isAuthenticated = false; // Replace with actual auth check
      
      if (!isAuthenticated) {
        handleAuth();
        return;
      }

      await GmailService.sendEmail(null, { // Replace null with actual auth object
        to: toEmail,
        subject: emailContent.subject,
        body: emailContent.body,
      });
      
      showToast.success('Email sent successfully');
      setIsOpen(false);
    } catch (error) {
      showToast.error('Failed to send email');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
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
              value={toEmail}
              onChange={(e) => setToEmail(e.target.value)}
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
            <Button onClick={handleSendEmail} disabled={isSending}>
              {isSending ? (
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
