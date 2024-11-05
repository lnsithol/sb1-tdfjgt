import { lucia } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextFunction, Request, Response } from 'express';

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { session, user } = await lucia.validateRequest(req);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Update session last used time and metadata
  await prisma.session.update({
    where: { id: session.id },
    data: {
      lastUsed: new Date(),
      userAgent: req.headers['user-agent'],
      ipAddress: req.ip,
    },
  });

  req.session = session;
  req.user = user;
  next();
}