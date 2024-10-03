import React, { useState, useEffect } from 'react'

const INACTIVITY_THRESHOLD = 4 * 60 * 60 * 1000 // 4 hours in milliseconds

export default function FadeInWrapper({ children }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const lastVisit = localStorage.getItem('lastVisit')
    const currentTime = new Date().getTime()

    if (!lastVisit || currentTime - parseInt(lastVisit) > INACTIVITY_THRESHOLD) {
      setIsVisible(false)
      setTimeout(() => setIsVisible(true), 100) // Small delay to ensure the fade effect triggers
    } else {
      setIsVisible(true)
    }

    localStorage.setItem('lastVisit', currentTime.toString())
  }, [])

  return (
    <div
      className={`transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {children}
    </div>
  )
}