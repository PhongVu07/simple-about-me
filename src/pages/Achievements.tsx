import React, { useEffect } from 'react'
import { useAppSelector } from '../app/hooks'
import Navbar from '../components/NavBar'

const Achievements = () => {
  const { mode } = useAppSelector((state) => state.theme)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(mode)
  }, [mode])

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-white pt-16 text-black dark:bg-black dark:text-white"></main>
    </>
  )
}
export default Achievements
