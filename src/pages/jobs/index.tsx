import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useTeam } from '@/context/team-context';
import { CreateJobDialog } from './components/create-job-dialog';
import { JobList } from './components/job-list';

export function Jobs() {
  const { currentOrg } = useTeam();

  if (!currentOrg) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <Card>
          <CardHeader>
            <CardTitle>No Organization Selected</CardTitle>
            <CardDescription>
              Please select or create an organization to manage job postings.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Job Postings</h2>
          <p className="text-muted-foreground">
            Manage job postings for {currentOrg.name}.
          </p>
        </div>
        <CreateJobDialog orgId={currentOrg.id} />
      </div>
      <div className="mt-6">
        <JobList orgId={currentOrg.id} />
      </div>
    </>
  );
}