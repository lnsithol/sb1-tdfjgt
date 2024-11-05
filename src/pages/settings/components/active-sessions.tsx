import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Laptop, Smartphone, Loader2, XCircle } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface Session {
  id: string;
  userAgent: string;
  ipAddress: string;
  lastUsed: string;
  current: boolean;
}

export function ActiveSessions() {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const queryClient = useQueryClient();

  const { data: sessions, isLoading } = useQuery({
    queryKey: ['sessions'],
    queryFn: async () => {
      const response = await api.get<Session[]>('/auth/sessions');
      return response.data;
    },
  });

  const revokeSession = useMutation({
    mutationFn: async (sessionId: string) => {
      await api.delete(`/auth/sessions/${sessionId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
      setSelectedSession(null);
      toast.success('Session revoked successfully');
    },
  });

  const revokeAllOtherSessions = useMutation({
    mutationFn: async () => {
      await api.delete('/auth/sessions');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
      toast.success('All other sessions revoked');
    },
  });

  const getDeviceIcon = (userAgent: string) => {
    if (userAgent.toLowerCase().includes('mobile')) {
      return <Smartphone className="h-4 w-4" />;
    }
    return <Laptop className="h-4 w-4" />;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Active Sessions</h3>
        <p className="text-sm text-muted-foreground">
          Manage your active sessions across different devices.
        </p>
      </div>

      <div className="space-y-4">
        {sessions?.map((session) => (
          <Card key={session.id}>
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center space-x-4">
                {getDeviceIcon(session.userAgent)}
                <div>
                  <p className="font-medium">
                    {session.userAgent.split('/')[0]}
                    {session.current && (
                      <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        Current
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Last active: {format(new Date(session.lastUsed), 'PPpp')}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    IP: {session.ipAddress}
                  </p>
                </div>
              </div>
              {!session.current && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedSession(session)}
                >
                  <XCircle className="h-4 w-4" />
                </Button>
              )}
            </CardContent>
          </Card>
        ))}

        <Button
          variant="outline"
          className="w-full"
          onClick={() => revokeAllOtherSessions.mutate()}
          disabled={revokeAllOtherSessions.isPending}
        >
          {revokeAllOtherSessions.isPending && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Sign out of all other devices
        </Button>
      </div>

      <Dialog open={!!selectedSession} onOpenChange={() => setSelectedSession(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Revoke Session</DialogTitle>
            <DialogDescription>
              Are you sure you want to sign out this device? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSelectedSession(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (selectedSession) {
                  revokeSession.mutate(selectedSession.id);
                }
              }}
              disabled={revokeSession.isPending}
            >
              {revokeSession.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Revoke Session
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}