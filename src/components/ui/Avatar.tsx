import { HTMLAttributes } from 'react'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy'

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  name?: string
  size?: AvatarSize
  status?: AvatarStatus
  className?: string
  fallback?: string
  bordered?: boolean
  square?: boolean
  group?: boolean
}

const Avatar = ({
  src,
  alt = 'Avatar',
  name,
  size = 'md',
  status,
  className = '',
  fallback,
  bordered = false,
  square = false,
  group = false,
  ...props
}: AvatarProps) => {
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl'
  }

  const statusClasses = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500'
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2)
  }

  const renderAvatar = () => {
    if (src) {
      return (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.onerror = null
            target.src = fallback || ''
          }}
        />
      )
    }

    if (name) {
      return (
        <div className="flex items-center justify-center w-full h-full bg-primary-500 text-white">
          {getInitials(name)}
        </div>
      )
    }

    // Default fallback
    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-1/2 h-1/2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      </div>
    )
  }

  return (
    <div 
      className={`
        relative inline-block overflow-hidden
        ${square ? 'rounded-md' : 'rounded-full'}
        ${bordered ? 'ring-2 ring-white dark:ring-gray-800' : ''}
        ${group ? '-ml-2 first:ml-0 hover:z-10 border-2 border-white dark:border-gray-800' : ''}
        ${sizeClasses[size]}
        ${className}
      `}
      {...props}
    >
      {renderAvatar()}
      
      {status && (
        <span 
          className={`
            absolute bottom-0 right-0 block rounded-full ring-2 ring-white dark:ring-gray-800
            ${statusClasses[status]}
            ${size === 'xs' ? 'w-1.5 h-1.5' : ''}
            ${size === 'sm' ? 'w-2 h-2' : ''}
            ${size === 'md' ? 'w-2.5 h-2.5' : ''}
            ${size === 'lg' ? 'w-3 h-3' : ''}
            ${size === 'xl' ? 'w-4 h-4' : ''}
          `}
        />
      )}
    </div>
  )
}

export { Avatar }
export default Avatar