import { useEffect } from 'react'
import Timer from './components/Timer'
import Controls from './components/Controls'
import ProgressAnimation from './components/ProgressAnimation'
import Settings from './components/Settings'
import ColorBends from './components/ColorBends'
import { useTimer } from './hooks/useTimer'
import { useSettings } from './hooks/useSettings'
import { useNotifications } from './hooks/useNotifications'

function App() {
  const {
    settings,
    updateWorkColor,
    updateBreakColor,
    toggleSound,
    toggleNotifications,
    updateWorkBackgroundColors,
    updateBreakBackgroundColors,
    resetToDefaults,
  } = useSettings()

  const { requestPermission } = useNotifications()

  // Request notification permission on app load
  useEffect(() => {
    requestPermission()
  }, [requestPermission])

  const {
    timeLeft,
    totalTime,
    isRunning,
    currentSession,
    completedPomodoros,
    start,
    pause,
    resume,
    reset,
    setDuration,
  } = useTimer(settings)

  // Determine colors based on session and settings
  const isWorkSession = currentSession === 'work'
  const sessionColor = isWorkSession ? settings.workColor : settings.breakColor
  const sessionLabel = isWorkSession ? 'Work' : 'Break'
  const backgroundColors = isWorkSession ? settings.workBackgroundColors : settings.breakBackgroundColors

  // Convert hex to RGB for opacity
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : '59, 130, 246'
  }

  const rgbColor = hexToRgb(sessionColor)

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      <div className="fixed inset-0 z-0">
        <ColorBends
          colors={backgroundColors}
          rotation={59}
          speed={0.82}
          scale={0.9}
          frequency={1}
          warpStrength={1}
          mouseInfluence={1.05}
          parallax={0}
          noise={0}
          transparent
        />
      </div>

      <div className="relative z-20 flex items-center justify-center w-full h-full overflow-hidden">
        <Settings
          settings={settings}
          onUpdateWorkColor={updateWorkColor}
          onUpdateBreakColor={updateBreakColor}
          onToggleSound={toggleSound}
          onToggleNotifications={toggleNotifications}
          onUpdateWorkBackgroundColors={updateWorkBackgroundColors}
          onUpdateBreakBackgroundColors={updateBreakBackgroundColors}
          onReset={resetToDefaults}
        />

        <div className="flex flex-col items-center justify-center h-full px-6">
          {/* Session Label */}
          <div className="text-center mb-8">
            <p className="text-2xl font-light tracking-widest uppercase opacity-60 text-white">
              {sessionLabel}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-16 w-full max-w-sm">
            <ProgressAnimation
              timeLeft={timeLeft}
              totalTime={totalTime}
              currentSession={currentSession}
              customColor={sessionColor}
            />
          </div>

          {/* Timer Display */}
          <div className="mb-20">
            <Timer
              timeLeft={timeLeft}
              currentSession={currentSession}
              customColor={sessionColor}
            />
          </div>

          {/* Controls */}
          <div className="w-full max-w-sm">
            <Controls
              isRunning={isRunning}
              onStart={start}
              onPause={pause}
              onResume={resume}
              onReset={reset}
              onSetDuration={setDuration}
            />
          </div>

          {/* Stats Section */}
          <div className="mt-auto mb-8 text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="text-gray-400 text-sm font-medium">Sessions</span>
              <span className="bg-gradient-to-r from-blue-300 to-emerald-300 bg-clip-text text-transparent font-bold text-4xl">
                {completedPomodoros}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

