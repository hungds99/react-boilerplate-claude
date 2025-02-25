import { ReactNode } from 'react'
import Navbar from '@/components/Navbar'

interface HomeLayoutProps {
  children: ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="grow">{children}</main>
      <footer className="bg-gray-100 dark:bg-gray-800 py-6">
        <div className="container-fluid text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} React Boilerplate. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default HomeLayout