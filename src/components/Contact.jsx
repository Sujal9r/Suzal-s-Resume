import Section from './Section.jsx'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { useState } from 'react'
import emailjs from '@emailjs/browser'

export default function Contact() {
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (sending) return
    setStatus(null)
    setSending(true)

    const form = new FormData(e.currentTarget)
    const name = form.get('name')
    const email = form.get('email')
    const message = form.get('message')

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      if (serviceId && templateId && publicKey) {
        await emailjs.send(serviceId, templateId, {
          from_name: name,
          reply_to: email,
          message,
          to_email: 'sujalsukoimk5@gmail.com',
        }, { publicKey })
        setStatus({ ok: true, msg: 'Message sent successfully!' })
        e.currentTarget.reset()
      } else {
        // Fallback: open mail client
        window.location.href = `mailto:sujalsukoimk5@gmail.com?subject=Portfolio%20Contact%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + email)}`
      }
    } catch (err) {
      setStatus({ ok: false, msg: 'Failed to send. Please try again.' })
    } finally {
      setSending(false)
    }
  }

  return (
    <Section id="contact" title="Get in touch" subtitle="Let’s build something great together.">
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div className="glass rounded-2xl p-6" data-aos="fade-up">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm text-white/70">Name</label>
              <input name="name" required className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-neon-blue/60" placeholder="Your name" />
            </div>
            <div>
              <label className="text-sm text-white/70">Email</label>
              <input name="email" type="email" required className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-neon-blue/60" placeholder="you@example.com" />
            </div>
            <div>
              <label className="text-sm text-white/70">Message</label>
              <textarea name="message" required className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 h-28 outline-none focus:border-neon-blue/60" placeholder="Say hello..." />
            </div>
            {status && (
              <div className={`text-sm ${status.ok ? 'text-emerald-400' : 'text-red-400'}`}>{status.msg}</div>
            )}
            <motion.button type="submit" disabled={sending} whileHover={{ y: -2 }} whileTap={{ y: 0 }} className="px-5 py-2 rounded-lg bg-neon-blue/40 border border-neon-blue/40 hover:shadow-glow disabled:opacity-60">
              {sending ? 'Sending...' : 'Send Message'}
            </motion.button>
          </form>
        </motion.div>
        <div className="space-y-4" data-aos="fade-left">
          <p className="text-white/70">Prefer email or socials?</p>
          <div className="flex gap-3">
            <a className="glass rounded-xl px-4 py-3 inline-flex items-center gap-2 hover:shadow-glow" href="mailto:sujal@example.com"><FiMail /> Email</a>
            <a className="glass rounded-xl px-4 py-3 inline-flex items-center gap-2 hover:shadow-glow" href="https://www.linkedin.com/in/suzal-sharma-80863a248/" target="_blank" rel="noreferrer"><FiLinkedin /> LinkedIn</a>
            <a className="glass rounded-xl px-4 py-3 inline-flex items-center gap-2 hover:shadow-glow" href="https://github.com" target="_blank" rel="noreferrer"><FiGithub /> GitHub</a>
          </div>
        </div>
      </div>
    </Section>
  )
}


