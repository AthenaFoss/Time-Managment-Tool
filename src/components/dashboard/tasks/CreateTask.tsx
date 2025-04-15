"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Plus } from "lucide-react"

import { createTask } from "@/actions/tasks/createTask"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTasks } from "@/context/TaskContext"
import { useToast } from "@/hooks/use-toast"
import { Task, TaskSchema } from "@/lib/schemas/task"
import CommonTaskForm from "./CommonTaskForm"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function CreateTaskForm() {
  const { fetchTasks } = useTasks()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [open, setOpen] = useState(false)

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
          setOpen(false)
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
    <div className="flex justify-end mb-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-1">
            <Plus size={18} />
            Create Task
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[750px] p-0">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="text-xl uppercase">
              Create New Task
            </DialogTitle>
          </DialogHeader>
          <div className="p-6 pt-2">
            <CommonTaskForm
              key="create-form"
              onSubmit={onSubmit}
              isSubmitting={isSubmitting}
              initialValues={{
                activity: "",
                priority: "normal",
                timeUnder5Min: false,
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
