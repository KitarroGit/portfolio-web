import React, { useState, useEffect, useCallback } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Navigation from './components/Navigation'
import LevelSystem from './components/LevelSystem'
import WavyBubbleRivers from './components/WavyBubbleRivers'
import SidebarPoke from './components/SidebarPoke'

export default function App() {
  const [isNavVisible, setIsNavVisible] = useState(false)
  const [showPoke, setShowPoke] = useState(true)
  const [forceNavOpen, setForceNavOpen] = useState(false)
  const [hasUserHoveredNav, setHasUserHoveredNav] = useState(false)

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
    
    // Set a timeout to hide the nav bar after 10 seconds if the user hasn't hovered over it
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

  return (
    <Router>
      <div className="relative min-h-screen overflow-hidden">
        <WavyBubbleRivers />
        <div className="relative z-10 min-h-screen">
          <div className="absolute inset-0 backdrop-blur-sm bg-black/10" />
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
        <SidebarPoke isVisible={!isNavVisible && !forceNavOpen && showPoke} />
      </div>
    </Router>
  )
}