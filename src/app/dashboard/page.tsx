"use client"

import { useState } from "react"

import { CreateTaskForm } from "@/components/dashboard/CreateTask"

interface Task {
  id: number
  name: string
  urgent: boolean
  important: boolean
  timeUnder5Min: boolean
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([])

  const handleTaskCreated = (newTask: Task) => {
    setTasks([...tasks, newTask])
    console.log("New task created:", newTask)
    // Here you would typically send the new task to your backend API
  }
  return (
    <div className="container flex justify-center items-center flex-col mx-auto p-4 max-w-4xl h-full">
      <CreateTaskForm onTaskCreated={handleTaskCreated} />
    </div>
  )
}
