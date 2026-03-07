"use client";

import { motion } from "framer-motion";
import { useTypewriter } from "@/hooks/use-typewriter";
import { useTextScramble } from "@/hooks/use-text-scramble";

export function HeroSection() {
  const { displayText, isComplete } = useTypewriter(
    "Hey, I'm Leon135",
    75,
    300,
  );
  const { displayText: scrambledName, scramble } = useTextScramble("Leon135");

  // Split the typed text into the greeting and name parts once typing is done
  const prefix = "Hey, I'm ";
  const typedPrefix = displayText.slice(
    0,
    Math.min(displayText.length, prefix.length),
  );
  const typedName =
    displayText.length > prefix.length ? displayText.slice(prefix.length) : "";

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 mb-4"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs font-mono text-muted-foreground tracking-wide">
            UNEMPLOYED STUDENT
          </span>
        </motion.div>

        {/* Main heading - typewriter then scramble on name */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2 font-mono">
          <span className="text-muted-foreground">{">"}</span>{" "}
          <span>{typedPrefix}</span>
          {isComplete ? (
            <span
              className="text-primary cursor-pointer hover:opacity-80 transition-opacity"
              onClick={scramble}
              title="Click to scramble"
            >
              {scrambledName}
            </span>
          ) : (
            <span className="text-primary">{typedName}</span>
          )}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="text-primary"
          >
            _
          </motion.span>
        </h1>

        {/* Also known as */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-sm font-mono text-muted-foreground/60 mb-6"
        >
          also known as <span className="text-muted-foreground">Kuba</span>
        </motion.p>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 max-w-2xl"
        >
          Student developer building everything from web apps to modifications
          and embeded devices. Passionate about learning and creating solutions
          to my & world problems.
        </motion.p>

        {/* Keyboard hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="text-xs text-muted-foreground/50 font-mono"
        >
          [ scroll to explore ]
        </motion.p>
      </div>
    </section>
  );
}
