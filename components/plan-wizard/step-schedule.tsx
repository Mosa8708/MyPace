"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

interface StepScheduleProps {
  data: any
  onNext: (data: any) => void
  onBack: () => void
  isFirstStep: boolean
}

export function StepSchedule({ data, onNext, onBack, isFirstStep }: StepScheduleProps) {
  const [daysPerWeek, setDaysPerWeek] = useState(data.schedule?.daysPerWeek || 3)
  const [timePerWorkout, setTimePerWorkout] = useState(data.schedule?.timePerWorkout || 45)
  const [preferredDays, setPreferredDays] = useState<string[]>(data.schedule?.preferredDays || [])

  const weekdays = [
    { value: "monday", label: "Mon" },
    { value: "tuesday", label: "Tue" },
    { value: "wednesday", label: "Wed" },
    { value: "thursday", label: "Thu" },
    { value: "friday", label: "Fri" },
    { value: "saturday", label: "Sat" },
    { value: "sunday", label: "Sun" },
  ]

  const handleDaysChange = (value: string[]) => {
    // Limit selection to the number of days per week
    if (value.length <= daysPerWeek) {
      setPreferredDays(value)
    }
  }

  const handleNext = () => {
    onNext({
      schedule: {
        daysPerWeek,
        timePerWorkout,
        preferredDays,
      },
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Plan Your Workout Schedule</h2>
        <p className="text-muted-foreground mb-6">
          Tell us about your availability so we can create a realistic plan that fits your lifestyle.
        </p>
      </div>

      {/* Days Per Week */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">How many days per week can you work out?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            We recommend 3-4 days for beginners, 4-5 days for intermediate, and 5-6 days for advanced.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant={daysPerWeek === 2 ? "default" : "outline"}
            onClick={() => setDaysPerWeek(2)}
            className={daysPerWeek === 2 ? "bg-primary text-white" : ""}
          >
            2
          </Button>
          <Button
            variant={daysPerWeek === 3 ? "default" : "outline"}
            onClick={() => setDaysPerWeek(3)}
            className={daysPerWeek === 3 ? "bg-primary text-white" : ""}
          >
            3
          </Button>
          <Button
            variant={daysPerWeek === 4 ? "default" : "outline"}
            onClick={() => setDaysPerWeek(4)}
            className={daysPerWeek === 4 ? "bg-primary text-white" : ""}
          >
            4
          </Button>
          <Button
            variant={daysPerWeek === 5 ? "default" : "outline"}
            onClick={() => setDaysPerWeek(5)}
            className={daysPerWeek === 5 ? "bg-primary text-white" : ""}
          >
            5
          </Button>
          <Button
            variant={daysPerWeek === 6 ? "default" : "outline"}
            onClick={() => setDaysPerWeek(6)}
            className={daysPerWeek === 6 ? "bg-primary text-white" : ""}
          >
            6
          </Button>
        </div>
      </div>

      {/* Time Per Workout */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">How much time can you spend per workout?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            This helps us determine the volume and intensity of your workouts.
          </p>
        </div>

        <div className="space-y-6 px-2">
          <Slider
            value={[timePerWorkout]}
            min={15}
            max={120}
            step={5}
            onValueChange={(value) => setTimePerWorkout(value[0])}
          />

          <div className="flex justify-between text-sm text-muted-foreground">
            <span>15 min</span>
            <span>30 min</span>
            <span>45 min</span>
            <span>60 min</span>
            <span>90 min</span>
            <span>120 min</span>
          </div>

          <div className="text-center font-semibold text-lg">{timePerWorkout} minutes</div>
        </div>
      </div>

      {/* Preferred Days */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Which days do you prefer to work out?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Select up to {daysPerWeek} days that work best for your schedule.
          </p>
        </div>

        <ToggleGroup
          type="multiple"
          variant="outline"
          value={preferredDays}
          onValueChange={handleDaysChange}
          className="flex flex-wrap justify-center gap-2"
        >
          {weekdays.map((day) => (
            <ToggleGroupItem
              key={day.value}
              value={day.value}
              className={`rounded-md px-3 py-2 ${preferredDays.includes(day.value) ? "bg-primary text-white" : ""}`}
            >
              {day.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        {preferredDays.length < daysPerWeek && (
          <p className="text-sm text-amber-600 text-center">
            Please select {daysPerWeek - preferredDays.length} more day
            {daysPerWeek - preferredDays.length > 1 ? "s" : ""}.
          </p>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="hover:bg-primary/10 hover:text-primary hover:scale-[1.02] hover:shadow-md transition-all duration-300"
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={preferredDays.length !== daysPerWeek}
          className="bg-primary text-white hover:bg-primary/90 hover:scale-[1.02] hover:shadow-md transition-all duration-300"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}

