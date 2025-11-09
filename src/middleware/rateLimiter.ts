
import { Request, Response, NextFunction } from 'express';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

/**
 * In-memory store for rate limiting
 * In production, use Redis or similar distributed cache
 */
const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Cleans up expired rate limit entries
 */
const cleanupExpiredEntries = (): void => {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
};

// Run cleanup every 5 minutes
setInterval(cleanupExpiredEntries, 5 * 60 * 1000);

/**
 * Rate limiting middleware
 * @param options - Rate limiter configuration
 */
export const rateLimiter = (options: {
  windowMs?: number;  // Time window in milliseconds
  max?: number;       // Maximum requests per window
  message?: string;   // Custom error message
  keyGenerator?: (req: Request) => string;  // Custom key generator
} = {}) => {
  const {
    windowMs = 15 * 60 * 1000,  // Default: 15 minutes
    max = 100,                   // Default: 100 requests
    message = 'Too many requests, please try again later',
    keyGenerator = (req: Request) => {
      // Use IP address as default key
      return req.ip || req.connection.remoteAddress || 'unknown';
    }
  } = options;

  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const key = keyGenerator(req);
      const now = Date.now();

      let entry = rateLimitStore.get(key);

      if (!entry || now > entry.resetTime) {
        // Create new entry
        entry = {
          count: 1,
          resetTime: now + windowMs
        };
        rateLimitStore.set(key, entry);

        // Add rate limit headers
        res.setHeader('X-RateLimit-Limit', max.toString());
        res.setHeader('X-RateLimit-Remaining', (max - 1).toString());
        res.setHeader('X-RateLimit-Reset', new Date(entry.resetTime).toISOString());

        next();
        return;
      }

      if (entry.count < max) {
        // Increment counter
        entry.count++;

        // Add rate limit headers
        res.setHeader('X-RateLimit-Limit', max.toString());
        res.setHeader('X-RateLimit-Remaining', (max - entry.count).toString());
        res.setHeader('X-RateLimit-Reset', new Date(entry.resetTime).toISOString());

        next();
        return;
      }

      // Rate limit exceeded
      res.setHeader('X-RateLimit-Limit', max.toString());
      res.setHeader('X-RateLimit-Remaining', '0');
      res.setHeader('X-RateLimit-Reset', new Date(entry.resetTime).toISOString());
      res.setHeader('Retry-After', Math.ceil((entry.resetTime - now) / 1000).toString());

      res.status(429).json({
        message,
        retryAfter: Math.ceil((entry.resetTime - now) / 1000)
      });
    } catch (error) {
      // Don't block requests if rate limiter fails
      next();
    }
  };
};

/**
 * Strict rate limiter for sensitive endpoints (e.g., login, password reset)
 */
export const strictRateLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 5,                     // 5 requests per window
  message: 'Too many attempts, please try again later'
});

/**
 * Rate limiter for email sending
 */
export const emailRateLimiter = rateLimiter({
  windowMs: 60 * 60 * 1000,  // 1 hour
  max: 10,                    // 10 emails per hour
  message: 'Email rate limit exceeded, please try again later',
  keyGenerator: (req: Request) => {
    // Rate limit by IP and email recipient
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    const recipient = req.body?.to || 'unknown';
    return `email:${ip}:${recipient}`;
  }
});

/**
 * Rate limiter for API endpoints
 */
export const apiRateLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100,                   // 100 requests per window
  message: 'API rate limit exceeded, please try again later'
});
