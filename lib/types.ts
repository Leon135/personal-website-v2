export type ProjectStatus = "active" | "in-development" | "stalled" | "archived"

export interface Project {
  slug: string
  title: string
  description: string
  liveUrl?: string
  githubUrl?: string
  technologies: string[]
  featured: boolean
  status?: ProjectStatus
  image?: string
  content: string
}

export interface ProjectFrontmatter {
  title: string
  description: string
  liveUrl?: string
  githubUrl?: string
  technologies: string[]
  featured?: boolean
  status?: ProjectStatus
  image?: string
}
