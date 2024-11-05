import { Button } from '@/components/ui/button';
import { Github, Chrome } from 'lucide-react';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export function OAuthButtons() {
  const [loading, setLoading] = useState<'github' | 'google' | null>(null);

  const handleOAuthLogin = async (provider: 'github' | 'google') => {
    try {
      setLoading(provider);
      
      // Instead of using the API directly, use window.location to redirect
      if (provider === 'github') {
        window.location.href = '/api/auth/login/github';
      } else if (provider === 'google') {
        window.location.href = '/api/auth/login/google';
      }
    } catch (error) {
      console.error(`Failed to initiate ${provider} login:`, error);
      toast.error(`Failed to login with ${provider}`, {
        description: 'Please try again later'
      });
      setLoading(null);
    }
  };

  return (
    <div className="grid gap-2">
      <Button
        variant="outline"
        className="w-full"
        onClick={() => handleOAuthLogin('github')}
        disabled={!!loading}
      >
        {loading === 'github' ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Github className="mr-2 h-4 w-4" />
        )}
        Continue with GitHub
      </Button>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => handleOAuthLogin('google')}
        disabled={!!loading}
      >
        {loading === 'google' ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Chrome className="mr-2 h-4 w-4" />
        )}
        Continue with Google
      </Button>
    </div>
  );
}