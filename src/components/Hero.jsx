import { useEffect, useRef, useState } from 'react'
import profileUrl from '../../public/Asset/Profile.png'

function Typewriter({ words, speed = 90, pause = 1400 }) {
  const text = useTypewriter(words, speed, pause)
  return (
    <span>
      {text}
      <span className="inline-block w-0.5 h-6 bg-cyan-400 ml-1 animate-pulse" />
    </span>
  )
}

function useTypewriter(words, speed, pause) {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const word = words[index % words.length]

  useEffect(() => {
    const handler = () => {
      if (!deleting && subIndex < word.length) {
        setSubIndex((s) => s + 1)
      } else if (!deleting && subIndex === word.length) {
        setDeleting(true)
        setTimeout(() => {}, pause)
      } else if (deleting && subIndex > 0) {
        setSubIndex((s) => s - 1)
      } else {
        setDeleting(false)
        setIndex((i) => i + 1)
      }
    }
    const t = setTimeout(handler, deleting ? speed / 1.8 : speed)
    return () => clearTimeout(t)
  }, [subIndex, deleting, index, word, speed, pause])

  return word.substring(0, subIndex)
}

function FloatingParticle({ delay, duration, x, y }) {
  return (
    <div
      className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-float"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    />
  )
}

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }))

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      
      {/* Floating Particles */}
      {particles.map((particle) => (
        <FloatingParticle key={particle.id} {...particle} />
      ))}

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 pt-32 md:pt-40 px-4">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-10 items-center">
          {/* Text Content */}
          <div
            className={`space-y-6 transform transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            }}
          >
            <p className="text-sm tracking-widest text-cyan-400 font-medium animate-fade-in">
              Hi, I'm
            </p>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Sujal Sharma
              </span>
              <span className="block text-xl md:text-3xl text-slate-300 mt-4 font-light">
                <Typewriter 
                  words={["MERN Stack Developer", "Front-End Developer", "UI/UX Lover"]} 
                />
              </span>
            </h1>
            
            <p className="text-slate-400 text-lg max-w-xl leading-relaxed animate-fade-in-up">
              Passionate about building clean, interactive UIs and modern web apps with delightful motion and performance.
            </p>
            
            <div className="flex gap-4 pt-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <a 
                href="#projects" 
                className="group relative px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 font-medium text-white overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
              >
                <span className="relative z-10">View Projects</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              
              <a 
                href="#contact" 
                className="px-6 py-3 rounded-xl border-2 border-cyan-400/30 font-medium text-slate-200 backdrop-blur-sm hover:border-cyan-400 hover:bg-cyan-400/10 transition-all hover:scale-105"
              >
                Contact Me
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 pt-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              {['GitHub', 'LinkedIn', 'Twitter'].map((social, i) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/50 hover:scale-110 transition-all"
                  style={{ animationDelay: `${0.6 + i * 0.1}s` }}
                >
                  <span className="text-xs">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Image Section */}
          <div
            className={`flex justify-center md:justify-end transform transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px)`,
            }}
          >
            <div className="relative group">
              {/* Animated Ring */}
              <div className="absolute -inset-4 rounded-full border-2 border-cyan-400/30 animate-spin-slow" />
              <div className="absolute -inset-8 rounded-full border-2 border-blue-400/20 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '8s' }} />
              
              {/* Glow Effect */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-500 opacity-75 blur-2xl group-hover:opacity-100 transition-opacity" />
              
              {/* Image */}
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-3xl overflow-hidden border-2 border-cyan-400/20 group-hover:border-cyan-400/40 transition-all">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 mix-blend-overlay" />
                <img
                  className='w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700'
                  src={profileUrl}
                  alt="Sujal Sharma"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 -right-4 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white font-medium shadow-lg animate-bounce-slow">
                Available for work
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-cyan-400/50 flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-cyan-400 rounded-full animate-scroll" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.1); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(12px); opacity: 0; }
        }
        .animate-float { animation: float infinite ease-in-out; }
        .animate-pulse-slow { animation: pulse-slow 4s infinite; }
        .animate-spin-slow { animation: spin-slow 6s linear infinite; }
        .animate-gradient { animation: gradient 3s ease infinite; }
        .animate-fade-in { animation: fade-in 1s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out both; }
        .animate-bounce-slow { animation: bounce-slow 2s infinite; }
        .animate-scroll { animation: scroll 2s infinite; }
      `}</style>
    </div>
  )
}