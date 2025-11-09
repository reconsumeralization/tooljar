
import { Request, Response, NextFunction } from 'express';

/**
 * Custom error class with status code
 */
export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Sanitizes error messages to prevent information disclosure
 * @param error - Error object
 * @returns Sanitized error message
 */
const sanitizeErrorMessage = (error: any): string => {
  // Don't expose internal error details in production
  if (process.env.NODE_ENV === 'production') {
    // Whitelist of safe error messages
    const safeMessages = [
      'Invalid credentials',
      'Access denied',
      'Resource not found',
      'Validation failed',
      'Invalid input',
      'Authentication required',
      'Invalid token',
      'Rate limit exceeded'
    ];

    // Check if error message is in safe list
    const message = error.message || 'An error occurred';
    const isSafe = safeMessages.some(safe =>
      message.toLowerCase().includes(safe.toLowerCase())
    );

    return isSafe ? message : 'An error occurred';
  }

  // In development, return actual error message
  return error.message || 'An error occurred';
};

/**
 * Global error handling middleware
 */
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log error for debugging (in production, send to logging service)
  if (process.env.NODE_ENV !== 'production') {
    console.error('Error:', {
      message: err.message,
      stack: err.stack,
      url: req.url,
      method: req.method
    });
  }

  // Determine status code
  const statusCode = err.statusCode || 500;

  // Sanitize error message
  const message = sanitizeErrorMessage(err);

  // Send response
  res.status(statusCode).json({
    status: 'error',
    message,
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
      details: err
    })
  });
};

/**
 * Handles 404 Not Found errors
 */
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(404).json({
    status: 'error',
    message: 'Resource not found'
  });
};

/**
 * Async error wrapper to catch errors in async route handlers
 * @param fn - Async function to wrap
 */
export const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
