export interface Project {
  slug: string
  title: string
  description: string
  liveUrl?: string
  githubUrl?: string
  technologies: string[]
  featured: boolean
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
  image?: string
}
