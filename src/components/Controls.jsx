import { useState } from 'react'
import CustomTimeDialog from './CustomTimeDialog'

const Controls = ({
  isRunning,
  onStart,
  onPause,
  onResume,
  onReset,
  onSetDuration,
}) => {
  const [showPresets, setShowPresets] = useState(true)
  const [showCustomDialog, setShowCustomDialog] = useState(false)

  const presets = [
    { name: 'Pomodoro', key: 'pomodoro', label: '25/5', shortcut: '1' },
    { name: 'Short Break', key: 'short', label: '15/3', shortcut: '2' },
  ]

  return (
    <div className="space-y-12">
      {/* Main Controls */}
      <div className="flex gap-4 justify-center">
        {!isRunning ? (
          <button
            onClick={onStart}
            className="btn-primary bg-white/80 text-gray-900 shadow-lg hover:bg-white hover:shadow-white/40 px-6 py-2 text-base font-semibold"
          >
            ▶ Start
          </button>
        ) : (
          <button
            onClick={onPause}
            className="btn-primary bg-white/80 text-gray-900 shadow-lg hover:bg-white hover:shadow-white/40 px-6 py-2 text-base font-semibold"
          >
            ⏸ Pause
          </button>
        )}

        <button
          onClick={onReset}
          className="btn-secondary bg-white/80 text-gray-900 shadow-lg hover:bg-white hover:shadow-white/40 px-6 py-2 text-base font-semibold"
        >
          ↻ Reset
        </button>
      </div>

      {/* Preset Selector */}
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          {presets.map((preset) => (
            <button
              key={preset.key}
              onClick={() => onSetDuration(preset.key)}
              className="btn-secondary bg-white/80 text-gray-900 hover:bg-white shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 py-4 px-3 font-semibold"
              title={preset.name}
            >
              <div className="font-bold text-base">{preset.name}</div>
              <div className="text-gray-700 text-sm mt-2">{preset.label}</div>
            </button>
          ))}

          {/* Custom Time Button in Grid */}
          <button
            onClick={() => setShowCustomDialog(true)}
            className="btn-secondary bg-white/80 text-gray-900 hover:bg-white shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 py-4 px-3 font-semibold"
          >
            <div className="font-bold text-base">⚙️ Custom</div>
            <div className="text-gray-700 text-sm mt-2">Time</div>
          </button>
        </div>
      </div>

      {/* Custom Time Dialog */}
      {showCustomDialog && (
        <CustomTimeDialog
          onSetCustom={onSetDuration}
          onClose={() => setShowCustomDialog(false)}
        />
      )}
    </div>
  )
}

export default Controls
