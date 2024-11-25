"use server"

import { auth } from "@/auth"
import prisma from "@/lib/clients/prisma"
import { Task, TaskSchema } from "@/lib/schemas/task"

export const createTask = async (data: Task) => {
  const validatedFields = TaskSchema.safeParse(data)

  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const session = await auth()

  await prisma.task.create({
    data: { userId: session?.user?.id as string, ...validatedFields.data },
  })

  return { success: "Task created successfully!" }
}
