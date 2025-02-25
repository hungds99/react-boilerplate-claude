import { ReactNode, useState } from 'react';

export interface AccordionItem {
  id: string;
  title: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultExpandedId?: string;
  allowMultiple?: boolean;
  className?: string;
  bordered?: boolean;
  iconPosition?: 'left' | 'right';
}

const Accordion = ({
  items,
  defaultExpandedId,
  allowMultiple = false,
  className = '',
  bordered = true,
  iconPosition = 'right',
}: AccordionProps) => {
  const [expandedIds, setExpandedIds] = useState<string[]>(
    defaultExpandedId ? [defaultExpandedId] : []
  );

  const toggleItem = (id: string) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter(itemId => itemId !== id));
    } else {
      if (allowMultiple) {
        setExpandedIds([...expandedIds, id]);
      } else {
        setExpandedIds([id]);
      }
    }
  };

  return (
    <div className={`divide-y divide-gray-200 dark:divide-gray-700 ${bordered ? 'border border-gray-200 dark:border-gray-700 rounded-md' : ''} ${className}`}>
      {items.map((item) => {
        const isExpanded = expandedIds.includes(item.id);
        return (
          <div key={item.id} className="overflow-hidden">
            <button
              type="button"
              className={`
                flex items-center justify-between w-full
                py-4 px-5 text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800'}
              `}
              onClick={() => !item.disabled && toggleItem(item.id)}
              aria-expanded={isExpanded}
              disabled={item.disabled}
            >
              {iconPosition === 'left' && (
                <svg
                  className={`w-5 h-5 mr-2 text-gray-500 dark:text-gray-400 transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
              
              <span className="flex-1 font-medium text-gray-900 dark:text-gray-100">{item.title}</span>
              
              {iconPosition === 'right' && (
                <svg
                  className={`w-5 h-5 ml-2 text-gray-500 dark:text-gray-400 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>
            
            <div
              className={`
                transition-all duration-300 ease-in-out
                ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}
              `}
            >
              <div className="px-5 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export { Accordion };
export default Accordion;