"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Components } from "react-markdown";
import rehypeRaw from 'rehype-raw'

interface MarkdownContentProps {
  content: string;
}

// Check if AST node contains an image (which we render as a block-level figure)
function containsImage(node: any): boolean {
  if (!node || !node.children) return false;
  return node.children.some((child: any) => {
    if (child.type === "element" && child.tagName === "img") {
      return true;
    }
    if (child.type === "element" && child.children) {
      return containsImage(child);
    }
    return false;
  });
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
    p: ({ children, node }) => {
      // If paragraph contains an image, render as div to avoid invalid nesting
      if (node && containsImage(node)) {
        return <div className="mb-4 last:mb-0">{children}</div>;
      }
      return (
        <p className="text-muted-foreground leading-relaxed mb-4 last:mb-0">
          {children}
        </p>
      );
    },

    // Inline code
    code: ({ children, className }) => {
      const isBlock = className?.includes("language-");
      if (isBlock) {
        return (
          <code className="block font-mono text-xs bg-secondary text-primary p-4 rounded-lg overflow-x-auto whitespace-pre leading-relaxed">
            {children}
          </code>
        );
      }
      return (
        <code className="font-mono text-xs bg-secondary text-primary px-1.5 py-0.5 rounded">
          {children}
        </code>
      );
    },

    // Code block wrapper
    pre: ({ children }) => (
      <pre className="mb-4 rounded-lg overflow-hidden border border-border">
        {children}
      </pre>
    ),

    // Blockquote — styled as a pull-quote container
    blockquote: ({ children }) => (
      <blockquote className="pl-4 border-l-2 border-primary bg-primary/5 rounded-r-lg pr-4 whitespace-pre-line">
        <div className="text-md text-muted-foreground italic p-0 m-0">
          {children}
        </div>
      </blockquote>
    ),

    // Unordered list
    ul: ({ children }) => (
      <ul className="mb-4 space-y-1.5 list-none pl-0">{children}</ul>
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
        <span className="mt-3 w-1 h-1 rounded-full bg-primary shrink-0" />
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

    // Images — rendered in a styled container. Respect width/height when provided.
    img: ({ src, alt, width, height }) => {
      if (!src) return null;

      const style: any = {};
      // If width/height provided, don't force full width via CSS.
      const imgClass = width || height ? `object-cover` : `w-full h-auto object-cover`;

      return (
        <figure className="flex flex-col self-center items-center my-5">
          <div className="overflow-hidden rounded-lg border border-border bg-secondary/40 cursor-pointer hover:border-primary/40 transition-colors">
            {/* eslint-disable-next-line */}
            <img 
              src={src} 
              alt={alt ?? ""} 
              title="Click to open in new window"
              style={style} 
              className={`${imgClass} cursor-pointer`}
              loading="lazy" 
              onClick={() => window.open(src, "_blank")} 
            />
          </div>
          {alt && (
            <figcaption className="mt-2 text-center text-xs text-muted-foreground font-mono">
              {alt}
            </figcaption>
          )}
        </figure>
      );
    },

    // Horizontal rule
    hr: () => <Separator className="my-6" />,

    // Strong / bold
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),

    // Emphasis / italic
    em: ({ children }) => (
      <em className="italic text-muted-foreground/90">{children}</em>
    ),

    // Tables (from remark-gfm) - using shadcn Table components
    table: ({ children }) => (
      <div className="my-4 rounded-lg border border-border">
        <Table>{children}</Table>
      </div>
    ),
    thead: ({ children }) => (
      <TableHeader className="bg-secondary">{children}</TableHeader>
    ),
    tbody: ({ children }) => <TableBody>{children}</TableBody>,
    tr: ({ children }) => <TableRow>{children}</TableRow>,
    th: ({ children }) => (
      <TableHead className="text-xs uppercase tracking-wider">
        {children}
      </TableHead>
    ),
    td: ({ children }) => (
      <TableCell className="text-muted-foreground">{children}</TableCell>
    ),
  };

  return (
    <div className="markdown-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
