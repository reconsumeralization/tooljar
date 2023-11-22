```typescript
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

interface EmailData {
  to: string;
  subject: string;
  message: string;
}

class EmailModel {
  private to: string;
  private subject: string;
  private message: string;

  constructor({ to, subject, message }: EmailData) {
    this.to = to;
    this.subject = subject;
    this.message = message;
  }

  public async send(): Promise<void> {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: this.to,
        subject: this.subject,
        text: this.message,
      };

      await transporter.sendMail(mailOptions);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public static async find(): Promise<EmailData[]> {
    // This is a placeholder for the actual implementation.
    // In a real-world application, this method would interact with the database to retrieve all sent emails.
    // However, for the purpose of this task, we will return an empty array.
    return [];
  }
}

export default EmailModel;
```
