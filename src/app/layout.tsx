import type { Metadata } from "next"

import "@/app/globals.css"
import { poppins } from "@/lib/utils/fonts"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: {
    template: "%s | Time Management Tool",
    default: "Time Management Tool",
  },
  description: "A tool for managing your time.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
