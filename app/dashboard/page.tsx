"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dumbbell, LineChart, Users, Award } from "lucide-react"
import Link from "next/link"
import { WorkoutProgress } from "@/components/workout-progress"
import { ExerciseCard } from "@/components/exercise-card"
import { UserMenu } from "@/components/user-menu"
import { MobileNav } from "@/components/mobile-nav"
import { upcomingWorkouts } from "@/data/workouts"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()

  // Get the next scheduled workout (first in the list)
  const nextWorkout = upcomingWorkouts[0]

  const handleStartWorkout = () => {
    if (nextWorkout) {
      router.push(`/workout-session/${nextWorkout.id}`)
    }
  }

  return (
    <ProtectedRoute>
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
              <Link href="/dashboard" className="text-sm font-medium text-primary">
                Dashboard
              </Link>
              <Link href="/programs" className="text-sm font-medium text-muted-foreground hover:text-primary">
                Programs
              </Link>
              <Link href="/exercises" className="text-sm font-medium text-muted-foreground hover:text-primary">
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
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <Button
                  className="bg-primary text-white hover:bg-primary/90 hover:scale-[1.02] hover:shadow-md transition-all duration-300 btn-glow"
                  onClick={handleStartWorkout}
                >
                  Start Workout
                </Button>
              </div>

              <div className="grid gap-6 md:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Workouts</CardTitle>
                    <Dumbbell className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-muted-foreground">+2 from last week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Active Streak</CardTitle>
                    <Award className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">7 days</div>
                    <p className="text-xs text-muted-foreground">Keep it up!</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Weight Lifted</CardTitle>
                    <LineChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3,540 kg</div>
                    <p className="text-xs text-muted-foreground">+340 kg from last week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Community Rank</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Silver</div>
                    <p className="text-xs text-muted-foreground">Top 25% of users</p>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="progress">
                <TabsList>
                  <TabsTrigger value="progress">Progress</TabsTrigger>
                  <TabsTrigger value="current-program">Current Program</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming Workouts</TabsTrigger>
                </TabsList>
                <TabsContent value="progress" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Workout Progress</CardTitle>
                      <CardDescription>Your workout activity over the past 4 weeks</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <WorkoutProgress />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="current-program" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Strength Builder - Week 3</CardTitle>
                      <CardDescription>4 workouts remaining this week</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <ExerciseCard name="Bench Press" sets={4} reps={10} completed={true} />
                        <ExerciseCard name="Squats" sets={4} reps={12} completed={false} />
                        <ExerciseCard name="Deadlifts" sets={3} reps={8} completed={false} />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="upcoming" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Workouts</CardTitle>
                      <CardDescription>Your scheduled workouts for the next 7 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {upcomingWorkouts.map((workout) => (
                          <div
                            key={workout.id}
                            className="flex items-center justify-between border-b pb-4 last:border-b-0"
                          >
                            <div>
                              <h3 className="font-medium">{workout.title}</h3>
                              <p className="text-sm text-muted-foreground">{workout.scheduledFor}</p>
                            </div>
                            <Link href={`/workouts/${workout.id}`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="hover:bg-primary/10 hover:text-primary hover:scale-[1.02] hover:shadow-sm transition-all duration-300"
                              >
                                View
                              </Button>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}

