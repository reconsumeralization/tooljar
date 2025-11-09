
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

/**
 * Timing-attack resistant string comparison
 * @param a - First string
 * @param b - Second string
 * @returns true if strings are equal, false otherwise
 */
export const timingSafeEqual = (a: string, b: string): boolean => {
  if (a.length !== b.length) {
    // Still perform a comparison to prevent timing attacks
    crypto.timingSafeEqual(Buffer.from(a), Buffer.from(a));
    return false;
  }

  try {
    return crypto.timingSafeEqual(
      Buffer.from(a, 'utf8'),
      Buffer.from(b, 'utf8')
    );
  } catch {
    return false;
  }
};

/**
 * Validates JWT token with timing-attack resistance
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      res.status(401).json({ message: 'Access denied. No token provided.' });
      return;
    }

    // Validate JWT_SECRET is configured
    if (!process.env.JWT_SECRET) {
      res.status(500).json({ message: 'Server configuration error' });
      return;
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        // Don't expose specific error details to prevent information leakage
        res.status(403).json({ message: 'Invalid or expired token' });
        return;
      }

      // Attach user information to request
      req.user = decoded as { id: string; email: string };
      next();
    });
  } catch (error) {
    res.status(500).json({ message: 'Authentication error' });
  }
};

/**
 * Validates API key with timing-attack resistance
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const authenticateApiKey = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const apiKey = req.headers['x-api-key'] as string;

    if (!apiKey) {
      res.status(401).json({ message: 'Access denied. No API key provided.' });
      return;
    }

    // Validate API_KEY is configured
    const validApiKey = process.env.API_KEY;
    if (!validApiKey) {
      res.status(500).json({ message: 'Server configuration error' });
      return;
    }

    // Timing-safe comparison to prevent timing attacks
    if (!timingSafeEqual(apiKey, validApiKey)) {
      res.status(403).json({ message: 'Invalid API key' });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Authentication error' });
  }
};

/**
 * Generates a JWT token for a user
 * @param userId - User ID
 * @param email - User email
 * @returns JWT token string
 */
export const generateToken = (userId: string, email: string): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET not configured');
  }

  return jwt.sign(
    { id: userId, email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};
