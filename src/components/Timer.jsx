import { useRef } from 'react'
import VariableProximity from './VariableProximity'
import CircularProgressBar from './CircularProgressBar'
import { useIsMobile } from '../hooks/useIsMobile'

const Timer = ({ timeLeft, currentSession, customColor, totalTime, backgroundColors }) => {
  const containerRef = useRef(null)
  const isMobile = useIsMobile()

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const displayTime = formatTime(timeLeft)

  const isWorkSession = currentSession === 'work'

  // Use first background color for the circular progress bar
  const circleColor = backgroundColors && backgroundColors[0] ? backgroundColors[0] : customColor

  // Responsive sizing
  const timerSize = isMobile ? 280 : 420
  const fontSize = isMobile ? '5.5rem' : '8.5rem'

  return (
    <div className="text-center flex flex-col items-center justify-center w-full relative" ref={containerRef}>
      {/* Circular Progress Bar Container - Perfect Square */}
      <div
        className="relative flex items-center justify-center flex-shrink-0"
        style={{
          width: `${timerSize}px`,
          height: `${timerSize}px`,
          aspectRatio: '1 / 1'
        }}
      >
        {/* Circular Progress Bar Background */}
        <CircularProgressBar
          timeLeft={timeLeft}
          totalTime={totalTime}
          currentSession={currentSession}
          customColor={circleColor}
        />

        {/* Countdown Display - Perfectly Centered */}
        <div
          className="absolute font-bold tracking-wider text-white z-10 flex items-center justify-center"
          style={{
            fontSize: fontSize,
            width: '100%',
            height: '100%'
          }}
        >
          <VariableProximity
            label={displayTime}
            fromFontVariationSettings="'wght' 400"
            toFontVariationSettings="'wght' 900"
            containerRef={containerRef}
            radius={isMobile ? 60 : 100}
            falloff="linear"
            style={{ fontSize: fontSize }}
          />
        </div>
      </div>

    </div>
  )
}

export default Timer
