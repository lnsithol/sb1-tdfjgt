export type JobPosting = {
  id: string;
  title: string;
  description: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  department: string;
  requirements: string[];
  responsibilities: string[];
  status: 'draft' | 'published' | 'closed';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
};