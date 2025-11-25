import { useState, useEffect } from 'react'

const DEFAULT_SETTINGS = {
  workColor: '#3b82f6',        // Blue
  breakColor: '#10b981',       // Green
  soundEnabled: false,         // Sound alerts toggle
  notificationsEnabled: false, // Browser notifications toggle
  workBackgroundColors: ['#ff5c7a', '#8a5cff', '#00ffd1'],
  breakBackgroundColors: ['#10b981', '#059669', '#06b6d4'],
}

export const useSettings = () => {
  const [settings, setSettings] = useState(() => {
    // Load from localStorage on initialization
    const saved = localStorage.getItem('pomodoroSettings')
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS
  })

  // Persist settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('pomodoroSettings', JSON.stringify(settings))
  }, [settings])

  const updateWorkColor = (color) => {
    setSettings((prev) => ({ ...prev, workColor: color }))
  }

  const updateBreakColor = (color) => {
    setSettings((prev) => ({ ...prev, breakColor: color }))
  }

  const toggleSound = () => {
    setSettings((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }))
  }

  const toggleNotifications = () => {
    setSettings((prev) => ({ ...prev, notificationsEnabled: !prev.notificationsEnabled }))
  }

  const updateWorkBackgroundColors = (colors) => {
    setSettings((prev) => ({ ...prev, workBackgroundColors: colors }))
  }

  const updateBreakBackgroundColors = (colors) => {
    setSettings((prev) => ({ ...prev, breakBackgroundColors: colors }))
  }

  const resetToDefaults = () => {
    setSettings(DEFAULT_SETTINGS)
  }

  return {
    settings,
    updateWorkColor,
    updateBreakColor,
    toggleSound,
    toggleNotifications,
    updateWorkBackgroundColors,
    updateBreakBackgroundColors,
    resetToDefaults,
  }
}
