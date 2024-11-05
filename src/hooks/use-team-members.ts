import { useGet, usePost, usePut, useDelete } from '@/hooks/use-api';
import { Member } from '@/types/team';

export function useTeamMembers(orgId: string) {
  return useGet<Member[]>(['team-members', orgId], `/organizations/${orgId}/members`);
}

export function useInviteMember(orgId: string) {
  return usePost<Member, { email: string; role: Member['role'] }>(
    `/organizations/${orgId}/members/invite`,
    {
      invalidateQueries: ['team-members'],
    }
  );
}

export function useUpdateMemberRole(orgId: string) {
  return usePut<Member, { memberId: string; role: Member['role'] }>(
    `/organizations/${orgId}/members`,
    {
      invalidateQueries: ['team-members'],
    }
  );
}

export function useRemoveMember(orgId: string) {
  return useDelete<void>(`/organizations/${orgId}/members`, {
    invalidateQueries: ['team-members'],
  });
}