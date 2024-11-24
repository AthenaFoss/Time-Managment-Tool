"use client"

import { useState } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Task {
  id: number
  name: string
  urgent: boolean
  important: boolean
  timeUnder5Min: boolean
}

interface CreateTaskFormProps {
  onTaskCreated: (task: Task) => void
}

export function CreateTaskForm({ onTaskCreated }: CreateTaskFormProps) {
  const [newTask, setNewTask] = useState("")
  const [isUrgent, setIsUrgent] = useState(false)
  const [isImportant, setIsImportant] = useState(false)
  const [isUnder5Min, setIsUnder5Min] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTask.trim()) return

    const task: Task = {
      id: Date.now(),
      name: newTask,
      urgent: isUrgent,
      important: isImportant,
      timeUnder5Min: isUnder5Min,
    }

    onTaskCreated(task)
    setNewTask("")
    setIsUrgent(false)
    setIsImportant(false)
    setIsUnder5Min(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="task">Task Name</Label>
            <Input
              id="task"
              placeholder="Enter your task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="urgent"
                checked={isUrgent}
                onCheckedChange={() => setIsUrgent(!isUrgent)}
              />
              <Label htmlFor="urgent">Urgent</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="important"
                checked={isImportant}
                onCheckedChange={() => setIsImportant(!isImportant)}
              />
              <Label htmlFor="important">Important</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="time"
                checked={isUnder5Min}
                onCheckedChange={() => setIsUnder5Min(!isUnder5Min)}
              />
              <Label htmlFor="time">Takes under 5 minutes</Label>
            </div>
          </div>
          <Button type="submit">Add Task</Button>
        </form>
      </CardContent>
    </Card>
  )
}
