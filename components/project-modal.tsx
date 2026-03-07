"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github } from "lucide-react";
import type { Project } from "@/lib/types";
import { MarkdownContent } from "@/components/markdown-content";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[90vw] md:max-w-6xl md:max-h-[90vh] bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden flex flex-col outline-none"
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-border">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h2
                    id="modal-title"
                    className="text-2xl font-bold text-foreground"
                  >
                    {project.title}
                  </h2>
                  {project.status && (
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border self-center ${
                        project.status === "active"
                          ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
                          : project.status === "in-development"
                            ? "text-amber-400 bg-amber-400/10 border-amber-400/20"
                            : project.status === "stalled"
                              ? "text-orange-400 bg-orange-400/10 border-orange-400/20"
                              : "text-muted-foreground bg-muted/40 border-border"
                      }`}
                    >
                      {project.status === "active"
                        ? "ACTIVE"
                        : project.status === "in-development"
                          ? "IN DEVELOPMENT"
                          : project.status === "stalled"
                            ? "STALLED"
                            : "ARCHIVED"}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Technologies */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-sm font-mono text-primary bg-primary/10 px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project details from markdown */}
              <MarkdownContent content={project.content} />
            </div>

            {/* Footer with links */}
            <div className="flex items-center gap-3 p-6 border-t border-border">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  {project.liveUrlLabel ?? "Live"}
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors ${
                    project.liveUrl ? "flex-1" : "w-full"
                  }`}
                >
                  <Github className="w-4 h-4" />
                  {project.githubUrlLabel ?? "Source"}
                </a>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
