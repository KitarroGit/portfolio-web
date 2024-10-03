import React from 'react'
import { motion } from 'framer-motion'

const services = [
  { title: 'Web Development', description: 'Custom website development' },
  { title: 'UI/UX Design', description: 'Hopefully this website showcases some of my skills in a good light' },
  { title: 'Mobile App Development', description: 'Still learning, but can take ideas' },
]

export default function Services() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex items-center justify-center text-white p-8"
    >
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">My Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-purple-900 bg-opacity-20 p-6 rounded-lg"
            >
              <h2 className="text-2xl font-semibold mb-2">{service.title}</h2>
              <p>{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}