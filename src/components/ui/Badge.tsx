import { HTMLAttributes, ReactNode } from 'react'

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'
export type BadgeSize = 'sm' | 'md' | 'lg'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  className?: string
  rounded?: boolean
  withDot?: boolean
}

const Badge = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  rounded = false,
  withDot = false,
  ...props 
}: BadgeProps) => {
  const variantClasses = {
    primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300',
    secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
  }

  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1'
  }
  
  const dotColors = {
    primary: 'bg-primary-500',
    secondary: 'bg-gray-500',
    success: 'bg-green-500',
    danger: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  };
  
  return (
    <span
      className={`
        inline-flex items-center font-medium
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${rounded ? 'rounded-full' : 'rounded-md'}
        ${className}
      `}
      {...props}
    >
      {withDot && (
        <span
          className={`
            w-1.5 h-1.5 mr-1.5 rounded-full
            ${dotColors[variant]}
          `}
        />
      )}
      {children}
    </span>
  )
}

export { Badge }
export default Badge