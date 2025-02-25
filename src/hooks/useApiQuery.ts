import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { api } from '@/utils/api';

type QueryKeyT = readonly unknown[];

/**
 * Generic hook for fetching data from any endpoint
 */
export function useApiQuery<TData, TError = Error>(
  queryKey: QueryKeyT,
  endpoint: string,
  options?: Omit<UseQueryOptions<TData, TError, TData>, 'queryKey' | 'queryFn'>
) {
  return useQuery<TData, TError>({
    queryKey,
    queryFn: () => api.get<TData>(endpoint),
    ...options,
  });
}

/**
 * Generic hook for fetching an item by ID
 */
export function useApiQueryById<TData, TError = Error>(
  queryKey: QueryKeyT,
  endpoint: string,
  id: number | string,
  options?: Omit<UseQueryOptions<TData, TError, TData>, 'queryKey' | 'queryFn'>
) {
  return useQuery<TData, TError>({
    queryKey: [...queryKey, id],
    queryFn: () => api.get<TData>(`${endpoint}/${id}`),
    ...options,
  });
}

/**
 * Generic hook for creating data
 */
export function useApiCreate<TData, TVariables, TError = Error>(
  queryKey: QueryKeyT,
  endpoint: string,
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'>
) {
  const queryClient = useQueryClient();

  return useMutation<TData, TError, TVariables>({
    mutationFn: (variables) => api.post<TData>(endpoint, variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    ...options,
  });
}

/**
 * Generic hook for updating data
 */
export function useApiUpdate<TData, TVariables extends { id: number | string }, TError = Error>(
  queryKey: QueryKeyT,
  endpoint: string,
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'>
) {
  const queryClient = useQueryClient();

  return useMutation<TData, TError, TVariables>({
    mutationFn: (variables) => api.put<TData>(`${endpoint}/${variables.id}`, variables),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [...queryKey, variables.id] });
      queryClient.invalidateQueries({ queryKey });
    },
    ...options,
  });
}

/**
 * Generic hook for deleting data
 */
export function useApiDelete<TData, TError = Error>(
  queryKey: QueryKeyT,
  endpoint: string,
  options?: Omit<UseMutationOptions<TData, TError, number | string>, 'mutationFn'>
) {
  const queryClient = useQueryClient();

  return useMutation<TData, TError, number | string>({
    mutationFn: (id) => api.delete<TData>(`${endpoint}/${id}`),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: [...queryKey, id] });
      queryClient.invalidateQueries({ queryKey });
    },
    ...options,
  });
}