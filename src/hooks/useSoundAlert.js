import { useCallback } from 'react'

export const useSoundAlert = () => {
  // Play a beep sound using Web Audio API
  const playSound = useCallback((frequency = 800, duration = 500, volume = 0.3) => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = frequency
      oscillator.type = 'sine'

      gainNode.gain.setValueAtTime(volume, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + duration / 1000)
    } catch (error) {
      console.log('Audio API not available:', error)
    }
  }, [])

  // Play alert sound when transitioning work → break (higher pitch)
  const playWorkEndSound = useCallback(() => {
    // Double beep: high tone
    playSound(1000, 300, 0.3)
    setTimeout(() => playSound(1000, 300, 0.3), 350)
  }, [playSound])

  // Play alert sound when transitioning break → work (lower pitch)
  const playBreakEndSound = useCallback(() => {
    // Double beep: lower tone
    playSound(600, 300, 0.3)
    setTimeout(() => playSound(600, 300, 0.3), 350)
  }, [playSound])

  // Generic alert sound
  const playAlert = useCallback((frequency = 800, duration = 500) => {
    playSound(frequency, duration, 0.3)
  }, [playSound])

  return {
    playWorkEndSound,
    playBreakEndSound,
    playAlert,
    playSound,
  }
}
