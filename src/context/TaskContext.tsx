"use client"
import { getAllTasks } from "@/actions/tasks/getAllTasks"
import React, { createContext, useContext, useState, useEffect } from "react"

interface Task {
  id: number
  userId: string
  activity: string
  priority: string
  completed: boolean
  timeUnder5Min: boolean
  createdAt: Date
  updatedAt: Date
}

interface TaskContextType {
  tasks: Task[]
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
  fetchTasks: () => Promise<void>
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

interface TaskProviderProps {
  children: React.ReactNode
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([])

  const fetchTasks = async () => {
    const response = await getAllTasks()
    if (!("error" in response)) {
      setTasks(response)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <TaskContext.Provider value={{ tasks, setTasks, fetchTasks }}>
      {children}
    </TaskContext.Provider>
  )
}

export const useTasks = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider")
  }
  return context
}
