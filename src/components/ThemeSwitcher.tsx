import { useState, useEffect } from 'react'
import useDarkMode from '@/hooks/useDarkMode'

const ThemeSwitcher = () => {
  const [theme, setTheme] = useDarkMode()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by ensuring component only renders after mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme)
  }

  if (!mounted) return null

  return (
    <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
      <button
        onClick={() => handleThemeChange('light')}
        className={`p-2 rounded-md transition-colors ${
          theme === 'light' 
            ? 'bg-white text-primary-600 shadow-xs dark:bg-gray-700 dark:text-primary-400' 
            : 'text-gray-500 hover:text-primary-600 hover:bg-white/50 dark:text-gray-400 dark:hover:text-primary-400 dark:hover:bg-gray-700/50'
        }`}
        aria-label="Light mode"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
        </svg>
      </button>
      
      <button
        onClick={() => handleThemeChange('dark')}
        className={`p-2 rounded-md transition-colors ${
          theme === 'dark' 
            ? 'bg-white text-primary-600 shadow-xs dark:bg-gray-700 dark:text-primary-400' 
            : 'text-gray-500 hover:text-primary-600 hover:bg-white/50 dark:text-gray-400 dark:hover:text-primary-400 dark:hover:bg-gray-700/50'
        }`}
        aria-label="Dark mode"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
        </svg>
      </button>
      
      <button
        onClick={() => handleThemeChange('system')}
        className={`p-2 rounded-md transition-colors ${
          theme === 'system' 
            ? 'bg-white text-primary-600 shadow-xs dark:bg-gray-700 dark:text-primary-400' 
            : 'text-gray-500 hover:text-primary-600 hover:bg-white/50 dark:text-gray-400 dark:hover:text-primary-400 dark:hover:bg-gray-700/50'
        }`}
        aria-label="System theme"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
        </svg>
      </button>
    </div>
  )
}

export default ThemeSwitcher