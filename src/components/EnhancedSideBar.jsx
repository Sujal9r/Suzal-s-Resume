import React, { useState, useEffect, useRef } from 'react'

export default function EnhancedSideBar() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeIconIndex, setActiveIconIndex] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [pulseIndicator, setPulseIndicator] = useState(true)
  const [isLaptopScreen, setIsLaptopScreen] = useState(true)
  const autoHideTimerRef = useRef(null)

  const [borderRotation, setBorderRotation] = useState(0)
  const animationRef = useRef(null)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLaptopScreen(window.innerWidth >= 1024)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  useEffect(() => {
    const animateBorder = () => {
      const speed = 0.3 + Math.sin(Date.now() / 2000) * 0.2
      setBorderRotation((prev) => (prev + speed) % 360)
      animationRef.current = requestAnimationFrame(animateBorder)
    }
    animationRef.current = requestAnimationFrame(animateBorder)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  const handleMouseEnter = () => {
    setIsVisible(true)
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 600)
    if (autoHideTimerRef.current) clearTimeout(autoHideTimerRef.current)
    autoHideTimerRef.current = setTimeout(() => setIsVisible(false), 6000)
  }

  const handleMouseLeave = () => {
    setIsVisible(false)
    setActiveIconIndex(null)
  }

  useEffect(() => {
    const autoShowInterval = setInterval(() => {
      setPulseIndicator(false)
      setIsVisible(true)
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 600)
      setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => setPulseIndicator(true), 500)
      }, 5000)
    }, 45000)
    return () => clearInterval(autoShowInterval)
  }, [])

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setIsVisible(true)
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 600)
      setTimeout(() => setIsVisible(false), 5000)
    }, 1500)
    return () => clearTimeout(initialTimer)
  }, [])

  const socialIcons = [
    {
      name: 'Twitter',
      color: '#1DA1F2',
      url: 'https://twitter.com',
      gradient: 'from-blue-400 to-blue-600',
      hoverGlow: 'rgba(29, 161, 242, 0.5)',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.09l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      color: '#E1306C',
      url: 'https://instagram.com',
      gradient: 'from-pink-500 via-purple-500 to-yellow-500',
      hoverGlow: 'rgba(225, 48, 108, 0.5)',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 8.837c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      color: '#4267B2',
      url: 'https://facebook.com',
      gradient: 'from-blue-500 to-blue-700',
      hoverGlow: 'rgba(66, 103, 178, 0.5)',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      color: '#FF0000',
      url: 'https://youtube.com',
      gradient: 'from-red-500 to-red-700',
      hoverGlow: 'rgba(255, 0, 0, 0.5)',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      color: '#333333',
      url: 'https://github.com',
      gradient: 'from-gray-700 to-gray-900',
      hoverGlow: 'rgba(51, 51, 51, 0.5)',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      ),
    },
  ]

  const handleIconHover = (index) => {
    setActiveIconIndex(index)
    if (autoHideTimerRef.current) clearTimeout(autoHideTimerRef.current)
    autoHideTimerRef.current = setTimeout(() => setIsVisible(false), 6000)
  }

  const handleIconClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const getBorderStyle = (rotation) => {
    return {
      position: 'absolute',
      inset: '-1px',
      borderRadius: '0 12px 12px 0',
      background: `conic-gradient(from ${rotation}deg, rgba(0,0,0,0), rgba(138, 43, 226, 0.8), rgba(79, 70, 229, 0.9), rgba(16, 185, 129, 0.7), rgba(0,0,0,0))`,
      opacity: 0.6,
      zIndex: 0,
    }
  }

  return (
    <div className="sidebar-container fixed left-0 top-0 h-full z-40 pointer-events-none">
      <div className="pointer-events-auto">
        <div
          className={`absolute left-0 top-1/3 transition-all duration-500 ease-in-out cursor-pointer ${pulseIndicator ? 'animate-pulse' : ''}`}
          style={{ opacity: isVisible ? 0 : 0.9 }}
          onMouseEnter={handleMouseEnter}
        >
          <div className="relative w-3 h-40 bg-gradient-to-b from-violet-600 via-indigo-600 to-emerald-500 rounded-r-lg">
            <div className="absolute inset-0 bg-gradient-to-b from-violet-300 via-indigo-600 to-emerald-300 rounded-r-lg opacity-70 blur-sm"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-80">
              <div className="w-1 h-16 bg-white opacity-30 rounded-full"></div>
            </div>
          </div>
        </div>

        <div
          className={`absolute left-0 top-1/3 -mt-16 transition-all duration-500 ease-out ${isVisible ? 'w-16 opacity-100' : 'w-0 opacity-0'}`}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: isVisible ? 'translateX(0) rotateY(0deg)' : 'translateX(-100%) rotateY(-30deg)',
            transformOrigin: 'left center',
            boxShadow: isVisible ? '0 0 35px rgba(79, 70, 229, 0.3)' : 'none',
            borderRadius: '0 12px 12px 0',
          }}
        >
          <div className="relative h-auto overflow-visible rounded-r-xl">
            <div
              className="absolute inset-0 rounded-r-xl overflow-hidden"
              style={{ mask: 'radial-gradient(farthest-side at 0% 50%, transparent 94%, white 95%)' }}
            >
              <div style={getBorderStyle(borderRotation)}></div>
            </div>

            <div
              className={`absolute inset-0.5 bg-gradient-to-b from-gray-900 via-indigo-950 to-slate-900 transition-all duration-700 rounded-r-xl z-10`}
              style={{ transform: isAnimating ? 'scale(1.04)' : 'scale(1)', backdropFilter: 'blur(8px)' }}
            >
              <div className="absolute inset-0 opacity-5">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 15px 15px, rgba(255, 255, 255, 0.2) 2px, transparent 0)',
                    backgroundSize: '30px 30px',
                  }}
                ></div>
              </div>
            </div>

            <div className="relative py-8 flex flex-col justify-center items-center z-20">
              <div className="w-full flex flex-col items-center space-y-7">
                {socialIcons.map((item, index) => (
                  <div
                    key={index}
                    className="w-full flex justify-center"
                    onMouseEnter={() => handleIconHover(index)}
                    onMouseLeave={() => handleIconHover(null)}
                    onClick={() => handleIconClick(item.url)}
                    style={{
                      transform: isVisible ? `translateX(${isAnimating ? (index % 2 === 0 ? '-8px' : '8px') : '0'})` : 'translateX(-24px)',
                      opacity: isVisible ? 1 : 0,
                      transition: `transform 500ms cubic-bezier(0.17, 0.67, 0.26, 1.01) ${100 + index * 80}ms, opacity 400ms ease-out ${100 + index * 80}ms`,
                    }}
                  >
                    <div
                      className={`relative group w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${activeIconIndex === index ? 'scale-110' : 'hover:scale-105'}`}
                      style={{
                        background: activeIconIndex === index ? `linear-gradient(135deg, ${item.color}90, ${item.color}40)` : 'rgba(15, 15, 35, 0.7)',
                        boxShadow: activeIconIndex === index ? `0 0 15px ${item.color}60` : '0 2px 5px rgba(0,0,0,0.2)',
                        border: activeIconIndex === index ? '1px solid rgba(255,255,255,0.4)' : '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      <div
                        className={`text-white transition-all duration-300 z-10 ${activeIconIndex === index ? 'scale-110' : 'scale-100'}`}
                        style={{ filter: activeIconIndex === index ? 'drop-shadow(0 0 3px rgba(255,255,255,0.5))' : 'none' }}
                      >
                        {item.icon}
                      </div>

                      {isLaptopScreen && (
                        <div
                          className={`absolute left-[calc(100%+12px)] bg-gradient-to-r ${item.gradient} px-3 py-1.5 rounded-lg text-white text-xs font-medium transition-all duration-300 z-20 drop-shadow-xl`}
                          style={{
                            whiteSpace: 'nowrap',
                            opacity: activeIconIndex === index ? 1 : 0,
                            transform: activeIconIndex === index ? 'translateX(0) scale(1)' : 'translateX(-12px) scale(0.9)',
                            boxShadow: activeIconIndex === index ? '0 3px 10px rgba(0,0,0,0.3)' : 'none',
                          }}
                        >
                          <span className="relative">
                            {item.name}
                            <span
                              className="absolute -left-5 top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-transparent border-r-current"
                              style={{ color: activeIconIndex === index ? item.color : 'transparent' }}
                            ></span>
                          </span>
                        </div>
                      )}
                      {activeIconIndex === index && (
                        <div
                          className="relative inset-0 rounded-full animate-pulse"
                          style={{ background: `radial-gradient(circle, ${item.hoverGlow} 0%, transparent 70%)`, filter: 'blur(5px)' }}
                        ></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="absolute -bottom-2 left-0 w-full flex justify-center"
                style={{ opacity: isVisible ? 0.7 : 0, transform: `translateY(${isAnimating ? '-4px' : '0'})`, transition: 'transform 500ms ease-out, opacity 300ms ease-out' }}
              >
                <div className="w-10 h-1 rounded-full bg-gradient-to-r from-violet-400 via-indigo-500 to-emerald-400"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


