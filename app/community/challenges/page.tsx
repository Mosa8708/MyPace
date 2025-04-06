"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { UserMenu } from "@/components/user-menu"
import { MobileNav } from "@/components/mobile-nav"
import { Search, Filter, Users, Trophy, ArrowLeft, Clock } from "lucide-react"

export default function ChallengesPage() {
  const [activeTab, setActiveTab] = useState("active")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary h-8 w-8 flex items-center justify-center rounded">
                <span className="text-primary-foreground font-bold">MP</span>
              </div>
              <span className="font-bold text-xl">MyPace</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Dashboard
            </Link>
            <Link href="/programs" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Programs
            </Link>
            <Link href="/exercises" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Exercises
            </Link>
            <Link href="/community" className="text-sm font-medium text-primary">
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
            <div className="flex items-center gap-2 mb-4">
              <Link href="/community" className="inline-flex items-center text-sm hover:text-primary transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Community
              </Link>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">Fitness Challenges</h1>
                <p className="text-muted-foreground mt-1">
                  Join challenges, track your progress, and compete with the community
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button>Create Challenge</Button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search challenges..." className="pl-10" />
            </div>

            {/* Content Tabs */}
            <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-6 mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {/* Challenge Cards */}
                  <ChallengeCard
                    title="30-Day Squat Challenge"
                    description="Complete 100 squats every day for 30 days. Track your progress and see how your lower body strength improves!"
                    image="/images/challenge-squat.jpg"
                    participants={248}
                    duration="30 days"
                    difficulty="Intermediate"
                    progress={70}
                    daysLeft={9}
                  />

                  <ChallengeCard
                    title="1000kg Club"
                    description="Join the prestigious 1000kg club by achieving a combined total of 1000kg across squat, bench press, and deadlift."
                    image="/images/challenge-1000kg.jpg"
                    participants={124}
                    duration="Ongoing"
                    difficulty="Advanced"
                    progress={85}
                    daysLeft={null}
                  />

                  <ChallengeCard
                    title="10k Steps Daily"
                    description="Commit to walking 10,000 steps every day for 2 weeks. Great for overall health and recovery."
                    image="/images/challenge-steps.jpg"
                    participants={512}
                    duration="14 days"
                    difficulty="Beginner"
                    progress={50}
                    daysLeft={7}
                  />

                  <ChallengeCard
                    title="Plank Progression"
                    description="Increase your plank time from 30 seconds to 3 minutes over 3 weeks. Build core strength and stability."
                    image="/images/challenge-plank.jpg"
                    participants={186}
                    duration="21 days"
                    difficulty="All Levels"
                    progress={33}
                    daysLeft={14}
                  />

                  <ChallengeCard
                    title="Pull-up Power"
                    description="Master the pull-up by following this progressive program. From assisted to weighted pull-ups."
                    image="/images/challenge-pullup.jpg"
                    participants={97}
                    duration="45 days"
                    difficulty="Intermediate"
                    progress={20}
                    daysLeft={36}
                  />

                  <ChallengeCard
                    title="Mobility Month"
                    description="Improve your flexibility and mobility with daily stretching routines. Great for recovery and injury prevention."
                    image="/images/challenge-mobility.jpg"
                    participants={203}
                    duration="30 days"
                    difficulty="All Levels"
                    progress={40}
                    daysLeft={18}
                  />
                </div>
              </TabsContent>

              <TabsContent value="upcoming" className="mt-6">
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">Upcoming Challenges</h3>
                  <p className="text-muted-foreground">Challenges that will be starting soon</p>
                </div>
              </TabsContent>

              <TabsContent value="completed" className="mt-6">
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">Completed Challenges</h3>
                  <p className="text-muted-foreground">Challenges you've already finished</p>
                </div>
              </TabsContent>

              <TabsContent value="popular" className="mt-6">
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">Popular Challenges</h3>
                  <p className="text-muted-foreground">Most popular challenges in the community</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

interface ChallengeCardProps {
  title: string
  description: string
  image: string
  participants: number
  duration: string
  difficulty: string
  progress: number
  daysLeft: number | null
}

function ChallengeCard({
  title,
  description,
  image,
  participants,
  duration,
  difficulty,
  progress,
  daysLeft,
}: ChallengeCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="relative h-48">
        <Image
          src={image || "/images/challenge-default.jpg"}
          alt={title}
          fill
          className="object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = "/images/challenge-default.jpg"
          }}
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-black/70 text-white hover:bg-black/70">
            {difficulty}
          </Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg">{title}</h3>
          <Trophy className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{participants} participants</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{duration}</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">{progress}% complete</span>
              {daysLeft !== null && <span className="text-xs text-muted-foreground">{daysLeft} days left</span>}
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Join Challenge</Button>
      </CardFooter>
    </Card>
  )
}

