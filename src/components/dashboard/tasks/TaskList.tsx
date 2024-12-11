"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTasks } from "@/context/TaskContext"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { updateTaskStatus } from "@/actions/tasks/updateTask"

export function TaskList() {
  const { tasks, fetchTasks } = useTasks()
  const [isUpdating, setIsUpdating] = useState(false)

  const handleCheckboxChange = async (taskId: number, completed: boolean) => {
    setIsUpdating(true)
    try {
      await updateTaskStatus(taskId, completed)
      fetchTasks()
    } catch (error) {
      console.error("Failed to update task status:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase">List of Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        {!tasks.length ? (
          <p className="text-red-500">
            No tasks found. Add some tasks to get started.
          </p>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className={`${task.completed ? "line-through" : ""} flex items-center justify-between`}>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`completed-${task.id}`}
                    checked={task.completed}
                    onCheckedChange={(checked: boolean) =>
                      handleCheckboxChange(task.id, checked)
                    }
                    disabled={isUpdating}
                  />
                  <span>{task.activity}</span>
                </div>
                <div className="flex gap-2">
                  {task.timeUnder5Min && (
                    <Badge className="bg-green-500 hover:bg-green-600">
                      quick
                    </Badge>
                  )}
                  <Badge
                    variant={
                      task.priority === "urgent"
                        ? "destructive"
                        : task.priority === "important"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {task.priority}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
