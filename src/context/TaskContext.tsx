"use client"
import { getAllTasks } from "@/actions/tasks/getAllTasks"
import { TaskProps } from "@/lib/types"
import React, { createContext, useContext, useState, useEffect } from "react"

interface TaskContextType {
  tasks: TaskProps[]
  setTasks: React.Dispatch<React.SetStateAction<TaskProps[]>>
  fetchTasks: () => Promise<void>
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

interface TaskProviderProps {
  children: React.ReactNode
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<TaskProps[]>([])

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
