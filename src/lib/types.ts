export type TimerMessageKey = "Pomodoro" | "Short Break" | "Long Break"
export type TimerPreset = {
  value: number
  display: TimerMessageKey
}

export interface TaskProps {
  id: number
  userId: string
  activity: string
  priority: string
  completed: boolean
  timeUnder5Min: boolean
  createdAt: Date
  updatedAt: Date
}
