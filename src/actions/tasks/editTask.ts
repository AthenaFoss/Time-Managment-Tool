"use server"

import { auth } from "@/auth"
import prisma from "@/lib/clients/prisma"
import { Task, TaskSchema } from "@/lib/schemas/task"

export const editTask = async (taskId: number, data: Task) => {
  const validatedFields = TaskSchema.safeParse(data)

  if (!validatedFields.success) {
    return { code: 400, message: "Invalid fields!" }
  }
  try {
    const session = await auth()
    await prisma.task.update({
      where: { id: taskId },
      data: { userId: session?.user?.id as string, ...validatedFields.data },
    })
    return { code: 200, message: "Task updated successfully!" }
  } catch (error) {
    return {
      code: 500,
      message:
        error instanceof Error
          ? error.message
          : "An error occurred while updating task",
    }
  }
}
