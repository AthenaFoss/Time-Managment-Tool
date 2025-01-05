"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { createTask } from "@/actions/tasks/createTask"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTasks } from "@/context/TaskContext"
import { useToast } from "@/hooks/use-toast"
import { Task, TaskSchema } from "@/lib/schemas/task"
import CommonTaskForm from "./CommonTaskForm"

export function CreateTaskForm() {
  const { fetchTasks } = useTasks()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      activity: "",
      priority: "normal",
      timeUnder5Min: false,
    },
  })

  const onSubmit = (data: Task) => {
    setIsSubmitting(true)

    createTask(data)
      .then((response) => {
        if (response.success) {
          toast({
            title: "Task created successfully!",
          })
          fetchTasks()
        }
        if (response.error) {
          toast({
            title: "Task creation failed!",
            description: response.error,
            variant: "destructive",
          })
        }
      })
      .catch(() => {
        toast({
          title: "Task creation failed!",
          description: "An error occurred. Please try again.",
          variant: "destructive",
        })
      })
      .finally(() => {
        setIsSubmitting(false)
        form.reset()
      })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase">Create New Task</CardTitle>
      </CardHeader>
      <CardContent>
        <CommonTaskForm
          key={`create-form`}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          initialValues={{
            activity: "",
            priority: "normal",
            timeUnder5Min: false,
          }}
        />
      </CardContent>
    </Card>
  )
}
