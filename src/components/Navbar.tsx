import Link from "next/link"

import { auth } from "@/auth"
import { UserButton } from "@/components/auth/UserButton"

export async function NavBar() {
  const session = await auth()
  const user = session?.user

  return (
    <header className="sticky top-0 bg-background px-3 shadow-sm w-full">
      <nav className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-3">
        <Link href="/" className="font-bold">
          Time Management App
        </Link>
        {user && <UserButton user={user} />}
      </nav>
    </header>
  )
}
