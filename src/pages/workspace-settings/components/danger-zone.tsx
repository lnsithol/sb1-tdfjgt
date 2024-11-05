import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useTeam } from '@/context/team-context';
import { useNavigate } from 'react-router-dom';

export function DangerZone() {
  const { currentWorkspace, deleteWorkspace } = useTeam();
  const navigate = useNavigate();

  const handleDeleteWorkspace = () => {
    deleteWorkspace(currentWorkspace.id);
    navigate('/');
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Danger Zone</h3>
        <p className="text-sm text-muted-foreground">
          Irreversible and destructive actions.
        </p>
      </div>

      <Card className="border-destructive">
        <CardHeader>
          <CardTitle>Delete Workspace</CardTitle>
          <CardDescription>
            Permanently delete your workspace and all of its contents.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This action cannot be undone. This will permanently delete your
            workspace, teams, projects, and remove all collaborator associations.
          </p>
        </CardContent>
        <CardFooter>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Workspace</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  workspace and remove all associated data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteWorkspace}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete Workspace
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  );
}