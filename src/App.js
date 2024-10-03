import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Navigation from './components/Navigation'
import LevelSystem from './components/LevelSystem'
import WavyBubbleRivers from './components/WavyBubbleRivers'
import SidebarPoke from './components/SidebarPoke'

export default function App() {
  const [isNavVisible, setIsNavVisible] = useState(false)
  const [showPoke, setShowPoke] = useState(true)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (e.clientX < 20) {
        setIsNavVisible(true)
        setShowPoke(false)
      } else if (e.clientX > 250) {
        setIsNavVisible(false)
        setShowPoke(true)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <Router>
      <div className="relative min-h-screen overflow-hidden">
        <WavyBubbleRivers />
        <div className="relative z-10 min-h-screen">
          <div className="absolute inset-0 backdrop-blur-sm bg-black/10" />
          <div className="relative z-20 flex min-h-screen">
            <Navigation isVisible={isNavVisible} />
            <main className="flex-1">
              <LevelSystem />
            </main>
          </div>
        </div>
        <SidebarPoke isVisible={!isNavVisible && showPoke} />
      </div>
    </Router>
  )
}