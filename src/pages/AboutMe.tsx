import React from 'react'
import Hero from '../components/Hero'
import About from '../components/About'

const AboutMe = () => {
  return (
    <div className="relative min-h-screen overflow-hidden text-slate-100">
      <div className="animated-gradient-bg absolute inset-0 -z-10"></div>
      <Hero />
      <About />
    </div>
  )
}
export default AboutMe
