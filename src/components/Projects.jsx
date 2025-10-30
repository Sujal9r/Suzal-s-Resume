import Section from './Section.jsx'
import { motion } from 'framer-motion'
import SitePreview from './SitePreview.jsx'

const projects = [
  {
    title: 'Task Me — Project Management',
    desc: 'All-in-one work management with Kanban, sprints, assets, and automation.',
    tags: ['Next.js', 'Tailwind', 'AOS'],
    link: 'https://task-me-nine.vercel.app/',
  },
  {
    title: 'Dxyra — Business OS Suite',
    desc: 'Unified cloud software suite: HR, payroll, hiring, timesheets, and more.',
    tags: ['Next.js', 'Tailwind', 'AOS'],
    link: 'https://www.dxyra.com/',
    image: '/projects/dxyra.jpg',
  },
  {
    title: 'S9R Technology',
    desc: 'Modern web experiences and solutions. Emphasis on clean UI and performance.',
    tags: ['React', 'Vite', 'Tailwind', 'Framer Motion'],
    link: 'https://s9rtechnology.vercel.app/',
    image: '/projects/s9rtechnology.jpg',
  },
  {
    title: 'Global Wheelz',
    desc: 'International logistics website: air/sea freight, customs, and transport.',
    tags: ['Next.js', 'Tailwind', 'AOS'],
    link: 'https://global-wheelz.vercel.app/',
  },
  {
    title: 'Home Decorz',
    desc: 'Home decor services site with process, services, and testimonials.',
    tags: ['React', 'Tailwind', 'AOS'],
    link: 'https://home-decor-brown.vercel.app/',
  },
  {
    title: 'Grafico — Designer Portfolio',
    desc: 'Graphic design & UI/UX portfolio highlighting branding and illustrations.',
    tags: ['Next.js', 'Tailwind', 'AOS'],
    link: 'https://grafico-green.vercel.app/',
  },
]

function TiltCard({ children }) {
  return (
    <div
      className="group relative [perspective:1000px]"
      onMouseMove={(e) => {
        const card = e.currentTarget
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const midX = rect.width / 2
        const midY = rect.height / 2
        const rotateX = ((y - midY) / midY) * -6
        const rotateY = ((x - midX) / midX) * 6
        card.style.setProperty('--rx', rotateX.toFixed(2) + 'deg')
        card.style.setProperty('--ry', rotateY.toFixed(2) + 'deg')
      }}
      onMouseLeave={(e) => {
        const card = e.currentTarget
        card.style.setProperty('--rx', '0deg')
        card.style.setProperty('--ry', '0deg')
      }}
    >
      <div className="transition-transform duration-200 [transform-style:preserve-3d]" style={{ transform: 'rotateX(var(--rx)) rotateY(var(--ry))' }}>
        {children}
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <Section id="projects" title="Experience & Projects" subtitle="Selected works with a focus on UX and performance.">
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <TiltCard key={p.title}>
            <motion.a
              href={p.link}
              target="_blank"
              rel="noreferrer noopener"
              className="group glass rounded-2xl p-6 block h-full"
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 250, damping: 20 }}
              data-aos="fade-up"
              data-aos-delay={String(i * 100)}
            >
              {/* Live laptop preview for all projects */}
              {p.link ? (
                <SitePreview url={p.link} title={p.title} />
              ) : p.image ? (
                <div className={`rounded-xl mb-4 overflow-hidden border border-white/10 ${p.title.includes('Dxyra') ? 'bg-white/5 p-2' : ''}`} style={{ aspectRatio: '16 / 9' }}>
                  <img
                    src={p.image}
                    alt={p.title}
                    className={`${p.title.includes('Dxyra') ? 'object-contain bg-slate-900' : 'object-cover'} w-full h-full object-center transition-transform duration-500 group-hover:scale-[1.03]`}
                    onError={(e) => {
                      const el = e.currentTarget
                      const triedPng = el.getAttribute('data-tried-png')
                      if (!triedPng && el.src.endsWith('.jpg')) {
                        el.setAttribute('data-tried-png', '1')
                        el.src = el.src.replace(/\.jpg$/i, '.png')
                        return
                      }
                      el.onerror = null
                      el.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(`<?xml version=\"1.0\" encoding=\"UTF-8\"?><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1280\" height=\"720\" viewBox=\"0 0 1280 720\"><defs><linearGradient id=\"g\" x1=\"0\" x2=\"1\" y1=\"0\" y2=\"1\"><stop offset=\"0%\" stop-color=\"#0ea5e9\"/><stop offset=\"100%\" stop-color=\"#3b82f6\"/></linearGradient></defs><rect width=\"1280\" height=\"720\" fill=\"#0b1220\"/><rect x=\"40\" y=\"40\" width=\"1200\" height=\"640\" rx=\"24\" fill=\"url(#g)\" opacity=\"0.25\"/><text x=\"50%\" y=\"50%\" dominant-baseline=\"middle\" text-anchor=\"middle\" fill=\"#7dd3fc\" font-family=\"ui-sans-serif, system-ui\" font-size=\"28\">Preview</text></svg>`)
                    }}
                  />
                </div>
              ) : (
                <div className="h-36 rounded-xl mb-4" style={{ background: 'radial-gradient(120px 80px at 30% 30%, rgba(3,27,89,0.35), transparent 60%)' }} />
              )}
              <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
              <p className="text-white/70 text-sm mb-4">{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10">{t}</span>
                ))}
              </div>
            </motion.a>
          </TiltCard>
        ))}
      </div>
    </Section>
  )
}


