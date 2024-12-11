"use server"

import prisma from "@/lib/clients/prisma"

export const verifyToken = async (token: string) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      verificationToken: token,
    },
  })

  if (!existingUser?.verificationToken) {
    return { error: "Invalid token!" }
  }

  if (existingUser.verificationTokenExpires) {
    const isTokenExpired =
      new Date() > new Date(existingUser.verificationTokenExpires)

    if (isTokenExpired) {
      return { error: "Token expired!" }
    }
  }

  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      verificationToken: null,
      verificationTokenExpires: null,
    },
  })

  return { success: "Email verified!" }
}
