import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ThemeSwitcher from './ThemeSwitcher'
import { Button } from '@/components/ui'
import { useAuth } from '@/contexts/AuthContext'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuth()
  
  // Check if we're on an authentication page
  const isAuthPage = ['/signin', '/signup', '/forgot-password'].includes(location.pathname)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleLogout = () => {
    logout()
    navigate('/signin')
  }

  // Don't render navbar on auth pages
  if (isAuthPage) return null

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
      <div className="container-fluid py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-xl font-bold text-primary-600 dark:text-primary-400">
              React 19 + Tailwind 4
            </Link>
            
            <div className="hidden md:flex items-center space-x-4">
              <Link 
                to="/" 
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                Home
              </Link>
              <Link 
                to="/blog" 
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                Blog
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                About
              </Link>
              <Link 
                to="/features" 
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                Features
              </Link>
              <Link 
                to="/dashboard" 
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                Dashboard
              </Link>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            
            <div className="hidden md:block">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  {user && (
                    <div className="flex items-center mr-2">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="h-8 w-8 rounded-full"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400">
                          {user.name.charAt(0)}
                        </div>
                      )}
                      <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        {user.name}
                      </span>
                    </div>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                  >
                    Log out
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/signin">
                    <Button
                      variant="outline"
                      size="sm"
                    >
                      Sign in
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button
                      variant="primary"
                      size="sm"
                    >
                      Sign up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={toggleMenu}
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label="Menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu, show/hide based on menu state */}
        {isMenuOpen && (
          <div className="md:hidden pt-2 pb-4">
            <div className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className="px-2 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/blog" 
                className="px-2 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                to="/about" 
                className="px-2 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/features" 
                className="px-2 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                to="/dashboard" 
                className="px-2 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <div className="border-t border-gray-200 dark:border-gray-700 my-2 pt-2">
                {isAuthenticated ? (
                  <>
                    {user && (
                      <div className="flex items-center px-2 py-2">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="h-8 w-8 rounded-full"
                          />
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400">
                            {user.name.charAt(0)}
                          </div>
                        )}
                        <span className="ml-2 font-medium text-gray-700 dark:text-gray-300">
                          {user.name}
                        </span>
                      </div>
                    )}
                    <button
                      className="w-full text-left px-2 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => {
                        handleLogout()
                        setIsMenuOpen(false)
                      }}
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/signin" 
                      className="block px-2 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign in
                    </Link>
                    <Link 
                      to="/signup" 
                      className="block px-2 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700 mt-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar