import { useEffect } from 'react'
import useLocalStorage from './useLocalStorage'

type Theme = 'dark' | 'light' | 'system'

function useDarkMode(): [Theme, (theme: Theme) => void] {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'system')

  useEffect(() => {
    const root = window.document.documentElement
    
    // Remove previous class
    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches 
        ? 'dark' 
        : 'light'
      
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }
  }, [theme])

  return [theme, setTheme]
}

export default useDarkMode