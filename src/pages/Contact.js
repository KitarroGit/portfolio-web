import React from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex items-center justify-center text-white p-8"
    >
      <div className="max-w-md w-full">
        <h1 className="text-4xl font-bold mb-6 text-center">Contact Me</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1">Name</label>
            <input type="text" id="name" name="name" className="w-full p-2 bg-purple-900 bg-opacity-20 rounded" />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">Email</label>
            <input type="email" id="email" name="email" className="w-full p-2 bg-purple-900 bg-opacity-20 rounded" />
          </div>
          <div>
            <label htmlFor="message" className="block mb-1">Message</label>
            <textarea id="message" name="message" rows="4" className="w-full p-2 bg-purple-900 bg-opacity-20 rounded"></textarea>
          </div>
          <button type="submit" className="w-full p-2 bg-purple-600 rounded hover:bg-purple-700 transition-colors">Send Message</button>
        </form>
      </div>
    </motion.div>
  )
}