"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Shield, 
  Code2, 
  Layers, 
  Box, 
  Sparkles,
  Brain,
  Lightbulb,
  Zap,
  RefreshCw,
  Target,
  TrendingUp,
  Flame
} from "lucide-react"

const whatIDo = [
  { icon: Shield, label: "Cybersecurity", description: "Securing systems & ethical hacking" },
  { icon: Code2, label: "Software Development", description: "Building robust applications" },
  { icon: Layers, label: "Fullstack Development", description: "Frontend to backend, end to end" },
  { icon: Box, label: "3D Modeling", description: "Creating digital worlds & assets" },
  { icon: Sparkles, label: "And more...", description: "A bit of everything else" },
]

const abilities = [
  { icon: Brain, label: "Problem Solving" },
  { icon: Lightbulb, label: "Critical Thinking" },
  { icon: Zap, label: "Quick Learning" },
  { icon: RefreshCw, label: "Adaptability" },
]

const principles = [
  { 
    icon: TrendingUp, 
    title: "Constant Self-Improvement", 
    description: "Always learning, always growing. Every day is an opportunity to be better than yesterday."
  },
  { 
    icon: Target, 
    title: "Working On Your Goals", 
    description: "Dreams without action are just wishes. I believe in putting in the work to make things happen."
  },
  { 
    icon: Flame, 
    title: "Staying Motivated & In Habit", 
    description: "Discipline beats motivation. Building habits that compound into results over time."
  },
]

export function AboutSection() {
  return (
    <section id="about" className="px-6 md:px-12 lg:px-24 py-24">
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
            <Badge variant="outline" className="text-xs font-mono text-primary bg-primary/10 border-primary/20">
              01
            </Badge>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">
            About Me
          </h2>
          <p className="text-muted-foreground mt-2 text-lg">
            Hi, I&apos;m Kuba - also known as Leon135
          </p>
        </motion.div>

        {/* Bio paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            I believe in constant self-improvement, learning and helping others. 
            I strive to be the best version of myself and to make a positive impact 
            on the world around me. I won&apos;t say I know x, y, z language or technology 
            because it doesn&apos;t matter - if I have a project to be done, I find the best 
            tools, adapt or extend my skillset to fulfill the requirements.
          </p>
        </motion.div>

        {/* What I Do */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h3 className="text-xl font-semibold mb-6">What I Do</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {whatIDo.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * index }}
                viewport={{ once: true }}
              >
                <Card className="bg-secondary/30 hover:border-primary/30 transition-colors group text-center h-full gap-0 py-0">
                  <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-medium text-sm mb-1">{item.label}</h4>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* My Abilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h3 className="text-xl font-semibold mb-6">My Abilities</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {abilities.map((ability, index) => (
              <motion.div
                key={ability.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * index }}
                viewport={{ once: true }}
              >
                <Card className="bg-secondary/30 hover:border-primary/30 transition-colors group h-full gap-0 py-0">
                  <CardContent className="flex items-center gap-3 p-4 h-full">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <ability.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium text-sm">{ability.label}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* My Principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold mb-6">My Principles</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <Card className="bg-secondary/30 hover:border-primary/20 transition-colors group h-full gap-0 py-0">
                  <CardContent className="p-6 h-full">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <principle.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">{principle.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {principle.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
