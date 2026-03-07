import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { Project, ProjectFrontmatter } from "./types"

const projectsDirectory = path.join(process.cwd(), "content/projects")

export function getProjectSlugs(): string[] {
  if (!fs.existsSync(projectsDirectory)) {
    return []
  }
  return fs.readdirSync(projectsDirectory).filter((file) => file.endsWith(".md"))
}

export function getProjectBySlug(slug: string): Project | null {
  const realSlug = slug.replace(/\.md$/, "")
  const fullPath = path.join(projectsDirectory, `${realSlug}.md`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)
  const frontmatter = data as ProjectFrontmatter

  return {
    slug: realSlug,
    title: frontmatter.title,
    description: frontmatter.description,
    liveUrl: frontmatter.liveUrl,
    liveUrlLabel: frontmatter.liveUrlLabel,
    githubUrl: frontmatter.githubUrl,
    githubUrlLabel: frontmatter.githubUrlLabel,
    technologies: frontmatter.technologies || [],
    featured: frontmatter.featured || false,
    status: frontmatter.status,
    image: frontmatter.image,
    content,
  }
}

export function getAllProjects(): Project[] {
  const slugs = getProjectSlugs()
  const projects = slugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project): project is Project => project !== null)
    .sort((a, b) => {
      // Featured projects first, then alphabetically
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return a.title.localeCompare(b.title)
    })

  return projects
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((project) => project.featured)
}
