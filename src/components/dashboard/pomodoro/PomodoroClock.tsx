import { convertSecondsToMMSS } from "@/lib/utils"

function PomodoroClock({ currentTime }: { currentTime: number }) {
  return (
    <div className="bg-neutral-900 border-2 rounded-full h-48 w-48 md:h-64 md:w-64 lg:h-88 lg:w-88 flex items-center justify-center">
      <h2 className="font-bold text-4xl md:text-6xl lg:text-7xl text-neutral-50 -tracking-tighter">
        {convertSecondsToMMSS(currentTime)}
      </h2>
    </div>
  )
}
export default PomodoroClock
