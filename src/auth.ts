import {} from "next-auth/jwt"
import NextAuth from "next-auth"

import authConfig from "@/auth.config"
import prisma from "@/lib/clients/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"

declare module "next-auth/jwt" {
  interface JWT {
    name?: string | null
    email?: string | null
    picture?: string | null
    sub?: string
    iat?: number
    exp?: number
    jti?: string
    image: string
    emailVerified: Date | null
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  pages: {
    signIn: "/login",
    error: "/error",
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: { emailVerified: new Date() },
      })
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true

      const existingUser = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
      })

      if (!existingUser?.emailVerified) {
        return false
      }

      return true
    },
    async session({ token, session }) {
      if (session.user) {
        if (token.sub) session.user.id = token.sub
        session.user.emailVerified = token.emailVerified
      }
      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await prisma.user.findUnique({
        where: {
          id: token.sub,
        },
      })

      if (!existingUser) return token

      token.emailVerified = existingUser.emailVerified

      return token
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})
