import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/components/auth-provider';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireVerified?: boolean;
}

export function ProtectedRoute({
  children,
  requireAuth = true,
  requireVerified = false,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !isAuthenticated) {
        navigate('/login', { replace: true });
      } else if (!requireAuth && isAuthenticated) {
        navigate('/', { replace: true });
      } else if (requireVerified && !user?.emailVerified) {
        navigate('/verify-email-notice', { replace: true });
      }
    }
  }, [isLoading, isAuthenticated, user, navigate, requireAuth, requireVerified]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return null;
  }

  if (!requireAuth && isAuthenticated) {
    return null;
  }

  if (requireVerified && !user?.emailVerified) {
    return null;
  }

  return <>{children}</>;
}