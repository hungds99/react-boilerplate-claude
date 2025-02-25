import AlbumList from '@/components/AlbumList'
import DashboardLayout from '@/components/layouts/DashboardLayout'

const Albums = () => {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Albums</h1>
      <AlbumList />
    </DashboardLayout>
  )
}

export default Albums