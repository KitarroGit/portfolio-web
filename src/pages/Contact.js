// File name: Contact.js
// Student's Name: Denis Ogarenko
// StudentID: 301277093
// Date: 2024-10-03

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [showDocButton, setShowDocButton] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDocButton(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleDocumentationClick = (e) => {
    e.preventDefault()
    const pdfUrl = `${process.env.PUBLIC_URL}/internal_documentation.pdf`
    window.open(pdfUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex items-center justify-center text-white p-8 relative"
    >
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Me</h1>
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
            <input type="text" id="name" name="name" required
              className="w-full px-3 py-2 bg-purple-900 bg-opacity-50 rounded-md border border-purple-500 focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
            <input type="email" id="email" name="email" required
              className="w-full px-3 py-2 bg-purple-900 bg-opacity-50 rounded-md border border-purple-500 focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
            <textarea id="message" name="message" rows="4" required
              className="w-full px-3 py-2 bg-purple-900 bg-opacity-50 rounded-md border border-purple-500 focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
            ></textarea>
          </div>
          <div>
            <button type="submit"
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: showDocButton ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        onClick={handleDocumentationClick}
        className="absolute bottom-4 right-4 px-4 py-2 rounded-full border shadow-[0_0_15px_rgba(88,28,135,0.3)] text-white text-center transition-all duration-300 hover:bg-purple-600/20 hover:border-purple-600 hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] hover:scale-105 bg-purple-600/5 border-purple-800/50"
      >
        Internal Documentation
      </motion.button>
    </motion.div>
  )
}