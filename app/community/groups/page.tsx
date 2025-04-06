"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { UserMenu } from "@/components/user-menu"
import { MobileNav } from "@/components/mobile-nav"
import { Search, Filter, Users, ArrowLeft } from "lucide-react"

export default function GroupsPage() {
  const [activeTab, setActiveTab] = useState("all")

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
                <h1 className="text-3xl font-bold">Community Groups</h1>
                <p className="text-muted-foreground mt-1">
                  Join groups based on your fitness interests and connect with like-minded people
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button>Create Group</Button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search groups..." className="pl-10" />
            </div>

            {/* Content Tabs */}
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="all">All Groups</TabsTrigger>
                <TabsTrigger value="my-groups">My Groups</TabsTrigger>
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-6 mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {/* Group Cards */}
                  <GroupCard
                    name="Powerlifting"
                    description="For serious lifters focused on strength in the squat, bench press, and deadlift. Share tips, form checks, and competition prep strategies."
                    image="/images/group-powerlifting.jpg"
                    members={3245}
                    postsPerDay={12}
                    tags={["Strength", "Competition", "Technique"]}
                  />

                  <GroupCard
                    name="Nutrition & Meal Prep"
                    description="Discuss nutrition strategies, meal prep ideas, and recipes to fuel your workouts and support your fitness goals."
                    image="/images/group-nutrition.jpg"
                    members={2876}
                    postsPerDay={18}
                    tags={["Nutrition", "Recipes", "Macros"]}
                  />

                  <GroupCard
                    name="Yoga & Mobility"
                    description="Improve flexibility, mobility, and recovery through yoga and stretching routines. Great for all fitness levels."
                    image="/images/group-yoga.jpg"
                    members={1542}
                    postsPerDay={8}
                    tags={["Flexibility", "Recovery", "Mindfulness"]}
                  />

                  <GroupCard
                    name="Bodybuilding"
                    description="Focus on muscle hypertrophy, aesthetics, and bodybuilding techniques. Share your progress and get feedback."
                    image="/images/group-bodybuilding.jpg"
                    members={2134}
                    postsPerDay={15}
                    tags={["Hypertrophy", "Aesthetics", "Physique"]}
                  />

                  <GroupCard
                    name="Running Club"
                    description="For runners of all levels. Share routes, training plans, race experiences, and motivation for your running journey."
                    image="/images/group-running.jpg"
                    members={1876}
                    postsPerDay={10}
                    tags={["Cardio", "Endurance", "Races"]}
                  />

                  <GroupCard
                    name="Home Workout Heroes"
                    description="No gym? No problem! Share home workout routines, minimal equipment exercises, and tips for training at home."
                    image="/images/group-home-workout.jpg"
                    members={2543}
                    postsPerDay={14}
                    tags={["Home Fitness", "Minimal Equipment", "Bodyweight"]}
                  />
                </div>
              </TabsContent>

              <TabsContent value="my-groups" className="mt-6">
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">My Groups</h3>
                  <p className="text-muted-foreground">Groups you've joined will appear here</p>
                </div>
              </TabsContent>

              <TabsContent value="recommended" className="mt-6">
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">Recommended Groups</h3>
                  <p className="text-muted-foreground">Groups you might be interested in based on your profile</p>
                </div>
              </TabsContent>

              <TabsContent value="popular" className="mt-6">
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">Popular Groups</h3>
                  <p className="text-muted-foreground">Most active groups in the community</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

interface GroupCardProps {
  name: string
  description: string
  image: string
  members: number
  postsPerDay: number
  tags: string[]
}

function GroupCard({ name, description, image, members, postsPerDay, tags }: GroupCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="relative h-48">
        <Image
          src={image || "/images/group-default.jpg"}
          alt={name}
          fill
          className="object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = "/images/group-default.jpg"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-4 left-4">
          <h3 className="font-bold text-xl text-white">{name}</h3>
        </div>
      </div>
      <CardContent className="pt-4 pb-2 flex-grow">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{description}</p>
        <div className="flex justify-between items-center text-sm mb-4">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{members.toLocaleString()} members</span>
          </div>
          <span className="text-xs text-muted-foreground">{postsPerDay} posts/day</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Join Group</Button>
      </CardFooter>
    </Card>
  )
}

