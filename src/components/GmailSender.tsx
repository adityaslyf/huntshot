import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';

export function GmailSender() {
  const [loading, setLoading] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const login = useGoogleLogin({
    onSuccess: (response) => {
      setAccessToken(response.access_token);
    },
    scope: 'https://www.googleapis.com/auth/gmail.send',
    onError: (error) => console.error('Gmail authorization failed:', error)
  });

  const sendEmail = async () => {
    if (!accessToken) {
      await login();
      return;
    }

    setLoading(true);
    try {
      // Create email in base64 format
      const email = [
        'Content-Type: text/plain; charset="UTF-8"\n',
        'MIME-Version: 1.0\n',
        'Content-Transfer-Encoding: 7bit\n',
        `To: ${recipient}\n`,
        `Subject: ${subject}\n\n`,
        message,
      ].join('');

      const base64EncodedEmail = btoa(email).replace(/\+/g, '-').replace(/\//g, '_');

      // Send email using Gmail API
      await axios.post(
        'https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
        { raw: base64EncodedEmail },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Clear form after successful send
      setRecipient('');
      setSubject('');
      setMessage('');
      alert('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setAccessToken(null);
        alert('Gmail authorization expired. Please try again.');
      } else {
        alert('Failed to send email. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Send Email via Gmail</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Recipient Email"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>
          <Button
            onClick={sendEmail}
            disabled={loading || !recipient || !subject || !message}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              'Send Email'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 