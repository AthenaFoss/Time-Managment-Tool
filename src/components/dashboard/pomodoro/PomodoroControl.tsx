"use client"

import { Button } from "@/components/ui/button"
import {
  convertSecondsToMMSS,
  DEFAULT_TIME,
  playPomodoroNotificationSound,
  pomodoroToastMessages,
  TIMER_PRESETS,
} from "@/lib/utils"
import PomodoroClock from "./PomodoroClock"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { TimerMessageKey } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { CircleStop, Pause, Play, TimerReset } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function PomodoroControl() {
  const [time, setTime] = useState(DEFAULT_TIME)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [isActiveButton, setActiveButton] = useState<TimerMessageKey | "">(
    "Pomodoro"
  )
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
  }, [isActiveButton, isTimerRunning, time, toast])

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
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6 space-y-4">
        <Tabs defaultValue="Pomodoro">
          <TabsList className="w-full">
            {TIMER_PRESETS.map(({ value, display }) => (
              <TabsTrigger
                key={value}
                value={display}
                className="flex-1"
                onClick={() => selectTimer(value, display)}
              >
                {display}
              </TabsTrigger>
            ))}
          </TabsList>
          {TIMER_PRESETS.map(({ value, display }) => (
            <TabsContent className="mt-4 justify-items-center" key={value} value={display}>
              <PomodoroClock currentTime={time} />
            </TabsContent>
          ))}
        </Tabs>
        <div className="flex justify-center space-x-2">
          <Button variant="outline" onClick={handleTimerToggle}>
            {!isTimerRunning ? (
              <Play />
            ) : time === 0 ? (
              <CircleStop />
            ) : (
              <Pause />
            )}
          </Button>
          <Button variant="outline" onClick={handleTimerReset}>
            <TimerReset />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
export default PomodoroControl
