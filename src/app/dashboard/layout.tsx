import { NavBar } from "@/components/Navbar"

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
