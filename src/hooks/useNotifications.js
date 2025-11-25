import { useCallback } from 'react'

export const useNotifications = () => {
  // Check if Notification API is supported
  const isSupported = 'Notification' in window

  // Request notification permission
  const requestPermission = useCallback(async () => {
    if (!isSupported) return false

    // Already granted
    if (Notification.permission === 'granted') return true

    // Already denied - don't ask again
    if (Notification.permission === 'denied') return false

    // Ask for permission
    try {
      const permission = await Notification.requestPermission()
      return permission === 'granted'
    } catch (error) {
      console.error('Error requesting notification permission:', error)
      return false
    }
  }, [])

  // Send notification when work session ends
  const notifyWorkEnd = useCallback(() => {
    if (!isSupported || Notification.permission !== 'granted') return

    try {
      new Notification('Time for a break!', {
        body: 'Your work session is complete. Take a break.',
        tag: 'pomodoro-work-end',
        requireInteraction: false,
      })
    } catch (error) {
      console.error('Error sending work-end notification:', error)
    }
  }, [])

  // Send notification when break session ends
  const notifyBreakEnd = useCallback(() => {
    if (!isSupported || Notification.permission !== 'granted') return

    try {
      new Notification('Back to work!', {
        body: 'Your break is over. Time to focus.',
        tag: 'pomodoro-break-end',
        requireInteraction: false,
      })
    } catch (error) {
      console.error('Error sending break-end notification:', error)
    }
  }, [])

  return {
    isSupported,
    requestPermission,
    notifyWorkEnd,
    notifyBreakEnd,
  }
}
