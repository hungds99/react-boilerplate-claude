import { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
}

const Card = ({ children, className = '', ...props }: CardProps) => {
  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export interface CardHeaderProps {
  children: ReactNode
  className?: string
}

const CardHeader = ({ children, className = '' }: CardHeaderProps) => {
  return (
    <div className={`p-6 border-b border-gray-200 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  )
}

export interface CardBodyProps {
  children: ReactNode
  className?: string
}

const CardBody = ({ children, className = '' }: CardBodyProps) => {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  )
}

export interface CardFooterProps {
  children: ReactNode
  className?: string
}

const CardFooter = ({ children, className = '' }: CardFooterProps) => {
  return (
    <div className={`p-6 border-t border-gray-200 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  )
}

Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter

export { Card }
export default Card