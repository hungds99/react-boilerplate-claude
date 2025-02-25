import { useState } from 'react'
import { Card, Badge, Button, Alert } from '@/components/ui'
import { Link } from 'react-router-dom'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import { 
  Chart as ChartIcon, 
  Users as UsersIcon, 
  ShoppingCart as CartIcon, 
  CreditCard as CreditCardIcon,
  ArrowUp as ArrowUpIcon,
  ArrowDown as ArrowDownIcon,
  Bell as BellIcon
} from '@/components/ui/icons'

// Mock data
const stats = [
  { 
    id: 1, 
    title: 'Total Revenue', 
    value: '$45,231.89', 
    change: '+20.1%', 
    isIncreasing: true, 
    timeRange: 'from last month',
    icon: <CreditCardIcon className="w-6 h-6" />
  },
  { 
    id: 2, 
    title: 'New Customers', 
    value: '2,338', 
    change: '+10.1%', 
    isIncreasing: true, 
    timeRange: 'from last month',
    icon: <UsersIcon className="w-6 h-6" />
  },
  { 
    id: 3, 
    title: 'Active Sessions', 
    value: '1,219', 
    change: '+12.2%', 
    isIncreasing: true, 
    timeRange: 'from last month',
    icon: <ChartIcon className="w-6 h-6" />
  },
  { 
    id: 4, 
    title: 'Pending Orders', 
    value: '54', 
    change: '-4.5%', 
    isIncreasing: false, 
    timeRange: 'from last month',
    icon: <CartIcon className="w-6 h-6" />
  }
]

const recentTransactions = [
  { id: 1, customer: 'John Doe', amount: '$250.00', status: 'completed', date: '2023-11-10' },
  { id: 2, customer: 'Jane Smith', amount: '$120.00', status: 'processing', date: '2023-11-09' },
  { id: 3, customer: 'Robert Johnson', amount: '$350.00', status: 'completed', date: '2023-11-08' },
  { id: 4, customer: 'Emily Davis', amount: '$80.00', status: 'failed', date: '2023-11-07' },
  { id: 5, customer: 'Michael Wilson', amount: '$420.00', status: 'completed', date: '2023-11-06' }
]

const StatusBadge = ({ status }: { status: string }) => {
  const variantMap: Record<string, { variant: 'success' | 'warning' | 'danger', label: string }> = {
    completed: { variant: 'success', label: 'Completed' },
    processing: { variant: 'warning', label: 'Processing' },
    failed: { variant: 'danger', label: 'Failed' }
  }
  
  const { variant, label } = variantMap[status] || { variant: 'secondary', label: status }
  
  return <Badge variant={variant}>{label}</Badge>
}

const Dashboard = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New order received', read: false },
    { id: 2, message: 'Customer request pending', read: false }
  ])
  const [showNotifications, setShowNotifications] = useState(false)
  
  const unreadNotificationsCount = notifications.filter(n => !n.read).length
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }
  
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome back, Admin!</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <button 
              className="relative p-2 rounded-full bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <BellIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-0 right-0 h-5 w-5 flex items-center justify-center text-xs text-white bg-red-500 rounded-full transform translate-x-1/3 -translate-y-1/3">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2 z-10 border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium">Notifications</h3>
                  {unreadNotificationsCount > 0 && (
                    <button 
                      className="text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                      onClick={markAllAsRead}
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="text-gray-500 py-4 text-center text-sm">No notifications</p>
                  ) : (
                    notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                      >
                        <p className="text-sm text-gray-800 dark:text-gray-200">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">Just now</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
          
          <Link to="/dashboard/settings">
            <Button variant="outline" size="sm">
              Settings
            </Button>
          </Link>
        </div>
      </div>
      
      <Alert variant="info" dismissible className="mb-6">
        <p>Welcome to your new dashboard! Here you can view your stats, recent orders, and more.</p>
      </Alert>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map(stat => (
          <Card key={stat.id}>
            <Card.Body>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <div className="p-3 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">
                  {stat.icon}
                </div>
              </div>
              <div className="flex items-center mt-4">
                <span className={`text-sm font-medium flex items-center ${stat.isIncreasing ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {stat.isIncreasing ? (
                    <ArrowUpIcon className="w-4 h-4 mr-1" />
                  ) : (
                    <ArrowDownIcon className="w-4 h-4 mr-1" />
                  )}
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">{stat.timeRange}</span>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <Card.Header>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Transactions</h2>
              <Link to="/dashboard/transactions">
                <Button variant="ghost" size="sm">
                  View all
                </Button>
              </Link>
            </div>
          </Card.Header>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {recentTransactions.map(transaction => (
                  <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{transaction.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{transaction.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <StatusBadge status={transaction.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{transaction.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        
        <Card>
          <Card.Header>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Quick Actions</h2>
          </Card.Header>
          <Card.Body>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button>
                  <CartIcon className="w-4 h-4 mr-2" />
                  New Order
                </Button>
                <Button variant="outline">
                  <UsersIcon className="w-4 h-4 mr-2" />
                  Add Customer
                </Button>
              </div>
              <div>
                <div className="mb-2 flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Pending Tasks</h3>
                  <Badge variant="primary">3</Badge>
                </div>
                <Card className="!bg-gray-50 dark:!bg-gray-700">
                  <Card.Body className="p-4">
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">Review new orders</span>
                      </li>
                      <li className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">Prepare monthly report</span>
                      </li>
                      <li className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">Update inventory status</span>
                      </li>
                    </ul>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </Card.Body>
          <Card.Footer className="bg-gray-50 dark:bg-gray-800">
            <Link 
              to="/dashboard/reports" 
              className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
            >
              View full analytics →
            </Link>
          </Card.Footer>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard