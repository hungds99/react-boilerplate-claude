import { ReactNode } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  showFirstLast?: boolean;
  size?: 'sm' | 'md' | 'lg';
  maxDisplayed?: number;
  prevLabel?: ReactNode;
  nextLabel?: ReactNode;
  firstLabel?: ReactNode;
  lastLabel?: ReactNode;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
  showFirstLast = false,
  size = 'md',
  maxDisplayed = 5,
  prevLabel = '←',
  nextLabel = '→',
  firstLabel = '«',
  lastLabel = '»',
}: PaginationProps) => {
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    
    // Calculate how many pages to show before and after current page
    const sidePages = Math.floor(maxDisplayed / 2);
    
    let startPage = Math.max(1, currentPage - sidePages);
    let endPage = Math.min(totalPages, currentPage + sidePages);
    
    // Adjust if we're near the start or end
    if (currentPage <= sidePages) {
      endPage = Math.min(totalPages, maxDisplayed);
    }
    
    if (currentPage + sidePages >= totalPages) {
      startPage = Math.max(1, totalPages - maxDisplayed + 1);
    }
    
    // Add ellipsis at the beginning if needed
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }
    
    // Add pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    // Add ellipsis at the end if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }
    
    return pages;
  };

  const sizeClasses = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
  };

  const pages = generatePageNumbers();

  if (totalPages <= 1) return null;

  return (
    <nav
      className={`flex justify-center ${className}`}
      aria-label="Pagination"
    >
      <ul className="flex items-center -space-x-px">
        {showFirstLast && (
          <li>
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className={`
                ${sizeClasses[size]}
                flex items-center justify-center
                rounded-l-md border border-gray-300 dark:border-gray-600
                bg-white dark:bg-gray-800 
                text-gray-500 dark:text-gray-400
                ${currentPage === 1 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'}
              `}
              aria-label="Go to first page"
            >
              {firstLabel}
            </button>
          </li>
        )}
        
        <li>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`
              ${sizeClasses[size]}
              flex items-center justify-center
              ${!showFirstLast ? 'rounded-l-md' : ''}
              border border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-800 
              text-gray-500 dark:text-gray-400
              ${currentPage === 1 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-gray-50 dark:hover:bg-gray-700'}
            `}
            aria-label="Previous page"
          >
            {prevLabel}
          </button>
        </li>
        
        {pages.map((page, index) => (
          <li key={index}>
            {typeof page === 'number' ? (
              <button
                onClick={() => handlePageChange(page)}
                aria-current={currentPage === page ? 'page' : undefined}
                className={`
                  ${sizeClasses[size]}
                  flex items-center justify-center
                  border border-gray-300 dark:border-gray-600
                  ${currentPage === page 
                    ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-500 text-primary-600 dark:text-primary-400 z-10' 
                    : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}
                `}
              >
                {page}
              </button>
            ) : (
              <span
                className={`
                  ${sizeClasses[size]}
                  flex items-center justify-center
                  border border-gray-300 dark:border-gray-600
                  bg-white dark:bg-gray-800 
                  text-gray-500 dark:text-gray-400
                `}
              >
                {page}
              </span>
            )}
          </li>
        ))}
        
        <li>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`
              ${sizeClasses[size]}
              flex items-center justify-center
              ${!showFirstLast ? 'rounded-r-md' : ''}
              border border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-800 
              text-gray-500 dark:text-gray-400
              ${currentPage === totalPages 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-gray-50 dark:hover:bg-gray-700'}
            `}
            aria-label="Next page"
          >
            {nextLabel}
          </button>
        </li>
        
        {showFirstLast && (
          <li>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className={`
                ${sizeClasses[size]}
                flex items-center justify-center
                rounded-r-md border border-gray-300 dark:border-gray-600
                bg-white dark:bg-gray-800 
                text-gray-500 dark:text-gray-400
                ${currentPage === totalPages 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'}
              `}
              aria-label="Go to last page"
            >
              {lastLabel}
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export { Pagination };
export default Pagination;