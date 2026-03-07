"use client"

import { motion } from "framer-motion"
import { Github, Mail, Gamepad2 } from "lucide-react"

const socialLinks = [
  { 
    name: "GitHub", 
    href: "https://github.com/yourusername", 
    icon: Github,
  },
  { 
    name: "Email", 
    href: "mailto:your@email.com", 
    icon: Mail,
  },
  { 
    name: "Steam", 
    href: "https://steamcommunity.com/id/yourusername", 
    icon: Gamepad2,
  },
]

export function ContactSection() {
  return (
    <section id="contact" className="px-6 md:px-12 lg:px-24 py-24">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-mono text-primary px-2 py-1 bg-primary/10 border border-primary/20 rounded">
              03
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-balance">
            Get in touch
          </h2>
          <p className="text-muted-foreground mt-2">
            Feel free to reach out
          </p>
        </motion.div>

        {/* Simple 3-button grid */}
        <div className="grid grid-cols-3 gap-4 max-w-md">
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              target={link.name !== "Email" ? "_blank" : undefined}
              rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 * index }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-secondary/30 border border-border hover:border-primary/30 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <link.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                {link.name}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
