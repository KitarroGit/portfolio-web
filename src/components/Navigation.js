// File name: Navigation.js
// Student's Name: Denis Ogarenko
// StudentID: 301277093
// Date: 2024-10-03

import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import logoImage from '../images/Logo.png' // Updated import path

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' },
]

export default function Navigation({ isVisible, forceOpen, onHover }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [highlightAll, setHighlightAll] = useState(false)
  const buttonRefs = useRef([])
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleMouseMove = (e) => {
      buttonRefs.current.forEach((button, index) => {
        if (button && hoveredIndex === index) {
          const rect = button.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top
          button.style.setProperty('--mouse-x', `${x}px`)
          button.style.setProperty('--mouse-y', `${y}px`)
        }
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [hoveredIndex])

  useEffect(() => {
    if (forceOpen) {
      const timer = setTimeout(() => {
        setHighlightAll(true)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      setHighlightAll(false)
    }
  }, [forceOpen])

  const handleNavClick = (path) => {
    navigate(path)
  }

  const handleButtonHover = (index) => {
    setHoveredIndex(index)
    setHighlightAll(false)
    onHover()
  }

  return (
    <nav 
      className={`fixed left-0 top-0 h-full w-64 bg-black/50 backdrop-blur-md z-50 transition-transform duration-300 ease-in-out ${isVisible ? 'translate-x-0' : '-translate-x-full'}`}
      onMouseEnter={onHover}
    >
      <div className="p-6 h-full flex flex-col relative">
        <Logo />
        <ul className="flex-grow flex flex-col justify-center items-center space-y-4">
          {navItems.map((item, index) => (
            <li key={item.name} className="w-full">
              <button 
                onClick={() => handleNavClick(item.path)}
                onMouseEnter={() => handleButtonHover(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                ref={el => buttonRefs.current[index] = el}
                className={`relative flex items-center justify-center w-full py-3 px-4 rounded-full border shadow-[0_0_15px_rgba(88,28,135,0.3)] text-white text-center transition-all duration-300 hover:bg-purple-600/20 hover:border-purple-600 hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] hover:scale-105 group cursor-pointer
                  ${location.pathname === item.path 
                    ? 'bg-purple-600/20 border-purple-600' 
                    : 'bg-purple-600/5 border-purple-800/50'}
                  ${highlightAll && hoveredIndex === null ? 'bg-purple-600/40 border-purple-400 shadow-[0_0_25px_rgba(147,51,234,0.7)]' : ''}`}
              >
                <span className="relative z-10">{item.name}</span>
                <div 
                  className="absolute inset-0 rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: hoveredIndex === index ? 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(147, 51, 234, 0.4) 0%, rgba(147, 51, 234, 0) 50%)' : 'none',
                    mixBlendMode: 'plus-lighter'
                  }}
                />
              </button>
            </li>
          ))}
        </ul>
        <div className={`absolute top-0 right-0 w-px h-full bg-purple-900 transition-all duration-300 ${isVisible ? 'shadow-[0_0_8px_1px_rgba(88,28,135,0.5)] shadow-purple-900' : 'shadow-none'}`}></div>
      </div>
    </nav>
  )
}

function Logo() {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    console.error('Failed to load logo image')
    setImageError(true)
  }

  return (
    <div className="text-3xl font-bold text-purple-400 flex items-center justify-center mb-8">
      {!imageError ? (
        <img 
          src={logoImage} 
          alt="DO Logo" 
          className="w-16 h-16" 
          onError={handleImageError}
        />
      ) : (
        <div className="w-16 h-16 bg-purple-600 flex items-center justify-center rounded-full">
          <span className="text-white">DO</span>
        </div>
      )}
    </div>
  )
}