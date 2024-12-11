"use server"

import { auth } from "@/auth"
import prisma from "@/lib/clients/prisma"

export const updateTaskStatus = async (taskId: number, completed: boolean) => {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      throw new Error("User not authenticated")
    }
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { completed },
    })
    return updatedTask
  } catch (error) {
    console.error("Error updating task status:", error)
    return { error: (error instanceof Error ? error.message : "An error occurred while updating task status") }
  }
}