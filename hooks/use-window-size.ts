"use client";
import { useLayoutEffect, useRef, useState } from "react";

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState([0, 0]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useLayoutEffect(() => {
    function updateSize() {
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // Debounce 150ms - waits for resize to stabilize
      timeoutRef.current = setTimeout(() => {
        setWindowSize([window.innerWidth, window.innerHeight]);
      }, 150);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => {
      window.removeEventListener("resize", updateSize);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
  return windowSize;
}