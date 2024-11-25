"use server"

import * as z from "zod"
import { hash } from "bcryptjs"

import prisma from "@/lib/clients/prisma"
import { RegisterSchema } from "@/lib/schemas"
import { generateVerificationToken } from "@/lib/utils/token"
import { sendVerificationEmail } from "@/lib/utils/sendVerificationEmail"

export const register = async (data: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(data)

  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { email, password, name } = validatedFields.data

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (existingUser) {
    return { error: "Email already in use!" }
  }

  const hashedPassword = await hash(password, 10)

  const { expires, token } = generateVerificationToken()

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      verificationToken: token,
      verificationTokenExpires: expires,
    },
  })

  const emailResponse = await sendVerificationEmail(email, token, name)
  if (!emailResponse.success) {
    return { error: "Failed to send verification email!" }
  }

  return {
    success: `User registered successfully! Verification email sent to ${email}`,
  }
}
