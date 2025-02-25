import PostDetail from '@/components/PostDetail';
import HomeLayout from '@/components/layouts/HomeLayout';

const BlogPost = () => {
  return (
    <HomeLayout>
      <div className="container-fluid py-8">
        <PostDetail />
      </div>
    </HomeLayout>
  );
};

export default BlogPost;