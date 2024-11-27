import { CreateTaskForm } from "@/components/dashboard/CreateTask"

export default function Dashboard() {
  return (
    <div className="container flex justify-center items-center flex-col mx-auto p-4 max-w-4xl h-full">
      <CreateTaskForm />
    </div>
  )
}
