import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BackgroundEffects } from "@/components/background-effects"
import { getAllProjects } from "@/lib/projects"

export default function Home() {
  const projects = getAllProjects()

  return (
    <main className="relative">
      <BackgroundEffects />
      <HeroSection />
      <AboutSection />
      <ProjectsSection projects={projects} />
      <ContactSection />
      <Footer />
      <Navbar />
    </main>
  )
}
