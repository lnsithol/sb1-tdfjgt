import { Member } from '@/types/team';
import { MemberActions } from './member-actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

interface MemberCardProps {
  member: Member;
  orgId: string;
}

export function MemberCard({ member, orgId }: MemberCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback>
                {member.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <CardTitle className="text-xl">{member.name}</CardTitle>
              <CardDescription>{member.email}</CardDescription>
            </div>
          </div>
          <MemberActions member={member} orgId={orgId} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <Badge variant={member.role === 'owner' ? 'default' : 'secondary'}>
            {member.role}
          </Badge>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              Message
            </Button>
            <Button variant="outline" size="sm">
              View Profile
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}