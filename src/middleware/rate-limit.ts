import { RateLimiterMemory } from 'rate-limiter-flexible';
import { Request, Response, NextFunction } from 'express';
import { rateLimitMiddleware } from '@/lib/rate-limiter';

export function createRateLimiter(limiter: RateLimiterMemory) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const key = req.ip;
    const result = await rateLimitMiddleware(key, limiter);

    if (!result.success) {
      res.setHeader('Retry-After', result.retryAfter);
      return res.status(429).json({
        error: result.error,
        retryAfter: result.retryAfter,
      });
    }

    next();
  };
}