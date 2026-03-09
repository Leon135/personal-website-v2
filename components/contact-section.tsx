"use client";

import { motion } from "framer-motion";
import { Github, Mail, Gamepad2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EmailForm } from "@/components/email-form";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/leon135",
    icon: Github,
  },
  {
    name: "Email",
    href: "mailto:contact@leon135.xyz",
    icon: Mail,
  },
  {
    name: "Steam",
    href: "https://steamcommunity.com/id/leon135",
    icon: Gamepad2,
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="px-6 md:px-12 lg:px-24 py-24 min-h-[70vh]">
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
            <Badge
              variant="outline"
              className="text-xs font-mono text-primary bg-primary/10 border-primary/20"
            >
              03
            </Badge>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-balance">
            Get in touch
          </h2>
          <p className="text-muted-foreground mt-2">Feel free to reach out</p>
        </motion.div>

        {/* Simple 3-button grid */}
        <TooltipProvider>
          <div className="grid grid-cols-3 gap-4 max-w-md">
            {socialLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * index }}
                viewport={{ once: true }}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex flex-col items-center justify-center gap-3 p-4 h-auto w-full bg-secondary/30 border-border hover:border-primary/80 group"
                      asChild
                    >
                      <a
                        href={link.href}
                        target={link.name !== "Email" ? "_blank" : undefined}
                        rel={
                          link.name !== "Email"
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <link.icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground">
                          {link.name}
                        </span>
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">
                      {link.name === "GitHub"
                        ? "Visit my GitHub profile"
                        : link.name === "Email"
                          ? "Send me an email"
                          : "Visit my Steam profile"}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            ))}
          </div>
        </TooltipProvider>
      </div>
      <motion.div className="flex justify-center max-w-5xl mx-auto mt-16"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <EmailForm />
      </motion.div>
    </section>
  );
}
