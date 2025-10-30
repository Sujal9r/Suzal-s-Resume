import { motion, useScroll, useTransform } from 'framer-motion'

export default function Background() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 800], [0, -80])
  const y2 = useTransform(scrollY, [0, 800], [0, -40])
  const yStars = useTransform(scrollY, [0, 800], [0, -20])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1220] via-[#0c1430] to-[#0b1220]" />
      {/* large blurred blobs */}
      <motion.div
        className="absolute -top-24 -left-24 h-[40rem] w-[40rem] rounded-full"
        style={{ y: y1, background: 'radial-gradient(circle at 30% 30%, rgba(3,27,89,0.35), transparent 60%)', filter: 'blur(60px)' }}
      />
      <motion.div
        className="absolute top-1/3 -right-40 h-[36rem] w-[36rem] rounded-full"
        style={{ y: y2, background: 'radial-gradient(circle at 70% 40%, rgba(3,27,89,0.28), transparent 60%)', filter: 'blur(70px)' }}
      />
      {/* starfield layers */}
      <motion.div style={{ y: yStars }} className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full">
          {Array.from({ length: 220 }).map((_, i) => {
            const cx = (i * 73) % 1600
            const cy = (i * 101) % 1000
            const r = (i % 7 === 0) ? 1.8 : (i % 5 === 0) ? 1.4 : 1
            const palette = ['#7dd3fc', '#60a5fa', '#a78bfa', '#93c5fd'] // cyan, blue, violet tints
            const fill = palette[i % palette.length]
            const twinkle = 2.5 + (i % 7) * 0.35
            return (
              <g key={i} opacity="0.9">
                <circle cx={cx} cy={cy} r={r} fill={fill} />
                <animate xlinkHref={undefined} attributeName="opacity" values="0.4;1;0.4" dur={`${twinkle}s`} begin={`${(i % 11) * 0.3}s`} repeatCount="indefinite" />
              </g>
            )
          })}
        </svg>
      </motion.div>

      {/* subtle drifting colored stars */}
      <motion.div style={{ y: yStars }} className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full">
          {Array.from({ length: 60 }).map((_, i) => {
            const cx = (i * 257) % 1600
            const cy = (i * 149) % 1000
            const r = 2.4
            const fill = i % 2 ? 'rgba(6,182,212,0.7)' : 'rgba(59,130,246,0.7)'
            const dy = 30 + (i % 5) * 10
            const dur = 14 + (i % 5) * 2
            return (
              <circle key={i} cx={cx} cy={cy} r={r} fill={fill}>
                <animate attributeName="cy" values={`${cy};${cy + dy};${cy}`} dur={`${dur}s`} repeatCount="indefinite" />
              </circle>
            )
          })}
        </svg>
      </motion.div>

      {/* local style for star twinkle fallback */}
      <style>{`
        @keyframes twinkle { 0%,100%{opacity:.4} 50%{opacity:1} }
      `}</style>
    </div>
  )
}


