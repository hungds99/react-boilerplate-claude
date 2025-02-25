import { useParams, Link } from 'react-router-dom';
import { usePost, usePostComments } from '@/hooks/usePosts';

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const postId = parseInt(id || '0', 10);

  const { 
    data: post,
    isLoading: isLoadingPost,
    isError: isPostError,
    error: postError
  } = usePost(postId);

  const {
    data: comments,
    isLoading: isLoadingComments,
    isError: isCommentsError,
    error: commentsError
  } = usePostComments(postId);

  if (isLoadingPost) return <div>Loading post...</div>;
  if (isPostError) return <div className="text-red-500">Error loading post: {postError?.message}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div>
      <div className="mb-4">
        <Link 
          to="/blog" 
          className="text-primary-600 hover:underline flex items-center gap-1 dark:text-primary-400"
        >
          ← Back to Posts
        </Link>
      </div>

      <div className="border border-gray-200 rounded-lg p-6 mb-8 dark:bg-gray-800 dark:border-gray-700">
        <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
        <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          Post by User #{post.userId}
        </div>
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{post.body}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        
        {isLoadingComments && <div>Loading comments...</div>}
        {isCommentsError && (
          <div className="text-red-500">Error loading comments: {commentsError?.message}</div>
        )}

        <div className="space-y-4">
          {comments?.map(comment => (
            <div 
              key={comment.id} 
              className="border border-gray-200 rounded-lg p-4 dark:bg-gray-800 dark:border-gray-700"
            >
              <h3 className="font-medium">{comment.name}</h3>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{comment.email}</div>
              <p className="text-gray-700 dark:text-gray-300">{comment.body}</p>
            </div>
          ))}
        </div>

        {comments && comments.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default PostDetail;