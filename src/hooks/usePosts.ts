import { postService } from '@/services/postService';
import { Post } from '@/types/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Query keys for cache management
export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (filters: string) => [...postKeys.lists(), { filters }] as const,
  details: () => [...postKeys.all, 'detail'] as const,
  detail: (id: number) => [...postKeys.details(), id] as const,
  byUser: (userId: number) => [...postKeys.lists(), { userId }] as const,
  comments: (postId: number) => [...postKeys.detail(postId), 'comments'] as const,
};

/**
 * Hook for fetching all posts
 */
export const usePosts = (options = {}) => {
  return useQuery({
    queryKey: postKeys.lists(),
    queryFn: postService.getPosts,
    ...options,
  });
};

/**
 * Hook for fetching a single post by ID
 */
export const usePost = (id: number, options = {}) => {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => postService.getPostById(id),
    ...options,
  });
};

/**
 * Hook for fetching posts by user ID
 */
export const usePostsByUser = (userId: number, options = {}) => {
  return useQuery({
    queryKey: postKeys.byUser(userId),
    queryFn: () => postService.getPostsByUserId(userId),
    ...options,
  });
};

/**
 * Hook for fetching comments for a post
 */
export const usePostComments = (postId: number, options = {}) => {
  return useQuery({
    queryKey: postKeys.comments(postId),
    queryFn: () => postService.getPostComments(postId),
    ...options,
  });
};

/**
 * Hook for creating a new post
 */
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (newPost: Omit<Post, 'id'>) => postService.createPost(newPost),
    onSuccess: () => {
      // Invalidate and refetch posts list
      queryClient.invalidateQueries({
        queryKey: postKeys.lists(),
      });
    },
  });
};