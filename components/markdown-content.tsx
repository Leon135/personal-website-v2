"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { ExternalLink } from "lucide-react"
import type { Components } from "react-markdown"
import { Children, isValidElement, type ReactNode } from "react"

interface MarkdownContentProps {
  content: string
}

// Check if children contain a block-level element (like figure from our img component)
function hasBlockElement(children: ReactNode): boolean {
  return Children.toArray(children).some((child) => {
    if (isValidElement(child)) {
      const type = child.type
      if (typeof type === "string" && ["figure", "div", "img"].includes(type)) {
        return true
      }
      // Check for our custom figure component output
      if (child.props?.className?.includes("my-5")) {
        return true
      }
    }
    return false
  })
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  const components: Components = {
    // Headings
    h1: ({ children }) => (
      <h1 className="text-xl font-bold text-foreground mt-8 mb-3 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-lg font-semibold text-foreground mt-7 mb-3 first:mt-0 pb-2 border-b border-border">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-base font-semibold text-foreground mt-5 mb-2">
        {children}
      </h3>
    ),

    // Paragraphs — use div if it contains block-level elements (like images)
    p: ({ children }) => {
      if (hasBlockElement(children)) {
        return <div className="mb-4 last:mb-0">{children}</div>
      }
      return (
        <p className="text-muted-foreground leading-relaxed mb-4 last:mb-0">
          {children}
        </p>
      )
    },

    // Inline code
    code: ({ children, className }) => {
      const isBlock = className?.includes("language-")
      if (isBlock) {
        return (
          <code className="block font-mono text-xs bg-secondary text-primary p-4 rounded-lg overflow-x-auto whitespace-pre leading-relaxed">
            {children}
          </code>
        )
      }
      return (
        <code className="font-mono text-xs bg-secondary text-primary px-1.5 py-0.5 rounded">
          {children}
        </code>
      )
    },

    // Code block wrapper
    pre: ({ children }) => (
      <pre className="mb-4 rounded-lg overflow-hidden border border-border">
        {children}
      </pre>
    ),

    // Blockquote — styled as a pull-quote container
    blockquote: ({ children }) => (
      <blockquote className="my-4 pl-4 border-l-2 border-primary bg-primary/5 rounded-r-lg py-3 pr-4">
        <div className="text-sm text-muted-foreground italic space-y-1 [&>p]:mb-0 [&>p]:leading-relaxed">
          {children}
        </div>
      </blockquote>
    ),

    // Unordered list
    ul: ({ children }) => (
      <ul className="mb-4 space-y-1.5 list-none pl-0">
        {children}
      </ul>
    ),

    // Ordered list
    ol: ({ children }) => (
      <ol className="mb-4 space-y-1.5 list-decimal list-inside pl-0">
        {children}
      </ol>
    ),

    // List item
    li: ({ children }) => (
      <li className="flex items-start gap-2 text-muted-foreground leading-relaxed">
        <span className="mt-2 w-1 h-1 rounded-full bg-primary shrink-0" />
        <span className="flex-1">{children}</span>
      </li>
    ),

    // Links — styled as pill badges for "Built with" style link lists
    a: ({ href, children }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-primary hover:text-primary/80 underline-offset-2 hover:underline transition-colors"
      >
        {children}
        <ExternalLink className="w-3 h-3 shrink-0 opacity-60" />
      </a>
    ),

    // Images — rendered in a styled container
    img: ({ src, alt }) => {
      if (!src) return null
      return (
        <figure className="my-5">
          <div className="overflow-hidden rounded-lg border border-border bg-secondary/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt ?? ""}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
          {alt && (
            <figcaption className="mt-2 text-center text-xs text-muted-foreground font-mono">
              {alt}
            </figcaption>
          )}
        </figure>
      )
    },

    // Horizontal rule
    hr: () => (
      <hr className="my-6 border-border" />
    ),

    // Strong / bold
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),

    // Emphasis / italic
    em: ({ children }) => (
      <em className="italic text-muted-foreground/90">{children}</em>
    ),

    // Tables (from remark-gfm)
    table: ({ children }) => (
      <div className="my-4 overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">{children}</table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-secondary text-foreground">{children}</thead>
    ),
    tbody: ({ children }) => (
      <tbody className="divide-y divide-border">{children}</tbody>
    ),
    tr: ({ children }) => <tr>{children}</tr>,
    th: ({ children }) => (
      <th className="px-4 py-2.5 text-left font-semibold text-xs uppercase tracking-wider">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-2.5 text-muted-foreground">{children}</td>
    ),
  }

  return (
    <div className="markdown-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
