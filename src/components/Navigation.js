import React from 'react'
import { Link } from 'react-router-dom'
import { Mountain } from 'lucide-react'

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' },
]

export default function Navigation({ isVisible }) {
  return (
    <nav className={`fixed left-0 top-0 h-full w-64 backdrop-blur-xl transition-all duration-300 ease-in-out ${isVisible ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-6 h-full flex flex-col relative">
        <Logo />
        <ul className="flex-grow flex flex-col justify-center items-center space-y-4">
          {navItems.map((item) => (
            <li key={item.name} className="w-full">
              <Link 
                to={item.path} 
                className="flex items-center justify-center w-full py-3 px-4 rounded-full bg-purple-600/5 backdrop-blur-3xl border border-purple-800/50 shadow-[0_0_15px_rgba(88,28,135,0.3)] text-white text-center transition-all duration-300 hover:bg-purple-600/10 hover:border-purple-700/70 hover:shadow-[0_0_20px_rgba(88,28,135,0.5)]"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className={`absolute top-0 right-0 w-px h-full bg-purple-900 transition-all duration-300 ${isVisible ? 'shadow-[0_0_8px_1px_rgba(88,28,135,0.5)] shadow-purple-900' : 'shadow-none'}`}></div>
      </div>
    </nav>
  )
}

function Logo() {
  return (
    <div className="text-3xl font-bold text-purple-600 flex items-center justify-center mb-8">
      <Mountain className="w-8 h-8 mr-2" />
      <span>MyLogo</span>
    </div>
  )
}