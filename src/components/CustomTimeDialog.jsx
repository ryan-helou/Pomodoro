import { useState } from 'react'

const CustomTimeDialog = ({ onSetCustom, onClose }) => {
  const [workMinutes, setWorkMinutes] = useState(25)
  const [breakMinutes, setBreakMinutes] = useState(5)

  const handleApply = () => {
    onSetCustom({
      work: workMinutes * 60,
      break: breakMinutes * 60,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-2xl p-8 max-w-sm w-full space-y-6">
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
          <label className="block text-sm font-semibold text-gray-300">
            Work Duration (minutes)
          </label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setWorkMinutes(Math.max(1, workMinutes - 1))}
              className="btn-secondary bg-gray-700 text-white hover:bg-gray-600 text-xl w-12 h-12 flex items-center justify-center p-0"
            >
              −
            </button>
            <input
              type="number"
              min="1"
              max="120"
              value={workMinutes}
              onChange={(e) => setWorkMinutes(Math.max(1, parseInt(e.target.value) || 1))}
              className="flex-1 bg-gray-700 text-white text-center rounded-lg py-2 px-4 font-semibold text-lg"
            />
            <button
              onClick={() => setWorkMinutes(Math.min(120, workMinutes + 1))}
              className="btn-secondary bg-gray-700 text-white hover:bg-gray-600 text-xl w-12 h-12 flex items-center justify-center p-0"
            >
              +
            </button>
          </div>
        </div>

        {/* Break Duration */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-300">
            Break Duration (minutes)
          </label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setBreakMinutes(Math.max(1, breakMinutes - 1))}
              className="btn-secondary bg-gray-700 text-white hover:bg-gray-600 text-xl w-12 h-12 flex items-center justify-center p-0"
            >
              −
            </button>
            <input
              type="number"
              min="1"
              max="120"
              value={breakMinutes}
              onChange={(e) => setBreakMinutes(Math.max(1, parseInt(e.target.value) || 1))}
              className="flex-1 bg-gray-700 text-white text-center rounded-lg py-2 px-4 font-semibold text-lg"
            />
            <button
              onClick={() => setBreakMinutes(Math.min(120, breakMinutes + 1))}
              className="btn-secondary bg-gray-700 text-white hover:bg-gray-600 text-xl w-12 h-12 flex items-center justify-center p-0"
            >
              +
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gray-700/50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-400">
            {workMinutes}m work / {breakMinutes}m break
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 btn-secondary bg-gray-700 text-gray-300 hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="flex-1 btn-primary bg-blue-600 text-white hover:bg-blue-700"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}

export default CustomTimeDialog
