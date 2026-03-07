"use client"

import { motion } from "framer-motion"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="px-6 md:px-12 lg:px-24 py-12 pb-28">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-xs font-mono text-muted-foreground/40">
            © {currentYear} Kuba
          </p>
          <p className="text-xs text-muted-foreground/40 font-mono">
            built with next.js · tailwind · framer motion
          </p>
        </div>
      </div>
    </footer>
  )
}
