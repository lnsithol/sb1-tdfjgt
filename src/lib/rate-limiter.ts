import { RateLimiterMemory } from 'rate-limiter-flexible';

export const loginLimiter = new RateLimiterMemory({
  points: 5, // 5 attempts
  duration: 60 * 15, // per 15 minutes
});

export const emailLimiter = new RateLimiterMemory({
  points: 3, // 3 emails
  duration: 60 * 60, // per hour
});

export const resetPasswordLimiter = new RateLimiterMemory({
  points: 3, // 3 attempts
  duration: 60 * 60, // per hour
});

export async function rateLimitMiddleware(
  key: string,
  limiter: RateLimiterMemory
) {
  try {
    await limiter.consume(key);
    return { success: true };
  } catch (error) {
    const retryAfter = Math.ceil((error as any).msBeforeNext / 1000) || 30;
    return {
      success: false,
      error: 'Too many requests',
      retryAfter,
    };
  }
}