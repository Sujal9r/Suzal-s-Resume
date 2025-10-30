import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const JOIN_DATE_ISO = '2024-03-29T00:00:00'

function getDiffParts(start, end) {
  let delta = Math.max(0, end - start)
  const years = Math.floor(delta / (365.25 * 24 * 3600 * 1000))
  delta -= years * 365.25 * 24 * 3600 * 1000
  const days = Math.floor(delta / (24 * 3600 * 1000))
  delta -= days * 24 * 3600 * 1000
  const hours = Math.floor(delta / (3600 * 1000))
  delta -= hours * 3600 * 1000
  const minutes = Math.floor(delta / (60 * 1000))
  delta -= minutes * 60 * 1000
  const seconds = Math.floor(delta / 1000)
  return { years, days, hours, minutes, seconds }
}

function getYearProgress(start, now) {
  // Last anniversary since start
  const startDate = new Date(start)
  const n = new Date(now)
  const currentYear = n.getFullYear()
  const anniversaryThisYear = new Date(currentYear, startDate.getMonth(), startDate.getDate())
  const lastAnniv = n >= anniversaryThisYear ? anniversaryThisYear : new Date(currentYear - 1, startDate.getMonth(), startDate.getDate())
  const nextAnniv = n >= anniversaryThisYear ? new Date(currentYear + 1, startDate.getMonth(), startDate.getDate()) : anniversaryThisYear
  const total = nextAnniv - lastAnniv
  const elapsed = n - lastAnniv
  return { progress: Math.min(1, Math.max(0, elapsed / total)), nextAnniv }
}

export default function ExperienceMeter() {
  const joinDate = useMemo(() => new Date(JOIN_DATE_ISO), [])
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const { years, days, hours, minutes, seconds } = getDiffParts(joinDate, now)
  const { progress, nextAnniv } = getYearProgress(joinDate, now)
  const tillNext = getDiffParts(now, nextAnniv)

  const size = 180
  const stroke = 10
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const dash = circumference * progress

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-5 items-center"
      data-aos="zoom-in"
    >
      <div className="relative mx-auto" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="rotate-[-90deg]">
          <circle cx={size/2} cy={size/2} r={radius} stroke="rgba(255,255,255,0.1)" strokeWidth={stroke} fill="none" />
          <circle
            cx={size/2}
            cy={size/2}
            r={radius}
            stroke="url(#grad)"
            strokeWidth={stroke}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={`${dash} ${circumference}`}
          />
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(6,182,212,1)" />
              <stop offset="100%" stopColor="rgba(59,130,246,1)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="text-xs uppercase tracking-wider text-white/60">Experience</div>
          <div className="text-2xl font-semibold">{years}+ yrs</div>
          <div className="text-[10px] text-white/60">since Mar 29, 2024</div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="text-sm text-white/70">Live counter</div>
        <div className="text-lg font-medium">
          {years}y {days}d {hours}h {minutes}m {seconds}s
        </div>
        <div className="text-xs text-white/60">Till next anniversary</div>
        <div className="flex gap-2 text-sm text-white/80">
          <span className="px-2 py-1 rounded bg-white/5 border border-white/10">{tillNext.days}d</span>
          <span className="px-2 py-1 rounded bg-white/5 border border-white/10">{tillNext.hours}h</span>
          <span className="px-2 py-1 rounded bg-white/5 border border-white/10">{tillNext.minutes}m</span>
          <span className="px-2 py-1 rounded bg-white/5 border border-white/10">{tillNext.seconds}s</span>
        </div>
        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${Math.round(progress*100)}%`, background: 'linear-gradient(90deg, rgba(6,182,212,0.9), rgba(59,130,246,0.8))' }} />
        </div>
        <div className="text-xs text-white/60">{Math.round(progress*100)}% of current year</div>
      </div>
    </motion.div>
  )
}


