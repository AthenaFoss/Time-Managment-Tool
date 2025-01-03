"use server"

import { auth } from "@/auth"
import prisma from "@/lib/clients/prisma"

export const deleteTask = async (taskId: number) => {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      throw new Error("User not authenticated")
    }
    await prisma.task.delete({
      where: { id: taskId },
    })
    return { code: 200, message: "Task deleted successfully!" }
  } catch (error) {
    console.error("Error deleting task:", error)
    return {
      code: 500,
      message:
        error instanceof Error
          ? error.message
          : "An error occurred while deleting task",
    }
  }
}
