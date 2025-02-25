import { Button, Badge, Alert, Card, Avatar } from '@/components/ui'
import { useState } from 'react'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false)
  
  const handleLoadingDemo = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="container-fluid py-12">
      <header className="mb-12 text-center">
        <div className="inline-block bg-linear-to-r from-primary-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
          v1.0.0
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary-600 to-purple-600 mb-4">
          React 19 + TailwindCSS 4.0.8
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          A modern boilerplate with the latest stable versions of React and Tailwind
        </p>
      </header>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button
          variant="primary"
          size="md"
          onClick={() => window.open('https://github.com', '_blank')}
        >
          GitHub Repository
        </Button>
        
        <Button
          variant="outline"
          size="md"
          onClick={() => window.open('https://tailwindcss.com/docs/installation', '_blank')}
        >
          Tailwind Docs
        </Button>
        
        <Button
          variant="secondary"
          size="md"
          onClick={() => window.open('https://react.dev', '_blank')}
        >
          React Docs
        </Button>
      </div>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <Card.Header>
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400">
              Features
            </h2>
          </Card.Header>
          <Card.Body>
            <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>React 19 with TypeScript</li>
              <li>TailwindCSS 4.0.8</li>
              <li>Dark mode with theme switching</li>
              <li>Component library with variants</li>
              <li>Mobile-responsive layouts</li>
              <li>Custom hooks and utilities</li>
            </ul>
          </Card.Body>
        </Card>
        
        <Card>
          <Card.Header>
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400">
              Interactive Components
            </h2>
          </Card.Header>
          <Card.Body className="space-y-6">
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                Try out the loading state button:
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="primary"
                  isLoading={isLoading}
                  onClick={handleLoadingDemo}
                >
                  Loading Demo
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                >
                  Small Button
                </Button>
                
                <Button
                  variant="ghost"
                  size="lg"
                >
                  Large Button
                </Button>

                <Button
                  variant="secondary"
                  disabled
                >
                  Disabled Button
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                Badge components:
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="primary">Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="info">Info</Badge>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                Avatar components:
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <Avatar size="sm" name="John Doe" />
                <Avatar size="md" name="Jane Smith" />
                <Avatar size="lg" status="online" name="User" />
                <Avatar size="lg" status="away" />
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
      
      <Alert 
        variant="info" 
        title="Getting Started" 
        className="mt-6"
        dismissible
        onDismiss={() => {}}
      >
        <p>This boilerplate includes a collection of UI components to help you build your application faster. Check the documentation for more details.</p>
      </Alert>
      
      <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/10 rounded-lg border border-primary-100 dark:border-primary-800 text-gray-700 dark:text-gray-300">
        <p className="text-center">
          Built with React 19 and TailwindCSS 4.0.8 — Stay up to date with the latest web technologies.
        </p>
      </div>
    </div>
  )
}

export default Home