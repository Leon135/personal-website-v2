"use client";

import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-6 md:px-12 lg:px-24 py-12 pb-28">
      <div className="max-w-5xl mx-auto">
        <Separator className="mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-muted-foreground/40">
            Made with 💜 by <a href="https://leon135.xyz" className="text-foreground hover:underline">
              Leon135
            </a>
          </p>
          <p className="text-xs text-muted-foreground/40 font-mono">
            © {currentYear} Leon135
          </p>
        </div>
      </div>
    </footer>
  );
}
