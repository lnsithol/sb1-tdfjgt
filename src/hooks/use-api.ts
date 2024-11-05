import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { toast } from 'sonner';

// Generic type for API response
type ApiResponse<T> = {
  data: T;
  message?: string;
};

// Generic GET hook
export function useGet<T>(
  key: string[],
  url: string,
  options?: {
    enabled?: boolean;
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
  }
) {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const response = await api.get<ApiResponse<T>>(url);
      return response.data.data;
    },
    ...options,
  });
}

// Generic POST hook
export function usePost<T, TVariables>(
  url: string,
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
    invalidateQueries?: string[];
  }
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: TVariables) => {
      const response = await api.post<ApiResponse<T>>(url, variables);
      return response.data.data;
    },
    onSuccess: (data, variables) => {
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
      if (options?.invalidateQueries) {
        options.invalidateQueries.forEach((query) => {
          queryClient.invalidateQueries({ queryKey: [query] });
        });
      }
      toast.success('Operation completed successfully');
    },
    onError: (error: Error) => {
      if (options?.onError) {
        options.onError(error);
      }
      toast.error('An error occurred', {
        description: error.message,
      });
    },
  });
}

// Generic PUT hook
export function usePut<T, TVariables>(
  url: string,
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
    invalidateQueries?: string[];
  }
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: TVariables) => {
      const response = await api.put<ApiResponse<T>>(url, variables);
      return response.data.data;
    },
    onSuccess: (data, variables) => {
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
      if (options?.invalidateQueries) {
        options.invalidateQueries.forEach((query) => {
          queryClient.invalidateQueries({ queryKey: [query] });
        });
      }
      toast.success('Operation completed successfully');
    },
    onError: (error: Error) => {
      if (options?.onError) {
        options.onError(error);
      }
      toast.error('An error occurred', {
        description: error.message,
      });
    },
  });
}

// Generic DELETE hook
export function useDelete<T>(
  url: string,
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
    invalidateQueries?: string[];
  }
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string | number) => {
      const response = await api.delete<ApiResponse<T>>(`${url}/${id}`);
      return response.data.data;
    },
    onSuccess: (data) => {
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
      if (options?.invalidateQueries) {
        options.invalidateQueries.forEach((query) => {
          queryClient.invalidateQueries({ queryKey: [query] });
        });
      }
      toast.success('Operation completed successfully');
    },
    onError: (error: Error) => {
      if (options?.onError) {
        options.onError(error);
      }
      toast.error('An error occurred', {
        description: error.message,
      });
    },
  });
}