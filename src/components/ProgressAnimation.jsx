const ProgressAnimation = ({ timeLeft, totalTime, currentSession, customColor }) => {
  // Calculate progress percentage
  const progressPercent = totalTime > 0 ? (timeLeft / totalTime) * 100 : 0

  const isWorkSession = currentSession === 'work'
  const defaultColor = isWorkSession ? '#3b82f6' : '#10b981'
  const barColor = customColor || defaultColor

  // Convert hex to RGB for glow effect
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : '59, 130, 246'
  }

  const rgbColor = hexToRgb(barColor)

  return (
    <div className="w-full">
      {/* Progress bar container */}
      <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden mb-8">
        {/* Animated progress bar */}
        <div
          className="h-full transition-all duration-1000 ease-out"
          style={{
            width: `${progressPercent}%`,
            backgroundColor: barColor,
            boxShadow: `0 0 12px rgb(${rgbColor} / 0.6)`,
          }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse" />
        </div>

        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-10" />
      </div>

      {/* Progress text (optional) */}
      <div className="text-xs text-gray-500 text-center">
        {Math.round(progressPercent)}% complete
      </div>
    </div>
  )
}

export default ProgressAnimation
