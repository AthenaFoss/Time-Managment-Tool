import Link from "next/link"

import { NavBar } from "@/components/Navbar"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex flex-col h-screen mx-auto">
      <div className="flex justify-center">
        <NavBar />
      </div>
      <section className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">
          Time Management App
        </h1>
        <Button className="font-normal" asChild>
          <Link href="/login">Get started</Link>
        </Button>
      </section>
    </main>
  )
}
