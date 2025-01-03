"use client"

import { deleteTask } from "@/actions/tasks/deleteTask"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTasks } from "@/context/TaskContext"
import { useToast } from "@/hooks/use-toast"
import { EllipsisVertical, Trash } from "lucide-react"

export function TaskOptions({ taskId }: { taskId: number }) {
  const { fetchTasks } = useTasks()
  const { toast } = useToast()

  const handleDeleteTask = async () => {
    try {
      const response = await deleteTask(taskId)
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="p-1.5 hover:bg-gray-400/10 cursor-pointer rounded-md">
          <EllipsisVertical className="h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="mt-1">
        <DropdownMenuGroup>
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
  )
}
