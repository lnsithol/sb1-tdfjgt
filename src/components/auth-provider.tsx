import { createContext, useContext } from 'react';
import { useAuth, useLogin, useLogout, useRegister } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';

interface AuthContextValue {
  user: ReturnType<typeof useAuth>['user'];
  isLoading: boolean;
  isAuthenticated: boolean;
  login: ReturnType<typeof useLogin>;
  logout: ReturnType<typeof useLogout>;
  register: ReturnType<typeof useRegister>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const login = useLogin();
  const logout = useLogout();
  const register = useRegister();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}