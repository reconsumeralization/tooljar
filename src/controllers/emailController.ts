import { Request, Response } from 'express';
import EmailModel from '../models/emailModel';
import { catchAsync, AppError } from '../middleware/errorHandler';
import { isValidEmail } from '../middleware/validation';

class EmailController {
  // Send an email
  public sendEmail = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const { to, subject, message } = req.body;

    // Validate required fields
    if (!to || !subject || !message) {
      throw new AppError('Missing required fields: to, subject, message', 400);
    }

    // Validate email format
    if (!isValidEmail(to)) {
      throw new AppError('Invalid email address format', 400);
    }

    // Validate subject and message lengths
    if (subject.length > 200) {
      throw new AppError('Subject too long (max 200 characters)', 400);
    }

    if (message.length > 10000) {
      throw new AppError('Message too long (max 10000 characters)', 400);
    }

    // EmailModel constructor will perform additional validation
    const email = new EmailModel({ to, subject, message });
    await email.send();

    res.status(200).json({
      status: 'success',
      message: 'Email sent successfully',
    });
  });

  // Get all sent emails
  public getAllSentEmails = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const emails = await EmailModel.find();

    res.status(200).json({
      status: 'success',
      results: emails.length,
      data: { emails },
    });
  });
}

export default new EmailController();
