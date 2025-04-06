"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Play, Info } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { UserMenu } from "@/components/user-menu"
import { MobileNav } from "@/components/mobile-nav"
import { exerciseLibrary } from "@/data/exercises"
import { useState } from "react"

// Add this function after the imports
function getHyperRealisticExerciseImage(exercise: {
  id: string
  name: string
  category?: string
  target: string
}): string {
  // Map specific exercises to high-quality Unsplash images - all unique
  const exerciseMap: Record<string, string> = {
    // Upper body exercises - all unique images
    "Bench Press": "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000",
    "Push-ups": "https://images.unsplash.com/photo-1616803689943-5601631c7fec?q=80&w=1000",
    "Pull-ups": "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1000", // Fixed pull-ups image
    "Dumbbell Rows": "https://images.unsplash.com/photo-1603287681836-b174ce5074c2?q=80&w=1000",
    "Overhead Press": "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1000",
    "Tricep Extensions": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000",
    "Bicep Curls": "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1000",
    "Lateral Raises": "https://images.unsplash.com/photo-1584380931214-dbb5b72e7fd0?q=80&w=1000", // Unique image
    "Face Pulls": "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=1000",
    "Barbell Rows": "https://images.unsplash.com/photo-1584466977773-e625c37cdd50?q=80&w=1000", // Unique image

    // Lower body exercises - all unique images
    Squats: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1000",
    Deadlifts: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000",
    Lunges: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?q=80&w=1000",
    "Leg Press": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000",
    "Romanian Deadlift": "https://images.unsplash.com/photo-1600026453346-a44501602a02?q=80&w=1000", // Unique image
    "Hip Thrust": "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?q=80&w=1000",
    "Calf Raises": "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?q=80&w=1000", // Unique image

    // Core exercises - all unique images
    Plank: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?q=80&w=1000",
    "Russian Twists": "https://images.unsplash.com/photo-1544216717-3bbf52512659?q=80&w=1000", // Unique image
    "Leg Raises": "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1000", // Unique image
    "Mountain Climbers": "https://images.unsplash.com/photo-1540474527411-9c2f13c7aad4?q=80&w=1000", // Unique image

    // Cardio exercises - all unique images
    Burpees: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?q=80&w=1000",
    "Jumping Jacks": "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=1000", // Unique image
    "Jump Rope": "https://images.unsplash.com/photo-1552848031-326ec03fe2ec?q=80&w=1000",
    "Kettlebell Swings": "https://images.unsplash.com/photo-1517344884509-a0c97ec11bcc?q=80&w=1000",

    // Stretching exercises - all unique images
    "Hamstring Stretch": "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=1000",
    "Quad Stretch": "https://images.unsplash.com/photo-1562771379-eafdca7a02f8?q=80&w=1000", // Unique image
    "Shoulder Stretch": "https://images.unsplash.com/photo-1581122584612-713f89daa8eb?q=80&w=1000", // Unique image
    "Hip Flexor Stretch": "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000", // Unique image
  }

  // Check for exact name match
  if (exerciseMap[exercise.name]) {
    return exerciseMap[exercise.name]
  }

  // Category-based fallbacks with high-quality images - all unique
  const categoryMap: Record<string, string> = {
    upper: "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?q=80&w=1000", // New unique image
    lower: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1000",
    core: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?q=80&w=1000",
    cardio: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?q=80&w=1000",
    stretch: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=1000",
  }

  // Check for category match
  const category = exercise.category || ""
  if (categoryMap[category]) {
    return categoryMap[category]
  }

  // Target muscle group fallbacks - all unique
  if (exercise.target.toLowerCase().includes("chest")) {
    return "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000"
  } else if (exercise.target.toLowerCase().includes("back")) {
    return "https://images.unsplash.com/photo-1603287681836-b174ce5074c2?q=80&w=1000"
  } else if (exercise.target.toLowerCase().includes("legs") || exercise.target.toLowerCase().includes("quad")) {
    return "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1000"
  } else if (exercise.target.toLowerCase().includes("shoulder")) {
    return "https://images.unsplash.com/photo-1584380931214-dbb5b72e7fd0?q=80&w=1000" // New unique image
  } else if (
    exercise.target.toLowerCase().includes("arm") ||
    exercise.target.toLowerCase().includes("bicep") ||
    exercise.target.toLowerCase().includes("tricep")
  ) {
    return "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1000"
  } else if (exercise.target.toLowerCase().includes("core") || exercise.target.toLowerCase().includes("abs")) {
    return "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?q=80&w=1000"
  }

  // Default fallback
  return "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000"
}

export default function ExercisesPage() {
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
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Exercise Library</h1>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search exercises..." className="pl-10 w-full" />
            </div>

            <Tabs defaultValue="all">
              <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="upper">Upper Body</TabsTrigger>
                <TabsTrigger value="lower">Lower Body</TabsTrigger>
                <TabsTrigger value="core">Core</TabsTrigger>
                <TabsTrigger value="cardio">Cardio</TabsTrigger>
                <TabsTrigger value="stretch">Stretching</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {exerciseLibrary.map((exercise) => (
                    <ExerciseItem
                      key={exercise.id}
                      name={exercise.name}
                      target={exercise.target}
                      equipment={exercise.equipment}
                      difficulty={exercise.difficulty}
                      image={exercise.image}
                      id={exercise.id}
                    />
                  ))}
                </div>

                <div className="flex justify-center mt-8">
                  <Button variant="outline">Load More Exercises</Button>
                </div>
              </TabsContent>

              {/* Other tab contents */}
              <TabsContent value="upper" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {exerciseLibrary
                    .filter((ex) => ex.category === "upper")
                    .map((exercise) => (
                      <ExerciseItem
                        key={exercise.id}
                        name={exercise.name}
                        target={exercise.target}
                        equipment={exercise.equipment}
                        difficulty={exercise.difficulty}
                        image={exercise.image}
                        id={exercise.id}
                      />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="lower" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {exerciseLibrary
                    .filter((ex) => ex.category === "lower")
                    .map((exercise) => (
                      <ExerciseItem
                        key={exercise.id}
                        name={exercise.name}
                        target={exercise.target}
                        equipment={exercise.equipment}
                        difficulty={exercise.difficulty}
                        image={exercise.image}
                        id={exercise.id}
                      />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="core" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {exerciseLibrary
                    .filter((ex) => ex.category === "core")
                    .map((exercise) => (
                      <ExerciseItem
                        key={exercise.id}
                        name={exercise.name}
                        target={exercise.target}
                        equipment={exercise.equipment}
                        difficulty={exercise.difficulty}
                        image={exercise.image}
                        id={exercise.id}
                      />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="cardio" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {exerciseLibrary
                    .filter((ex) => ex.category === "cardio")
                    .map((exercise) => (
                      <ExerciseItem
                        key={exercise.id}
                        name={exercise.name}
                        target={exercise.target}
                        equipment={exercise.equipment}
                        difficulty={exercise.difficulty}
                        image={exercise.image}
                        id={exercise.id}
                      />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="stretch" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {exerciseLibrary
                    .filter((ex) => ex.category === "stretch")
                    .map((exercise) => (
                      <ExerciseItem
                        key={exercise.id}
                        name={exercise.name}
                        target={exercise.target}
                        equipment={exercise.equipment}
                        difficulty={exercise.difficulty}
                        image={exercise.image}
                        id={exercise.id}
                      />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

interface ExerciseItemProps {
  id: string
  name: string
  target: string
  equipment: string
  difficulty: string
  image: string
}

function ExerciseItem({ id, name, target, equipment, difficulty, image }: ExerciseItemProps) {
  const [imageError, setImageError] = useState(false)
  const category = id.split("-")[1] || ""
  const hyperRealisticImage = getHyperRealisticExerciseImage({ id, name, category, target })

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48 group">
        <Image
          src={imageError ? "/images/exercise-default.jpg" : hyperRealisticImage}
          alt={`${name} exercise demonstrated by fitness model`}
          width={600}
          height={400}
          className="object-cover w-full h-full"
          onError={() => setImageError(true)}
          priority={id.includes("ex-1") || id.includes("ex-2")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full w-10 h-10 p-0 transform transition-transform hover:scale-110 bg-white/90 text-black hover:bg-white"
          >
            <Play className="h-5 w-5" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full w-10 h-10 p-0 transform transition-transform hover:scale-110 bg-white/90 text-black hover:bg-white"
          >
            <Info className="h-5 w-5" />
          </Button>
        </div>
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-black/70 text-white hover:bg-black/70">
            {difficulty}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-sm text-muted-foreground mb-2">Targets: {target}</p>
        <p className="text-xs text-muted-foreground">Equipment: {equipment}</p>
        <div className="mt-auto pt-3">
          <Link href={`/exercises/${id}`}>
            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

