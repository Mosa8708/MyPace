"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { UserMenu } from "@/components/user-menu"
import { MobileNav } from "@/components/mobile-nav"
import { useAuth } from "@/context/auth-context"
import {
  Search,
  Filter,
  MessageSquare,
  Heart,
  Share2,
  Award,
  TrendingUp,
  Calendar,
  ImageIcon,
  BarChart,
  Trophy,
} from "lucide-react"

export default function CommunityPage() {
  const { user } = useAuth()
  const [postContent, setPostContent] = useState("")
  const [activeTab, setActiveTab] = useState("feed")

  const handleCreatePost = () => {
    // In a real app, this would send the post to an API
    console.log("Creating post:", postContent)
    setPostContent("")
    alert("Post created successfully!")
  }

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
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">Community</h1>
                <p className="text-muted-foreground mt-1">
                  Connect with other fitness enthusiasts, share your progress, and get inspired
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Sidebar - User Profile & Stats */}
              <div className="lg:col-span-1 space-y-6">
                {/* User Profile Card */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src="/images/user-profile.jpg" alt="User profile" />
                        <AvatarFallback>{user?.fullName?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-xl font-bold">{user?.fullName || "Guest User"}</h2>
                        <p className="text-sm text-muted-foreground">Fitness Enthusiast</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2 text-center my-4">
                      <div>
                        <p className="text-2xl font-bold">24</p>
                        <p className="text-xs text-muted-foreground">Workouts</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">7</p>
                        <p className="text-xs text-muted-foreground">Day Streak</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">12</p>
                        <p className="text-xs text-muted-foreground">Friends</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-primary" />
                        <span className="text-sm">Silver Level</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        <span className="text-sm">3,540 kg Total Lifted</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="text-sm">Member since Jan 2023</span>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Strength Training</Badge>
                      <Badge variant="secondary">Powerlifting</Badge>
                      <Badge variant="secondary">Nutrition</Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Edit Profile
                    </Button>
                  </CardFooter>
                </Card>

                {/* Active Challenges */}
                <Card>
                  <CardHeader className="pb-2">
                    <h3 className="text-lg font-bold">Active Challenges</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Trophy className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">30-Day Squat Challenge</h4>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">21 days left</p>
                          <p className="text-xs font-medium">70% complete</p>
                        </div>
                        <div className="w-full h-1.5 bg-muted rounded-full mt-1">
                          <div className="h-full bg-primary rounded-full" style={{ width: "70%" }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <BarChart className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">1000kg Club</h4>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">Ongoing</p>
                          <p className="text-xs font-medium">85% complete</p>
                        </div>
                        <div className="w-full h-1.5 bg-muted rounded-full mt-1">
                          <div className="h-full bg-primary rounded-full" style={{ width: "85%" }}></div>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="w-full">
                      View All Challenges
                    </Button>
                  </CardContent>
                </Card>

                {/* Popular Groups */}
                <Card>
                  <CardHeader className="pb-2">
                    <h3 className="text-lg font-bold">Popular Groups</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/images/group-powerlifting.jpg" alt="Powerlifting group" />
                        <AvatarFallback>PL</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium">Powerlifting</h4>
                        <p className="text-xs text-muted-foreground">3.2k members</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Join
                      </Button>
                    </div>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/images/group-nutrition.jpg" alt="Nutrition group" />
                        <AvatarFallback>NT</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium">Nutrition</h4>
                        <p className="text-xs text-muted-foreground">2.8k members</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Join
                      </Button>
                    </div>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/images/group-yoga.jpg" alt="Yoga group" />
                        <AvatarFallback>YG</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium">Yoga & Mobility</h4>
                        <p className="text-xs text-muted-foreground">1.5k members</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Join
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" className="w-full">
                      View All Groups
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content - Feed & Tabs */}
              <div className="lg:col-span-2 space-y-6">
                {/* Create Post */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <Avatar>
                        <AvatarImage src="/images/user-profile.jpg" alt="User profile" />
                        <AvatarFallback>{user?.fullName?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-4">
                        <Textarea
                          placeholder="Share your fitness journey or ask a question..."
                          className="resize-none"
                          value={postContent}
                          onChange={(e) => setPostContent(e.target.value)}
                        />
                        <div className="flex justify-between items-center">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <ImageIcon className="h-4 w-4 mr-2" />
                              Photo
                            </Button>
                            <Button variant="outline" size="sm">
                              <BarChart className="h-4 w-4 mr-2" />
                              Progress
                            </Button>
                          </div>
                          <Button size="sm" disabled={!postContent.trim()} onClick={handleCreatePost}>
                            Post
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Content Tabs */}
                <Tabs defaultValue="feed" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-4 w-full">
                    <TabsTrigger value="feed">Feed</TabsTrigger>
                    <TabsTrigger value="trending">Trending</TabsTrigger>
                    <TabsTrigger value="challenges">Challenges</TabsTrigger>
                    <TabsTrigger value="friends">Friends</TabsTrigger>
                  </TabsList>

                  <TabsContent value="feed" className="space-y-4 mt-6">
                    {/* Search Bar */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input placeholder="Search posts..." className="pl-10" />
                    </div>

                    {/* Posts */}
                    <CommunityPost
                      user={{
                        name: "Kamo M",
                        avatar: "/images/user-sarah.jpg",
                        badge: "Gold",
                      }}
                      content="Just hit a new PR on my deadlift today! 315 lbs for 3 reps. So happy with my progress following the Strength Builder program. Anyone else seeing good results with this program?"
                      image="/images/post-deadlift.jpg"
                      timestamp="2 hours ago"
                      likes={42}
                      comments={8}
                    />

                    <CommunityPost
                      user={{
                        name: "Mosa R",
                        avatar: "/images/user-michael.jpg",
                        badge: "Silver",
                      }}
                      content="Morning cardio session complete! 5k run in 22 minutes. Starting the day right with the HIIT Cardio program. Who else is a morning workout person?"
                      timestamp="5 hours ago"
                      likes={28}
                      comments={12}
                    />

                    <CommunityPost
                      user={{
                        name: "Sipho N",
                        avatar: "/images/user-emma.jpg",
                        badge: "Coach",
                      }}
                      content="Quick form check tip: When doing squats, make sure your knees track in line with your toes and don't cave inward. This helps protect your knees and ensures you're targeting the right muscles. Here's a demonstration:"
                      image="/images/post-squat-form.jpg"
                      timestamp="Yesterday"
                      likes={156}
                      comments={23}
                    />

                    <CommunityPost
                      user={{
                        name: "Kamo M",
                        avatar: "/images/user-david.jpg",
                        badge: "Bronze",
                      }}
                      content="Week 6 of the Hypertrophy program complete! Seeing some real gains in my shoulders and back. The progressive overload approach is really working for me. Anyone else on this program?"
                      timestamp="2 days ago"
                      likes={64}
                      comments={15}
                    />

                    <div className="flex justify-center mt-8">
                      <Button variant="outline">Load More Posts</Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="trending" className="mt-6">
                    <div className="text-center py-12">
                      <h3 className="text-lg font-medium">Trending Content</h3>
                      <p className="text-muted-foreground">Popular posts and discussions will appear here</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="challenges" className="mt-6">
                    <div className="text-center py-12">
                      <h3 className="text-lg font-medium">Community Challenges</h3>
                      <p className="text-muted-foreground">Join fitness challenges with other members</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="friends" className="mt-6">
                    <div className="text-center py-12">
                      <h3 className="text-lg font-medium">Friends Activity</h3>
                      <p className="text-muted-foreground">See what your friends are up to</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

interface CommunityPostProps {
  user: {
    name: string
    avatar: string
    badge?: string
  }
  content: string
  image?: string
  timestamp: string
  likes: number
  comments: number
}

function CommunityPost({ user, content, image, timestamp, likes, comments }: CommunityPostProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(likes)

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage
              src={user.avatar}
              alt={user.name}
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/images/user-default.jpg"
              }}
            />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-bold">{user.name}</h4>
              {user.badge && (
                <Badge variant="outline" className="text-xs">
                  {user.badge}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-4">{timestamp}</p>
            <p className="mb-4">{content}</p>
            {image && (
              <div className="relative h-64 w-full rounded-md overflow-hidden mb-4">
                <Image
                  src={image || "/placeholder.svg"}
                  alt="Post image"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/images/post-default.jpg"
                  }}
                />
              </div>
            )}
            <div className="flex items-center gap-4 pt-2">
              <button
                className={`flex items-center gap-1 text-sm ${liked ? "text-primary" : "text-muted-foreground"}`}
                onClick={handleLike}
              >
                <Heart className={`h-4 w-4 ${liked ? "fill-primary" : ""}`} />
                <span>{likeCount}</span>
              </button>
              <button className="flex items-center gap-1 text-sm text-muted-foreground">
                <MessageSquare className="h-4 w-4" />
                <span>{comments}</span>
              </button>
              <button className="flex items-center gap-1 text-sm text-muted-foreground ml-auto">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

