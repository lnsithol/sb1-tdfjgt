import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileForm } from './components/profile-form';
import { NotificationsForm } from './components/notifications-form';
import { SecuritySettings } from './components/security-settings';
import { ActiveSessions } from './components/active-sessions';
import { BackupCodes } from './components/backup-codes';

export function Settings() {
  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Settings</h3>
          <p className="text-sm text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
        <Separator />
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="space-y-4">
            <ProfileForm />
          </TabsContent>
          <TabsContent value="security" className="space-y-4">
            <SecuritySettings />
            <Separator />
            <BackupCodes />
          </TabsContent>
          <TabsContent value="sessions" className="space-y-4">
            <ActiveSessions />
          </TabsContent>
          <TabsContent value="notifications" className="space-y-4">
            <NotificationsForm />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}