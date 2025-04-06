"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Dumbbell, Calendar, Clock, CheckCircle } from "lucide-react"

interface StepReviewProps {
  data: any
  onSubmit: (data: any) => void
  onBack: () => void
  isLastStep: boolean
}

export function StepReview({ data, onSubmit, onBack, isLastStep }: StepReviewProps) {
  const [planName, setPlanName] = useState(`My Fitness Plan - ${new Date().toLocaleDateString()}`)

  // Get template data based on selected template
  const templateData = getTemplateData(data.selectedTemplate)

  // Get goal names
  const goalNames = getGoalNames(data.goals)

  // Get experience level name
  const experienceName = getExperienceName(data.experience)

  // Get equipment names
  const equipmentNames = getEquipmentNames(data.equipment)

  const handleSubmit = () => {
    onSubmit({
      planName,
      createdAt: new Date().toISOString(),
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Review Your Plan</h2>
        <p className="text-muted-foreground mb-6">Review your personalized fitness plan before finalizing.</p>
      </div>

      <div className="space-y-6">
        {/* Plan Summary */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold">{planName}</h3>
                <p className="text-sm text-muted-foreground">
                  {data.schedule.daysPerWeek} days per week • {data.schedule.timePerWorkout} minutes per workout
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {goalNames.map((goal, index) => (
                  <Badge key={index} variant="secondary">
                    {goal}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Dumbbell className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Experience Level</p>
                  <p className="font-medium">{experienceName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Schedule</p>
                  <p className="font-medium">
                    {data.schedule.preferredDays.map((day: string) => day.slice(0, 3)).join(", ")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium">{templateData.duration}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Workout Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Workout Details</h3>

          <Accordion type="single" collapsible className="w-full">
            {data.customizations.workoutDays.map((day: any, index: number) => (
              <AccordionItem key={index} value={`day-${index}`}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <span>{day.name}</span>
                    <Badge variant="outline">{day.exercises.filter((e: any) => e.included).length} exercises</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pt-2">
                    {day.exercises
                      .filter((exercise: any) => exercise.included)
                      .map((exercise: any, exIndex: number) => (
                        <div key={exIndex} className="flex items-center justify-between py-2 border-b last:border-0">
                          <div>
                            <p className="font-medium">{exercise.name}</p>
                            <p className="text-sm text-muted-foreground">{exercise.targetMuscle}</p>
                          </div>
                          <div className="text-sm">
                            {exercise.sets} sets × {exercise.reps} reps
                          </div>
                        </div>
                      ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Equipment Needed */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Equipment Needed</h3>
          <div className="flex flex-wrap gap-2">
            {equipmentNames.map((equipment, index) => (
              <div key={index} className="flex items-center gap-1 bg-muted px-3 py-1 rounded-full text-sm">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>{equipment}</span>
              </div>
            ))}
          </div>
        </div>
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
          onClick={handleSubmit}
          className="bg-primary text-white hover:bg-primary/90 hover:scale-[1.02] hover:shadow-md transition-all duration-300"
        >
          Create My Plan
        </Button>
      </div>
    </div>
  )
}

// Helper functions
function getTemplateData(templateId: string | null) {
  // In a real app, this would fetch the template data from a database
  return {
    duration: "12 weeks",
  }
}

function getGoalNames(goalIds: string[]) {
  const goalMap: Record<string, string> = {
    strength: "Build Strength",
    muscle: "Build Muscle",
    "fat-loss": "Lose Fat",
    endurance: "Improve Endurance",
    health: "General Health",
    weight: "Weight Management",
  }

  return goalIds.map((id) => goalMap[id] || id)
}

function getExperienceName(experienceId: string) {
  const experienceMap: Record<string, string> = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
  }

  return experienceMap[experienceId] || experienceId
}

function getEquipmentNames(equipmentIds: string[]) {
  const equipmentMap: Record<string, string> = {
    barbell: "Barbell",
    dumbbell: "Dumbbells",
    cable: "Cable Machine",
    smith: "Smith Machine",
    "leg-press": "Leg Press",
    "pullup-bar": "Pull-up Bar",
    kettlebell: "Kettlebells",
    "resistance-bands": "Resistance Bands",
    bench: "Workout Bench",
    none: "Bodyweight Only",
    "park-equipment": "Park Equipment",
  }

  return equipmentIds.map((id) => equipmentMap[id] || id)
}

