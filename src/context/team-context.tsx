import React, { createContext, useContext, useState } from 'react';

export type Member = {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'member';
  avatar?: string;
};

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

export type Organization = {
  id: string;
  name: string;
  slug: string;
  avatar?: string;
  members: Member[];
  jobs: JobPosting[];
};

type TeamContextType = {
  currentOrg: Organization;
  organizations: Organization[];
  setCurrentOrg: (org: Organization) => void;
  addOrganization: (org: Organization) => void;
  updateOrganization: (id: string, data: Partial<Organization>) => void;
  deleteOrganization: (id: string) => void;
  addMember: (orgId: string, member: Member) => void;
  updateMember: (orgId: string, memberId: string, data: Partial<Member>) => void;
  removeMember: (orgId: string, memberId: string) => void;
  addJob: (orgId: string, job: JobPosting) => void;
  updateJob: (orgId: string, jobId: string, data: Partial<JobPosting>) => void;
  removeJob: (orgId: string, jobId: string) => void;
};

const defaultOrganizations: Organization[] = [
  {
    id: 'personal',
    name: 'Personal Account',
    slug: 'personal',
    members: [
      {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'owner',
        avatar: 'https://github.com/shadcn.png',
      },
    ],
    jobs: [],
  },
  {
    id: 'acme-inc',
    name: 'Acme Inc',
    slug: 'acme-inc',
    members: [
      {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin',
        avatar: 'https://github.com/shadcn.png',
      },
      {
        id: 'user-2',
        name: 'Jane Smith',
        email: 'jane@acme.com',
        role: 'owner',
      },
      {
        id: 'user-3',
        name: 'Bob Wilson',
        email: 'bob@acme.com',
        role: 'member',
      },
    ],
    jobs: [
      {
        id: 'job-1',
        title: 'Senior Frontend Developer',
        description: 'We are looking for an experienced Frontend Developer...',
        location: 'Remote',
        type: 'full-time',
        salary: {
          min: 80000,
          max: 120000,
          currency: 'USD',
        },
        department: 'Engineering',
        requirements: [
          '5+ years of experience with React',
          'Experience with TypeScript',
          'Strong understanding of web performance',
        ],
        responsibilities: [
          'Build scalable web applications',
          'Mentor junior developers',
          'Contribute to technical decisions',
        ],
        status: 'published',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        createdBy: 'user-1',
      },
    ],
  },
];

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export function TeamProvider({ children }: { children: React.ReactNode }) {
  const [organizations, setOrganizations] = useState<Organization[]>(defaultOrganizations);
  const [currentOrg, setCurrentOrg] = useState<Organization>(organizations[0]);

  const addOrganization = (org: Organization) => {
    setOrganizations((prev) => [...prev, org]);
  };

  const updateOrganization = (id: string, data: Partial<Organization>) => {
    setOrganizations((prev) =>
      prev.map((org) =>
        org.id === id ? { ...org, ...data } : org
      )
    );
    
    if (currentOrg.id === id) {
      setCurrentOrg((prev) => ({ ...prev, ...data }));
    }
  };

  const deleteOrganization = (id: string) => {
    setOrganizations((prev) => {
      const newOrgs = prev.filter((org) => org.id !== id);
      if (currentOrg.id === id && newOrgs.length > 0) {
        setCurrentOrg(newOrgs[0]);
      }
      return newOrgs;
    });
  };

  const addMember = (orgId: string, member: Member) => {
    setOrganizations((prev) =>
      prev.map((org) =>
        org.id === orgId
          ? { ...org, members: [...org.members, member] }
          : org
      )
    );
    
    if (currentOrg.id === orgId) {
      setCurrentOrg((prev) => ({
        ...prev,
        members: [...prev.members, member],
      }));
    }
  };

  const updateMember = (
    orgId: string,
    memberId: string,
    data: Partial<Member>
  ) => {
    setOrganizations((prev) =>
      prev.map((org) =>
        org.id === orgId
          ? {
              ...org,
              members: org.members.map((member) =>
                member.id === memberId ? { ...member, ...data } : member
              ),
            }
          : org
      )
    );
    
    if (currentOrg.id === orgId) {
      setCurrentOrg((prev) => ({
        ...prev,
        members: prev.members.map((member) =>
          member.id === memberId ? { ...member, ...data } : member
        ),
      }));
    }
  };

  const removeMember = (orgId: string, memberId: string) => {
    setOrganizations((prev) =>
      prev.map((org) =>
        org.id === orgId
          ? {
              ...org,
              members: org.members.filter((member) => member.id !== memberId),
            }
          : org
      )
    );
    
    if (currentOrg.id === orgId) {
      setCurrentOrg((prev) => ({
        ...prev,
        members: prev.members.filter((member) => member.id !== memberId),
      }));
    }
  };

  const addJob = (orgId: string, job: JobPosting) => {
    setOrganizations((prev) =>
      prev.map((org) =>
        org.id === orgId
          ? { ...org, jobs: [...org.jobs, job] }
          : org
      )
    );
    
    if (currentOrg.id === orgId) {
      setCurrentOrg((prev) => ({
        ...prev,
        jobs: [...prev.jobs, job],
      }));
    }
  };

  const updateJob = (
    orgId: string,
    jobId: string,
    data: Partial<JobPosting>
  ) => {
    setOrganizations((prev) =>
      prev.map((org) =>
        org.id === orgId
          ? {
              ...org,
              jobs: org.jobs.map((job) =>
                job.id === jobId ? { ...job, ...data } : job
              ),
            }
          : org
      )
    );
    
    if (currentOrg.id === orgId) {
      setCurrentOrg((prev) => ({
        ...prev,
        jobs: prev.jobs.map((job) =>
          job.id === jobId ? { ...job, ...data } : job
        ),
      }));
    }
  };

  const removeJob = (orgId: string, jobId: string) => {
    setOrganizations((prev) =>
      prev.map((org) =>
        org.id === orgId
          ? {
              ...org,
              jobs: org.jobs.filter((job) => job.id !== jobId),
            }
          : org
      )
    );
    
    if (currentOrg.id === orgId) {
      setCurrentOrg((prev) => ({
        ...prev,
        jobs: prev.jobs.filter((job) => job.id !== jobId),
      }));
    }
  };

  const value = {
    currentOrg,
    organizations,
    setCurrentOrg,
    addOrganization,
    updateOrganization,
    deleteOrganization,
    addMember,
    updateMember,
    removeMember,
    addJob,
    updateJob,
    removeJob,
  };

  return (
    <TeamContext.Provider value={value}>
      {children}
    </TeamContext.Provider>
  );
}

export function useTeam() {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error('useTeam must be used within a TeamProvider');
  }
  return context;
}