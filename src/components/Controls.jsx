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
      <div className="flex gap-6 justify-center">
        {!isRunning ? (
          <button
            onClick={onStart}
            className="btn-primary bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-xl hover:shadow-blue-500/60 hover:from-blue-600 hover:to-blue-700 px-8 py-4 text-lg"
          >
            ▶ Start
          </button>
        ) : (
          <button
            onClick={onPause}
            className="btn-primary bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-xl hover:shadow-yellow-500/60 hover:from-yellow-600 hover:to-yellow-700 px-8 py-4 text-lg"
          >
            ⏸ Pause
          </button>
        )}

        <button
          onClick={onReset}
          className="btn-secondary bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-xl hover:from-gray-700 hover:to-gray-800 hover:shadow-gray-600/60 px-8 py-4 text-lg"
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
              className="btn-secondary bg-gradient-to-br from-gray-700 to-gray-800 text-gray-100 hover:from-gray-600 hover:to-gray-700 shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 py-4 px-3"
              title={preset.name}
            >
              <div className="font-bold text-base">{preset.name}</div>
              <div className="text-gray-400 text-sm mt-2">{preset.label}</div>
            </button>
          ))}

          {/* Custom Time Button in Grid */}
          <button
            onClick={() => setShowCustomDialog(true)}
            className="btn-secondary bg-gradient-to-br from-gray-700 to-gray-800 text-gray-100 hover:from-gray-600 hover:to-gray-700 shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 py-4 px-3"
          >
            <div className="font-bold text-base">⚙️ Custom</div>
            <div className="text-gray-400 text-sm mt-2">Time</div>
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
