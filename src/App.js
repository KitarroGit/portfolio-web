// File name: App.js
// Student's Name: Denis Ogarenko
// StudentID: 301277093
// Date: 2024-10-03

import React, { useState, useEffect, useCallback } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Navigation from './components/Navigation'
import LevelSystem from './components/LevelSystem'
import WavyBubbleRivers from './components/WavyBubbleRivers'
import SidebarPoke from './components/SidebarPoke'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import './styles/global.css'

function AppContent() {
  const [isNavVisible, setIsNavVisible] = useState(false)
  const [showPoke, setShowPoke] = useState(true)
  const [forceNavOpen, setForceNavOpen] = useState(false)
  const [hasUserHoveredNav, setHasUserHoveredNav] = useState(false)
  const { isDarkMode } = useTheme()

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (e.clientX < 20) {
        setIsNavVisible(true)
        setShowPoke(false)
      } else if (e.clientX > 250 && !forceNavOpen) {
        if (hasUserHoveredNav) {
          setIsNavVisible(false)
          setShowPoke(true)
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [forceNavOpen, hasUserHoveredNav])

  const handleExploreClick = useCallback(() => {
    setForceNavOpen(true)
    setIsNavVisible(true)
    setShowPoke(false)
    setHasUserHoveredNav(false)
    
    const timer = setTimeout(() => {
      if (!hasUserHoveredNav) {
        setForceNavOpen(false)
        setIsNavVisible(false)
        setShowPoke(true)
      }
    }, 10000)

    return () => clearTimeout(timer)
  }, [hasUserHoveredNav])

  const handleNavHover = useCallback(() => {
    setHasUserHoveredNav(true)
    if (forceNavOpen) {
      setForceNavOpen(false)
    }
  }, [forceNavOpen])

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-mode')
    } else {
      document.body.classList.add('light-mode')
    }
  }, [isDarkMode])

  return (
    <div className={`relative min-h-screen overflow-hidden`}>
      <WavyBubbleRivers isDarkMode={isDarkMode} />
      <div className="relative z-10 min-h-screen">
        <div className={`absolute inset-0 backdrop-blur-sm ${isDarkMode ? 'bg-black/10' : 'bg-white/10'}`} />
        <div className="relative z-20 flex min-h-screen">
          <Navigation 
            isVisible={isNavVisible || forceNavOpen} 
            forceOpen={forceNavOpen}
            onHover={handleNavHover}
          />
          <main className="flex-1">
            <LevelSystem onExploreClick={handleExploreClick} />
          </main>
        </div>
      </div>
      <SidebarPoke isVisible={!isNavVisible && !forceNavOpen && showPoke} isDarkMode={isDarkMode} />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  )
}