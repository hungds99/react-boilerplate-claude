import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Input, Alert } from '@/components/ui'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // For demo purposes, always succeed
      setIsSubmitted(true)
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-primary-600 dark:text-primary-400">
            Forgot Password
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Enter your email to reset your password
          </p>
        </div>

        <Card>
          <Card.Body>
            {error && (
              <Alert variant="danger" className="mb-6">
                {error}
              </Alert>
            )}

            {isSubmitted ? (
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Check your email</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  We've sent a password reset link to <span className="font-medium">{email}</span>.
                  Please check your inbox and follow the instructions.
                </p>
                <div className="mt-6">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => setIsSubmitted(false)}
                  >
                    Try another email
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    fullWidth
                    autoComplete="email"
                  />
                </div>

                <div>
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    isLoading={isLoading}
                  >
                    Reset Password
                  </Button>
                </div>
              </form>
            )}
          </Card.Body>
          <Card.Footer>
            <div className="flex justify-between items-center">
              <Link to="/signin" className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
                <span className="flex items-center">
                  <svg className="mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Back to sign in
                </span>
              </Link>
              <Link to="/signup" className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
                Create an account
              </Link>
            </div>
          </Card.Footer>
        </Card>
      </div>
    </div>
  )
}

export default ForgotPassword