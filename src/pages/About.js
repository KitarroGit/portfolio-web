// File name: About.js
// Student's Name: Denis Ogarenko
// StudentID: 301277093
// Date: 2024-10-03

import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

export default function About() {
  const { isDarkMode } = useTheme()

  const handleResumeClick = () => {
    const pdfUrl = `${process.env.PUBLIC_URL}/resume.pdf`
    window.open(pdfUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`h-full flex items-center justify-center ${isDarkMode ? 'text-white' : 'text-black'} p-8`}
    >
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-6">About Me</h1>
        <p className="mb-4">
          Hi, I'm Denis Ogarenko. I'm a passionate web and AI developer with expertise in React, Node.js, JavaScript, Python, and more.
        </p>
        <p className="mb-4">
          My passion for coding began when I was 13 years old when I made my first HTML-based chess game. This experience ignited a lifelong love of technology and programming. Today I create aesthetic, efficient products for my clients.
        </p>
        <p className="mb-6">
          I'm currently studying Artificial Intelligence at Centennial College, where I'm honing my skills in machine learning libraries such as pandas, TensorFlow, and NumPy.
        </p>
        <button 
          onClick={handleResumeClick}
          className="bg-purple-600 text-white px-6 py-3 rounded-full text-lg hover:bg-purple-700 transition-colors"
        >
          View Resume
        </button>
      </div>
    </motion.div>
  )
}