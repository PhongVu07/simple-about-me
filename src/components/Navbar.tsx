import React from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { toggleTheme } from '../features/theme/themeSlice'
import { FaSun, FaMoon } from 'react-icons/fa'
import { motion } from 'framer-motion'

const Navbar = () => {
  const { mode } = useAppSelector((state) => state.theme)
  const dispatch = useAppDispatch()

  return (
    <nav className="bg-opacity-80 fixed top-0 right-0 left-0 z-50 bg-slate-900 shadow-lg backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0"></div>
          <motion.button
            onClick={() => dispatch(toggleTheme())}
            className="rounded-full p-2 text-slate-300 hover:bg-slate-700 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800 focus:outline-none"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
          >
            {mode === 'light' ? (
              <FaMoon className="h-6 w-6" />
            ) : (
              <FaSun className="h-6 w-6" />
            )}
          </motion.button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
