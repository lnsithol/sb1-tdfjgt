import { authenticator } from 'otplib';
import QRCode from 'qrcode';

export async function generateTwoFactorSecret(email: string) {
  const secret = authenticator.generateSecret();
  const otpauth = authenticator.keyuri(email, 'Your App Name', secret);
  const qrCode = await QRCode.toDataURL(otpauth);
  
  return {
    secret,
    qrCode,
  };
}

export function verifyTwoFactorToken(token: string, secret: string) {
  return authenticator.verify({
    token,
    secret,
  });
}