import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Projects from '../pages/Projects'
import Services from '../pages/Services'
import Contact from '../pages/Contact'

const pages = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/projects', component: Projects },
  { path: '/services', component: Services },
  { path: '/contact', component: Contact },
]

function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export default function LevelSystem() {
  const location = useLocation()
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    const index = pages.findIndex(page => page.path === location.pathname)
    setCurrentIndex(index !== -1 ? index : 0)
  }, [location])

  const handleScroll = useCallback((delta) => {
    if (isScrolling) return

    setIsScrolling(true)
    if (delta > 0 && currentIndex < pages.length - 1) {
      setDirection(1)
      navigate(pages[currentIndex + 1].path)
    } else if (delta < 0 && currentIndex > 0) {
      setDirection(-1)
      navigate(pages[currentIndex - 1].path)
    }
    setTimeout(() => setIsScrolling(false), 800) // Prevent scrolling for 0.8 second
  }, [currentIndex, navigate, isScrolling])

  const debouncedHandleScroll = useCallback(debounce(handleScroll, 50), [handleScroll])

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault()
      debouncedHandleScroll(e.deltaY)
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [debouncedHandleScroll])

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
    <div className="h-screen overflow-hidden">
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
            opacity: { duration: 0.2 },
          }}
          className="h-full w-full absolute"
        >
          {React.createElement(pages[currentIndex].component)}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}