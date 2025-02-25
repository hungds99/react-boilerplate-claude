import { api } from '@/utils/api';
import { Album } from '@/types/api';

/**
 * Album related API services
 */
export const albumService = {
  /**
   * Get all albums
   */
  getAlbums: async (): Promise<Album[]> => {
    return api.get<Album[]>('/albums');
  },

  /**
   * Get album by ID
   */
  getAlbumById: async (id: number): Promise<Album> => {
    return api.get<Album>(`/albums/${id}`);
  },

  /**
   * Get albums by user ID
   */
  getAlbumsByUserId: async (userId: number): Promise<Album[]> => {
    return api.get<Album[]>(`/albums?userId=${userId}`);
  },
};