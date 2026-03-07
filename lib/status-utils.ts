import type { Project } from "@/lib/types"

export function getStatusBadgeClasses(status: Project["status"]) {
  switch (status) {
    case "active":
      return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
    case "in-development":
      return "text-amber-400 bg-amber-400/10 border-amber-400/20"
    case "stalled":
      return "text-orange-400 bg-orange-400/10 border-orange-400/20"
    default:
      return "text-muted-foreground bg-muted/40 border-border"
  }
}

export function getStatusLabel(status: Project["status"]) {
  switch (status) {
    case "active":
      return "ACTIVE"
    case "in-development":
      return "IN DEVELOPMENT"
    case "stalled":
      return "STALLED"
    default:
      return "ARCHIVED"
  }
}
