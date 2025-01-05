"use client"

import { deleteTask } from "@/actions/tasks/deleteTask"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTasks } from "@/context/TaskContext"
import { useToast } from "@/hooks/use-toast"
import { TaskProps } from "@/lib/types"
import { EllipsisVertical, Pencil, Trash } from "lucide-react"
import { EditTask } from "./EditTask"
import { useState } from "react"

export function TaskOptions({ task }: { task: TaskProps }) {
  const { fetchTasks } = useTasks()
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleDeleteTask = async () => {
    try {
      const response = await deleteTask(task.id)
      if (response.code === 200) {
        toast({
          title: response.message,
        })
      } else {
        toast({
          title: "Task deletion failed!",
          description: response.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Task deletion failed!",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      fetchTasks()
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="p-1.5 hover:bg-gray-400/10 cursor-pointer rounded-md">
            <EllipsisVertical className="h-4 w-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="mt-1">
          <DropdownMenuGroup>
            <DropdownMenuItem
              onSelect={() => setIsDialogOpen(true)}
              className="cursor-pointer"
            >
              <Pencil className="h-4 w-4 mr-2" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={handleDeleteTask}
            >
              <Trash className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditTask
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        initialValues={{
          activity: task.activity,
          priority: task.priority as any,
          timeUnder5Min: task.timeUnder5Min,
        }}
        taskId={task.id}
      />
    </>
  )
}
