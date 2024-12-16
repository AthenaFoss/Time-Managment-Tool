import Link from "next/link"

import { auth } from "@/auth"
import { UserButton } from "@/components/auth/UserButton"
import { ToggleMode } from "./ToggleMode"

export async function NavBar() {
  const session = await auth()
  const user = session?.user

  return (
    <header className="sticky top-0 bg-background shadow-sm w-full xl:w-[80vw] px-4 md:px-8">
      <nav className="flex h-14 w-full items-center justify-between gap-3">
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
