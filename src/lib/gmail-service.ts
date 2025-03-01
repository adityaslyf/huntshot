import { google } from 'googleapis';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = 'your-redirect-uri';

export class GmailService {
  static oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    REDIRECT_URI
  );

  static getAuthUrl() {
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/gmail.send'],
    });
  }

  static async sendEmail(auth: any, { to, subject, body }: { to: string; subject: string; body: string }) {
    const gmail = google.gmail({ version: 'v1', auth });
    const message = [
      'Content-Type: text/plain; charset="UTF-8"\r\n',
      'MIME-Version: 1.0\r\n',
      `To: ${to}\r\n`,
      `Subject: ${subject}\r\n\r\n`,
      body,
    ].join('');

    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    try {
      await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
          raw: encodedMessage,
        },
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
