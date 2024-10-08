// File name: SidebarPoke.js
// Student's Name: Denis Ogarenko
// StudentID: 301277093
// Date: 2024-10-03

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function SidebarPoke({ isVisible }) {
  const [isMoving, setIsMoving] = useState(false)
  const { isDarkMode } = useTheme()

  useEffect(() => {
    if (isVisible) {
      const moveTimer = setTimeout(() => setIsMoving(true), 10000)
      return () => clearTimeout(moveTimer)
    } else {
      setIsMoving(false)
    }
  }, [isVisible])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed left-0 top-1/2 -translate-y-1/2 z-50 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}
          initial={{ x: 0, filter: 'blur(0px)', opacity: 1 }}
          animate={isMoving ? { x: [0, 10, 0] } : {}}
          exit={{ filter: 'blur(10px)', opacity: 0 }}
          transition={{
            x: isMoving ? {
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            } : {},
            filter: { duration: 1, ease: 'easeInOut' },
            opacity: { duration: 1, ease: 'easeInOut' }
          }}
        >
          <ChevronRight size={24} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}