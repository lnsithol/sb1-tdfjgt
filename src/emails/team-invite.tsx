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

interface TeamInviteProps {
  url: string;
  inviterName: string;
  organizationName: string;
  role: string;
}

export const TeamInviteTemplate = ({
  url,
  inviterName,
  organizationName,
  role,
}: TeamInviteProps) => (
  <Html>
    <Head />
    <Preview>Join {organizationName} on our platform</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Team Invitation</Heading>
        <Text style={text}>
          {inviterName} has invited you to join {organizationName} as a {role}.
        </Text>
        <Section style={buttonContainer}>
          <Button style={button} href={url}>
            Accept Invitation
          </Button>
        </Section>
        <Text style={text}>
          Or copy and paste this URL into your browser:{' '}
          <Link style={link} href={url}>
            {url}
          </Link>
        </Text>
        <Text style={footer}>
          This invitation will expire in 7 days.
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