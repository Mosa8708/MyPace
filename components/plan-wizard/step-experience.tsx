"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface StepExperienceProps {
  data: any
  onNext: (data: any) => void
  onBack: () => void
  isFirstStep: boolean
}

export function StepExperience({ data, onNext, onBack, isFirstStep }: StepExperienceProps) {
  const [selectedExperience, setSelectedExperience] = useState<string>(data.experience || "")

  const experienceLevels = [
    {
      id: "beginner",
      title: "Beginner",
      description: "New to fitness or returning after a long break. Focus on learning proper form and building habits.",
    },
    {
      id: "intermediate",
      title: "Intermediate",
      description:
        "Consistent training for 6+ months. Familiar with basic exercises and ready for more structured programs.",
    },
    {
      id: "advanced",
      title: "Advanced",
      description: "Training consistently for 2+ years. Looking for specialized programs to break through plateaus.",
    },
  ]

  const handleNext = () => {
    onNext({ experience: selectedExperience })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">What's your fitness experience level?</h2>
        <p className="text-muted-foreground mb-6">
          This helps us determine the appropriate exercise selection and intensity for your plan.
        </p>
      </div>

      <div className="space-y-4">
        {experienceLevels.map((level) => (
          <Card
            key={level.id}
            className={`p-6 cursor-pointer transition-all hover:shadow-md ${
              selectedExperience === level.id
                ? "border-primary bg-primary/5"
                : "border-gray-200 hover:border-primary/50"
            }`}
            onClick={() => setSelectedExperience(level.id)}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedExperience === level.id ? "border-primary" : "border-gray-300"
                }`}
              >
                {selectedExperience === level.id && <div className="w-3 h-3 rounded-full bg-primary"></div>}
              </div>
              <div>
                <h3 className="font-semibold">{level.title}</h3>
                <p className="text-sm text-muted-foreground">{level.description}</p>
              </div>
            </div>
          </Card>
        ))}
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
          disabled={!selectedExperience}
          className="bg-primary text-white hover:bg-primary/90 hover:scale-[1.02] hover:shadow-md transition-all duration-300"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}

