"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2 } from "lucide-react"

interface StepCustomizeProps {
  data: any
  onNext: (data: any) => void
  onBack: () => void
  isFirstStep: boolean
}

export function StepCustomize({ data, onNext, onBack, isFirstStep }: StepCustomizeProps) {
  // Get template data based on selected template
  const templateData = getTemplateData(data.selectedTemplate)

  // Initialize workout days based on template
  const [workoutDays, setWorkoutDays] = useState(data.customizations?.workoutDays || templateData.workoutDays)

  const [activeTab, setActiveTab] = useState("day-1")

  const handleExerciseToggle = (dayIndex: number, exerciseIndex: number) => {
    const updatedWorkoutDays = [...workoutDays]
    const exercise = updatedWorkoutDays[dayIndex].exercises[exerciseIndex]
    exercise.included = !exercise.included
    setWorkoutDays(updatedWorkoutDays)
  }

  const handleExerciseUpdate = (dayIndex: number, exerciseIndex: number, field: string, value: any) => {
    const updatedWorkoutDays = [...workoutDays]
    const exercise = updatedWorkoutDays[dayIndex].exercises[exerciseIndex]
    exercise[field] = value
    setWorkoutDays(updatedWorkoutDays)
  }

  const handleNext = () => {
    onNext({
      customizations: {
        workoutDays,
      },
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Customize Your Plan</h2>
        <p className="text-muted-foreground mb-6">
          Fine-tune your workout plan by customizing exercises, sets, and reps.
        </p>
      </div>

      <Tabs defaultValue="day-1" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4 flex overflow-x-auto">
          {workoutDays.map((day, index) => (
            <TabsTrigger key={index} value={`day-${index + 1}`}>
              {day.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {workoutDays.map((day, dayIndex) => (
          <TabsContent key={dayIndex} value={`day-${dayIndex + 1}`} className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">{day.name}</h3>
              <div className="text-sm text-muted-foreground">
                {day.exercises.filter((e) => e.included).length} exercises
              </div>
            </div>

            {day.exercises.map((exercise, exerciseIndex) => (
              <Card key={exerciseIndex} className={`border ${!exercise.included ? "opacity-60" : ""}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={exercise.included}
                      onCheckedChange={() => handleExerciseToggle(dayIndex, exerciseIndex)}
                      className="mt-1"
                    />

                    <div className="flex-1 space-y-2">
                      <div className="font-medium">{exercise.name}</div>
                      <p className="text-sm text-muted-foreground">{exercise.targetMuscle}</p>

                      <div className="grid grid-cols-3 gap-3 mt-2">
                        <div>
                          <Label htmlFor={`sets-${dayIndex}-${exerciseIndex}`} className="text-xs">
                            Sets
                          </Label>
                          <Input
                            id={`sets-${dayIndex}-${exerciseIndex}`}
                            type="number"
                            min="1"
                            max="10"
                            value={exercise.sets}
                            onChange={(e) =>
                              handleExerciseUpdate(dayIndex, exerciseIndex, "sets", Number.parseInt(e.target.value))
                            }
                            disabled={!exercise.included}
                            className="h-8"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`reps-${dayIndex}-${exerciseIndex}`} className="text-xs">
                            Reps
                          </Label>
                          <Input
                            id={`reps-${dayIndex}-${exerciseIndex}`}
                            type="number"
                            min="1"
                            max="50"
                            value={exercise.reps}
                            onChange={(e) =>
                              handleExerciseUpdate(dayIndex, exerciseIndex, "reps", Number.parseInt(e.target.value))
                            }
                            disabled={!exercise.included}
                            className="h-8"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`rest-${dayIndex}-${exerciseIndex}`} className="text-xs">
                            Rest (sec)
                          </Label>
                          <Input
                            id={`rest-${dayIndex}-${exerciseIndex}`}
                            type="number"
                            min="0"
                            max="300"
                            step="15"
                            value={exercise.rest}
                            onChange={(e) =>
                              handleExerciseUpdate(dayIndex, exerciseIndex, "rest", Number.parseInt(e.target.value))
                            }
                            disabled={!exercise.included}
                            className="h-8"
                          />
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleExerciseToggle(dayIndex, exerciseIndex)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button variant="outline" className="w-full mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Add Exercise
            </Button>
          </TabsContent>
        ))}
      </Tabs>

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
          className="bg-primary text-white hover:bg-primary/90 hover:scale-[1.02] hover:shadow-md transition-all duration-300"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}

// Helper function to get template data
function getTemplateData(templateId: string | null) {
  // In a real app, this would fetch the template data from a database
  // For now, we'll return a sample template
  return {
    workoutDays: [
      {
        name: "Day 1: Upper Body",
        exercises: [
          { name: "Bench Press", targetMuscle: "Chest", sets: 3, reps: 8, rest: 90, included: true },
          { name: "Bent-Over Rows", targetMuscle: "Back", sets: 3, reps: 8, rest: 90, included: true },
          { name: "Overhead Press", targetMuscle: "Shoulders", sets: 3, reps: 10, rest: 60, included: true },
          { name: "Lat Pulldowns", targetMuscle: "Back", sets: 3, reps: 10, rest: 60, included: true },
          { name: "Tricep Extensions", targetMuscle: "Triceps", sets: 3, reps: 12, rest: 60, included: true },
          { name: "Bicep Curls", targetMuscle: "Biceps", sets: 3, reps: 12, rest: 60, included: true },
        ],
      },
      {
        name: "Day 2: Lower Body",
        exercises: [
          { name: "Squats", targetMuscle: "Quadriceps", sets: 4, reps: 8, rest: 120, included: true },
          { name: "Romanian Deadlifts", targetMuscle: "Hamstrings", sets: 3, reps: 10, rest: 90, included: true },
          { name: "Leg Press", targetMuscle: "Quadriceps", sets: 3, reps: 10, rest: 90, included: true },
          { name: "Leg Curls", targetMuscle: "Hamstrings", sets: 3, reps: 12, rest: 60, included: true },
          { name: "Calf Raises", targetMuscle: "Calves", sets: 4, reps: 15, rest: 60, included: true },
          { name: "Planks", targetMuscle: "Core", sets: 3, reps: 30, rest: 60, included: true },
        ],
      },
      {
        name: "Day 3: Push",
        exercises: [
          { name: "Incline Bench Press", targetMuscle: "Upper Chest", sets: 3, reps: 8, rest: 90, included: true },
          { name: "Shoulder Press", targetMuscle: "Shoulders", sets: 3, reps: 8, rest: 90, included: true },
          { name: "Chest Flyes", targetMuscle: "Chest", sets: 3, reps: 12, rest: 60, included: true },
          { name: "Lateral Raises", targetMuscle: "Shoulders", sets: 3, reps: 12, rest: 60, included: true },
          { name: "Tricep Pushdowns", targetMuscle: "Triceps", sets: 3, reps: 12, rest: 60, included: true },
          { name: "Overhead Tricep Extensions", targetMuscle: "Triceps", sets: 3, reps: 12, rest: 60, included: true },
        ],
      },
      {
        name: "Day 4: Pull",
        exercises: [
          { name: "Pull-Ups", targetMuscle: "Back", sets: 3, reps: 8, rest: 90, included: true },
          { name: "Barbell Rows", targetMuscle: "Back", sets: 3, reps: 8, rest: 90, included: true },
          { name: "Face Pulls", targetMuscle: "Rear Deltoids", sets: 3, reps: 12, rest: 60, included: true },
          { name: "Shrugs", targetMuscle: "Traps", sets: 3, reps: 12, rest: 60, included: true },
          { name: "Hammer Curls", targetMuscle: "Biceps", sets: 3, reps: 12, rest: 60, included: true },
          { name: "Preacher Curls", targetMuscle: "Biceps", sets: 3, reps: 12, rest: 60, included: true },
        ],
      },
    ],
  }
}

