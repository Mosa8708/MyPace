"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { UserMenu } from "@/components/user-menu"
import { MobileNav } from "@/components/mobile-nav"
import {
  Search,
  MessageSquare,
  Heart,
  Share2,
  Users,
  ArrowLeft,
  Bell,
  Settings,
  ImageIcon,
  Calendar,
} from "lucide-react"

// Sample group data
const groups = [
  {
    id: "powerlifting",
    name: "Powerlifting",
    description:
      "For serious lifters focused on strength in the squat, bench press, and deadlift. Share tips, form checks, and competition prep strategies.",
    image: "/images/group-powerlifting.jpg",
    coverImage: "/images/group-powerlifting-cover.jpg",
    members: 3245,
    postsPerDay: 12,
    tags: ["Strength", "Competition", "Technique"],
    admins: [
      {
        name: "Mosa R",
        avatar: "/images/admin-mike.jpg",
        role: "Founder",
      },
      {
        name: "Sipho N",
        avatar: "/images/admin-lisa.jpg",
        role: "Moderator",
      },
    ],
    rules: [
      "Be respectful and supportive of all members",
      "No self-promotion or spam",
      "Form check videos are welcome, but use the appropriate flair",
      "Keep discussions related to powerlifting and strength training",
    ],
  },
  // Other groups would be defined here
]

export default function GroupDetailPage() {
  const params = useParams()
  const groupId = params.id as string

  // Find the group with the matching ID
  const group = groups.find((g) => g.id === groupId) || groups[0]

  const [activeTab, setActiveTab] = useState("posts")
  const [postContent, setPostContent] = useState("")

  const handleCreatePost = () => {
    // In a real app, this would send the post to an API
    console.log("Creating post in group:", group.name, postContent)
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

      <main className="flex-1">
        {/* Group Header */}
        <div className="relative">
          <div className="h-[200px] md:h-[300px] relative">
            <Image
              src={group.coverImage || group.image || "/images/group-default.jpg"}
              alt={`${group.name} cover image`}
              fill
              className="object-cover"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/images/group-default.jpg"
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          </div>

          <div className="container relative -mt-24 z-10 pb-6">
            <div className="flex items-end gap-6">
              <Avatar className="h-24 w-24 border-4 border-background">
                <AvatarImage
                  src={group.image || "/images/group-default.jpg"}
                  alt={group.name}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/images/group-default.jpg"
                  }}
                />
                <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 mb-4">
                <h1 className="text-3xl font-bold text-white">{group.name}</h1>
                <div className="flex items-center gap-3 text-gray-200 mt-1">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{group.members.toLocaleString()} members</span>
                  </div>
                  <span>•</span>
                  <span>{group.postsPerDay} posts/day</span>
                </div>
              </div>
              <div className="flex gap-2 mb-4">
                <Button>Join Group</Button>
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-6">
          <div className="flex items-center gap-2 mb-6">
            <Link
              href="/community/groups"
              className="inline-flex items-center text-sm hover:text-primary transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Groups
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Sidebar - Group Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* About Card */}
              <Card>
                <CardHeader className="pb-2">
                  <h3 className="text-lg font-bold">About</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{group.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {group.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Admins & Moderators</h4>
                      <div className="space-y-3">
                        {group.admins.map((admin) => (
                          <div key={admin.name} className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={admin.avatar} alt={admin.name} />
                              <AvatarFallback>{admin.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{admin.name}</p>
                              <p className="text-xs text-muted-foreground">{admin.role}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="text-sm font-medium mb-2">Group Rules</h4>
                      <ul className="space-y-2 text-sm">
                        {group.rules.map((rule, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="font-medium">{index + 1}.</span>
                            <span className="text-muted-foreground">{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card>
                <CardHeader className="pb-2">
                  <h3 className="text-lg font-bold">Upcoming Events</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">Local Powerlifting Meet</h4>
                      <p className="text-xs text-muted-foreground">May 15, 2023 • Downtown Gym</p>
                    </div>
                    <Button variant="outline" size="sm">
                      RSVP
                    </Button>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">Form Check Workshop</h4>
                      <p className="text-xs text-muted-foreground">June 2, 2023 • Virtual</p>
                    </div>
                    <Button variant="outline" size="sm">
                      RSVP
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="w-full">
                    View All Events
                  </Button>
                </CardContent>
              </Card>

              {/* Group Settings */}
              <Card>
                <CardHeader className="pb-2">
                  <h3 className="text-lg font-bold">Group Settings</h3>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Notification Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Group
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                    Leave Group
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
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-4">
                      <Textarea
                        placeholder={`Share something with the ${group.name} group...`}
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
                            <Calendar className="h-4 w-4 mr-2" />
                            Event
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
              <Tabs defaultValue="posts" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="posts">Posts</TabsTrigger>
                  <TabsTrigger value="media">Media</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                  <TabsTrigger value="members">Members</TabsTrigger>
                </TabsList>

                <TabsContent value="posts" className="space-y-4 mt-6">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search posts..." className="pl-10" />
                  </div>

                  {/* Posts */}
                  <GroupPost
                    user={{
                      name: "Mosa R",
                      avatar: "/images/user-alex.jpg",
                      badge: "Powerlifter",
                    }}
                    content="Just hit a new PR on my deadlift today! 405 lbs for 2 reps. Been following the program from the pinned post and it's working wonders. Any tips for improving lockout strength?"
                    image="/images/post-deadlift-pr.jpg"
                    timestamp="2 hours ago"
                    likes={28}
                    comments={12}
                  />

                  <GroupPost
                    user={{
                      name: "Sipho N",
                      avatar: "/images/admin-lisa.jpg",
                      badge: "Moderator",
                    }}
                    content="Form check reminder: When setting up for bench press, make sure to retract your scapula and keep your feet firmly planted on the ground. This creates a stable base and protects your shoulders. Here's a quick demonstration:"
                    image="/images/post-bench-form.jpg"
                    timestamp="Yesterday"
                    likes={45}
                    comments={8}
                  />

                  <GroupPost
                    user={{
                      name: "Kamo M",
                      avatar: "/images/user-marcus.jpg",
                      badge: "Competitor",
                    }}
                    content="Anyone competing in the regional meet next month? Looking for training partners to prep with. I train at Downtown Strength Club usually in the evenings."
                    timestamp="2 days ago"
                    likes={18}
                    comments={22}
                  />

                  <div className="flex justify-center mt-8">
                    <Button variant="outline">Load More Posts</Button>
                  </div>
                </TabsContent>

                <TabsContent value="media" className="mt-6">
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium">Media Gallery</h3>
                    <p className="text-muted-foreground">Photos and videos shared in the group</p>
                  </div>
                </TabsContent>

                <TabsContent value="events" className="mt-6">
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium">Upcoming Events</h3>
                    <p className="text-muted-foreground">Events organized by the group</p>
                  </div>
                </TabsContent>

                <TabsContent value="members" className="mt-6">
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium">Group Members</h3>
                    <p className="text-muted-foreground">People who have joined this group</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

interface GroupPostProps {
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

function GroupPost({ user, content, image, timestamp, likes, comments }: GroupPostProps) {
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

