import Section from './Section.jsx'
import { motion } from 'framer-motion'
import ExperienceMeter from './ExperienceMeter.jsx'

export default function About() {
  return (
    <Section id="about" title="About Me" subtitle="A bit about who I am and what I do.">
      <div className="grid md:grid-cols-2 gap-8">
        <motion.p className="text-white/80 leading-relaxed" data-aos="fade-right">
          I’m Suzal Sharma — a MERN stack and front-end developer who loves crafting clean, accessible, and interactive UIs. I build modern, responsive web apps with React, Node.js, Express, and MongoDB, focusing on smooth UX, motion, and mobile-first design.
        </motion.p>
        <motion.div className="glass rounded-2xl p-6" data-aos="fade-left">
          <ul className="grid grid-cols-2 gap-3 text-white/80 text-sm">
            {['React', 'Redux', 'JavaScript', 'TypeScript', 'Tailwind', 'Node.js', 'Express', 'MongoDB'].map((s) => (
              <li key={s} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-neon-blue" /> {s}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
      <div className="mt-8">
        <ExperienceMeter />
      </div>
    </Section>
  )
}


