"use server"

import * as z from "zod"
import { AuthError } from "next-auth"

import { signIn } from "@/auth"
import prisma from "@/lib/clients/prisma"
import { LoginSchema } from "@/lib/schemas"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { generateVerificationToken } from "@/lib/utils/token"
import { sendVerificationEmail } from "@/lib/utils/sendVerificationEmail"

export const login = async (data: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(data)

  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { email, password } = validatedFields.data

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!existingUser || !existingUser.password) {
    return { error: "User does not exist!" }
  }

  if (existingUser?.emailVerified === null) {
    const { token, expires } = generateVerificationToken()
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        verificationToken: token,
        verificationTokenExpires: expires,
      },
    })

    const emailResponse = await sendVerificationEmail(
      email,
      token,
      existingUser.name
    )
    if (!emailResponse.success) {
      return { error: "Failed to send verification email!" }
    }

    return { success: `Verification email sent to ${email}. Please verify!` }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
    //* NOTE: this response is not going to `LoginForm.tsx` returning undefined instead
    return { success: "Logged in!" }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" }
        default:
          return { error: "Something went wrong!" }
      }
    }
    throw error
  }
}
