import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface ResetPasswordProps {
  url: string;
  name?: string;
}

export const ResetPasswordTemplate = ({
  url,
  name = 'there',
}: ResetPasswordProps) => (
  <Html>
    <Head />
    <Preview>Reset your password</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Reset your password</Heading>
        <Text style={text}>Hi {name},</Text>
        <Text style={text}>
          Someone requested a password reset for your account. If this was you,
          click the button below to reset your password:
        </Text>
        <Section style={buttonContainer}>
          <Button style={button} href={url}>
            Reset Password
          </Button>
        </Section>
        <Text style={text}>
          If you didn't request this email, you can safely ignore it. Your
          password won't be changed until you create a new one.
        </Text>
        <Text style={text}>
          Or copy and paste this URL into your browser:{' '}
          <Link style={link} href={url}>
            {url}
          </Link>
        </Text>
        <Text style={footer}>
          This link will expire in 1 hour for security reasons.
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '560px',
};

const h1 = {
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '1.25',
  marginBottom: '24px',
  color: '#1a1a1a',
};

const text = {
  fontSize: '16px',
  lineHeight: '1.5',
  margin: '16px 0',
  color: '#3c3c3c',
};

const buttonContainer = {
  margin: '24px 0',
};

const button = {
  backgroundColor: '#000000',
  borderRadius: '4px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px',
};

const link = {
  color: '#0066cc',
  textDecoration: 'underline',
};

const footer = {
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '16px 0',
  color: '#898989',
};