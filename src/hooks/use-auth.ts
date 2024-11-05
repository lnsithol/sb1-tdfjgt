import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export function useAuth() {
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ['auth'],
    queryFn: async () => {
      try {
        const response = await api.get('/auth/me');
        return response.data;
      } catch (error) {
        return null;
      }
    },
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      if (!data.emailVerified) {
        navigate('/verify-email-notice');
      } else {
        navigate('/');
        toast.success('Successfully logged in');
      }
    },
    onError: (error: any) => {
      toast.error('Failed to login', {
        description: error.response?.data?.message || 'Please check your credentials and try again',
      });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      await api.post('/auth/logout');
    },
    onSuccess: () => {
      queryClient.setQueryData(['auth'], null);
      navigate('/login');
      toast.success('Successfully logged out');
    },
  });
}

export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: RegisterCredentials) => {
      const response = await api.post('/auth/register', data);
      return response.data;
    },
    onSuccess: () => {
      navigate('/verify-email-notice');
      toast.success('Registration successful', {
        description: 'Please check your email to verify your account.',
      });
    },
    onError: (error: any) => {
      toast.error('Failed to register', {
        description: error.response?.data?.message || 'Please try again later',
      });
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    },
    onSuccess: () => {
      toast.success('Reset link sent', {
        description: 'Please check your email for password reset instructions.',
      });
    },
    onError: (error: any) => {
      toast.error('Failed to send reset link', {
        description: error.response?.data?.message || 'Please try again later',
      });
    },
  });
}

export function useResetPassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ token, password }: { token: string; password: string }) => {
      const response = await api.post('/auth/reset-password', { token, password });
      return response.data;
    },
    onSuccess: () => {
      navigate('/login');
      toast.success('Password reset successful', {
        description: 'You can now log in with your new password.',
      });
    },
    onError: (error: any) => {
      toast.error('Failed to reset password', {
        description: error.response?.data?.message || 'Please try again later',
      });
    },
  });
}

export function useVerifyEmail() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (token: string) => {
      const response = await api.post('/auth/verify-email', { token });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      navigate('/');
      toast.success('Email verified successfully');
    },
    onError: (error: any) => {
      navigate('/verify-email-notice');
      toast.error('Failed to verify email', {
        description: error.response?.data?.message || 'Please try again later',
      });
    },
  });
}

export function useResendVerificationEmail() {
  return useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      const response = await api.post('/auth/resend-verification', { email });
      return response.data;
    },
    onSuccess: () => {
      toast.success('Verification email sent', {
        description: 'Please check your email for verification instructions.',
      });
    },
    onError: (error: any) => {
      toast.error('Failed to send verification email', {
        description: error.response?.data?.message || 'Please try again later',
      });
    },
  });
}

export function useUpdatePassword() {
  return useMutation({
    mutationFn: async (data: {
      currentPassword: string;
      newPassword: string;
    }) => {
      const response = await api.post('/auth/change-password', data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Password updated successfully');
    },
    onError: (error: any) => {
      toast.error('Failed to update password', {
        description: error.response?.data?.message || 'Please try again later',
      });
    },
  });
}

export function useSetupTwoFactor() {
  return useMutation({
    mutationFn: async () => {
      const response = await api.post('/auth/2fa/setup');
      return response.data;
    },
    onSuccess: () => {
      toast.success('Two-factor authentication setup initiated');
    },
    onError: (error: any) => {
      toast.error('Failed to setup 2FA', {
        description: error.response?.data?.message || 'Please try again later',
      });
    },
  });
}

export function useVerifyTwoFactor() {
  return useMutation({
    mutationFn: async ({ token }: { token: string }) => {
      const response = await api.post('/auth/2fa/verify', { token });
      return response.data;
    },
    onSuccess: () => {
      toast.success('Two-factor authentication enabled');
    },
    onError: (error: any) => {
      toast.error('Failed to verify code', {
        description: error.response?.data?.message || 'Please try again later',
      });
    },
  });
}