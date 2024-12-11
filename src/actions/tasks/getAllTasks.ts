"use server"

import { auth } from "@/auth"
import prisma from "@/lib/clients/prisma"

export const getAllTasks = async () => {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      throw new Error("User not authenticated")
    }

    const tasks = await prisma.task.findMany({
      where: {
        userId: session.user.id,
      },
    })

    return tasks
  } catch (error) {
    console.error("Error fetching tasks:", error)
    return { error: (error instanceof Error ? error.message : "An error occurred while fetching tasks") }
  }
}