import React from 'react'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex items-center justify-center text-white p-8"
    >
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-6">About Me</h1>
        <p className="mb-4">
          Hi, I'm Denis Ogarenko. I'm a passionate web and AI developer with some expertise in React, Node.js, JavaScript, Python, etc.
        </p>
        <p className="mb-4">
        My passion for coding began when I was 13 years old when I made my first HTML-based chess game. This experience ignited a lifelong love of technology and programming. Today I make aesthetic, efficient products for my clients.
        </p>
      </div>
    </motion.div>
  )
}