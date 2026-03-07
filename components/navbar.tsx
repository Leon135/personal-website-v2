"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

const SPRING = { type: "spring", stiffness: 180, damping: 26, mass: 0.8 }
const FADE = { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }

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

function NavItem({
  item,
  isActive,
}: {
  item: (typeof navItems)[number]
  isActive: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const labelRef = useRef<HTMLSpanElement>(null)
  const [labelWidth, setLabelWidth] = useState(0)

  useEffect(() => {
    if (labelRef.current) {
      setLabelWidth(labelRef.current.scrollWidth)
    }
  }, [])

  const showLabel = isActive || hovered

  return (
    <a
      href={item.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer"
    >
      {/* Background pill */}
      <AnimatePresence>
        {showLabel && (
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={FADE}
            className={`absolute inset-0 rounded-full border ${
              isActive
                ? "bg-primary/10 border-primary/25"
                : "bg-muted/50 border-border"
            }`}
          />
        )}
      </AnimatePresence>

      {/* Dot */}
      <span
        className={`relative w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-500 ${
          isActive
            ? "bg-primary scale-110"
            : hovered
            ? "bg-muted-foreground/70"
            : "bg-muted-foreground/35"
        }`}
      />

      {/* Label — hidden offscreen to measure, then animated in */}
      <span
        ref={labelRef}
        aria-hidden
        className="absolute opacity-0 pointer-events-none text-xs font-medium whitespace-nowrap"
      >
        {item.name}
      </span>

      <motion.span
        animate={{
          width: showLabel ? labelWidth : 0,
          opacity: showLabel ? 1 : 0,
        }}
        transition={SPRING}
        className="overflow-hidden whitespace-nowrap flex items-center"
        style={{ display: "flex" }}
      >
        <span
          className="text-xs font-medium leading-none text-muted-foreground/60"
        >
          {item.name}
        </span>
      </motion.span>
    </a>
  )
}

export function Navbar() {
  const activeSection = useActiveSection()

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <motion.div
        layout
        transition={SPRING}
        className="flex items-center gap-1 px-3 py-2 bg-card/90 backdrop-blur-xl border border-border rounded-full shadow-xl shadow-black/40"
      >
        {navItems.map((item) => {
          const id = item.href.replace("#", "")
          return (
            <NavItem key={id} item={item} isActive={activeSection === id} />
          )
        })}
      </motion.div>
    </motion.div>
  )
}
