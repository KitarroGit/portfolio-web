// File name: Navigation.js
// Student's Name: Denis Ogarenko
// StudentID: 301277093
// Date: 2024-10-03

import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import logoImage from '../images/Logo.png'
import { Sun, Moon } from 'lucide-react'

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
  const { isDarkMode, toggleTheme } = useTheme()

  useEffect(() => {
    let timer
    if (forceOpen) {
      timer = setTimeout(() => {
        setHighlightAll(true)
      }, 500)
    } else {
      setHighlightAll(false)
    }
    return () => clearTimeout(timer)
  }, [forceOpen])

  const handleNavClick = (path) => {
    navigate(path)
  }

  const handleButtonHover = (index) => {
    setHoveredIndex(index)
    const button = buttonRefs.current[index]
    if (button) {
      button.style.setProperty('--mouse-x', '50%')
      button.style.setProperty('--mouse-y', '50%')
    }
  }

  const handleButtonMove = (e, index) => {
    const button = buttonRefs.current[index]
    if (button) {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      button.style.setProperty('--mouse-x', `${x}px`)
      button.style.setProperty('--mouse-y', `${y}px`)
    }
  }

  return (
    <nav 
      className={`fixed left-0 top-0 h-full w-64 ${isDarkMode ? 'bg-black/50' : 'bg-white/50'} backdrop-blur-md z-50 transition-transform duration-300 ease-in-out ${isVisible ? 'translate-x-0' : '-translate-x-full'}`}
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
                onMouseMove={(e) => handleButtonMove(e, index)}
                onMouseLeave={() => setHoveredIndex(null)}
                ref={el => buttonRefs.current[index] = el}
                className={`relative flex items-center justify-center w-full py-3 px-4 rounded-full border ${isDarkMode ? 'shadow-[0_0_15px_rgba(88,28,135,0.3)]' : 'shadow-[0_0_15px_rgba(88,28,135,0.15)]'} text-center hover:bg-purple-600/20 hover:border-purple-600 ${isDarkMode ? 'hover:shadow-[0_0_25px_rgba(147,51,234,0.5)]' : 'hover:shadow-[0_0_25px_rgba(147,51,234,0.25)]'} hover:scale-105 group cursor-pointer
                  ${location.pathname === item.path 
                    ? 'bg-purple-600/20 border-purple-600' 
                    : 'bg-purple-600/5 border-purple-800/50'}
                  ${highlightAll && hoveredIndex === null ? 'bg-purple-600/40 border-purple-400 shadow-[0_0_25px_rgba(147,51,234,0.7)]' : ''}`}
              >
                <span className={`relative z-10 ${isDarkMode ? 'text-white' : 'text-black'}`}>{item.name}</span>
                <div 
                  className="absolute inset-0 rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: hoveredIndex === index ? `radial-gradient(circle at var(--mouse-x) var(--mouse-y), ${isDarkMode ? 'rgba(147, 51, 234, 0.4)' : 'rgba(147, 51, 234, 0.2)'} 0%, ${isDarkMode ? 'rgba(147, 51, 234, 0)' : 'rgba(147, 51, 234, 0)'} 50%)` : 'none',
                    mixBlendMode: 'plus-lighter'
                  }}
                />
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={toggleTheme}
          className={`mt-4 p-2 rounded-full ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'} hover:opacity-80 w-10 h-10 flex items-center justify-center`}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <div className={`absolute top-0 right-0 w-px h-full ${isDarkMode ? 'bg-purple-900' : 'bg-purple-300'} ${isVisible ? `shadow-[0_0_8px_1px_${isDarkMode ? 'rgba(88,28,135,0.5)' : 'rgba(147,51,234,0.3)'}] ${isDarkMode ? 'shadow-purple-900' : 'shadow-purple-300'}` : 'shadow-none'}`}></div>
      </div>
    </nav>
  )
}

function Logo() {
  return (
    <div className="mb-6">
      <img src={logoImage} alt="Logo" className="w-16 h-16 mx-auto" />
    </div>
  )
}