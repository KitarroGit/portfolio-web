import React, { useState, useEffect, useRef } from 'react'
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

export default function LevelSystem({ onExploreClick }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const isScrollingRef = useRef(false)

  useEffect(() => {
    const index = pages.findIndex(page => page.path === location.pathname)
    setCurrentIndex(index !== -1 ? index : 0)
  }, [location])

  useEffect(() => {
    const handleWheel = (e) => {
      if (isScrollingRef.current) return

      isScrollingRef.current = true

      if (e.deltaY > 0 && currentIndex < pages.length - 1) {
        setDirection(1)
        navigate(pages[currentIndex + 1].path)
      } else if (e.deltaY < 0 && currentIndex > 0) {
        setDirection(-1)
        navigate(pages[currentIndex - 1].path)
      }

      setTimeout(() => {
        isScrollingRef.current = false
      }, 1000) // 1 second cooldown between page changes
    }

    window.addEventListener('wheel', handleWheel)
    return () => window.removeEventListener('wheel', handleWheel)
  }, [currentIndex, navigate])

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