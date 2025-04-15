"use server"

import { auth } from "@/auth"
import prisma from "@/lib/clients/prisma"
import { Task, TaskSchema } from "@/lib/schemas/task"

export const createTask = async (data: Task) => {
  try {
    const validatedFields = TaskSchema.safeParse(data)

    if (!validatedFields.success) {
      return { error: "Invalid fields!" }
    }

    const session = await auth()

    if (!session?.user?.id) {
      return { error: "You must be logged in to create a task" }
    }

    // Convert string priority to numeric and set urgent/important flags
    let priorityValue = 0
    let isUrgent = false
    let isImportant = false

    switch (validatedFields.data.priority) {
      case "urgent":
        priorityValue = 1
        isUrgent = true
        break
      case "important":
        priorityValue = 2
        isImportant = true
        break
      case "normal":
        priorityValue = 3
        break
    }

    await prisma.task.create({
      data: { 
        userId: session.user.id, 
        activity: validatedFields.data.activity,
        priority: priorityValue,
        urgent: isUrgent,
        important: isImportant,
        timeUnder5Min: validatedFields.data.timeUnder5Min 
      },
    })

    return { success: "Task created successfully!" }
  } catch (error) {
    console.error("Error creating task:", error)
    return { error: "Failed to create task. Please try again." }
  }
}
