```typescript
import { Request, Response } from 'express';
import EmailModel from '../models/emailModel';

class EmailController {
  // Send an email
  public async sendEmail(req: Request, res: Response): Promise<void> {
    try {
      const { to, subject, message } = req.body;
      const email = new EmailModel({ to, subject, message });
      await email.send();

      res.status(200).json({
        status: 'success',
        message: 'Email sent successfully',
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  // Get all sent emails
  public async getAllSentEmails(req: Request, res: Response): Promise<void> {
    try {
      const emails = await EmailModel.find();

      res.status(200).json({
        status: 'success',
        data: emails,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }
}

export default new EmailController();
```
