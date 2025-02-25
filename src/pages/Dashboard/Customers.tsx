import { useState } from 'react'
import { Card, Badge, Button, Input, Avatar } from '@/components/ui'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import { Search, Filter, Add, Edit, Delete } from '@/components/ui/icons'

// Mock data
const mockCustomers = [
  { 
    id: 1, 
    name: 'John Doe', 
    email: 'john@example.com', 
    status: 'active',
    lastOrder: '2023-11-05',
    totalOrders: 12,
    totalSpent: '$1,245.89'
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    email: 'jane@example.com', 
    status: 'active',
    lastOrder: '2023-11-12',
    totalOrders: 8,
    totalSpent: '$945.20'
  },
  { 
    id: 3, 
    name: 'Robert Johnson', 
    email: 'robert@example.com', 
    status: 'inactive',
    lastOrder: '2023-10-22',
    totalOrders: 2,
    totalSpent: '$129.99'
  },
  { 
    id: 4, 
    name: 'Emily Williams', 
    email: 'emily@example.com', 
    status: 'active',
    lastOrder: '2023-11-15',
    totalOrders: 5,
    totalSpent: '$475.50'
  },
  { 
    id: 5, 
    name: 'Michael Brown', 
    email: 'michael@example.com', 
    status: 'blocked',
    lastOrder: '2023-09-30',
    totalOrders: 3,
    totalSpent: '$321.75'
  },
  { 
    id: 6, 
    name: 'Sarah Miller', 
    email: 'sarah@example.com', 
    status: 'active',
    lastOrder: '2023-11-11',
    totalOrders: 7,
    totalSpent: '$689.30'
  },
]

const StatusBadge = ({ status }: { status: string }) => {
  const variantMap: Record<string, { variant: 'success' | 'warning' | 'danger' | 'secondary', label: string }> = {
    active: { variant: 'success', label: 'Active' },
    inactive: { variant: 'warning', label: 'Inactive' },
    blocked: { variant: 'danger', label: 'Blocked' }
  }
  
  const { variant, label } = variantMap[status] || { variant: 'secondary', label: status }
  
  return <Badge variant={variant}>{label}</Badge>
}

const Customers = () => {
  const [customers, setCustomers] = useState(mockCustomers)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  
  // Filter and search
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = selectedStatus === 'all' || customer.status === selectedStatus
    
    return matchesSearch && matchesStatus
  })
  
  const handleDeleteCustomer = (id: number) => {
    setCustomers(customers.filter(customer => customer.id !== id))
  }
  
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Customers</h1>
        <Button>
          <Add className="w-4 h-4 mr-2" />
          Add Customer
        </Button>
      </div>
      
      <Card className="mb-6">
        <Card.Body className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                fullWidth
              />
            </div>
            
            <div className="flex gap-4">
              <div className="w-48">
                <select
                  className="block w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="blocked">Blocked</option>
                </select>
              </div>
              
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
      
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Last Order
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Total Orders
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Total Spent
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    No customers found
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Avatar name={customer.name} size="sm" />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {customer.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {customer.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={customer.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {customer.lastOrder}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {customer.totalOrders}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {customer.totalSpent}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button 
                          className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300"
                          aria-label="Edit customer"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          onClick={() => handleDeleteCustomer(customer.id)}
                          aria-label="Delete customer"
                        >
                          <Delete className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
          <div className="flex-1 flex justify-between sm:hidden">
            <Button variant="outline" size="sm">Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredCustomers.length}</span> of{' '}
                <span className="font-medium">{filteredCustomers.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <Button variant="outline" size="sm" className="rounded-l-md">
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="rounded-r-md ml-2">
                  Next
                </Button>
              </nav>
            </div>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  )
}

export default Customers