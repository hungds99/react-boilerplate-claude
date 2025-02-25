import { useState } from 'react';

interface ToggleProps {
  label?: string;
  toggled?: boolean;
  onChange?: (checked: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

const Toggle = ({
  label,
  toggled = false,
  onChange,
  size = 'md',
  disabled = false,
  className = '',
}: ToggleProps) => {
  const [isToggled, setIsToggled] = useState(toggled);

  const handleClick = () => {
    if (disabled) return;
    
    const newValue = !isToggled;
    setIsToggled(newValue);
    onChange?.(newValue);
  };

  const sizes = {
    sm: {
      container: 'w-8 h-4',
      circle: 'w-3 h-3',
      translateX: 'translate-x-4',
    },
    md: {
      container: 'w-11 h-6',
      circle: 'w-5 h-5', 
      translateX: 'translate-x-5',
    },
    lg: {
      container: 'w-14 h-7',
      circle: 'w-6 h-6',
      translateX: 'translate-x-7',
    },
  };

  return (
    <div className={`flex items-center ${className}`}>
      {label && (
        <span className="mr-3 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
      )}
      <button
        type="button"
        className={`
          ${sizes[size].container}
          ${isToggled ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          relative inline-flex flex-shrink-0 rounded-full border-2 border-transparent
          transition-colors ease-in-out duration-200
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        `}
        onClick={handleClick}
        aria-pressed={isToggled}
        disabled={disabled}
      >
        <span className="sr-only">Toggle</span>
        <span
          className={`
            ${sizes[size].circle}
            ${isToggled ? sizes[size].translateX : 'translate-x-0'}
            pointer-events-none inline-block rounded-full bg-white shadow
            transform ring-0 transition ease-in-out duration-200
          `}
        />
      </button>
    </div>
  );
};

export { Toggle };
export default Toggle;