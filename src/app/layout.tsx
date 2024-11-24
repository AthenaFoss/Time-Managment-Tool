import type { Metadata } from "next"

import "@/app/globals.css"
import { poppins } from "@/lib/utils/fonts"
import "./globals.css"
import { NavBar } from "./components/Navbar"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "Task Management Tool",
  description: "Managing the time and prioritizing the task",
  manifest: "/manifest.json",
  themeColor: "#000000",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Task Management Tool",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className={`${poppins.className} antialiased`}>
        <NavBar />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
