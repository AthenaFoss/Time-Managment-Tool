"use client"

import { Button } from "@/components/ui/button"
import {
  convertSecondsToMMSS,
  playPomodoroNotificationSound,
  pomodoroToastMessages,
  TIMER_PRESETS,
} from "@/lib/utils"
import PomodoroClock from "./PomodoroClock"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { TimerMessageKey } from "@/lib/types"

function PomodoroControl() {
  const [time, setTime] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [isActiveButton, setActiveButton] = useState<TimerMessageKey | "">("")
  const { toast } = useToast()

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isTimerRunning) {
        if (time > 0) {
          setTime(time - 1)
        } else if (time === 0 && isTimerRunning) {
          //  when timer ends play notification sound
          playPomodoroNotificationSound()
          // show toast msg based on the selected timer when timer stops
          if (isActiveButton) {
            toast({
              title: pomodoroToastMessages[isActiveButton],
            })
          }
          clearInterval(intervalId)
          setIsTimerRunning(false)
          // set button to play when timer stops
          setActiveButton("")
        }
      }
    }, 1000)

    if (isTimerRunning) {
      document.title = `${convertSecondsToMMSS(time)} - remaining`
    }

    return () => clearInterval(intervalId)
  }, [isTimerRunning, time])

  // select between pomodoro | short break | long break
  const selectTimer = (value: number, display: TimerMessageKey) => {
    setIsTimerRunning(false)
    setTime(value)
    setActiveButton(display)
    // change to app name
    document.title = "Time Management Tool"
  }

  // start and pause timer
  const handleTimerToggle = () => {
    //if no timer selected show notification
    if (!time) {
      toast({
        title: "You need to set a timer first",
      })
    } else {
      setIsTimerRunning(!isTimerRunning)
    }
  }

  const handleTimerReset = () => {
    setIsTimerRunning(false)
    setTime(TIMER_PRESETS[0].value)
    setActiveButton(TIMER_PRESETS[0].display)
    // change to app name
    document.title = "Time Management Tool"
  }

  return (
    <div>
      <h2 className="text-center text-3xl md:text-4xl font-bold py-9">
        Pomodoro Timer
      </h2>
      <div className="flex flex-col gap-10  mx-auto items-center">
        <div className="flex items-center justify-evenly gap-4 md:gap-8 flex-wrap ">
          {TIMER_PRESETS.map(({ value, display }) => (
            <div key={display}>
              <Button
                onClick={() => selectTimer(value, display)}
                variant={`${isActiveButton === display ? "default" : "outline"}`}
              >
                {display}
              </Button>
            </div>
          ))}
        </div>
        <PomodoroClock currentTime={time} />
        <div className="flex items-center gap-3 md:gap-10">
          <Button onClick={handleTimerToggle}>
            {!isTimerRunning ? "Play" : time === 0 ? "Stop" : "Pause"}
          </Button>
          <Button onClick={handleTimerReset}>Reset</Button>
        </div>
      </div>
    </div>
  )
}
export default PomodoroControl
