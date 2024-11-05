import { JobPosting } from '@/types/jobs';
import { api } from '@/lib/axios';

export async function getJobs(orgId: string) {
  const response = await api.get(`/organizations/${orgId}/jobs`);
  return response.data;
}

export async function createJob(orgId: string, data: Omit<JobPosting, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) {
  const response = await api.post(`/organizations/${orgId}/jobs`, data);
  return response.data;
}

export async function updateJob(
  orgId: string,
  jobId: string,
  data: Partial<JobPosting>
) {
  const response = await api.put(`/organizations/${orgId}/jobs/${jobId}`, data);
  return response.data;
}

export async function deleteJob(orgId: string, jobId: string) {
  const response = await api.delete(`/organizations/${orgId}/jobs/${jobId}`);
  return response.data;
}