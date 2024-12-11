import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { TimerPreset } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const DEFAULT_TIME = 1500

export const TIMER_PRESETS: TimerPreset[] = [
  {
    value: 1500,
    display: "Pomodoro",
  },
  {
    value: 300,
    display: "Short Break",
  },
  {
    value: 1800,
    display: "Long Break",
  },
]

export const convertSecondsToMMSS = (time: number) => {
  const format = (value: number) => {
    return value < 10 ? `0${value}` : value
  }
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  return `${format(minutes)}:${format(seconds)}`
}

export const playPomodoroNotificationSound = () => {
  const audio = new Audio("/pomodoroSound.mp3")
  return audio.play().catch((error) => {
    console.error("Error playing notification sound:", error)
  })
}

export const pomodoroToastMessages = {
  Pomodoro:
    "Great job! You've completed your focus session. Time to take a break!",
  "Short Break": "Break's over! Ready to dive back in?",
  "Long Break": "Well done! You've earned a longer break. Relax and recharge.",
}
