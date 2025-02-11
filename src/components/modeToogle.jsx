"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/shadcnComponent/button"

export default function ModeToggle( {className}) {
  const { setTheme } = useTheme()

  return (
    <div className="relative">
      <Button
        variant='secondary'
        className={`h-[2.5rem] w-[2.5rem] hidden dark:flex ${className}`}
        onClick={() => setTheme("light")}
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </Button>
      <Button
        variant='secondary'
        className={`h-[2.5rem] w-[2.5rem] dark:hidden ${className}`}
        onClick={() => setTheme("dark")}
      >
        <Moon className="h-[1.2rem] w-[1.2rem] " />
      </Button>
      <span className="sr-only">Toggle theme</span>
    </div>
  )
}
