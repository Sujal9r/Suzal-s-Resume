import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const handleScroll = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    setOpen(false)
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-40">
      <div className="pointer-events-none absolute inset-0 bg-radial-fade" />
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <nav className="glass rounded-2xl border border-white/10 backdrop-blur-xl px-4 md:px-6 py-3 flex items-center justify-between shadow-[0_10px_50px_rgba(3,27,89,0.25)]">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleScroll('home')}
            className="text-lg font-semibold tracking-wide"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Suzal</span>
            <span className="text-white/70">.dev</span>
          </motion.button>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => handleScroll(l.id)}
                className="relative px-3 py-2 text-sm text-white/80 hover:text-white transition group"
              >
                {l.label}
                <span className="pointer-events-none absolute left-3 right-3 -bottom-1 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent opacity-0 group-hover:opacity-100 transition" />
              </button>
            ))}
            <div className="mx-3 w-px h-6 bg-white/10" />
            <a className="hover:text-white/90 text-white/70 p-2 rounded-lg hover:bg-white/5 transition" href="mailto:Suzal@example.com" aria-label="Email"><FiMail size={18} /></a>
            <a className="hover:text-white/90 text-white/70 p-2 rounded-lg hover:bg-white/5 transition" href="https://www.linkedin.com/in/suzal-sharma-80863a248/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FiLinkedin size={18} /></a>
            <a className="hover:text-white/90 text-white/70 p-2 rounded-lg hover:bg-white/5 transition" href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><FiGithub size={18} /></a>
            <a
              href="#contact"
              className="ml-2 relative inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:shadow-[0_0_35px_rgba(6,182,212,0.55)] transition"
            >
              Let’s Talk
            </a>
          </div>

          <button className="md:hidden text-white/90 p-2 rounded-lg hover:bg-white/5" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            <svg width="26" height="20" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1H25" stroke="white" strokeOpacity="0.9" strokeWidth="2"/>
              <path d="M1 10H25" stroke="white" strokeOpacity="0.9" strokeWidth="2"/>
              <path d="M1 19H25" stroke="white" strokeOpacity="0.9" strokeWidth="2"/>
            </svg>
          </button>
        </nav>

        <div className={`md:hidden transition-[max-height,opacity] duration-300 ease-out overflow-hidden ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="mt-2 glass rounded-2xl p-4 flex flex-col gap-2 border border-white/10">
            {links.map((l) => (
              <button key={l.id} onClick={() => handleScroll(l.id)} className="text-left text-white/90 px-2 py-2 rounded-lg hover:bg-white/5">
                {l.label}
              </button>
            ))}
            <div className="h-px bg-white/10 my-2" />
            <div className="flex items-center gap-3">
              <a className="hover:text-white/90 text-white/70 p-2 rounded-lg hover:bg-white/5 transition" href="mailto:Suzal@example.com" aria-label="Email"><FiMail size={18} /></a>
              <a className="hover:text-white/90 text-white/70 p-2 rounded-lg hover:bg-white/5 transition" href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FiLinkedin size={18} /></a>
              <a className="hover:text-white/90 text-white/70 p-2 rounded-lg hover:bg-white/5 transition" href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><FiGithub size={18} /></a>
              <a href="#contact" className="ml-auto inline-flex items-center px-3 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm">Let’s Talk</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


