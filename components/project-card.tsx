"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { GlowCard } from "./glow-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getStatusBadgeClasses, getStatusLabel } from "@/lib/status-utils";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenModal: (project: Project) => void;
}

export function ProjectCard({ project, index, onOpenModal }: ProjectCardProps) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
      }}
      className="group h-full"
    >
      <GlowCard className="h-full">
        <button
          onClick={() => onOpenModal(project)}
          className="w-full h-full text-left"
        >
          <Card className="relative hover:border-primary/50 transition-colors duration-300 h-full gap-0 py-0 bg-secondary/30 border-border hover:border-primary/30 hover:bg-secondary/50 group">
            <CardContent className="pt-6 pb-4 flex flex-col flex-1">
              {/* Index number */}
              <span className="absolute top-4 right-4 font-mono text-xs text-muted-foreground/30">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Badges row */}
              {(project.featured || project.status) && (
                <div className="flex items-center gap-2 mb-4">
                  {project.featured && (
                    <Badge
                      variant="outline"
                      className="text-[10px] font-mono text-primary bg-primary/10 border-primary/20"
                    >
                      FEATURED
                    </Badge>
                  )}
                  {project.status && (
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-mono ${getStatusBadgeClasses(project.status)}`}
                    >
                      {getStatusLabel(project.status)}
                    </Badge>
                  )}
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
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 4).map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="text-[10px] font-mono text-muted-foreground border border-border"
                  >
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 4 && (
                  <Badge
                    variant="secondary"
                    className="text-[10px] font-mono text-muted-foreground border border-border"
                  >
                    +{project.technologies.length - 4}
                  </Badge>
                )}
              </div>
            </CardContent>

            {/* Links indicator */}
            <CardFooter className="mt-auto mb-auto gap-4 border-t py-4 h-3">
              {project.liveUrl && (
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground group-hover:text-foreground transition-colors pb-2">
                  <ExternalLink className="w-3" />
                  <span className="font-mono">live</span>
                </span>
              )}
              {project.githubUrl && (
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground group-hover:text-foreground transition-colors pb-2">
                  <Github className="w-3" />
                  <span className="font-mono">source</span>
                </span>
              )}
            </CardFooter>
          </Card>
        </button>
      </GlowCard>
    </motion.article>
  );
}
