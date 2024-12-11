import { CreateTaskForm } from "@/components/dashboard/tasks/CreateTask"
import PomodoroControl from "../../components/dashboard/pomodoro/PomodoroControl"
import { TaskList } from "@/components/dashboard/tasks/TaskList"
import { TaskProvider } from "@/context/TaskContext"
import { SummaryCard } from "@/components/dashboard/SummaryCard"

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 w-full xl:w-[80vw]">
      <TaskProvider>
        <SummaryCard />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <TaskList />
          <CreateTaskForm />
          <PomodoroControl />
        </div>
      </TaskProvider>
    </div>
  )
}
