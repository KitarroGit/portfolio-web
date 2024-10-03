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
          I found passion in coding when I was 13, always tried to make it fun for myself and make sure my clients feel satisfied with their product.
        </p>
      </div>
    </motion.div>
  )
}