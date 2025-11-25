import { useState } from 'react'

const CustomTimeDialog = ({ onSetCustom, onClose, backgroundColors }) => {
  const [workMinutes, setWorkMinutes] = useState(25)
  const [breakMinutes, setBreakMinutes] = useState(5)

  const handleApply = () => {
    onSetCustom({
      work: workMinutes * 60,
      break: breakMinutes * 60,
    })
    onClose()
  }

  // Create gradient from background colors
  const gradientStyle = backgroundColors && backgroundColors.length > 0
    ? {
        background: `linear-gradient(135deg, ${backgroundColors[0]} 0%, ${backgroundColors[1] || backgroundColors[0]} 50%, ${backgroundColors[2] || backgroundColors[0]} 100%)`,
      }
    : { backgroundColor: '#1f2937' }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="rounded-2xl p-8 max-w-sm w-full space-y-6" style={gradientStyle}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Custom Times</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Work Duration */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-white">
            Work Duration (minutes)
          </label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setWorkMinutes(Math.max(1, workMinutes - 1))}
              className="btn-secondary bg-white/20 text-white hover:bg-white/30 text-xl w-12 h-12 flex items-center justify-center p-0 backdrop-blur"
            >
              −
            </button>
            <input
              type="number"
              min="1"
              max="120"
              value={workMinutes}
              onChange={(e) => setWorkMinutes(Math.max(1, parseInt(e.target.value) || 1))}
              className="flex-1 bg-white/10 text-white text-center rounded-lg py-2 px-4 font-semibold text-lg placeholder-white/50 backdrop-blur"
            />
            <button
              onClick={() => setWorkMinutes(Math.min(120, workMinutes + 1))}
              className="btn-secondary bg-white/20 text-white hover:bg-white/30 text-xl w-12 h-12 flex items-center justify-center p-0 backdrop-blur"
            >
              +
            </button>
          </div>
        </div>

        {/* Break Duration */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-white">
            Break Duration (minutes)
          </label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setBreakMinutes(Math.max(1, breakMinutes - 1))}
              className="btn-secondary bg-white/20 text-white hover:bg-white/30 text-xl w-12 h-12 flex items-center justify-center p-0 backdrop-blur"
            >
              −
            </button>
            <input
              type="number"
              min="1"
              max="120"
              value={breakMinutes}
              onChange={(e) => setBreakMinutes(Math.max(1, parseInt(e.target.value) || 1))}
              className="flex-1 bg-white/10 text-white text-center rounded-lg py-2 px-4 font-semibold text-lg placeholder-white/50 backdrop-blur"
            />
            <button
              onClick={() => setBreakMinutes(Math.min(120, breakMinutes + 1))}
              className="btn-secondary bg-white/20 text-white hover:bg-white/30 text-xl w-12 h-12 flex items-center justify-center p-0 backdrop-blur"
            >
              +
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
          <p className="text-sm text-white/80">
            {workMinutes}m work / {breakMinutes}m break
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 btn-secondary bg-white/20 text-white hover:bg-white/30 backdrop-blur"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="flex-1 btn-primary bg-white/40 text-white hover:bg-white/50 backdrop-blur font-semibold"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}

export default CustomTimeDialog
