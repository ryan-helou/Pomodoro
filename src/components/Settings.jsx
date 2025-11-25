import { useState } from 'react'

const Settings = ({ settings, onUpdateWorkColor, onUpdateBreakColor, onToggleSound, onToggleNotifications, onUpdateWorkBackgroundColors, onUpdateBreakBackgroundColors, onReset }) => {
  const [isOpen, setIsOpen] = useState(false)

  const colors = [
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Purple', value: '#a855f7' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Cyan', value: '#06b6d4' },
    { name: 'Indigo', value: '#6366f1' },
  ]

  const breakColors = [
    { name: 'Green', value: '#10b981' },
    { name: 'Emerald', value: '#059669' },
    { name: 'Teal', value: '#14b8a6' },
    { name: 'Lime', value: '#84cc16' },
    { name: 'Cyan', value: '#06b6d4' },
    { name: 'Blue', value: '#3b82f6' },
  ]

  const backgroundColorPalette = [
    { name: 'Pink', value: '#ff5c7a' },
    { name: 'Purple', value: '#8a5cff' },
    { name: 'Cyan', value: '#00ffd1' },
    { name: 'Green', value: '#10b981' },
    { name: 'Emerald', value: '#059669' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Yellow', value: '#eab308' },
    { name: 'Indigo', value: '#6366f1' },
  ]

  return (
    <>
      {/* Settings Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 p-3 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
        title="Settings"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>

      {/* Settings Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={() => setIsOpen(false)}
          />
          {/* Settings Sidebar */}
          <div className="fixed right-0 top-0 h-full w-96 bg-gray-800 shadow-2xl z-50 overflow-y-auto p-8 space-y-6" style={{ maxHeight: '100vh' }}>
            <div />
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Settings</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Work Session Background Colors */}
            <div className="space-y-3 pt-4 border-t border-gray-700">
              <label className="block text-sm font-semibold text-gray-300">
                Work Background Colors
              </label>
              <div className="space-y-2">
                {[0, 1, 2].map((index) => (
                  <div key={`work-bg-${index}`} className="space-y-1">
                    <p className="text-xs text-gray-500">Color {index + 1}</p>
                    <div className="grid grid-cols-5 gap-2">
                      {backgroundColorPalette.map((color) => (
                        <button
                          key={color.value}
                          onClick={() => {
                            const newColors = [...settings.workBackgroundColors]
                            newColors[index] = color.value
                            onUpdateWorkBackgroundColors(newColors)
                          }}
                          className={`h-8 rounded-lg transition-all ${
                            settings.workBackgroundColors[index] === color.value
                              ? 'ring-2 ring-white scale-110'
                              : 'hover:scale-105'
                          }`}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Break Session Background Colors */}
            <div className="space-y-3 pt-4 border-t border-gray-700">
              <label className="block text-sm font-semibold text-gray-300">
                Break Background Colors
              </label>
              <div className="space-y-2">
                {[0, 1, 2].map((index) => (
                  <div key={`break-bg-${index}`} className="space-y-1">
                    <p className="text-xs text-gray-500">Color {index + 1}</p>
                    <div className="grid grid-cols-5 gap-2">
                      {backgroundColorPalette.map((color) => (
                        <button
                          key={color.value}
                          onClick={() => {
                            const newColors = [...settings.breakBackgroundColors]
                            newColors[index] = color.value
                            onUpdateBreakBackgroundColors(newColors)
                          }}
                          className={`h-8 rounded-lg transition-all ${
                            settings.breakBackgroundColors[index] === color.value
                              ? 'ring-2 ring-white scale-110'
                              : 'hover:scale-105'
                          }`}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Audio Toggle */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-300">
                  Sound Alerts
                </label>
                <button
                  onClick={onToggleSound}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.soundEnabled ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.soundEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <p className="text-xs text-gray-500">
                {settings.soundEnabled ? '🔊 Sound enabled' : '🔇 Sound disabled'}
              </p>
            </div>

            {/* Notifications Toggle */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-300">
                  Browser Notifications
                </label>
                <button
                  onClick={onToggleNotifications}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.notificationsEnabled ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <p className="text-xs text-gray-500">
                {settings.notificationsEnabled ? '🔔 Notifications enabled' : '🔕 Notifications disabled'}
              </p>
            </div>

            {/* Reset Button */}
            <button
              onClick={() => {
                onReset()
                setIsOpen(false)
              }}
              className="w-full btn-secondary bg-gray-700 text-gray-300 hover:bg-gray-600"
            >
              Reset to Defaults
            </button>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-full btn-primary bg-blue-600 text-white hover:bg-blue-700"
            >
              Done
            </button>
          </div>
        </>
      )}
    </>
  )
}

export default Settings
