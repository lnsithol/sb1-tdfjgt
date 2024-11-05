import { Separator } from '@/components/ui/separator';
import { WorkspaceForm } from './components/workspace-form';
import { DangerZone } from './components/danger-zone';
import { useTeam } from '@/context/team-context';

export function WorkspaceSettings() {
  const { currentWorkspace } = useTeam();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Workspace Settings</h2>
        <p className="text-muted-foreground">
          Manage {currentWorkspace.name} workspace settings and preferences.
        </p>
      </div>
      <Separator />
      <WorkspaceForm />
      <Separator />
      <DangerZone />
    </div>
  );
}