import Section from './Section.jsx'
import { motion } from 'framer-motion'
import { SiReact, SiRedux, SiJavascript, SiTailwindcss, SiThreedotjs, SiTypescript, SiMongodb, SiExpress, SiNodedotjs } from 'react-icons/si'

const skills = [
  { name: 'React', level: 90, Icon: SiReact, color: '#61DAFB' },
  { name: 'Redux', level: 80, Icon: SiRedux, color: '#764ABC' },
  { name: 'JavaScript', level: 92, Icon: SiJavascript, color: '#F7DF1E' },
  { name: 'TypeScript', level: 75, Icon: SiTypescript, color: '#3178C6' },
  { name: 'Tailwind', level: 88, Icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Node.js', level: 80, Icon: SiNodedotjs, color: '#68A063' },
  { name: 'Express', level: 78, Icon: SiExpress, color: '#FFFFFF' },
  { name: 'MongoDB', level: 76, Icon: SiMongodb, color: '#47A248' },
  { name: 'Three.js', level: 60, Icon: SiThreedotjs, color: '#FFFFFF' },
]

export default function Skills() {
  return (
    <Section id="skills" title="Skills" subtitle="Tools and technologies I work with.">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          {skills.map(({ name, level, Icon, color }, i) => (
            <div key={name} className="">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-white/90"><Icon style={{ color }} /> {name}</div>
                <span className="text-white/60 text-sm">{level}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden" data-aos="fade-right" data-aos-delay={String(i * 80)}>
                <motion.div
                  className="h-full rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: 'easeOut' }}
                  style={{ background: 'linear-gradient(90deg, rgba(3,27,89,0.9), rgba(3,27,89,0.6))' }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-3 gap-4">
          {skills.map(({ name, Icon, color }, i) => (
            <motion.div key={name}
              whileHover={{ y: -6, rotate: -1 }}
              className="glass rounded-xl p-5 flex flex-col items-center gap-2 text-center"
              data-aos="zoom-in"
              data-aos-delay={String(i * 80)}
            >
              <Icon className="text-5xl" style={{ color }} />
              <span className="text-base text-white/80">{name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}


