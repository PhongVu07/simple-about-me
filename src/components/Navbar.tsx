import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { toggleTheme } from '../features/theme/themeSlice'
import { FaSun, FaMoon } from 'react-icons/fa'
import { AnimatePresence, motion } from 'framer-motion'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Achievements', path: '/achievements' },
]

const navbarVariants = {
  hidden: { y: -50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeInOut', staggerChildren: 0.1 },
  },
} as const

const navItemVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
}

const Navbar = () => {
  const { mode } = useAppSelector((state) => state.theme)
  const dispatch = useAppDispatch()

  const activeLinkStyle = 'bg-slate-700 text-white'
  const inactiveLinkStyle = 'text-slate-300 hover:bg-slate-700 hover:text-white'

  return (
    <motion.nav
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      className="fixed top-0 right-0 left-0 z-50 border-b border-slate-700/50 bg-slate-900/80 shadow-lg backdrop-blur-lg"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <motion.div variants={navItemVariants} className="flex-shrink-0">
            <NavLink
              to="/"
              className="text-2xl font-bold text-cyan-400 transition-colors hover:text-cyan-300"
            >
              Zane
            </NavLink>
          </motion.div>

          <div className="hidden items-center space-x-4 md:flex">
            {navLinks.map((link) => (
              <motion.div variants={navItemVariants} key={link.name}>
                <NavLink
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive ? activeLinkStyle : inactiveLinkStyle
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </motion.div>
            ))}
          </div>

          <motion.div variants={navItemVariants}>
            <motion.button
              onClick={() => dispatch(toggleTheme())}
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800 focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={mode}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {mode === 'light' ? (
                    <FaMoon className="h-5 w-5" />
                  ) : (
                    <FaSun className="h-5 w-5" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
