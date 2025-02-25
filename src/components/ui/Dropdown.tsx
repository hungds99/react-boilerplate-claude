import { ReactNode, useEffect, useRef, useState } from 'react';

export interface DropdownOption {
  id: string | number;
  label: ReactNode;
  value: any;
  disabled?: boolean;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: any;
  onChange?: (value: any, option: DropdownOption) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
  fullWidth?: boolean;
}

const Dropdown = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  disabled = false,
  error,
  className = '',
  fullWidth = false,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(
    options.find(option => option.value === value) || null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update selected option when value prop changes
  useEffect(() => {
    const option = options.find(option => option.value === value);
    if (option) {
      setSelectedOption(option);
    }
  }, [value, options]);

  const handleSelect = (option: DropdownOption) => {
    if (option.disabled) return;
    
    setSelectedOption(option);
    setIsOpen(false);
    onChange?.(option.value, option);
  };

  return (
    <div className={`relative ${fullWidth ? 'w-full' : ''} ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      
      <button
        type="button"
        className={`
          flex justify-between items-center w-full px-4 py-2 text-left
          bg-white dark:bg-gray-700 border rounded-md shadow-sm
          ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${fullWidth ? 'w-full' : ''}
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
        `}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={`block truncate ${!selectedOption ? 'text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-gray-100'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`h-5 w-5 text-gray-400 ${isOpen ? 'transform rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <ul
          className="
            absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 shadow-lg
            max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5
            overflow-auto focus:outline-none sm:text-sm
          "
          role="listbox"
        >
          {options.map((option) => (
            <li
              key={option.id}
              className={`
                relative py-2 pl-3 pr-9 cursor-pointer
                ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-100 dark:hover:bg-primary-800/30'}
                ${selectedOption?.id === option.id ? 'bg-primary-50 dark:bg-primary-800/20' : ''}
              `}
              onClick={() => handleSelect(option)}
              role="option"
              aria-selected={selectedOption?.id === option.id}
            >
              <span className={`block truncate ${selectedOption?.id === option.id ? 'font-medium' : 'font-normal'}`}>
                {option.label}
              </span>
              
              {selectedOption?.id === option.id && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary-600 dark:text-primary-400">
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export { Dropdown };
export default Dropdown;