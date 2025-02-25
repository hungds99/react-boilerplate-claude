import PostList from '@/components/PostList';
import DashboardLayout from '@/components/layouts/DashboardLayout';

const DashboardBlog = () => {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Blog Management</h1>
      <PostList />
    </DashboardLayout>
  );
};

export default DashboardBlog;