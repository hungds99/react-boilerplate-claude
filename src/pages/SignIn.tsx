import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Button, Card, Input, Alert } from '@/components/ui'
import { useAuth } from '@/contexts/AuthContext'

const SignIn = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isLoading, error: authError } = useAuth()
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [error, setError] = useState<string | null>(null)

  // Get the redirect path from location state or default to dashboard
  const from = (location.state as any)?.from?.pathname || '/dashboard'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    try {
      await login(formData.email, formData.password)
      // Navigate to the page they tried to visit or dashboard
      navigate(from, { replace: true })
    } catch (err) {
      setError((err as Error).message || 'An unexpected error occurred')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-primary-600 dark:text-primary-400">
            Sign In
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Welcome back! Please sign in to your account.
          </p>
        </div>

        <Card>
          <Card.Body>
            {(error || authError) && (
              <Alert variant="danger" className="mb-6">
                {error || authError}
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  fullWidth
                  autoComplete="email"
                />
              </div>

              <div>
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  fullWidth
                  autoComplete="current-password"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded-sm"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Remember me
                  </label>
                </div>

                <Link to="/forgot-password" className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
                  Forgot your password?
                </Link>
              </div>

              <div>
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  isLoading={isLoading}
                >
                  Sign In
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-xs bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.545 10.239v3.821h5.445c-0.643 2.566-2.596 4.322-5.445 4.322-3.354 0-6-2.691-6-6s2.646-6 6-6c1.469 0 2.913 0.572 3.936 1.512l2.644-2.644c-1.908-1.8-4.489-2.868-6.58-2.868-5.64 0-10 4.36-10 10s4.36 10 10 10c5.789 0 9.885-4.195 9.885-9.975q0-1.042-0.168-1.959l-9.718 0.043z" />
                  </svg>
                </button>

                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-xs bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M13.397 20.997v-8.196h2.765l0.411-3.209h-3.176v-2.051c0-0.926 0.258-1.56 1.587-1.56h1.684v-2.873c-0.321-0.043-1.401-0.145-2.628-0.145-2.61 0-4.411 1.593-4.411 4.511v2.117h-2.946v3.209h2.946v8.196h3.768z" />
                  </svg>
                </button>
              </div>
            </div>
          </Card.Body>
          <Card.Footer>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
                Sign up
              </Link>
            </p>
          </Card.Footer>
        </Card>
      </div>
    </div>
  )
}

export default SignIn