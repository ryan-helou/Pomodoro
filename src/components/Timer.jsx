import { useRef } from 'react'
import VariableProximity from './VariableProximity'

const Timer = ({ timeLeft, currentSession, customColor }) => {
  const containerRef = useRef(null)

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const displayTime = formatTime(timeLeft)

  const isWorkSession = currentSession === 'work'

  return (
    <div className="text-center space-y-2 flex flex-col items-center justify-center w-full" ref={containerRef}>
      {/* Countdown Display with Variable Proximity */}
      <div className="text-9xl font-bold tracking-wider text-white">
        <VariableProximity
          label={displayTime}
          fromFontVariationSettings="'wght' 400"
          toFontVariationSettings="'wght' 900"
          containerRef={containerRef}
          radius={100}
          falloff="linear"
        />
      </div>

      {/* Animated Indicator Dots */}
      <div className="flex justify-center items-center gap-3">
        <div className="h-4 w-4 rounded-full transition-all duration-500 animate-pulse bg-white" />
        <div className="h-2 w-2 rounded-full transition-all duration-500 opacity-60 bg-white" />
      </div>
    </div>
  )
}

export default Timer
