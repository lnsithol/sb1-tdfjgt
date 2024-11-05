export type Member = {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'member';
  avatar?: string;
};

export type Organization = {
  id: string;
  name: string;
  slug: string;
  avatar?: string;
};