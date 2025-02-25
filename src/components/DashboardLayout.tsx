import { useState, useEffect, ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ThemeSwitcher from './ThemeSwitcher'
import { Avatar } from '@/components/ui'

// Import icons
import { 
  Menu as MenuIcon,
  Home as HomeIcon,
  ShoppingCart as CartIcon,
  Users as UsersIcon,
  Settings as SettingsIcon,
  LogOut as LogOutIcon,
  ChevronDown as ChevronDownIcon,
  ChevronRight as ChevronRightIcon,
  BarChart as ChartIcon,
  Image as ImageIcon,
  FileText as FileTextIcon
} from '@/components/ui/icons'

interface SidebarItemProps {
  icon: ReactNode
  label: string
  to: string
  active?: boolean
  count?: number
  children?: { label: string; to: string }[]
}

// Individual sidebar item component
const SidebarItem = ({ icon, label, to, active, count, children }: SidebarItemProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const hasChildren = children && children.length > 0
  const location = useLocation()
  
  useEffect(() => {
    // Open the dropdown if any child is active
    if (hasChildren && children?.some(child => location.pathname === child.to)) {
      setIsOpen(true)
    }
  }, [location.pathname, hasChildren, children])
  
  return (
    <div>
      <Link
        to={hasChildren ? '#' : to}
        className={`
          flex items-center p-2 rounded-md my-1
          ${active || (hasChildren && isOpen) 
            ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300' 
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}
        `}
        onClick={(e) => {
          if (hasChildren) {
            e.preventDefault()
            setIsOpen(!isOpen)
          }
        }}
      >
        <span className="w-5 h-5 mr-3">{icon}</span>
        <span className="grow">{label}</span>
        {count !== undefined && (
          <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-medium text-white bg-primary-600 rounded-full">
            {count}
          </span>
        )}
        {hasChildren && (
          <span className="ml-2">
            {isOpen ? (
              <ChevronDownIcon className="w-4 h-4" />
            ) : (
              <ChevronRightIcon className="w-4 h-4" />
            )}
          </span>
        )}
      </Link>
      
      {hasChildren && isOpen && (
        <div className="ml-6 my-1 space-y-1">
          {children.map((child, index) => (
            <Link
              key={index}
              to={child.to}
              className={`
                flex items-center p-2 rounded-md text-sm
                ${location.pathname === child.to
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}
              `}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

interface DashboardLayoutProps {
  children: ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  }
  
  const handleLogout = () => {
    // Implement logout logic here
    navigate('/signin')
  }

  // Close mobile sidebar when location changes
  useEffect(() => {
    setIsMobileSidebarOpen(false)
  }, [location.pathname])
  
  const sidebarItems = [
    {
      icon: <HomeIcon />,
      label: 'Dashboard',
      to: '/dashboard',
      active: location.pathname === '/dashboard'
    },
    {
      icon: <ImageIcon />,
      label: 'Albums',
      to: '/dashboard/albums',
      active: location.pathname === '/dashboard/albums'
    },
    {
      icon: <FileTextIcon />,
      label: 'Blog',
      to: '/dashboard/blog',
      active: location.pathname === '/dashboard/blog'
    },
    {
      icon: <CartIcon />,
      label: 'Orders',
      to: '/dashboard/orders',
      active: location.pathname === '/dashboard/orders',
      count: 5,
      children: [
        { label: 'All Orders', to: '/dashboard/orders' },
        { label: 'Pending', to: '/dashboard/orders/pending' },
        { label: 'Completed', to: '/dashboard/orders/completed' }
      ]
    },
    {
      icon: <UsersIcon />,
      label: 'Customers',
      to: '/dashboard/customers',
      active: location.pathname === '/dashboard/customers'
    },
    {
      icon: <ChartIcon />,
      label: 'Reports',
      to: '/dashboard/reports',
      active: location.pathname === '/dashboard/reports'
    },
    {
      icon: <SettingsIcon />,
      label: 'Settings',
      to: '/dashboard/settings',
      active: location.pathname === '/dashboard/settings'
    }
  ]
  
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar for desktop */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-20 flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'w-64' : 'w-20'} 
          transform md:translate-x-0
          -translate-x-full md:relative
        `}
      >
        <div className={`p-4 flex items-center justify-between ${isSidebarOpen ? 'border-b border-gray-200 dark:border-gray-700' : ''}`}>
          <Link to="/dashboard" className={`flex items-center ${isSidebarOpen ? '' : 'justify-center w-full'}`}>
            <div className="h-8 w-8 rounded-md bg-primary-600 flex items-center justify-center text-white font-bold text-lg">D</div>
            {isSidebarOpen && <span className="ml-2 text-lg font-medium text-gray-900 dark:text-white">Dashboard</span>}
          </Link>
          
          <button 
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 md:block hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div className="grow px-4 py-4 overflow-y-auto">
          <nav className="space-y-1">
            {sidebarItems.map((item, index) => (
              <SidebarItem
                key={index}
                icon={item.icon}
                label={isSidebarOpen ? item.label : ''}
                to={item.to}
                active={item.active}
                count={item.count}
                children={isSidebarOpen ? item.children : undefined}
              />
            ))}
          </nav>
        </div>
        
        <div className={`p-4 border-t border-gray-200 dark:border-gray-700 ${isSidebarOpen ? '' : 'flex justify-center'}`}>
          {isSidebarOpen ? (
            <div className="flex items-center">
              <Avatar 
                src={user.avatar} 
                alt={user.name} 
                size="sm"
                status="online"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
              </div>
            </div>
          ) : (
            <Avatar 
              src={user.avatar} 
              alt={user.name} 
              size="sm" 
              status="online"
            />
          )}
        </div>
      </aside>
      
      {/* Mobile sidebar backdrop */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 z-10 bg-gray-900 bg-opacity-50 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        ></div>
      )}
      
      {/* Mobile sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-20 flex flex-col w-64 bg-white dark:bg-gray-800 transition-all duration-300 ease-in-out
          md:hidden
          ${isMobileSidebarOpen ? 'transform translate-x-0' : 'transform -translate-x-full'}
        `}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
          <Link to="/dashboard" className="flex items-center">
            <div className="h-8 w-8 rounded-md bg-primary-600 flex items-center justify-center text-white font-bold text-lg">D</div>
            <span className="ml-2 text-lg font-medium text-gray-900 dark:text-white">Dashboard</span>
          </Link>
          
          <button 
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setIsMobileSidebarOpen(false)}
          >
            <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div className="grow px-4 py-4 overflow-y-auto">
          <nav className="space-y-1">
            {sidebarItems.map((item, index) => (
              <SidebarItem
                key={index}
                icon={item.icon}
                label={item.label}
                to={item.to}
                active={item.active}
                count={item.count}
                children={item.children}
              />
            ))}
          </nav>
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Avatar 
              src={user.avatar} 
              alt={user.name} 
              size="sm"
              status="online"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="px-4 py-4 flex items-center justify-between">
            <div className="flex items-center md:hidden">
              <button
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-hidden"
                onClick={() => setIsMobileSidebarOpen(true)}
              >
                <MenuIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            
            <div className="ml-auto flex items-center space-x-4">
              <ThemeSwitcher />
              
              <button
                className="flex items-center text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                onClick={handleLogout}
              >
                <LogOutIcon className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout