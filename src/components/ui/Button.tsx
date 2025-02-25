import { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  fullWidth?: boolean
  isLoading?: boolean
}

const Button = ({ 
  children, 
  variant = 'primary',
  size = 'md',
  className = '',
  fullWidth = false,
  isLoading = false,
  disabled = false,
  ...props 
}: ButtonProps) => {
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400',
    info: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400',
    outline: 'border border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20',
    ghost: 'text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20'
  }

  const sizeClasses = {
    sm: 'text-sm py-1 px-3',
    md: 'px-4 py-2',
    lg: 'text-lg py-3 px-6'
  }
  
  return (
    <button
      className={`
        btn
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${isLoading ? 'opacity-70 cursor-wait' : ''}
        ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  )
}

export { Button }
export default Button