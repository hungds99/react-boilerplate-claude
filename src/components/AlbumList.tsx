import { useState } from 'react';
import { useAlbums, useAlbumsByUser, useCreateAlbum } from '@/hooks/useAlbums';
import { Album } from '@/types/api';
import { useApiQuery } from '@/hooks/useApiQuery';

const AlbumList = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [newAlbumTitle, setNewAlbumTitle] = useState('');

  // Using the specific album hook
  const albumsQuery = useAlbums({
    enabled: userId === null,
  });

  // Using the albums by user hook
  const albumsByUserQuery = useAlbumsByUser(userId || 1, {
    enabled: userId !== null,
  });

  // Alternative way using the generic hook
  const genericAlbumsQuery = useApiQuery<Album[]>(
    ['albums', 'generic'],
    '/albums',
    {
      enabled: false, // Disabled for this example
    }
  );

  // Mutation for creating a new album
  const createAlbumMutation = useCreateAlbum();

  const handleUserFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setUserId(value ? Number(value) : null);
  };

  const handleCreateAlbum = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAlbumTitle.trim()) {
      createAlbumMutation.mutate({
        title: newAlbumTitle,
        userId: userId || 1,
      });
      setNewAlbumTitle('');
    }
  };

  // Determine which query to use based on userId
  const { data: albums, isLoading, isError, error } = userId === null
    ? albumsQuery
    : albumsByUserQuery;

  if (isLoading) return <div>Loading albums...</div>;
  if (isError) return <div className="text-red-500">Error: {error?.message}</div>;

  return (
    <div>
      <div className="mb-6">
        <div className="mb-4">
          <label htmlFor="userFilter" className="block text-sm font-medium mb-1">
            Filter by User ID:
          </label>
          <select
            id="userFilter"
            className="border border-gray-300 rounded-md p-2 w-full max-w-xs dark:bg-gray-800 dark:border-gray-700"
            value={userId || ''}
            onChange={handleUserFilterChange}
          >
            <option value="">All Users</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => (
              <option key={id} value={id}>
                User {id}
              </option>
            ))}
          </select>
        </div>

        <form onSubmit={handleCreateAlbum} className="mb-6">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="New album title"
              className="border border-gray-300 rounded-md p-2 flex-grow dark:bg-gray-800 dark:border-gray-700"
              value={newAlbumTitle}
              onChange={(e) => setNewAlbumTitle(e.target.value)}
            />
            <button
              type="submit"
              className="bg-primary-600 text-white rounded-md px-4 py-2 hover:bg-primary-700 transition"
              disabled={createAlbumMutation.isPending}
            >
              {createAlbumMutation.isPending ? 'Creating...' : 'Create Album'}
            </button>
          </div>
          {createAlbumMutation.isSuccess && (
            <p className="text-green-600 mt-2">
              Album created successfully! (ID: {createAlbumMutation.data?.id})
            </p>
          )}
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {albums?.map((album) => (
          <div
            key={album.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition dark:bg-gray-800 dark:border-gray-700"
          >
            <h2 className="font-medium text-lg mb-2">{album.title}</h2>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>Album ID: {album.id}</p>
              <p>User ID: {album.userId}</p>
            </div>
          </div>
        ))}
      </div>

      {albums && albums.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">No albums found.</p>
      )}
    </div>
  );
};

export default AlbumList;