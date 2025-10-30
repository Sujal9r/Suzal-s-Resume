import { motion } from 'framer-motion'

export default function Section({ title, subtitle, children, id }) {
  return (
    <div id={id} className="mx-auto max-w-6xl px-4 py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-120px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        data-aos="fade-up"
      >
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">{title}</h2>
        {subtitle && <p className="text-white/60 mb-8">{subtitle}</p>}
        {children}
      </motion.div>
    </div>
  )
}


