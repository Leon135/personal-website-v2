"use client"

import { useState } from "react"
import { BackgroundEffects } from "@/components/background-effects"
import { ParticleControls } from "@/components/particle-controls"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Project } from "@/lib/types"
import type { ParticleSettings } from "@/lib/particle-settings"

interface ClientWrapperProps {
  projects: Project[]
  initialSettings: ParticleSettings
}



export function ClientWrapper({ projects, initialSettings }: ClientWrapperProps) {
  const [settings, setSettings] = useState(initialSettings)

  return (
    <main className="relative">
      <BackgroundEffects settings={settings} />
      <ParticleControls settings={settings} onChange={setSettings}/>
      <HeroSection />
      <AboutSection />
      <ProjectsSection projects={projects} />
      <ContactSection />
      <Footer />
      <Navbar />
    </main>
  )
}
