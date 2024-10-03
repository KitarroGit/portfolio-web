import React from 'react'
import { Link } from 'react-router-dom'

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' },
]

export default function Navigation({ isVisible }) {
  return (
    <nav className={`fixed left-0 top-0 h-full w-64 bg-gray-900 transition-transform duration-300 ease-in-out ${isVisible ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-6">
        <Logo />
        <ul className="mt-8 space-y-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link 
                to={item.path} 
                className="text-lg text-purple-300 hover:text-purple-400 transition-colors drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

function Logo() {
  return (
    <div className="text-3xl font-bold text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
      YourLogo
    </div>
  )
}