"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProjectCard } from "./project-card";
import { ProjectModal } from "./project-modal";
import type { Project } from "@/lib/types";

interface ProjectsSectionProps {
  projects?: Project[];
}

export function ProjectsSection({ projects = [] }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 200);
  };

  return (
    <section id="projects" className="px-6 md:px-12 lg:px-24 py-24">
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
              02
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-balance">
            <span className="text-muted-foreground">{"{ "}</span>
            Projects
            <span className="text-muted-foreground">{" }"}</span>
          </h2>
          <p className="text-muted-foreground mt-2 font-mono text-sm">
            // Things I've built
          </p>
        </motion.div>

        {/* Projects grid */}
        {projects.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
                onOpenModal={openModal}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground">
              No projects yet. Add markdown files to{" "}
              <code className="text-primary bg-primary/10 px-2 py-1 rounded text-sm">
                content/projects/
              </code>
            </p>
          </motion.div>
        )}
      </div>

      {/* Project modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
}
