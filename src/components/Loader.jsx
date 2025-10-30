import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onDone, durationMs = 4000 }) {
  const [progress, setProgress] = useState(0)
  const [blink, setBlink] = useState(false)
  const steps = useMemo(() => Math.max(40, Math.floor(durationMs / 50)), [durationMs])

  useEffect(() => {
    const tick = durationMs / steps
    let i = 0
    const id = setInterval(() => {
      i += 1
      const newProgress = Math.min(100, Math.round((i / steps) * 100))
      setProgress(newProgress)

      // Trigger blink when progress hits 75%
      if (newProgress === 75) {
        setBlink(true)
        setTimeout(() => setBlink(false), 400) // blink duration
      }

      if (i >= steps) {
        clearInterval(id)
        setTimeout(() => onDone?.(), 500)
      }
    }, tick)
    return () => clearInterval(id)
  }, [durationMs, steps, onDone])

  return (
    <div className="fixed inset-0 z-[999] bg-[#030014] overflow-hidden flex items-center justify-center flex-col">
      {/* Background Warp */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="w-full h-full opacity-60">
          {Array.from({ length: 150 }).map((_, i) => (
            <line
              key={i}
              x1={(i * 47) % 1600}
              y1={(i * 71) % 900}
              x2={(i * 47) % 1600}
              y2={((i * 71) % 900) + 30}
              stroke={i % 2 ? 'rgba(59,130,246,0.3)' : 'rgba(6,182,212,0.35)'}
              strokeWidth={i % 8 === 0 ? 1.4 : 0.8}
            >
              <animate
                attributeName="y2"
                values={`${((i * 71) % 900) + 30};${((i * 71) % 900) + 130};${((i * 71) % 900) + 30}`}
                dur={`${3.5 + (i % 5)}s`}
                repeatCount="indefinite"
              />
            </line>
          ))}
        </svg>
      </div>

      {/* Central Rings */}
      <div className="relative">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-cyan-400/30"
            style={{
              width: 120 + i * 90,
              height: 120 + i * 90,
              left: -(120 + i * 90) / 2,
              top: -(120 + i * 90) / 2,
              boxShadow: '0 0 30px rgba(6,182,212,0.3)',
              borderColor: i % 2 ? 'rgba(6,182,212,0.45)' : 'rgba(59,130,246,0.35)',
            }}
            initial={{ rotate: 0, opacity: 0 }}
            animate={{
              rotate: i % 2 ? 360 : -360,
              opacity: 1,
              scale: blink && i === 1 ? [1, 1.3, 1] : 1,
            }}
            transition={{
              duration: blink && i === 1 ? 0.4 : 6 + i,
              repeat: blink && i === 1 ? 0 : Infinity,
              ease: 'linear',
            }}
          />
        ))}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
          style={{
            background: 'linear-gradient(135deg,#06b6d4,#3b82f6)',
            boxShadow: '0 0 50px 15px rgba(6,182,212,0.7)',
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
      </div>

      {/* Text */}
      <motion.div
        className="text-center mt-10 text-white/80 text-sm tracking-widest"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
       Initializing Details ...
      </motion.div>

      {/* Progress Bar */}
      <div className="relative mt-6 w-[80%] max-w-md h-3 rounded-full bg-white/10 overflow-hidden backdrop-blur-md">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg,#06b6d4,#3b82f6)' }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: 'linear' }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)] animate-[shine_2s_infinite]" />
      </div>

      <div className="text-white/70 text-xs mt-3">{progress}% LOADED</div>

      {/* Flickering tagline */}
      <motion.div
        className="absolute bottom-8 text-white/50 text-[11px] tracking-[0.3em] uppercase"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <span className="text-cyan-400">S9R SYSTEM</span> • INITIALIZING CORE
      </motion.div>

      {/* Blink Flash Overlay */}
      <AnimatePresence>
        {blink && (
          <motion.div
            className="absolute inset-0 bg-white/20 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      <style>{`
        @keyframes shine { 
          0% { background-position: -200px 0; } 
          100% { background-position: 200px 0; } 
        }
      `}</style>
    </div>
  )
}
