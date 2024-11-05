import { resend } from './resend';
import { render } from '@react-email/render';
import { VerifyEmailTemplate } from '@/emails/verify-email';
import { ResetPasswordTemplate } from '@/emails/reset-password';
import { TeamInviteTemplate } from '@/emails/team-invite';

export async function sendVerificationEmail({
  email,
  name,
  token,
}: {
  email: string;
  name?: string;
  token: string;
}) {
  const url = `${process.env.APP_URL}/verify-email?token=${token}`;
  const html = render(VerifyEmailTemplate({ url, name }));

  return resend.emails.send({
    from: 'Your App <noreply@yourdomain.com>',
    to: email,
    subject: 'Verify your email address',
    html,
  });
}

export async function sendPasswordResetEmail({
  email,
  name,
  token,
}: {
  email: string;
  name?: string;
  token: string;
}) {
  const url = `${process.env.APP_URL}/reset-password?token=${token}`;
  const html = render(ResetPasswordTemplate({ url, name }));

  return resend.emails.send({
    from: 'Your App <noreply@yourdomain.com>',
    to: email,
    subject: 'Reset your password',
    html,
  });
}

export async function sendTeamInviteEmail({
  email,
  inviterName,
  organizationName,
  role,
  token,
}: {
  email: string;
  inviterName: string;
  organizationName: string;
  role: string;
  token: string;
}) {
  const url = `${process.env.APP_URL}/invite?token=${token}`;
  const html = render(
    TeamInviteTemplate({
      url,
      inviterName,
      organizationName,
      role,
    })
  );

  return resend.emails.send({
    from: 'Your App <noreply@yourdomain.com>',
    to: email,
    subject: `Join ${organizationName} on Your App`,
    html,
  });
}