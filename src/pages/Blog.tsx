import PostList from '@/components/PostList';
import HomeLayout from '@/components/layouts/HomeLayout';

const Blog = () => {
  return (
    <HomeLayout>
      <div className="container-fluid py-8">
        <h1 className="text-3xl font-bold mb-6 text-primary-600">Blog</h1>
        <PostList />
      </div>
    </HomeLayout>
  );
};

export default Blog;