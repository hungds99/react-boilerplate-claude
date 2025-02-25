import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Suspense, lazy } from 'react'

// Layouts
import HomeLayout from '@/components/layouts/HomeLayout'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'

// Pages - Eager loaded
import Home from '@/pages/Home'

// Pages - Lazy loaded
const SignIn = lazy(() => import('@/pages/SignIn'))
const SignUp = lazy(() => import('@/pages/SignUp'))
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Customers = lazy(() => import('@/pages/Dashboard/Customers'))
const Albums = lazy(() => import('@/pages/Dashboard/Albums'))

// Loading fallback
const PageLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 dark:border-primary-400"></div>
  </div>
)

// Auth Layout without navbar/footer
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

// Auth Guard - Redirects to login if not authenticated
const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  
  if (isLoading) {
    return <PageLoading />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<PageLoading />}>
          <Routes>
            {/* Auth routes */}
            <Route path="/signin" element={<AuthLayout><SignIn /></AuthLayout>} />
            <Route path="/signup" element={<AuthLayout><SignUp /></AuthLayout>} />
            <Route path="/forgot-password" element={<AuthLayout><ForgotPassword /></AuthLayout>} />
            
            {/* Dashboard routes - protected with auth guard */}
            <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
            <Route path="/dashboard/customers" element={<RequireAuth><Customers /></RequireAuth>} />
            <Route path="/dashboard/albums" element={<RequireAuth><Albums /></RequireAuth>} />
            <Route path="/dashboard/orders" element={
              <RequireAuth>
                <div>Orders Page (Coming soon)</div>
              </RequireAuth>
            } />
            <Route path="/dashboard/settings" element={
              <RequireAuth>
                <div>Settings Page (Coming soon)</div>
              </RequireAuth>
            } />
            
            {/* Home routes with navbar/footer */}
            <Route path="/" element={<HomeLayout><Home /></HomeLayout>} />
            <Route path="/about" element={
              <HomeLayout>
                <div className="container-fluid py-12">
                  <h1 className="text-3xl font-bold text-primary-600">About Page</h1>
                </div>
              </HomeLayout>
            } />
            <Route path="/features" element={
              <HomeLayout>
                <div className="container-fluid py-12">
                  <h1 className="text-3xl font-bold text-primary-600">Features Page</h1>
                </div>
              </HomeLayout>
            } />
            
            {/* 404 route */}
            <Route path="*" element={
              <HomeLayout>
                <div className="container-fluid py-12 text-center">
                  <h1 className="text-4xl font-bold text-primary-600 mb-4">404 - Page Not Found</h1>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    The page you are looking for doesn't exist or has been moved.
                  </p>
                </div>
              </HomeLayout>
            } />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  )
}

export default App