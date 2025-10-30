import { useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Education from './components/Education.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Cursor from './components/Cursor.jsx'
import Background from './components/Background.jsx'
import EnhancedSideBar from './components/EnhancedSideBar.jsx'

export default function App() {
  useEffect(() => {
    document.body.classList.add('hide-cursor')
    AOS.init({ duration: 700, easing: 'ease-out', once: true, offset: 80 })
    return () => document.body.classList.remove('hide-cursor')
  }, [])

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 })

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Background />
      <Cursor />
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-neon-blue/60 z-50 origin-left" style={{ scaleX }} />
      <Navbar />
      <EnhancedSideBar />
      <main>
        <section id="home"><Hero /></section>
        <section id="about"><About /></section>
        <section id="skills"><Skills /></section>
        <section id="projects"><Projects /></section>
        <section id="education"><Education /></section>
        <section id="contact"><Contact /></section>
      </main>
      <Footer />
    </div>
  )
}


