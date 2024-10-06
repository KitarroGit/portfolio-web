// File name: Projects.js
// Student's Name: Denis Ogarenko
// StudentID: 301277093
// Date: 2024-10-03

import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import AIproject2Gif from '../images/AIproject2.gif'

const projects = [
  {
    title: 'Vehicular Incident Prediction System',
    description: 'A project I worked on with my groupmates using Toronto Police data, trained a model that could point out streets that were more vulnerable to vehicular incidents.',
    gif: AIproject2Gif
  },
  { title: 'NDA project', description: 'Some project I am working on with a group of friends.' },
  { title: 'This website', description: "I've spent way too much time on this website and might as well continue developing it afterwards." },
]

export default function Projects() {
  const { isDarkMode } = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`h-full flex items-center justify-center ${isDarkMode ? 'text-white' : 'text-black'} p-8`}
    >
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">My Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${isDarkMode ? 'bg-purple-900 bg-opacity-20' : 'bg-purple-100'} p-6 rounded-lg flex flex-col`}
            >
              {project.gif && (
                <div className="mb-4 relative w-full h-48 overflow-hidden rounded-lg">
                  <img
                    src={project.gif}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
              <p className="flex-grow">{project.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}