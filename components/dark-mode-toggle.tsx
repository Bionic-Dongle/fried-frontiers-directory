"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

interface DarkModeToggleProps {
  variant?: "default" | "ghost" | "outline"
  size?: "default" | "sm" | "lg"
  className?: string
}

export function DarkModeToggle({ variant = "ghost", size = "default", className = "" }: DarkModeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme()

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <button
        className={`relative transition-all duration-300 ${className}`}
        disabled
        aria-label="Loading theme toggle"
      >
        <div className="relative w-5 h-5">
          <Sun className="absolute inset-0 h-5 w-5 opacity-50" />
        </div>
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className={`relative transition-all duration-300 ${className}`}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <div className="relative w-5 h-5">
        <Sun
          className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
            theme === "light" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"
          }`}
        />
        <Moon
          className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
            theme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
          }`}
        />
      </div>
    </button>
  )
}
