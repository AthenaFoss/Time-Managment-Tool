import { convertSecondsToMMSS } from "@/lib/utils"

function PomodoroClock({ currentTime }: { currentTime: number }) {
  return (
    <div className="bg-black rounded-full h-56 w-56 md:h-72 md:w-72  lg:h-96 lg:w-96 flex items-center justify-center">
      <h2 className="font-bold text-5xl md:text-7xl lg:text-8xl text-white -tracking-tighter">
        {convertSecondsToMMSS(currentTime)}
      </h2>
    </div>
  )
}
export default PomodoroClock
