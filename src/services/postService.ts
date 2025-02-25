import { api } from '@/utils/api';
import { Post, Comment } from '@/types/api';

/**
 * Post related API services
 */
export const postService = {
  /**
   * Get all posts
   */
  getPosts: async (): Promise<Post[]> => {
    return api.get<Post[]>('/posts');
  },

  /**
   * Get post by ID
   */
  getPostById: async (id: number): Promise<Post> => {
    return api.get<Post>(`/posts/${id}`);
  },

  /**
   * Get posts by user ID
   */
  getPostsByUserId: async (userId: number): Promise<Post[]> => {
    return api.get<Post[]>(`/posts?userId=${userId}`);
  },

  /**
   * Get comments for a post
   */
  getPostComments: async (postId: number): Promise<Comment[]> => {
    return api.get<Comment[]>(`/posts/${postId}/comments`);
  },

  /**
   * Create a new post
   */
  createPost: async (post: Omit<Post, 'id'>): Promise<Post> => {
    return api.post<Post>('/posts', post);
  },
};