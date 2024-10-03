import React, { useState, useEffect } from 'react'

export default function SidebarPoke({ onHide }) {
  const [isPoking, setIsPoking] = useState(false)
  const [isJumping, setIsJumping] = useState(false)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    const pokeTimer = setTimeout(() => {
      setIsPoking(true)
    }, 5000)

    const jumpTimer = setTimeout(() => {
      setIsJumping(true)
    }, 15000)

    const fadeTimer = setTimeout(() => {
      setIsFading(true)
      setTimeout(onHide, 1000) // Call onHide after fade animation completes
    }, 20000)

    return () => {
      clearTimeout(pokeTimer)
      clearTimeout(jumpTimer)
      clearTimeout(fadeTimer)
    }
  }, [onHide])

  return (
    <div
      className={`fixed left-0 top-1/2 w-4 h-16 bg-purple-500 rounded-r-full transition-all duration-300 ease-in-out ${
        isPoking ? 'translate-x-0' : '-translate-x-full'
      } ${isJumping ? 'animate-jump-horizontal' : ''} ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-purple-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  )
}