import { useState } from 'react'
import CustomTimeDialog from './CustomTimeDialog'
import { useIsMobile } from '../hooks/useIsMobile'

const Controls = ({
  isRunning,
  onStart,
  onPause,
  onResume,
  onReset,
  onSetDuration,
  backgroundColors,
}) => {
  const [showPresets, setShowPresets] = useState(true)
  const [showCustomDialog, setShowCustomDialog] = useState(false)
  const isMobile = useIsMobile()

  const presets = [
    { name: 'Pomodoro', key: 'pomodoro', label: '25/5', shortcut: '1' },
    { name: 'Short Break', key: 'short', label: '15/3', shortcut: '2' },
  ]

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Main Controls */}
      <div className={`flex gap-2 md:gap-4 justify-center ${isMobile ? 'flex-col' : ''}`}>
        {!isRunning ? (
          <button
            onClick={onStart}
            className="btn-primary bg-white/80 text-gray-900 shadow-lg hover:bg-white hover:shadow-white/40 active:bg-gray-100 md:px-6 md:py-2 px-4 py-3 text-base md:text-base font-semibold flex-1 md:flex-none"
          >
            ▶ Start
          </button>
        ) : (
          <button
            onClick={onPause}
            className="btn-primary bg-white/80 text-gray-900 shadow-lg hover:bg-white hover:shadow-white/40 active:bg-gray-100 md:px-6 md:py-2 px-4 py-3 text-base md:text-base font-semibold flex-1 md:flex-none"
          >
            ⏸ Pause
          </button>
        )}

        <button
          onClick={onReset}
          className="btn-secondary bg-white/80 text-gray-900 shadow-lg hover:bg-white hover:shadow-white/40 active:bg-gray-100 md:px-6 md:py-2 px-4 py-3 text-base md:text-base font-semibold flex-1 md:flex-none"
        >
          ↻ Reset
        </button>
      </div>

      {/* Preset Selector */}
      <div className="space-y-3 md:space-y-4">
        <div className={`grid gap-2 md:gap-4 ${isMobile ? 'grid-cols-2' : 'grid-cols-3'}`}>
          {presets.map((preset) => (
            <button
              key={preset.key}
              onClick={() => onSetDuration(preset.key)}
              className="btn-secondary bg-white/80 text-gray-900 hover:bg-white shadow-lg hover:shadow-xl transition-all md:hover:scale-105 active:scale-95 md:active:scale-95 py-3 md:py-3 px-3 font-semibold min-h-12"
              title={preset.name}
            >
              <div className="text-sm md:text-base">{preset.label}</div>
            </button>
          ))}

          {/* Custom Time Button in Grid */}
          <button
            onClick={() => setShowCustomDialog(true)}
            className="btn-secondary bg-white/80 text-gray-900 hover:bg-white shadow-lg hover:shadow-xl transition-all md:hover:scale-105 active:scale-95 md:active:scale-95 py-3 md:py-3 px-3 font-semibold min-h-12"
          >
            <div className="text-sm md:text-base">Custom ⚙️</div>
          </button>
        </div>
      </div>

      {/* Custom Time Dialog */}
      {showCustomDialog && (
        <CustomTimeDialog
          onSetCustom={onSetDuration}
          onClose={() => setShowCustomDialog(false)}
          backgroundColors={backgroundColors}
        />
      )}
    </div>
  )
}

export default Controls
