import { ReactNode, useState } from 'react';

export interface Tab {
  id: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  defaultTabId?: string;
  onChange?: (tabId: string) => void;
  className?: string;
  variant?: 'default' | 'bordered' | 'pills';
}

const Tabs = ({
  tabs,
  defaultTabId,
  onChange,
  className = '',
  variant = 'default',
}: TabsProps) => {
  const [activeTabId, setActiveTabId] = useState(defaultTabId || tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId);
    onChange?.(tabId);
  };

  const variantStyles = {
    default: {
      tabList: 'border-b border-gray-200 dark:border-gray-700',
      tab: (isActive: boolean, isDisabled: boolean) => `
        pb-3 px-1 border-b-2 
        ${isActive 
          ? 'border-primary-500 text-primary-600 dark:text-primary-400' 
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
        }
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `,
    },
    bordered: {
      tabList: 'flex',
      tab: (isActive: boolean, isDisabled: boolean) => `
        py-2 px-4 border-t border-l border-r 
        ${isActive 
          ? 'border-gray-200 dark:border-gray-700 rounded-t-md bg-white dark:bg-gray-800 -mb-px text-primary-600 dark:text-primary-400' 
          : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
        }
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `,
    },
    pills: {
      tabList: 'flex space-x-2',
      tab: (isActive: boolean, isDisabled: boolean) => `
        py-2 px-4 rounded-full 
        ${isActive 
          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300' 
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800'
        }
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `,
    },
  };

  return (
    <div className={className}>
      <div className={`${variantStyles[variant].tabList}`}>
        <nav className="flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${variantStyles[variant].tab(
                activeTabId === tab.id,
                !!tab.disabled
              )} font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
              onClick={() => !tab.disabled && handleTabChange(tab.id)}
              disabled={tab.disabled}
              aria-current={activeTabId === tab.id ? 'page' : undefined}
              role="tab"
              aria-selected={activeTabId === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-4">
        {tabs.find((tab) => tab.id === activeTabId)?.content}
      </div>
    </div>
  );
};

export { Tabs };
export default Tabs;