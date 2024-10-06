// File name: LevelSystem.js
// Student's Name: Denis Ogarenko
// StudentID: 301277093
// Date: 2024-10-03

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSwipeable } from 'react-swipeable'
import Home from '../pages/Home'
import About from '../pages/About'
import Projects from '../pages/Projects'
import Services from '../pages/Services'
import Contact from '../pages/Contact'
import { useTheme } from '../context/ThemeContext'

const pages = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/projects', component: Projects },
  { path: '/services', component: Services },
  { path: '/contact', component: Contact },
]

export default function LevelSystem({ onExploreClick }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const isScrollingRef = useRef(false)
  const { isDarkMode } = useTheme()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const index = pages.findIndex(page => page.path === location.pathname)
    setCurrentIndex(index !== -1 ? index : 0)
  }, [location])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768) // Adjust this breakpoint as needed
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleNavigation = useCallback((delta) => {
    if (isScrollingRef.current) return

    isScrollingRef.current = true

    const newIndex = currentIndex + delta
    if (newIndex >= 0 && newIndex < pages.length) {
      setDirection(delta)
      navigate(pages[newIndex].path)
    }

    setTimeout(() => {
      isScrollingRef.current = false
    }, 1000) // 1 second cooldown between page changes
  }, [currentIndex, navigate])

  useEffect(() => {
    const handleWheel = (e) => {
      if (e.deltaY > 0) {
        handleNavigation(1)
      } else if (e.deltaY < 0) {
        handleNavigation(-1)
      }
    }

    window.addEventListener('wheel', handleWheel)
    return () => window.removeEventListener('wheel', handleWheel)
  }, [handleNavigation])

  const handlers = useSwipeable({
    onSwipedLeft: () => isMobile && handleNavigation(1),
    onSwipedRight: () => isMobile && handleNavigation(-1),
    onSwipedUp: () => isMobile && handleNavigation(1),
    onSwipedDown: () => isMobile && handleNavigation(-1),
    preventDefaultTouchmoveEvent: true,
    trackMouse: false // Disable mouse tracking
  })

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  }

  return (
    <div 
      className={`h-screen overflow-hidden ${isDarkMode ? 'text-white' : 'text-black'}`}
      {...(isMobile ? handlers : {})}
    >
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={location.pathname}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30, restDelta: 0.01 },
            opacity: { duration: 0.5 },
          }}
          className="h-full w-full absolute"
        >
          {React.createElement(pages[currentIndex].component, { onExploreClick })}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}