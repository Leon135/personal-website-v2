"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

function useActiveSection() {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY
      const viewportH = window.innerHeight
      const trigger = scrollY + viewportH * 0.4

      let best: string | null = null
      let bestTop = -Infinity

      navItems.forEach(({ href }) => {
        const id = href.replace("#", "")
        const el = document.getElementById(id)
        if (!el) return
        const top = el.getBoundingClientRect().top + scrollY
        if (top <= trigger && top > bestTop) {
          bestTop = top
          best = id
        }
      })

      setActive(best)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return active
}

export function Navbar() {
  const activeSection = useActiveSection()

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex items-center gap-1 px-3 py-2 bg-card/90 backdrop-blur-xl border border-border rounded-full shadow-xl shadow-black/40">
        {navItems.map((item) => {
          const id = item.href.replace("#", "")
          const isActive = activeSection === id

          return (
            <a
              key={id}
              href={item.href}
              className="relative flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors duration-300"
            >
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    className="absolute inset-0 rounded-full bg-primary/10 border border-primary/20"
                  />
                )}
              </AnimatePresence>
              <span
                className={`relative w-1.5 h-1.5 rounded-full transition-all duration-500 ease-out ${
                  isActive ? "bg-primary scale-110" : "bg-muted-foreground/40"
                }`}
              />
              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.span
                    key={id}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 4 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    className="relative text-xs font-medium whitespace-nowrap text-primary/90"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </a>
          )
        })}
      </div>
    </motion.div>
  )
}
