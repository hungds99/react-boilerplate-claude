import { useState } from 'react';
import { usePosts, usePostsByUser, useCreatePost } from '@/hooks/usePosts';
import { Post } from '@/types/api';
import { Link } from 'react-router-dom';

const PostList = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');

  // Using the specific post hooks
  const postsQuery = usePosts({
    enabled: userId === null,
  });

  // Using the posts by user hook
  const postsByUserQuery = usePostsByUser(userId || 1, {
    enabled: userId !== null,
  });

  // Mutation for creating a new post
  const createPostMutation = useCreatePost();

  const handleUserFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setUserId(value ? Number(value) : null);
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPostTitle.trim() && newPostBody.trim()) {
      createPostMutation.mutate({
        title: newPostTitle,
        body: newPostBody,
        userId: userId || 1,
      });
      setNewPostTitle('');
      setNewPostBody('');
    }
  };

  // Determine which query to use based on userId
  const { data: posts, isLoading, isError, error } = userId === null
    ? postsQuery
    : postsByUserQuery;

  if (isLoading) return <div>Loading posts...</div>;
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

        <form onSubmit={handleCreatePost} className="mb-6 p-4 border border-gray-200 rounded-lg dark:border-gray-700">
          <h2 className="text-lg font-medium mb-3">Create New Post</h2>
          <div className="space-y-3">
            <div>
              <label htmlFor="postTitle" className="block text-sm font-medium mb-1">
                Title:
              </label>
              <input
                id="postTitle"
                type="text"
                placeholder="Post title"
                className="border border-gray-300 rounded-md p-2 w-full dark:bg-gray-800 dark:border-gray-700"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="postBody" className="block text-sm font-medium mb-1">
                Content:
              </label>
              <textarea
                id="postBody"
                placeholder="Post content"
                rows={4}
                className="border border-gray-300 rounded-md p-2 w-full dark:bg-gray-800 dark:border-gray-700"
                value={newPostBody}
                onChange={(e) => setNewPostBody(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-primary-600 text-white rounded-md px-4 py-2 hover:bg-primary-700 transition"
              disabled={createPostMutation.isPending}
            >
              {createPostMutation.isPending ? 'Creating...' : 'Create Post'}
            </button>
          </div>
          {createPostMutation.isSuccess && (
            <p className="text-green-600 mt-2">
              Post created successfully! (ID: {createPostMutation.data?.id})
            </p>
          )}
        </form>
      </div>

      <div className="space-y-6">
        {posts?.map((post) => (
          <div
            key={post.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition dark:bg-gray-800 dark:border-gray-700"
          >
            <h2 className="font-medium text-xl mb-2">
              <Link 
                to={`/blog/${post.id}`} 
                className="text-primary-600 hover:underline dark:text-primary-400"
              >
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">{post.body}</p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>Post ID: {post.id}</p>
              <p>User ID: {post.userId}</p>
            </div>
          </div>
        ))}
      </div>

      {posts && posts.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">No posts found.</p>
      )}
    </div>
  );
};

export default PostList;