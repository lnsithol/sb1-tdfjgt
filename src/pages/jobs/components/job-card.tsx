import { JobPosting } from '@/types/jobs';
import { JobActions } from './job-actions';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import {
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
} from 'lucide-react';

interface JobCardProps {
  job: JobPosting;
  orgId: string;
}

export function JobCard({ job, orgId }: JobCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl">{job.title}</CardTitle>
            <CardDescription>
              Posted {formatDistanceToNow(new Date(job.createdAt))} ago
            </CardDescription>
          </div>
          <JobActions job={job} orgId={orgId} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Briefcase className="w-4 h-4 mr-1" />
              {job.type}
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {job.location}
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Building2 className="w-4 h-4 mr-1" />
              {job.department}
            </div>
            {job.salary && (
              <div className="flex items-center">
                <DollarSign className="w-4 h-4 mr-1" />
                {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()} {job.salary.currency}
              </div>
            )}
          </div>
          <Badge
            variant={
              job.status === 'published'
                ? 'default'
                : job.status === 'draft'
                ? 'secondary'
                : 'destructive'
            }
          >
            {job.status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}