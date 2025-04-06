"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Circle } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface ExerciseCardProps {
  name: string
  sets: number
  reps: number
  completed?: boolean
  image?: string
  weight?: number
}

export function ExerciseCard({ name, sets, reps, completed = false, image, weight }: ExerciseCardProps) {
  const [imageError, setImageError] = useState(false)

  // Map exercise names to specific hyper-realistic image paths
  const getHyperRealisticExerciseImage = (exerciseName: string) => {
    const exerciseMap: Record<string, string> = {
      "Bench Press": "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1740&auto=format&fit=crop",
      Squats: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?q=80&w=1469&auto=format&fit=crop",
      Deadlifts: "https://images.unsplash.com/photo-1598575285627-d1f27d332d05?q=80&w=1740&auto=format&fit=crop",
      "Pull-ups": "https://images.unsplash.com/photo-1598971639058-fab30985aa4c?q=80&w=1588&auto=format&fit=crop",
      "Push-ups": "https://images.unsplash.com/photo-1598971639058-fab30985aa4c?q=80&w=1588&auto=format&fit=crop",
      Lunges: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?q=80&w=1774&auto=format&fit=crop",
      Plank: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?q=80&w=1770&auto=format&fit=crop",
      "Overhead Press": "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?q=80&w=1740&auto=format&fit=crop",
      "Dumbbell Rows": "https://images.unsplash.com/photo-1603287681836-b174ce5074c2?q=80&w=1471&auto=format&fit=crop",
      "Barbell Rows": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=1471&auto=format&fit=crop",
      "Leg Press": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1740&auto=format&fit=crop",
      "Lat Pulldown": "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1738&auto=format&fit=crop",
      "Tricep Extensions":
        "https://images.unsplash.com/photo-1530822847156-e0e4c5e6ffaa?q=80&w=1740&auto=format&fit=crop",
      "Bicep Curls": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1740&auto=format&fit=crop",
      "Calf Raises": "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?q=80&w=1744&auto=format&fit=crop",
      "Shoulder Press": "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?q=80&w=1740&auto=format&fit=crop",
      "Romanian Deadlift":
        "https://images.unsplash.com/photo-1517344884509-a0c97ec11bcc?q=80&w=1740&auto=format&fit=crop",
      "Hip Thrust": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1469&auto=format&fit=crop",
      "Lateral Raises": "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1738&auto=format&fit=crop",
      "Face Pulls": "https://images.unsplash.com/photo-1616803689943-5601631c7fec?q=80&w=1770&auto=format&fit=crop",
      "Russian Twists": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1740&auto=format&fit=crop",
      "Leg Raises": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1740&auto=format&fit=crop",
      "Mountain Climbers":
        "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?q=80&w=1744&auto=format&fit=crop",
      Burpees: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1769&auto=format&fit=crop",
      "Jumping Jacks": "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?q=80&w=1769&auto=format&fit=crop",
      "Jump Rope": "https://images.unsplash.com/photo-1599058918144-1ffabb6ab9a0?q=80&w=1769&auto=format&fit=crop",
      "Kettlebell Swings":
        "https://images.unsplash.com/photo-1517344884509-a0c97ec11bcc?q=80&w=1740&auto=format&fit=crop",
    }

    return exerciseMap[exerciseName] || "/images/exercise-default.jpg"
  }

  const imageSrc = image || getHyperRealisticExerciseImage(name)

  return (
    <Card className="overflow-hidden">
      <div className="relative h-40">
        <Image
          src={imageError ? "/images/exercise-default.jpg" : imageSrc}
          alt={`${name} exercise demonstration showing proper form and technique`}
          width={320}
          height={160}
          className="object-cover w-full h-full"
          onError={() => setImageError(true)}
        />
        <div className="absolute top-2 right-2">
          {completed ? (
            <CheckCircle2 className="h-6 w-6 text-primary bg-white rounded-full" />
          ) : (
            <Circle className="h-6 w-6 text-muted-foreground bg-white rounded-full" />
          )}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground">
          {sets} sets x {reps} reps {weight ? `@ ${weight}kg` : ""}
        </p>
      </CardContent>
    </Card>
  )
}

