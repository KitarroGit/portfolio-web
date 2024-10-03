// File name: Home.js
// Student's Name: Denis Ogarenko
// StudentID: 301277093
// Date: 2024-10-03

import React from 'react'
import { motion } from 'framer-motion'

export default function Home({ onExploreClick }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex items-center justify-center text-white p-8"
    >
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome to My Portfolio</h1>
        <p className="text-xl mb-8">
          My name is Denis, and I am a passionate web developer creating beautiful websites.
        </p>
        <button 
          className="bg-purple-600 text-white px-6 py-3 rounded-full text-lg hover:bg-purple-700 transition-colors"
          onClick={onExploreClick}
        >
          Explore My Work
        </button>
      </div>
    </motion.div>
  )
}