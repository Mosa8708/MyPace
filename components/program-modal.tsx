"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AuthAwareButton } from "@/components/auth-aware-button"

interface Exercise {
  name: string
  sets: number
  reps: string
  note?: string
}

interface WorkoutDay {
  title: string
  exercises: Exercise[]
}

interface ProgramPhase {
  title: string
  description: string
  weeks: string
  days: WorkoutDay[]
}

// Update the ProgramPhase interface to include additionalConsiderations
interface ProgramModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  author: string
  duration: string
  level: string
  description: string
  videoUrl: string
  phases?: ProgramPhase[]
  additionalConsiderations?: {
    title: string
    description: string
  }[]
}

// Add the additionalConsiderations parameter to the component
export function ProgramModal({
  isOpen,
  onClose,
  title,
  author,
  duration,
  level,
  description,
  videoUrl,
  phases,
  additionalConsiderations,
}: ProgramModalProps) {
  const [activeTab, setActiveTab] = useState("overview")

  if (!isOpen) return null

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const videoId = getYouTubeId(videoUrl)
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : ""

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-auto">
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white border-b">
          <div>
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-gray-500">by {author}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-primary/10 hover:text-primary hover:scale-[1.02] transition-all duration-300"
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <div className="p-6">
          {/* Video Embed */}
          <div className="aspect-video mb-6 bg-gray-100 rounded-lg overflow-hidden">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={`${title} video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-gray-500">Video unavailable</p>
              </div>
            )}
          </div>

          {/* Program Details */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="outline" className="px-3 py-1">
              {duration}
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              {level}
            </Badge>
          </div>

          {/* Add a new tab for additional considerations in the Tabs component */}
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              {phases &&
                phases.map((phase, index) => (
                  <TabsTrigger key={index} value={`phase-${index + 1}`}>
                    Phase {index + 1}
                  </TabsTrigger>
                ))}
              {additionalConsiderations && <TabsTrigger value="considerations">Considerations</TabsTrigger>}
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <h3 className="text-xl font-semibold">Program Overview</h3>
              <p className="text-gray-700">{description}</p>

              {phases && (
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Program Structure:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {phases.map((phase, index) => (
                      <li key={index}>
                        <span className="font-medium">{phase.title}</span> ({phase.weeks}): {phase.description}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-4">
                <AuthAwareButton
                  size="lg"
                  className="bg-primary text-white hover:bg-primary/90 hover:scale-[1.02] hover:shadow-md transition-all duration-300 btn-glow"
                  onAuthenticatedClick={() => {
                    // This function will only run if the user is authenticated
                    console.log("User enrolled in program:", title)
                    // Add your enrollment logic here
                  }}
                  saveAction="enroll in this program"
                >
                  Enroll in Program
                </AuthAwareButton>
              </div>
            </TabsContent>

            {phases &&
              phases.map((phase, index) => (
                <TabsContent key={index} value={`phase-${index + 1}`} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{phase.title}</h3>
                    <p className="text-gray-700 mb-4">{phase.description}</p>
                    <Badge variant="outline" className="px-3 py-1 mb-4">
                      {phase.weeks}
                    </Badge>
                  </div>

                  {phase.days.map((day, dayIndex) => (
                    <div key={dayIndex} className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-100 p-3 font-medium border-b">{day.title}</div>
                      <div className="p-4">
                        <ul className="space-y-3">
                          {day.exercises.map((exercise, exIndex) => (
                            <li
                              key={exIndex}
                              className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-gray-100 last:border-0"
                            >
                              <span className="font-medium">{exercise.name}</span>
                              <span className="text-gray-600 mt-1 sm:mt-0">
                                {exercise.sets} sets × {exercise.reps}
                                {exercise.note && <span className="text-gray-500 text-sm ml-2">({exercise.note})</span>}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              ))}
            {additionalConsiderations && (
              <TabsContent value="considerations" className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">Additional Considerations</h3>
                <div className="space-y-4">
                  {additionalConsiderations.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-medium text-lg mb-2">{item.title}</h4>
                      <p className="text-gray-700">{item.description}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  )
}

