import { Router } from 'express';
import { lucia } from '@/lib/auth';
import { github, google, handleOAuthCallback } from '@/lib/oauth';
import { rateLimitMiddleware, loginLimiter } from '@/lib/rate-limiter';
import { validateRequest } from '@/lib/validate';
import { z } from 'zod';

const router = Router();

// OAuth Routes
router.get('/login/github', async (req, res) => {
  const [url, state] = await github.createAuthorizationURL();
  res.cookie('github_oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 1000, // 1 hour
  });
  res.json({ url });
});

router.get('/login/google', async (req, res) => {
  const [url, state] = await google.createAuthorizationURL();
  res.cookie('google_oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 1000, // 1 hour
  });
  res.json({ url });
});

router.get('/callback/github', async (req, res) => {
  const { code } = req.query;
  const storedState = req.cookies.github_oauth_state;

  try {
    const { session } = await handleOAuthCallback('github', code as string);
    const sessionCookie = lucia.createSessionCookie(session.id);
    res.setHeader('Set-Cookie', sessionCookie.serialize());
    res.redirect('/');
  } catch (error) {
    console.error('GitHub OAuth error:', error);
    res.redirect('/login?error=oauth-failed');
  }
});

router.get('/callback/google', async (req, res) => {
  const { code } = req.query;
  const storedState = req.cookies.google_oauth_state;

  try {
    const { session } = await handleOAuthCallback('google', code as string);
    const sessionCookie = lucia.createSessionCookie(session.id);
    res.setHeader('Set-Cookie', sessionCookie.serialize());
    res.redirect('/');
  } catch (error) {
    console.error('Google OAuth error:', error);
    res.redirect('/login?error=oauth-failed');
  }
});

// Session Management
router.get('/sessions', async (req, res) => {
  const { user } = await lucia.validateRequest(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const sessions = await prisma.session.findMany({
    where: { userId: user.id },
    orderBy: { lastUsed: 'desc' },
  });

  res.json(sessions.map(session => ({
    ...session,
    current: session.id === req.session?.id
  })));
});

router.delete('/sessions/:id', async (req, res) => {
  const { user } = await lucia.validateRequest(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  await lucia.invalidateSession(req.params.id);
  res.status(204).end();
});

router.delete('/sessions', async (req, res) => {
  const { user } = await lucia.validateRequest(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const sessions = await prisma.session.findMany({
    where: { 
      userId: user.id,
      id: { not: req.session?.id }
    },
  });

  await Promise.all(
    sessions.map(session => lucia.invalidateSession(session.id))
  );

  res.status(204).end();
});

// Two-Factor Authentication
router.post('/2fa/setup', async (req, res) => {
  const { user } = await lucia.validateRequest(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { secret, qrCode } = await generateTwoFactorSecret(user.email);
  
  // Store secret temporarily
  await prisma.user.update({
    where: { id: user.id },
    data: { twoFactorSecret: secret },
  });

  res.json({ qrCode });
});

router.post('/2fa/verify', async (req, res) => {
  const { user } = await lucia.validateRequest(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const schema = z.object({
    token: z.string().length(6),
  });

  const { token } = validateRequest(schema, req.body);
  const isValid = verifyTwoFactorToken(token, user.twoFactorSecret!);

  if (!isValid) {
    return res.status(400).json({ error: 'Invalid token' });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { twoFactorEnabled: true },
  });

  res.json({ success: true });
});

// Backup Codes
router.post('/backup-codes', async (req, res) => {
  const { user } = await lucia.validateRequest(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const codes = Array.from({ length: 10 }, () => 
    crypto.randomBytes(4).toString('hex')
  );

  // Store hashed backup codes
  await prisma.backupCode.createMany({
    data: codes.map(code => ({
      userId: user.id,
      code: await argon2.hash(code),
    })),
  });

  res.json({ codes });
});

export default router;