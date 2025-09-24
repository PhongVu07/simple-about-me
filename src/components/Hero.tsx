import React from 'react'
import { motion } from 'framer-motion'
import { FaChevronDown } from 'react-icons/fa'

const Hero = () => {
  const name = 'Zane'
  const title = 'Cyber Ninja'

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  } as const

  const glitchVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        repeat: 5,
        repeatType: 'reverse',
        ease: 'easeOut',
      },
    },
  } as const

  return (
    <section className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <motion.h1
        initial="hidden"
        animate="visible"
        className="mb-4 text-6xl font-extrabold drop-shadow-lg md:text-8xl"
      >
        <motion.span
          className="inline-block"
          variants={letterVariants}
          transition={{ staggerChildren: 0.1 }}
        >
          {"Hi, I'm ".split('').map((char, i) => (
            <motion.span key={i} variants={letterVariants}>
              {char}
            </motion.span>
          ))}
        </motion.span>
        <motion.span
          className="ml-3 inline-block text-cyan-400"
          variants={letterVariants}
          transition={{ delayChildren: 1.5, staggerChildren: 0.1 }}
        >
          {name.split('').map((char, i) => (
            <motion.span key={i} variants={letterVariants}>
              {char}
            </motion.span>
          ))}
        </motion.span>
      </motion.h1>

      <motion.p
        initial="hidden"
        animate="visible"
        variants={glitchVariants}
        transition={{ delay: 2.5, duration: 0.5 }}
        className="mt-2 font-mono text-2xl tracking-wide text-purple-400 md:text-4xl"
      >
        {title}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3.2 }}
        className="mt-6 max-w-3xl text-xl leading-relaxed text-slate-300 md:text-2xl"
      >
        I am a master of ice and technology, dedicated to crafting seamless
        digital realms and protecting the innocent in the vast cyber-verse.
      </motion.p>

      <motion.a
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3.8 }}
        whileHover={{
          scale: 1.05,
          boxShadow: '0px 0px 15px rgba(6,182,212,0.8)',
        }}
        whileTap={{ scale: 0.95 }}
        href="#about"
        className="group relative mt-12 overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-10 py-4 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:from-cyan-400 hover:to-purple-500"
      >
        <span className="relative z-10">Embark on the Mission</span>
        <span className="absolute inset-0 animate-pulse bg-white opacity-20 blur-sm transition-opacity duration-500 group-hover:opacity-0"></span>
      </motion.a>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 4.5,
          duration: 1.5,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        className="absolute bottom-10"
      >
        <FaChevronDown className="text-4xl text-slate-400" />
      </motion.div>

      <motion.div
        className="absolute top-1/4 left-1/4 h-32 w-32 rounded-full bg-cyan-500 opacity-10 blur-xl"
        animate={{
          y: ['0%', '10%', '-5%', '0%'],
          x: ['0%', '5%', '-5%', '0%'],
          rotate: [0, 5, -5, 0],
          transition: {
            duration: 8,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
          },
        }}
      ></motion.div>
      <motion.div
        className="absolute right-1/4 bottom-1/4 h-40 w-40 rounded-full bg-purple-500 opacity-10 blur-xl"
        animate={{
          y: ['0%', '10%', '-5%', '0%'],
          x: ['0%', '5%', '-5%', '0%'],
          rotate: [0, 5, -5, 0],
          transition: {
            duration: 8,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
            delay: 1,
          },
        }}
      ></motion.div>
      <motion.div
        className="absolute top-1/2 left-1/2 h-24 w-24 rounded-full bg-teal-500 opacity-10 blur-xl"
        animate={{
          y: ['0%', '10%', '-5%', '0%'],
          x: ['0%', '5%', '-5%', '0%'],
          rotate: [0, 5, -5, 0],
          transition: {
            duration: 8,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
            delay: 2,
          },
        }}
      ></motion.div>
    </section>
  )
}

export default Hero
