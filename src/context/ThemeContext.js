// File name: ThemeContext.js
// Student's Name: Denis Ogarenko
// StudentID: 301277093
// Date: 2024-10-03

import React, { createContext, useState, useContext, useEffect } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'light') {
      setIsDarkMode(false)
      document.documentElement.classList.add('light-mode')
    } else {
      setIsDarkMode(true)
      document.documentElement.classList.remove('light-mode')
    }
    setTimeout(() => {
      document.documentElement.classList.add('theme-transition')
      setIsInitialized(true)
    }, 50)
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode
      localStorage.setItem('theme', newMode ? 'dark' : 'light')
      if (newMode) {
        document.documentElement.classList.remove('light-mode')
      } else {
        document.documentElement.classList.add('light-mode')
      }
      return newMode
    })
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, isInitialized }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)