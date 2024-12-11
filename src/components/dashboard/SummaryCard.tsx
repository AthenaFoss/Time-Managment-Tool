'use client'
import { CalendarDays, ListTodo, Timer } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { useTasks } from "@/context/TaskContext"

export function SummaryCard() {
  const { tasks } = useTasks();

  const completedTasks = tasks.filter((task) => task.completed).length;
  const remainingTasks = tasks.filter((task) => !task.completed).length;
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Completed Tasks
          </CardTitle>
          <ListTodo className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {completedTasks}
          </div>
          <p className="text-xs text-muted-foreground">Across all categories</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Remaining Tasks</CardTitle>
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {remainingTasks}
          </div>
          <p className="text-xs text-muted-foreground">Due today</p>
        </CardContent>
      </Card>
      <Card>
        {/* //*NOTE: can be used when we store pomodoro data */}
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Pomodoro Sessions
          </CardTitle>
          <Timer className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">8</div>
          <p className="text-xs text-muted-foreground">
            4 hours of focused work
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
