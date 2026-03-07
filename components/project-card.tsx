"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github, ArrowUpRight } from "lucide-react"
import { GlowCard } from "./glow-card"
import type { Project } from "@/lib/types"

interface ProjectCardProps {
  project: Project
  index: number
  onOpenModal: (project: Project) => void
}

export function ProjectCard({ project, index, onOpenModal }: ProjectCardProps) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
      }}
      className="group"
    >
      <GlowCard>
        <button
          onClick={() => onOpenModal(project)}
          className="w-full text-left"
        >
          <div className="relative p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors duration-300">
            {/* Index number */}
            <span className="absolute top-4 right-4 font-mono text-xs text-muted-foreground/30">
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Featured badge */}
            {project.featured && (
              <div className="mb-4">
                <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                  FEATURED
                </span>
              </div>
            )}

            {/* Project title */}
            <h3 className="text-xl font-semibold mb-2 pr-12 group-hover:text-primary transition-colors flex items-center gap-2">
              <span className="text-primary font-mono text-sm">{"//"}</span>
              {project.title}
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </h3>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] font-mono text-muted-foreground bg-secondary px-2 py-1 rounded border border-border"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="text-[10px] font-mono text-muted-foreground bg-secondary px-2 py-1 rounded border border-border">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>

            {/* Links indicator */}
            <div className="flex items-center gap-4 pt-4 border-t border-border">
              {project.liveUrl && (
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                  <ExternalLink className="w-3 h-3" />
                  <span className="font-mono">live</span>
                </span>
              )}
              {project.githubUrl && (
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                  <Github className="w-3 h-3" />
                  <span className="font-mono">source</span>
                </span>
              )}
            </div>
          </div>
        </button>
      </GlowCard>
    </motion.article>
  )
}
