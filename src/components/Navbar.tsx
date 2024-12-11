import Link from "next/link"

import { auth } from "@/auth"
import { UserButton } from "@/components/auth/UserButton"
import { ToggleMode } from "./ToggleMode"

export async function NavBar() {
  const session = await auth()
  const user = session?.user

  return (
    <header className="sticky top-0 bg-background px-3 shadow-sm w-full">
      <nav className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-3">
        <div>
          <Link href="/" className="font-bold">
            Time Management App
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <ToggleMode />
          {user && <UserButton user={user} />}
        </div>
      </nav>
    </header>
  )
}
