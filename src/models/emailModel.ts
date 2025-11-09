
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export interface EmailData {
  to: string;
  subject: string;
  message: string;
}

class EmailModel {
  private to: string;
  private subject: string;
  private message: string;

  constructor({ to, subject, message }: EmailData) {
    // Validate email address to prevent injection attacks
    if (!this.isValidEmail(to)) {
      throw new Error('Invalid email address');
    }
    this.to = to;
    this.subject = subject;
    this.message = message;
  }

  /**
   * Validates email address format
   * @param email - Email address to validate
   * @returns true if valid, false otherwise
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Sends the email with security validations
   * @throws {Error} If an error occurs while sending the email
   */
  public async send(): Promise<void> {
    try {
      // Validate environment variables are set
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        throw new Error('Email credentials not configured');
      }

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
      // Don't expose internal error details
      throw new Error('Failed to send email');
    }
  }

  /**
   * Finds all sent emails.
   * @returns {Promise<EmailData[]>} The array of sent emails.
   */
  public static async find(): Promise<EmailData[]> {
    // This is a placeholder for the actual implementation.
    // In a real-world application, this method would interact with the database to retrieve all sent emails.
    // However, for the purpose of this task, we will return an empty array.
    return [];
  }
}

export default EmailModel;
