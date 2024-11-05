import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSetupTwoFactor, useVerifyTwoFactor } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';

interface TwoFactorSetupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TwoFactorSetup({ open, onOpenChange }: TwoFactorSetupProps) {
  const [step, setStep] = useState<'setup' | 'verify'>('setup');
  const [token, setToken] = useState('');
  const setupTwoFactor = useSetupTwoFactor();
  const verifyTwoFactor = useVerifyTwoFactor();

  const handleVerify = async () => {
    verifyTwoFactor.mutate(
      { token },
      {
        onSuccess: () => {
          onOpenChange(false);
          setStep('setup');
          setToken('');
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Two-Factor Authentication</DialogTitle>
          <DialogDescription>
            {step === 'setup'
              ? 'Scan the QR code with your authenticator app'
              : 'Enter the verification code from your authenticator app'}
          </DialogDescription>
        </DialogHeader>

        {step === 'setup' ? (
          <div className="space-y-4">
            {setupTwoFactor.data?.qrCode && (
              <div className="flex justify-center">
                <img
                  src={setupTwoFactor.data.qrCode}
                  alt="QR Code"
                  className="w-48 h-48"
                />
              </div>
            )}
            <Button
              className="w-full"
              onClick={() => setStep('verify')}
              disabled={setupTwoFactor.isPending}
            >
              {setupTwoFactor.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Next
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="token">Verification Code</Label>
              <Input
                id="token"
                placeholder="Enter 6-digit code"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setStep('setup');
                  setToken('');
                }}
              >
                Back
              </Button>
              <Button
                onClick={handleVerify}
                disabled={verifyTwoFactor.isPending}
              >
                {verifyTwoFactor.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Verify
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}