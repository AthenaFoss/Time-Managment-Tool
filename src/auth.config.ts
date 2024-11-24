import { compare } from "bcryptjs"
import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

import prisma from "@/lib/clients/prisma"
import { LoginSchema } from "@/lib/schemas"

export default {
  providers: [
    Google,
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { email, password } = validatedFields.data

          const user = await prisma.user.findUnique({
            where: {
              email: email,
            },
          })

          if (!user || !user.password) return null

          const passwordMatch = await compare(password, user.password)

          if (passwordMatch) return user
        }
        return null
      },
    }),
  ],
} satisfies NextAuthConfig
