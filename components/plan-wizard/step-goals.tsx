"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dumbbell, Flame, Heart, Award, Scale, Clock } from "lucide-react"

interface StepGoalsProps {
  data: any
  onNext: (data: any) => void
  isFirstStep: boolean
}

export function StepGoals({ data, onNext, isFirstStep }: StepGoalsProps) {
  const [selectedGoals, setSelectedGoals] = useState<string[]>(data.goals || [])

  const goals = [
    { id: "strength", title: "Build Strength", icon: Dumbbell, description: "Increase overall strength and power" },
    { id: "muscle", title: "Build Muscle", icon: Award, description: "Increase muscle size and definition" },
    { id: "fat-loss", title: "Lose Fat", icon: Flame, description: "Reduce body fat and improve definition" },
    { id: "endurance", title: "Improve Endurance", icon: Clock, description: "Enhance cardiovascular fitness" },
    { id: "health", title: "General Health", icon: Heart, description: "Improve overall health and wellness" },
    { id: "weight", title: "Weight Management", icon: Scale, description: "Maintain a healthy weight" },
  ]

  const toggleGoal = (goalId: string) => {
    if (selectedGoals.includes(goalId)) {
      setSelectedGoals(selectedGoals.filter((id) => id !== goalId))
    } else {
      setSelectedGoals([...selectedGoals, goalId])
    }
  }

  const handleNext = () => {
    onNext({ goals: selectedGoals })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">What are your fitness goals?</h2>
        <p className="text-muted-foreground mb-6">
          Select all that apply. This helps us tailor your plan to your specific objectives.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map((goal) => {
          const Icon = goal.icon
          const isSelected = selectedGoals.includes(goal.id)

          return (
            <Card
              key={goal.id}
              className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                isSelected ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/50"
              }`}
              onClick={() => toggleGoal(goal.id)}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-full ${isSelected ? "bg-primary text-white" : "bg-gray-100 text-gray-500"}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">{goal.title}</h3>
                  <p className="text-sm text-muted-foreground">{goal.description}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="flex justify-end pt-4">
        <Button
          onClick={handleNext}
          disabled={selectedGoals.length === 0}
          className="bg-primary text-white hover:bg-primary/90 hover:scale-[1.02] hover:shadow-md transition-all duration-300"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}

