"use client"

import type React from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Info } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface ExerciseDetailModalProps {
  name: string
  description?: string
  instructions?: string[]
  image?: string
  children: React.ReactNode
}

export function ExerciseDetailModal({ name, description, instructions, image, children }: ExerciseDetailModalProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription>{description || "Exercise details and proper form instructions."}</DialogDescription>
        </DialogHeader>
        <div className="relative h-60 mt-4 rounded-md overflow-hidden">
          <Image
            src={imageError ? "/images/exercise-default.jpg" : image || `/images/exercise-default.jpg`}
            alt={`${name} exercise demonstration`}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        </div>
        {instructions && instructions.length > 0 ? (
          <div className="mt-4">
            <h4 className="font-medium mb-2">Instructions:</h4>
            <ol className="list-decimal pl-5 space-y-1 text-sm">
              {instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
        ) : (
          <div className="flex items-center justify-center py-4 text-muted-foreground">
            <Info className="h-4 w-4 mr-2" />
            <span>Detailed instructions coming soon</span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

