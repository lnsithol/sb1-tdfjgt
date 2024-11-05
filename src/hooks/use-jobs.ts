import { useGet, usePost, usePut, useDelete } from '@/hooks/use-api';
import { JobPosting } from '@/types/jobs';

export function useJobs(orgId: string) {
  return useGet<JobPosting[]>(['jobs', orgId], `/organizations/${orgId}/jobs`);
}

export function useCreateJob(orgId: string) {
  return usePost<JobPosting, Omit<JobPosting, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>>(
    `/organizations/${orgId}/jobs`,
    {
      invalidateQueries: ['jobs'],
    }
  );
}

export function useUpdateJob(orgId: string) {
  return usePut<JobPosting, { jobId: string; data: Partial<JobPosting> }>(
    `/organizations/${orgId}/jobs`,
    {
      invalidateQueries: ['jobs'],
    }
  );
}

export function useDeleteJob(orgId: string) {
  return useDelete<void>(`/organizations/${orgId}/jobs`, {
    invalidateQueries: ['jobs'],
  });
}