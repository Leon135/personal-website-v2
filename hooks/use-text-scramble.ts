import { useState, useEffect, useCallback } from "react"

const chars = "!<>-_\\/[]{}—=+*^?#________"

export function useTextScramble(text: string, speed = 30) {
  const [displayText, setDisplayText] = useState(text)
  const [isScrambling, setIsScrambling] = useState(false)

  const scramble = useCallback(() => {
    setIsScrambling(true)
    let iteration = 0
    const maxIterations = text.length * 3

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " "
            if (index < iteration / 3) {
              return text[index]
            }
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join("")
      )

      iteration++

      if (iteration > maxIterations) {
        clearInterval(interval)
        setDisplayText(text)
        setIsScrambling(false)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  useEffect(() => {
    // Initial scramble on mount
    const timeout = setTimeout(scramble, 500)
    return () => clearTimeout(timeout)
  }, [scramble])

  return { displayText, isScrambling, scramble }
}
