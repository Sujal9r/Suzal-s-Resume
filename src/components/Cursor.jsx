import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const [isMoving, setIsMoving] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [clickedAt, setClickedAt] = useState(0)
  const prev = useRef({ x: 0, y: 0 })
  const [angle, setAngle] = useState(0)

  const smoothX = useSpring(x, { stiffness: 350, damping: 28 })
  const smoothY = useSpring(y, { stiffness: 350, damping: 28 })

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const dx = e.clientX - prev.current.x
      const dy = e.clientY - prev.current.y
      if (dx !== 0 || dy !== 0) {
        setAngle(Math.atan2(dy, dx) * (180 / Math.PI) + 90)
      }
      prev.current = { x: e.clientX, y: e.clientY }
      setIsMoving(true)
      clearTimeout(window.__cursorTimeout)
      window.__cursorTimeout = setTimeout(() => setIsMoving(false), 140)
    }
    const down = () => setClickedAt(Date.now())
    const over = (e) => {
      const tag = e.target.tagName.toLowerCase()
      const role = e.target.getAttribute('role')
      setIsHovering(tag === 'a' || tag === 'button' || role === 'button')
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseover', over)
    }
  }, [x, y])

  const clickWaveVisible = Date.now() - clickedAt < 400

  return (
    <>
      {/* Core triangle with gradient and subtle rotation */}
      <motion.div
        className="pointer-events-none fixed z-[60]"
        style={{
          left: smoothX,
          top: smoothY,
          width: 'calc(var(--cursor-size) * 1.2)',
          height: 'calc(var(--cursor-size) * 1.2)',
          x: '-50%',
          y: '-50%',
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          rotate: angle,
          background: isHovering
            ? 'linear-gradient(135deg, rgba(6,182,212,0.95), rgba(59,130,246,0.95))'
            : 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(200,200,255,0.6))',
          boxShadow: isHovering
            ? '0 8px 40px rgba(6,182,212,0.45)'
            : '0 6px 28px rgba(3,27,89,0.35)',
          mixBlendMode: 'difference',
        }}
        animate={{ scale: isHovering ? 1.15 : 1.0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      />

      {/* Outer glow cone */}
      <motion.div
        className="pointer-events-none fixed z-[50]"
        style={{
          left: smoothX,
          top: smoothY,
          width: 'calc(var(--cursor-size) * 2.2)',
          height: 'calc(var(--cursor-size) * 2.2)',
          x: '-50%',
          y: '-50%',
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          rotate: angle,
        }}
        animate={{ boxShadow: isMoving ? '0 0 140px 50px rgba(3,27,89,0.5)' : '0 0 90px 28px rgba(3,27,89,0.3)' }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      />

      {/* Thin rotating ring for premium feel */}
      <motion.div
        className="pointer-events-none fixed z-[55]"
        style={{
          left: smoothX,
          top: smoothY,
          width: 'calc(var(--cursor-size) * 2.4)',
          height: 'calc(var(--cursor-size) * 2.4)',
          x: '-50%',
          y: '-50%',
          borderRadius: '50%'
        }}
        animate={{ rotate: isMoving ? 180 : 0, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08), 0 0 40px rgba(3,27,89,0.25)' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />

      {/* Click ripple */}
      {clickWaveVisible && (
        <motion.div
          className="pointer-events-none fixed z-[54] rounded-full"
          style={{ left: smoothX, top: smoothY, x: '-50%', y: '-50%', width: 8, height: 8, background: 'rgba(6,182,212,0.5)' }}
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 6 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      )}
    </>
  )
}


