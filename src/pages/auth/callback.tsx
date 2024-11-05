import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const provider = searchParams.get('provider');
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  useEffect(() => {
    if (error) {
      toast.error('Authentication failed', {
        description: searchParams.get('error_description') || 'Please try again',
      });
      navigate('/login');
      return;
    }

    if (!code || !state || !provider) {
      navigate('/login');
      return;
    }

    // Handle the OAuth callback
    fetch(`/api/auth/callback/${provider}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, state }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Authentication failed');
        }
        return response.json();
      })
      .then(() => {
        toast.success('Successfully logged in');
        navigate('/');
      })
      .catch((error) => {
        console.error('Auth callback error:', error);
        toast.error('Authentication failed', {
          description: 'Please try again',
        });
        navigate('/login');
      });
  }, [code, state, provider, error, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">
            Completing login...
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    </div>
  );
}