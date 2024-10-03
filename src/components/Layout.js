import React, { useState, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import Navigation from './Navigation'
import FloatingBubbles from './FloatingBubbles'
import FadeInWrapper from './FadeInWrapper'
import SidebarPoke from './SidebarPoke'

export default function Layout({ children }) {
  const [isNavVisible, setIsNavVisible] = useState(false)
  const [showPoke, setShowPoke] = useState(true)
  const location = useLocation()

  const handleHidePoke = useCallback(() => {
    setShowPoke(false)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (e.clientX < 20) {
        setIsNavVisible(true)
        setShowPoke(false)
      } else if (e.clientX > 250) {
        setIsNavVisible(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <FloatingBubbles />
      <FadeInWrapper>
        <div className="relative z-10 flex min-h-screen">
          <Navigation isVisible={isNavVisible} />
          <main className="flex-1 p-8 flex items-center justify-center">
            <div className="max-w-3xl w-full">
              {children}
            </div>
          </main>
        </div>
      </FadeInWrapper>
      {showPoke && <SidebarPoke onHide={handleHidePoke} />}
    </div>
  )
}