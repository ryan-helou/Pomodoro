import { useState, useEffect, useRef, useCallback } from 'react'
import { useSoundAlert } from './useSoundAlert'
import { useNotifications } from './useNotifications'

const PRESETS = {
  pomodoro: { work: 25 * 60, break: 5 * 60 },
  short: { work: 15 * 60, break: 3 * 60 },
  quick: { work: 5 * 60, break: 1 * 60 },
}

export const useTimer = (settings = {}) => {
  const { playWorkEndSound, playBreakEndSound } = useSoundAlert()
  const { notifyWorkEnd, notifyBreakEnd } = useNotifications()

  // Core state
  const [timeLeft, setTimeLeft] = useState(PRESETS.pomodoro.work)
  const [isRunning, setIsRunning] = useState(false)
  const [isWorkSession, setIsWorkSession] = useState(true) // TRUE = work, FALSE = break
  const [completedPomodoros, setCompletedPomodoros] = useState(0)
  const [workDuration, setWorkDuration] = useState(PRESETS.pomodoro.work)
  const [breakDuration, setBreakDuration] = useState(PRESETS.pomodoro.break)

  // Refs
  const intervalRef = useRef(null)
  const onSessionEndRef = useRef(null)

  // Cleanup interval
  const clearTimerInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  // Store durations in a ref to access in interval without causing recreates
  const durationsRef = useRef({ work: workDuration, break: breakDuration })
  useEffect(() => {
    durationsRef.current = { work: workDuration, break: breakDuration }
  }, [workDuration, breakDuration])

  // Main timer effect - handles countdown and session switching
  useEffect(() => {
    if (!isRunning) return

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time is up - switch session
          // We need to update the session AND reset the time atomically
          // First, determine the new session and duration
          const currentIsWork = isWorkSession // Capture current state
          const newIsWork = !currentIsWork
          const newDuration = newIsWork ? durationsRef.current.work : durationsRef.current.break

          setIsWorkSession(newIsWork)

          // Play appropriate sound if enabled
          if (settings.soundEnabled) {
            if (currentIsWork) {
              // Was work, now switching to break
              playWorkEndSound()
            } else {
              // Was break, now switching to work
              playBreakEndSound()
              // Increment pomodoros only when returning from break to work
              setCompletedPomodoros((count) => count + 1)
            }
          }

          // Send notifications if enabled
          if (settings.notificationsEnabled) {
            if (currentIsWork) {
              // Was work, now switching to break
              notifyWorkEnd()
            } else {
              // Was break, now switching to work
              notifyBreakEnd()
            }
          }

          // Trigger callback
          if (onSessionEndRef.current) {
            onSessionEndRef.current(newIsWork) // Pass the new session state
          }

          return newDuration
        }
        return prev - 1
      })
    }, 1000)

    return clearTimerInterval
  }, [isRunning, workDuration, breakDuration, settings.soundEnabled, settings.notificationsEnabled, playWorkEndSound, playBreakEndSound, notifyWorkEnd, notifyBreakEnd, clearTimerInterval])

  // Control methods
  const start = useCallback(() => {
    setIsRunning(true)
  }, [])

  const pause = useCallback(() => {
    setIsRunning(false)
  }, [])

  const resume = useCallback(() => {
    setIsRunning(true)
  }, [])

  const reset = useCallback(() => {
    clearTimerInterval()
    setIsRunning(false)
    const duration = isWorkSession ? workDuration : breakDuration
    setTimeLeft(duration)
  }, [clearTimerInterval, isWorkSession, workDuration, breakDuration])

  // Set custom durations
  const setDuration = useCallback(
    (preset) => {
      clearTimerInterval()
      setIsRunning(false)

      if (preset === 'pomodoro') {
        setWorkDuration(PRESETS.pomodoro.work)
        setBreakDuration(PRESETS.pomodoro.break)
        setIsWorkSession(true)
        setTimeLeft(PRESETS.pomodoro.work)
        setCompletedPomodoros(0)
      } else if (preset === 'short') {
        setWorkDuration(PRESETS.short.work)
        setBreakDuration(PRESETS.short.break)
        setIsWorkSession(true)
        setTimeLeft(PRESETS.short.work)
        setCompletedPomodoros(0)
      } else if (preset === 'quick') {
        setWorkDuration(PRESETS.quick.work)
        setBreakDuration(PRESETS.quick.break)
        setIsWorkSession(true)
        setTimeLeft(PRESETS.quick.work)
        setCompletedPomodoros(0)
      } else if (typeof preset === 'object' && preset.work && preset.break) {
        // Custom duration
        setWorkDuration(preset.work)
        setBreakDuration(preset.break)
        setIsWorkSession(true)
        setTimeLeft(preset.work)
        setCompletedPomodoros(0)
      }
    },
    [clearTimerInterval]
  )

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Spacebar: pause/resume
      if (e.code === 'Space') {
        e.preventDefault()
        setIsRunning((prev) => !prev)
      }

      // Number keys for presets
      if (e.key === '1') {
        e.preventDefault()
        setDuration('pomodoro')
      } else if (e.key === '2') {
        e.preventDefault()
        setDuration('short')
      } else if (e.key === '3') {
        e.preventDefault()
        setDuration('quick')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setDuration])

  // Cleanup on unmount
  useEffect(() => {
    return clearTimerInterval
  }, [clearTimerInterval])

  // Compute totalTime and currentSession based on isWorkSession
  const totalTime = isWorkSession ? workDuration : breakDuration
  const currentSession = isWorkSession ? 'work' : 'break'

  return {
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
    onSessionEnd: (callback) => {
      onSessionEndRef.current = callback
    },
  }
}
