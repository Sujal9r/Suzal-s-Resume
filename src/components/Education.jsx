import Section from './Section.jsx'
import { motion } from 'framer-motion'

export default function Education() {
  const items = [
    { year: '2023 — Present', title: 'Pursuing BCA', place: 'Bachelor of Computer Applications' },
  ]
  return (
    <Section id="education" title="Education" subtitle="My academic journey.">
      <div className="relative">
        <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-px h-full bg-white/10" />
        <div className="space-y-8">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`relative md:w-1/2 ${i % 2 ? 'md:ml-auto md:pl-10' : 'md:pr-10'}`}
              data-aos={i % 2 ? 'fade-left' : 'fade-right'}
            >
              <div className="absolute left-4 md:left-auto md:right-[-8px] md:translate-x-1/2 top-3 h-4 w-4 rounded-full bg-neon-blue shadow-glow" />
              <div className="glass rounded-xl p-5">
                <p className="text-xs text-white/60 mb-1">{it.year}</p>
                <h3 className="font-semibold">{it.title}</h3>
                <p className="text-white/70 text-sm">{it.place}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}


