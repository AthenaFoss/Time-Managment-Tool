import type { Metadata } from "next"

import { NavBar } from "@/components/Navbar"

export const metadata: Metadata = {
  title: "Dashboard",
}

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: Readonly<LayoutProps>) {
  return (
    <main className="flex flex-col items-center h-screen">
      <NavBar />
      {children}
    </main>
  )
}
