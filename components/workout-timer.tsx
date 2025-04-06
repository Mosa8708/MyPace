"use client"

interface WorkoutTimerProps {
  time: number
  isRunning: boolean
  className?: string
}

export function WorkoutTimer({ time, isRunning, className = "" }: WorkoutTimerProps) {
  // Format time (seconds to HH:MM:SS)
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className={`${className} ${isRunning ? "text-primary" : "text-muted-foreground"}`}>{formatTime(time)}</div>
  )
}

