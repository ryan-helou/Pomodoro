import { useRef } from 'react'
import VariableProximity from './VariableProximity'
import CircularProgressBar from './CircularProgressBar'

const Timer = ({ timeLeft, currentSession, customColor, totalTime }) => {
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
    <div className="text-center flex flex-col items-center justify-center w-full relative" ref={containerRef}>
      {/* Circular Progress Bar Container - Perfect Square */}
      <div
        className="relative flex items-center justify-center flex-shrink-0"
        style={{
          width: '420px',
          height: '420px',
          aspectRatio: '1 / 1'
        }}
      >
        {/* Circular Progress Bar Background */}
        <CircularProgressBar
          timeLeft={timeLeft}
          totalTime={totalTime}
          currentSession={currentSession}
          customColor={customColor}
        />

        {/* Countdown Display - Perfectly Centered */}
        <div
          className="absolute text-9xl font-bold tracking-wider text-white z-10 flex items-center justify-center"
          style={{
            width: '100%',
            height: '100%'
          }}
        >
          <VariableProximity
            label={displayTime}
            fromFontVariationSettings="'wght' 400"
            toFontVariationSettings="'wght' 900"
            containerRef={containerRef}
            radius={100}
            falloff="linear"
          />
        </div>
      </div>

      {/* Animated Indicator Dots */}
      <div className="flex justify-center items-center gap-3 mt-8">
        <div className="h-4 w-4 rounded-full transition-all duration-500 animate-pulse bg-white" />
        <div className="h-2 w-2 rounded-full transition-all duration-500 opacity-60 bg-white" />
      </div>
    </div>
  )
}

export default Timer
