"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Play, Info, Bookmark, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { UserMenu } from "@/components/user-menu"
import { MobileNav } from "@/components/mobile-nav"
import { exerciseLibrary } from "@/data/exercises"
import { useParams } from "next/navigation"
import { useState } from "react"

export default function ExerciseDetailPage() {
  const params = useParams()
  const id = params.id as string
  const exercise = exerciseLibrary.find((ex) => ex.id === id) || exerciseLibrary[0]
  const [imageError, setImageError] = useState(false)

  // Find related exercises (same target muscle group)
  const relatedExercises = exerciseLibrary
    .filter((ex) => ex.id !== exercise.id && ex.target.includes(exercise.target.split(",")[0]))
    .slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary h-8 w-8 flex items-center justify-center rounded">
              <span className="text-primary-foreground font-bold">MP</span>
            </div>
            <span className="font-bold text-xl">MyPace</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Dashboard
            </Link>
            <Link href="/programs" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Programs
            </Link>
            <Link href="/exercises" className="text-sm font-medium text-primary">
              Exercises
            </Link>
            <Link href="/community" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Community
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <UserMenu />
            </div>
            <div className="md:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 py-6">
        <div className="container">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/exercises">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Library
                </Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative rounded-lg overflow-hidden h-[300px] md:h-[400px]">
                <Image
                  src={imageError ? "/images/exercise-default.jpg" : exercise.image}
                  alt={`${exercise.name} exercise demonstration showing proper form and technique`}
                  fill
                  className="object-cover"
                  onError={() => setImageError(true)}
                  priority
                />
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <Button variant="secondary" size="sm" className="rounded-full w-10 h-10 p-0">
                    <Play className="h-5 w-5" />
                  </Button>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-black/70 text-white hover:bg-black/70">
                    {exercise.difficulty}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <h1 className="text-3xl font-bold">{exercise.name}</h1>
                  <p className="text-muted-foreground mt-1">Targets: {exercise.target}</p>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline" className="px-3 py-1">
                    {exercise.category.charAt(0).toUpperCase() + exercise.category.slice(1)}
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1">
                    {exercise.equipment}
                  </Badge>
                </div>

                <p className="text-sm">
                  {exercise.description ||
                    "A comprehensive exercise that targets multiple muscle groups and helps improve strength and mobility."}
                </p>

                <div className="flex gap-2 mt-auto">
                  <Button className="flex-1">Add to Workout</Button>
                  <Button variant="outline" size="icon">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <Tabs defaultValue="instructions" className="mt-6">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="instructions">Instructions</TabsTrigger>
                <TabsTrigger value="muscles">Muscles</TabsTrigger>
                <TabsTrigger value="tips">Tips</TabsTrigger>
                <TabsTrigger value="variations">Variations</TabsTrigger>
              </TabsList>

              <TabsContent value="instructions" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    {exercise.instructions ? (
                      <ol className="list-decimal pl-5 space-y-2">
                        {exercise.instructions.map((instruction, index) => (
                          <li key={index}>{instruction}</li>
                        ))}
                      </ol>
                    ) : (
                      <div className="text-center py-8">
                        <Info className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
                        <p className="mt-2 text-muted-foreground">Detailed instructions coming soon</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="muscles" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    {exercise.muscles ? (
                      <ul className="list-disc pl-5 space-y-2">
                        {exercise.muscles.map((muscle, index) => (
                          <li key={index}>{muscle}</li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-center py-8">
                        <Info className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
                        <p className="mt-2 text-muted-foreground">Muscle information coming soon</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tips" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    {exercise.tips ? (
                      <ul className="list-disc pl-5 space-y-2">
                        {exercise.tips.map((tip, index) => (
                          <li key={index}>{tip}</li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-center py-8">
                        <Info className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
                        <p className="mt-2 text-muted-foreground">Tips and advice coming soon</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="variations" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    {exercise.variations ? (
                      <ul className="list-disc pl-5 space-y-2">
                        {exercise.variations.map((variation, index) => (
                          <li key={index}>{variation}</li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-center py-8">
                        <Info className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
                        <p className="mt-2 text-muted-foreground">Variations coming soon</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Related Exercises</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedExercises.map((relatedEx) => (
                  <Link href={`/exercises/${relatedEx.id}`} key={relatedEx.id}>
                    <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                      <div className="relative h-40">
                        <Image
                          src={relatedEx.image || "/placeholder.svg"}
                          alt={`${relatedEx.name} exercise`}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/images/exercise-default.jpg"
                          }}
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold">{relatedEx.name}</h3>
                        <p className="text-sm text-muted-foreground">{relatedEx.target}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

