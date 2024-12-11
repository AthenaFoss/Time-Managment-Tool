"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ToggleMode() {
  const { setTheme, theme } = useTheme()

  return (
    <>
      {theme === "light" ? (
        <Button variant="outline" size="icon" onClick={() => setTheme("dark")}>
          <Moon />
        </Button>
      ) : (
        <Button size="icon" variant="outline" onClick={() => setTheme("light")}>
          <Sun />
        </Button>
      )}
    </>
  )
}
