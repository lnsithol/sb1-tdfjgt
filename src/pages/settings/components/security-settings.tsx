import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { TwoFactorSetup } from '@/components/two-factor-setup';
import { PasswordChange } from '@/components/password-change';
import { Shield, Lock, Bell } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

export function SecuritySettings() {
  const { user } = useAuth();
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Security Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account security and authentication methods.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Add an extra layer of security to your account by requiring a
            verification code in addition to your password.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {user?.twoFactorEnabled ? (
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">Two-factor authentication is enabled</p>
                <p className="text-sm text-muted-foreground">
                  Your account is protected with an authenticator app.
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setShowTwoFactorSetup(true)}
              >
                <Shield className="mr-2 h-4 w-4" />
                Reconfigure
              </Button>
            </div>
          ) : (
            <Button onClick={() => setShowTwoFactorSetup(true)}>
              <Shield className="mr-2 h-4 w-4" />
              Enable Two-Factor Authentication
            </Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>
            Change your password or enable password-less login methods.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            onClick={() => setShowPasswordChange(true)}
          >
            <Lock className="mr-2 h-4 w-4" />
            Change Password
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security Notifications</CardTitle>
          <CardDescription>
            Choose when you want to receive security alerts.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Unusual login attempts</Label>
              <p className="text-sm text-muted-foreground">
                Get notified of suspicious login activity
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>New device logins</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when your account is accessed from a new device
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Password changes</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when your password is changed
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <TwoFactorSetup
        open={showTwoFactorSetup}
        onOpenChange={setShowTwoFactorSetup}
      />
      <PasswordChange
        open={showPasswordChange}
        onOpenChange={setShowPasswordChange}
      />
    </div>
  );
}