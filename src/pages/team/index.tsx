import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Settings } from 'lucide-react';
import { useTeam } from '@/context/team-context';
import { InviteMemberDialog } from './components/invite-member-dialog';
import { useNavigate } from 'react-router-dom';
import { MemberList } from './components/member-list';

export function Team() {
  const { currentOrg } = useTeam();
  const navigate = useNavigate();

  if (!currentOrg) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <Card>
          <CardHeader>
            <CardTitle>No Organization Selected</CardTitle>
            <CardDescription>
              Please select or create an organization to manage team members.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/')}>Go to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Team Members</h2>
          <p className="text-muted-foreground">
            Manage team members and their roles in {currentOrg.name}.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => navigate('/workspace-settings')}
          >
            <Settings className="mr-2 h-4 w-4" />
            Organization Settings
          </Button>
          <InviteMemberDialog />
        </div>
      </div>
      <div className="mt-6">
        <MemberList orgId={currentOrg.id} />
      </div>
    </>
  );
}