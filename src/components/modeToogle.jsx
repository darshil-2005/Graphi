"use client";
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/shadcnComponent/button"

export default function ModeToggle( {className}) {
  const { setTheme } = useTheme()

  return (
    <div className="relative">
      <Button
        variant='secondary'
        className={`h-[2.5rem] w-[2.5rem] hidden dark:flex ${className} p-3`}
        onClick={() => setTheme("light")}
      >
        <Sun className=""/>
      </Button>
      <Button
        variant='secondary'
        className={`h-[2.5rem] w-[2.5rem] dark:hidden ${className} p-3`}
        onClick={() => setTheme("dark")}
      >
        <Moon className="h-[1.2rem] w-[1.2rem] " />
      </Button>
      <span className="sr-only">Toggle theme</span>
    </div>
  )
}
