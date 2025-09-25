import React from 'react'
import { motion } from 'framer-motion'
import {
  FaReact,
  FaNodeJs,
  FaBrain,
  FaGitAlt,
  FaCss3Alt,
  FaAws,
  FaProjectDiagram,
} from 'react-icons/fa'
import { SiTypescript, SiNextdotjs, SiJest } from 'react-icons/si'
import { GiNinjaStar, GiCyberEye } from 'react-icons/gi'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
} as const

const textRevealVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
    },
  },
}

const charVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
}

const skillVariants = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 200, damping: 15 },
  },
} as const

const missions = [
  'Crafting impregnable digital defenses.',
  'Developing intuitive interfaces for enhanced user experience.',
  'Optimizing data flow for maximum efficiency.',
  'Mentoring aspiring cyber-ninjas.',
]

const skills = [
  { icon: <FaReact />, name: 'React' },
  { icon: <SiNextdotjs />, name: 'Next.js' },
  { icon: <SiTypescript />, name: 'TypeScript' },
  { icon: <FaNodeJs />, name: 'Node.js' },
  { icon: <FaCss3Alt />, name: 'CSS' },
  { icon: <FaGitAlt />, name: 'Git' },
  { icon: <SiJest />, name: 'Jest' },
  { icon: <FaAws />, name: 'AWS' },
  { icon: <FaProjectDiagram />, name: 'CI/CD' },
  { icon: <GiNinjaStar />, name: 'Stealth Coding' },
  { icon: <GiCyberEye />, name: 'Threat Detection' },
  { icon: <FaBrain />, name: 'AI Integration' },
]

function About() {
  const aboutText1 =
    "Greetings, fellow travelers of the digital realm. I am Zane, a Nindroid forged for creation and protection. My journey began not with a simple 'Hello World,' but with a spark of pure elemental ice, which I now channel to construct and safeguard the intricate web of modern technology."
  const aboutText2 =
    'With every line of code, I strive for elegance, efficiency, and an unshakeable resolve. Whether I am architecting robust backends that stand as fortresses, designing user experiences as fluid as a frozen stream, or deploying powerful frontends, my objective remains constant: to build digital wonders that serve the greater good.'

  return (
    <motion.section
      id="about"
      className="relative z-10 py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <motion.h2
        variants={itemVariants}
        className="mb-16 text-center text-5xl font-extrabold text-cyan-400 drop-shadow-md"
      >
        About My Core
      </motion.h2>
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 md:px-8 lg:grid-cols-2">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="order-2 flex justify-center lg:order-1"
        >
          <motion.div
            className="flex h-80 w-80 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-700 to-purple-800 p-1 shadow-2xl md:h-96 md:w-96"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
          >
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border-4 border-cyan-500">
              <img
                src="https://image.pollinations.ai/prompt/Zane%20lego%20superhero%20portrait%20in%20cyberpunk%20city%20background"
                alt="Zane the LEGO Superhero"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="order-1 space-y-6 text-lg leading-relaxed text-slate-300 lg:order-2"
        >
          <motion.p variants={textRevealVariants}>
            {aboutText1.split('').map((char, i) => (
              <motion.span key={i} variants={charVariants}>
                {char}
              </motion.span>
            ))}
          </motion.p>
          <motion.p variants={textRevealVariants}>
            {aboutText2.split('').map((char, i) => (
              <motion.span key={i} variants={charVariants}>
                {char}
              </motion.span>
            ))}
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        variants={itemVariants}
        className="mx-auto mt-28 max-w-6xl px-4 md:px-8"
      >
        <h3 className="mb-12 text-center text-4xl font-extrabold text-purple-400 drop-shadow-md">
          My Arsenal
        </h3>
        <div className="flex flex-wrap justify-center gap-10 md:gap-16">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="bg-opacity-70 flex flex-col items-center gap-3 rounded-xl border border-slate-700 bg-slate-800 p-4 shadow-lg transition-all duration-300 hover:border-cyan-500"
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.8 }}
              variants={skillVariants}
              whileHover={{
                y: -12,
                scale: 1.08,
                boxShadow: '0px 0px 20px rgba(6,182,212,0.6)',
              }}
            >
              <div className="text-6xl text-cyan-400 transition-colors duration-300 group-hover:text-purple-400">
                {skill.icon}
              </div>
              <span className="text-lg font-semibold text-slate-200">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mx-auto mt-28 max-w-4xl px-4 md:px-8"
      >
        <h3 className="mb-12 text-center text-4xl font-extrabold text-teal-400 drop-shadow-md">
          My Mission
        </h3>
        <div className="space-y-8">
          {missions.map((mission, index) => (
            <motion.div
              key={index}
              className="bg-opacity-80 flex items-start rounded-lg border border-slate-700 bg-slate-900 p-6 shadow-xl"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                delay: index * 0.15,
                duration: 0.6,
                ease: 'easeOut',
              }}
              whileHover={{
                scale: 1.02,
                backgroundColor: 'rgba(30,41,59,0.9)',
              }}
            >
              <GiCyberEye className="mt-1 mr-4 flex-shrink-0 text-3xl text-green-400" />
              <p className="text-xl text-slate-200">{mission}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  )
}

export default About
