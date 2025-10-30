import { useEffect, useRef, useState } from 'react'

export default function SitePreview({ url, title }) {
  const containerRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [scale, setScale] = useState(1)

  // Lazy-load when visible
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      })
    }, { rootMargin: '0px 0px 200px 0px', threshold: 0.1 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Compute scale to fit a laptop viewport (1280x800)
  useEffect(() => {
    const computeScale = () => {
      const el = containerRef.current
      if (!el) return
      const targetWidth = 1280
      const targetHeight = 800
      const cw = el.clientWidth
      const ch = el.clientHeight
      if (!cw || !ch) return
      const s = Math.min(cw / targetWidth, ch / targetHeight)
      setScale(s)
    }
    computeScale()
    const onResize = () => computeScale()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div ref={containerRef} className="relative rounded-xl overflow-hidden border border-white/10 bg-slate-900" style={{ aspectRatio: '16 / 10' }}>
      {visible ? (
        <div className="absolute top-0 left-0" style={{ width: 1280 * scale, height: 800 * scale }}>
          <iframe
            title={title || url}
            src={url}
            loading="lazy"
            sandbox="allow-same-origin allow-scripts allow-forms allow-pointer-lock allow-popups-to-escape-sandbox"
            style={{ width: 1280, height: 800, transform: `scale(${scale})`, transformOrigin: 'top left' }}
            className="pointer-events-none rounded-lg"
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800" />
      )}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-base/50 via-transparent to-transparent" />
    </div>
  )
}


