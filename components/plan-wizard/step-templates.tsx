"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Dumbbell, Clock, Users, Star } from "lucide-react"

interface StepTemplatesProps {
  data: any
  onNext: (data: any) => void
  onBack: () => void
  isFirstStep: boolean
}

export function StepTemplates({ data, onNext, onBack, isFirstStep }: StepTemplatesProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(data.selectedTemplate || null)

  // Generate templates based on user's goals, experience, and equipment
  const templates = getRecommendedTemplates(data)

  const handleNext = () => {
    onNext({ selectedTemplate })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Choose a Workout Template</h2>
        <p className="text-muted-foreground mb-6">
          Based on your goals, experience, and equipment, here are some recommended templates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`overflow-hidden cursor-pointer transition-all hover:shadow-md ${
              selectedTemplate === template.id ? "border-primary ring-2 ring-primary/20" : "border-gray-200"
            }`}
            onClick={() => setSelectedTemplate(template.id)}
          >
            <div className="relative h-40">
              <Image src={template.image || "/placeholder.svg"} alt={template.title} fill className="object-cover" />
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="bg-black/70 text-white hover:bg-black/70">
                  {template.level}
                </Badge>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg">{template.title}</h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{template.description}</p>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                  {template.duration}
                </div>
                <div className="flex items-center">
                  <Dumbbell className="h-4 w-4 mr-1 text-muted-foreground" />
                  {template.focus}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                  {template.level}
                </div>
              </div>

              <div className="flex items-center mt-3">
                <div className="flex mr-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= template.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">({template.reviews} reviews)</span>
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
          disabled={!selectedTemplate}
          className="bg-primary text-white hover:bg-primary/90 hover:scale-[1.02] hover:shadow-md transition-all duration-300"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}

// Helper function to get recommended templates based on user data
function getRecommendedTemplates(userData: any) {
  // In a real app, this would be more sophisticated and would filter based on the user's data
  return [
    {
      id: "strength-builder",
      title: "Strength Builder",
      description:
        "A comprehensive program designed to build overall strength and muscle mass through a structured approach.",
      image: "/images/strength-program.jpg",
      duration: "12 weeks",
      focus: "Strength",
      level:
        userData.experience === "beginner"
          ? "Beginner"
          : userData.experience === "intermediate"
            ? "Intermediate"
            : "Advanced",
      rating: 4.8,
      reviews: 124,
    },
    {
      id: "hiit-challenge",
      title: "HIIT Challenge",
      description:
        "High-intensity interval training to improve cardiovascular fitness, burn fat, and enhance overall endurance.",
      image: "/images/hiit-program.jpg",
      duration: "8 weeks",
      focus: "Cardio & Fat Loss",
      level: "All Levels",
      rating: 4.6,
      reviews: 98,
    },
    {
      id: "muscle-hypertrophy",
      title: "Muscle Hypertrophy",
      description:
        "Scientifically designed to maximize muscle growth and aesthetics through volume, frequency, and intensity.",
      image: "/images/program-hypertrophy.jpg",
      duration: "12 weeks",
      focus: "Muscle Building",
      level: userData.experience === "beginner" ? "Intermediate" : "Advanced",
      rating: 4.7,
      reviews: 112,
    },
    {
      id: "bodyweight-mastery",
      title: "Bodyweight Mastery",
      description: "Build strength and mobility using only your bodyweight with progressive calisthenics.",
      image: "/images/program-home.jpg",
      duration: "10 weeks",
      focus: "Strength & Mobility",
      level: "All Levels",
      rating: 4.5,
      reviews: 87,
    },
  ]
}

