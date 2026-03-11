import { getAllProjects } from "@/lib/projects"
import { defaultParticleSettings } from "@/lib/particle-settings"
import { ClientWrapper } from "@/components/client-wrapper"

export default function Home() {
  const projects = getAllProjects()

  return (
    <ClientWrapper
      projects={projects}
      initialSettings={defaultParticleSettings}
    />
  )
}
