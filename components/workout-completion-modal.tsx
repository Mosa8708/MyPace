"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Award, Calendar, Clock, Dumbbell, Star } from "lucide-react"

interface WorkoutCompletionModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
  workout: any
  elapsedTime: number
  completedSets: Record<string, boolean[]>
  totalSets: number
}

export function WorkoutCompletionModal({
  isOpen,
  onClose,
  onComplete,
  workout,
  elapsedTime,
  completedSets,
  totalSets,
}: WorkoutCompletionModalProps) {
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")

  // Calculate stats
  const completedSetsCount = Object.values(completedSets).reduce(
    (total, sets) => total + sets.filter(Boolean).length,
    0,
  )

  const completionPercentage = totalSets > 0 ? Math.round((completedSetsCount / totalSets) * 100) : 0

  // Format time (seconds to MM:SS)
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`
    }

    return `${minutes}m ${secs}s`
  }

  // Calculate total volume (weight × sets × reps)
  const totalVolume = workout?.exercises.reduce((total: number, exercise: any) => {
    const completedSetsForExercise = completedSets[exercise.id]?.filter(Boolean).length || 0
    return total + (exercise.weight || 0) * completedSetsForExercise * exercise.reps
  }, 0)

  // Handle rating selection
  const handleRating = (value: number) => {
    setRating(value)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Workout Complete!</DialogTitle>
          <DialogDescription className="text-center">Great job! You've completed your workout.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Completion animation/image */}
          <div className="flex justify-center">
            <div className="relative h-24 w-24 flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
              <div className="bg-primary rounded-full p-4">
                <Award className="h-12 w-12 text-primary-foreground" />
              </div>
            </div>
          </div>

          {/* Workout stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
              <Clock className="h-5 w-5 text-primary mb-1" />
              <span className="text-xs text-muted-foreground">Duration</span>
              <span className="font-medium">{formatTime(elapsedTime)}</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
              <Dumbbell className="h-5 w-5 text-primary mb-1" />
              <span className="text-xs text-muted-foreground">Volume</span>
              <span className="font-medium">{totalVolume.toLocaleString()} kg</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
              <Calendar className="h-5 w-5 text-primary mb-1" />
              <span className="text-xs text-muted-foreground">Completion</span>
              <span className="font-medium">{completionPercentage}%</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
              <Award className="h-5 w-5 text-primary mb-1" />
              <span className="text-xs text-muted-foreground">Sets</span>
              <span className="font-medium">
                {completedSetsCount}/{totalSets}
              </span>
            </div>
          </div>

          {/* Rating */}
          <div>
            <h4 className="text-sm font-medium mb-2">Rate your workout:</h4>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button key={value} type="button" onClick={() => handleRating(value)} className="focus:outline-none">
                  <Star
                    className={`h-8 w-8 ${
                      value <= rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Feedback */}
          <div>
            <h4 className="text-sm font-medium mb-2">How did it go? (optional)</h4>
            <Textarea
              placeholder="Share your thoughts about this workout..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onComplete} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Save & Finish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

