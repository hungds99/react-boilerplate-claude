import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { albumService } from '@/services/albumService';
import { Album } from '@/types/api';

// Query keys for cache management
export const albumKeys = {
  all: ['albums'] as const,
  lists: () => [...albumKeys.all, 'list'] as const,
  list: (filters: string) => [...albumKeys.lists(), { filters }] as const,
  details: () => [...albumKeys.all, 'detail'] as const,
  detail: (id: number) => [...albumKeys.details(), id] as const,
  byUser: (userId: number) => [...albumKeys.lists(), { userId }] as const,
};

/**
 * Hook for fetching all albums
 */
export const useAlbums = (options = {}) => {
  return useQuery({
    queryKey: albumKeys.lists(),
    queryFn: albumService.getAlbums,
    ...options,
  });
};

/**
 * Hook for fetching a single album by ID
 */
export const useAlbum = (id: number, options = {}) => {
  return useQuery({
    queryKey: albumKeys.detail(id),
    queryFn: () => albumService.getAlbumById(id),
    ...options,
  });
};

/**
 * Hook for fetching albums by user ID
 */
export const useAlbumsByUser = (userId: number, options = {}) => {
  return useQuery({
    queryKey: albumKeys.byUser(userId),
    queryFn: () => albumService.getAlbumsByUserId(userId),
    ...options,
  });
};

/**
 * Hook for creating a new album (example for mutation)
 */
export const useCreateAlbum = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (newAlbum: Omit<Album, 'id'>) => {
      return fetch('https://jsonplaceholder.typicode.com/albums', {
        method: 'POST',
        body: JSON.stringify(newAlbum),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then(response => response.json());
    },
    onSuccess: () => {
      // Invalidate and refetch albums list
      queryClient.invalidateQueries({
        queryKey: albumKeys.lists(),
      });
    },
  });
};