import { Member } from '@/types/team';
import { api } from '@/lib/axios';

export async function getTeamMembers(orgId: string) {
  const response = await api.get(`/organizations/${orgId}/members`);
  return response.data;
}

export async function inviteMember(orgId: string, data: {
  email: string;
  role: Member['role'];
}) {
  const response = await api.post(`/organizations/${orgId}/members/invite`, data);
  return response.data;
}

export async function updateMemberRole(
  orgId: string,
  memberId: string,
  role: Member['role']
) {
  const response = await api.put(`/organizations/${orgId}/members/${memberId}`, {
    role,
  });
  return response.data;
}

export async function removeMember(orgId: string, memberId: string) {
  const response = await api.delete(`/organizations/${orgId}/members/${memberId}`);
  return response.data;
}