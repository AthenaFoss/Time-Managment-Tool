import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Task } from "@/lib/schemas/task"
import { useState } from "react"
import CommonTaskForm from "./CommonTaskForm"
import { editTask } from "@/actions/tasks/editTask"
import { useTasks } from "@/context/TaskContext"
import { useToast } from "@/hooks/use-toast"

export function EditTask({
  isOpen,
  onOpenChange,
  initialValues,
  taskId,
}: {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  initialValues: Task
  taskId: number
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { fetchTasks } = useTasks()
  const { toast } = useToast()

  const updateTask = async (updatedTask: Task) => {
    try {
      setIsSubmitting(true)
      const response = await editTask(taskId, updatedTask)
      if (response.code === 200) {
        toast({
          title: response.message,
        })
      } else {
        toast({
          title: "Task update failed!",
          description: response.message,
          variant: "destructive",
        })
      }
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Task update failed!",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      fetchTasks()
      setIsSubmitting(false)
      // Hack: somehow this dailog make main screen frozen, so we need to reload the page to fix it
      window.location.reload()
    }
  }

  const handleDialogChange = (open: boolean) => {
    onOpenChange(open)
    // Hack: somehow this dailog make main screen frozen, so we need to reload the page to fix it
    window.location.reload()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Activity</DialogTitle>
          <DialogDescription>
            Make changes to your task here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <CommonTaskForm
          key={`edit-form`}
          onSubmit={updateTask}
          isSubmitting={isSubmitting}
          initialValues={initialValues}
        />
      </DialogContent>
    </Dialog>
  )
}
