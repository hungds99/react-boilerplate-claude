import { ReactNode, useState } from 'react';

export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  placement?: TooltipPlacement;
  className?: string;
  delay?: number;
  disabled?: boolean;
}

const Tooltip = ({
  children,
  content,
  placement = 'top',
  className = '',
  delay = 300,
  disabled = false,
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTimeout, setShowTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (disabled) return;
    
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    setShowTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (showTimeout) {
      clearTimeout(showTimeout);
      setShowTimeout(null);
    }
    setIsVisible(false);
  };

  const placementStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  };

  const arrowStyles = {
    top: 'left-1/2 -bottom-1 border-l-transparent border-r-transparent border-b-transparent -translate-x-1/2',
    right: 'top-1/2 -left-1 border-t-transparent border-b-transparent border-l-transparent -translate-y-1/2',
    bottom: 'left-1/2 -top-1 border-l-transparent border-r-transparent border-t-transparent -translate-x-1/2',
    left: 'top-1/2 -right-1 border-t-transparent border-b-transparent border-r-transparent -translate-y-1/2',
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {children}
      
      {isVisible && (
        <div
          className={`
            absolute z-50 px-2 py-1 text-sm font-medium text-white bg-gray-900 dark:bg-gray-700
            rounded shadow-sm max-w-xs whitespace-normal
            ${placementStyles[placement]}
            ${className}
          `}
          role="tooltip"
        >
          {content}
          <div 
            className={`
              absolute w-0 h-0
              border border-gray-900 dark:border-gray-700
              ${arrowStyles[placement]}
            `}
          />
        </div>
      )}
    </div>
  );
};

export { Tooltip };
export default Tooltip;