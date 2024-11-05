import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuthContext } from '@/components/auth-provider';
import { Loader2, Mail } from 'lucide-react';

export function VerifyEmailNotice() {
  const { user, resendVerificationEmail } = useAuthContext();

  const handleResendEmail = () => {
    if (user?.email) {
      resendVerificationEmail.mutate({ email: user.email });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-[450px]">
        <CardHeader className="text-center">
          <Mail className="w-12 h-12 mx-auto mb-4 text-primary" />
          <CardTitle className="text-2xl">Verify your email</CardTitle>
          <CardDescription>
            We've sent a verification email to{' '}
            <span className="font-medium">{user?.email}</span>. Please check your
            inbox and click the verification link to continue.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center text-sm text-muted-foreground">
          <p>
            If you don't see the email, check your spam folder or click the button
            below to resend the verification email.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            variant="outline"
            onClick={handleResendEmail}
            disabled={resendVerificationEmail.isPending}
          >
            {resendVerificationEmail.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Resend verification email
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}