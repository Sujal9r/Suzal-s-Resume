import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-10 text-center text-white/60"
    >
      © 2025 Suzal Sharma
    </motion.footer>
  )
}


