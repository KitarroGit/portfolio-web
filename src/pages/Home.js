import React from 'react'
import { Link } from 'react-router-dom'
import { useFadeIn } from '../hooks/useFadeIn'

export default function Home() {
  const { ref: welcomeRef, isVisible: isWelcomeVisible } = useFadeIn()
  const { ref: missionRef, isVisible: isMissionVisible } = useFadeIn()

  return (
    <div className="space-y-16 text-center">
      <div
        ref={welcomeRef}
        className={`transition-opacity duration-1000 ${
          isWelcomeVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h1 className="text-5xl font-bold mb-6 text-purple-300 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
          Welcome to My Portfolio
        </h1>
        <p className="text-2xl mb-8 text-gray-300 drop-shadow-[0_0_5px_rgba(209,213,219,0.5)]">
          I'm a passionate developer creating amazing web experiences.
        </p>
        <Link
          to="/about"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full text-lg transition-colors drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]"
        >
          Learn More About Me
        </Link>
      </div>

      <div
        ref={missionRef}
        className={`transition-opacity duration-1000 ${
          isMissionVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h2 className="text-3xl font-bold mb-4 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">
          Mission Statement
        </h2>
        <p className="text-xl text-gray-300 drop-shadow-[0_0_5px_rgba(209,213,219,0.5)]">
          My mission is to create beautiful, functional, and user-friendly websites that help businesses and individuals achieve their goals online.
        </p>
      </div>
    </div>
  )
}