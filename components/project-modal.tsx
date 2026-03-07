"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getStatusBadgeClasses, getStatusLabel } from "@/lib/status-utils";
import type { Project } from "@/lib/types";
import { MarkdownContent } from "@/components/markdown-content";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AnimatePresence>
        {isOpen && (
          <DialogPrimitive.Portal forceMount>
            {/* Backdrop */}
            <DialogPrimitive.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
              />
            </DialogPrimitive.Overlay>

            {/* Modal */}
            <DialogPrimitive.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[90vw] md:max-w-6xl md:max-h-[90vh] bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden flex flex-col outline-none"
              >
                {/* Header */}
                <div className="flex items-start justify-between p-6 border-b border-border">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <DialogPrimitive.Title className="text-2xl font-bold text-foreground">
                        {project.title}
                      </DialogPrimitive.Title>
                      {project.status && (
                        <Badge
                          variant="outline"
                          className={`text-[10px] font-mono self-center ${getStatusBadgeClasses(project.status)}`}
                        >
                          {getStatusLabel(project.status)}
                        </Badge>
                      )}
                    </div>
                    <DialogPrimitive.Description className="text-sm text-muted-foreground">
                      {project.description}
                    </DialogPrimitive.Description>
                  </div>
                  <DialogPrimitive.Close asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Close modal"
                    >
                      <X className="w-5 h-5 text-muted-foreground" />
                    </Button>
                  </DialogPrimitive.Close>
                </div>

                {/* Content */}
                <div className="flex-1 min-h-0 overflow-hidden">
                  <ScrollArea className="h-full">
                    <div className="p-6">
                    {/* Technologies */}
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                        Technologies
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            className="text-sm font-mono text-primary bg-primary/10 rounded-full border-transparent"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Project details from markdown */}
                    <MarkdownContent content={project.content} />
                    </div>
                  </ScrollArea>
                </div>

                {/* Footer with links */}
                <div className="flex items-center gap-3 p-6 border-t border-border">
                  {project.liveUrl && (
                    <Button size="lg" className="flex-1 py-3" asChild>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {project.liveUrlLabel ?? "Live"}
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button
                      variant="secondary"
                      size="lg"
                      className={project.liveUrl ? "flex-1 py-3" : "w-full py-3"}
                      asChild
                    >
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4" />
                        {project.githubUrlLabel ?? "Source"}
                      </a>
                    </Button>
                  )}
                </div>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}
