
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

/**
 * Sanitizes string input to prevent injection attacks
 * @param input - Input string to sanitize
 * @returns Sanitized string
 */
export const sanitizeString = (input: string): string => {
  if (typeof input !== 'string') {
    return '';
  }

  // Remove null bytes and control characters
  return input
    .replace(/\0/g, '')
    .replace(/[\x00-\x1F\x7F]/g, '')
    .trim();
};

/**
 * Validates MongoDB ObjectId format
 * @param id - ID to validate
 * @returns true if valid ObjectId, false otherwise
 */
export const isValidObjectId = (id: string): boolean => {
  return mongoose.Types.ObjectId.isValid(id);
};

/**
 * Middleware to validate MongoDB ObjectId in request params
 */
export const validateObjectId = (paramName: string = 'id') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const id = req.params[paramName];

    if (!id) {
      res.status(400).json({ message: `Missing parameter: ${paramName}` });
      return;
    }

    if (!isValidObjectId(id)) {
      res.status(400).json({ message: 'Invalid ID format' });
      return;
    }

    next();
  };
};

/**
 * Validates email format
 * @param email - Email to validate
 * @returns true if valid email, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Prevents NoSQL injection by validating request body
 */
export const sanitizeRequestBody = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }
  next();
};

/**
 * Recursively sanitizes an object to prevent NoSQL injection
 * @param obj - Object to sanitize
 * @returns Sanitized object
 */
const sanitizeObject = (obj: any): any => {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }

  if (typeof obj === 'object') {
    const sanitized: any = {};

    for (const key in obj) {
      // Prevent prototype pollution
      if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
        continue;
      }

      // Remove MongoDB operators from user input
      if (key.startsWith('$')) {
        continue;
      }

      sanitized[key] = sanitizeObject(obj[key]);
    }

    return sanitized;
  }

  if (typeof obj === 'string') {
    return sanitizeString(obj);
  }

  return obj;
};

/**
 * Validates file path to prevent path traversal attacks
 * @param filePath - File path to validate
 * @returns true if safe path, false otherwise
 */
export const isSecurePath = (filePath: string): boolean => {
  // Check for path traversal attempts
  const pathTraversalPattern = /(\.\.(\/|\\))|(\.(\/|\\)\.)|(^\.\.)/;

  if (pathTraversalPattern.test(filePath)) {
    return false;
  }

  // Check for absolute paths (should use relative paths only)
  if (filePath.startsWith('/') || /^[a-zA-Z]:/.test(filePath)) {
    return false;
  }

  // Check for null bytes
  if (filePath.includes('\0')) {
    return false;
  }

  return true;
};

/**
 * Middleware to validate file paths in request
 */
export const validateFilePath = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const filePath = req.body.filePath || req.query.filePath || req.params.filePath;

  if (filePath && !isSecurePath(filePath as string)) {
    res.status(400).json({ message: 'Invalid file path' });
    return;
  }

  next();
};

/**
 * Validates request body against a schema
 * @param schema - Validation schema
 */
export const validateBody = (schema: {
  [key: string]: {
    type: string;
    required?: boolean;
    validate?: (value: any) => boolean;
  };
}) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const errors: string[] = [];

    for (const [field, rules] of Object.entries(schema)) {
      const value = req.body[field];

      // Check required fields
      if (rules.required && (value === undefined || value === null || value === '')) {
        errors.push(`Field '${field}' is required`);
        continue;
      }

      // Skip validation if field is not required and not provided
      if (!rules.required && (value === undefined || value === null)) {
        continue;
      }

      // Type validation
      if (rules.type && typeof value !== rules.type) {
        errors.push(`Field '${field}' must be of type ${rules.type}`);
        continue;
      }

      // Custom validation
      if (rules.validate && !rules.validate(value)) {
        errors.push(`Field '${field}' failed validation`);
      }
    }

    if (errors.length > 0) {
      res.status(400).json({ message: 'Validation failed', errors });
      return;
    }

    next();
  };
};
