"use client"
import { Button } from "@/components/ui/button"
import {
  convertSecondsToMMSS,
  playPomodoroNotificationSound,
  pomodoroToastMessages,
  TIMER_PRESETS,
} from "@/lib/utils"
import PomodoroClock from "./pomodoroClock"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { TimerMessageKey } from "@/lib/definitions"

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
          toast({
            title: isActiveButton && pomodoroToastMessages[isActiveButton],
          })
          clearInterval(intervalId)
          // reset play button
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
  }

  // start and pause timer
  const handleTimerToggle = () => {
    //if no timer selected show notification
    !time
      ? toast({
          title: "You need to set a timer first",
        })
      : setIsTimerRunning(!isTimerRunning)
  }

  const handleTimerReset = () => {
    setIsTimerRunning(false)
    setTime(TIMER_PRESETS[0].value)
    // change to app name
    document.title = "Pomodoro Timer"
  }

  return (
    <div>
      <h2 className="text-center text-3xl md:text-4xl  font-bold py-9">
        Pomodoro Timer
      </h2>
      <div className="flex flex-col gap-10  mx-auto  items-center">
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
