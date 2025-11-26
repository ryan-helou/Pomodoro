import { useEffect } from 'react'

export const useDocumentTitle = (timeLeft, isRunning, currentSession) => {
  useEffect(() => {
    // Format time as MM:SS
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
    }

    // Update title based on state
    if (isRunning) {
      const sessionLabel = currentSession === 'work' ? 'Work' : 'Break'
      document.title = `${formatTime(timeLeft)} - ${sessionLabel}`
    } else {
      // When paused or idle, show default title
      document.title = 'Pomodoro Timer'
    }

    // Cleanup: restore original title on unmount
    return () => {
      document.title = 'Pomodoro Timer'
    }
  }, [timeLeft, isRunning, currentSession])
}
