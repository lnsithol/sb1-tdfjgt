import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { prisma } from "./prisma";
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';
import { sendVerificationEmail, sendPasswordResetEmail } from './email';

const adapter = new PrismaAdapter(prisma.session, prisma.key, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
      name: attributes.name,
      avatar: attributes.avatar,
      emailVerified: attributes.emailVerified,
    };
  },
});

export async function createUser(data: {
  email: string;
  password: string;
  name: string;
}) {
  const hashedPassword = await new Argon2id().hash(data.password);
  const userId = generateId(15);

  const user = await prisma.user.create({
    data: {
      id: userId,
      email: data.email,
      name: data.name,
      auth_key: {
        create: {
          id: generateId(15),
          hashed_password: hashedPassword,
        },
      },
    },
  });

  const verificationToken = generateId(32);
  await prisma.emailVerificationToken.create({
    data: {
      id: verificationToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    },
  });

  await sendVerificationEmail({
    email: user.email,
    name: user.name || undefined,
    token: verificationToken,
  });

  return user;
}

export async function verifyEmail(token: string) {
  const verificationToken = await prisma.emailVerificationToken.delete({
    where: {
      id: token,
      expiresAt: {
        gt: new Date(),
      },
    },
  }).catch(() => null);

  if (!verificationToken) {
    throw new Error('Invalid or expired verification token');
  }

  await prisma.user.update({
    where: {
      id: verificationToken.userId,
    },
    data: {
      emailVerified: true,
    },
  });
}

export async function generatePasswordResetToken(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const token = generateId(32);
  await prisma.passwordResetToken.create({
    data: {
      id: token,
      userId: user.id,
      expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour
    },
  });

  await sendPasswordResetEmail({
    email: user.email,
    name: user.name || undefined,
    token,
  });
}

export async function resetPassword(token: string, password: string) {
  const resetToken = await prisma.passwordResetToken.delete({
    where: {
      id: token,
      expiresAt: {
        gt: new Date(),
      },
    },
  }).catch(() => null);

  if (!resetToken) {
    throw new Error('Invalid or expired reset token');
  }

  const hashedPassword = await new Argon2id().hash(password);
  await prisma.key.update({
    where: {
      userId: resetToken.userId,
    },
    data: {
      hashed_password: hashedPassword,
    },
  });

  // Invalidate all sessions after password reset
  await prisma.session.updateMany({
    where: {
      userId: resetToken.userId,
    },
    data: {
      isRevoked: true,
      revokedAt: new Date(),
      revokedReason: 'password_reset',
    },
  });
}

export async function resendVerificationEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('User not found');
  }

  if (user.emailVerified) {
    throw new Error('Email already verified');
  }

  // Delete any existing verification tokens
  await prisma.emailVerificationToken.deleteMany({
    where: { userId: user.id },
  });

  const verificationToken = generateId(32);
  await prisma.emailVerificationToken.create({
    data: {
      id: verificationToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    },
  });

  await sendVerificationEmail({
    email: user.email,
    name: user.name || undefined,
    token: verificationToken,
  });
}