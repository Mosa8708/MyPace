import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { UserMenu } from "@/components/user-menu"
import { MobileNav } from "@/components/mobile-nav"

export default function ExercisesLoading() {
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
              <Skeleton className="h-10 w-48" />
              <Skeleton className="h-10 w-24" />
            </div>

            <Skeleton className="h-10 w-full" />

            <Tabs defaultValue="all">
              <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full">
                <TabsTrigger value="all" disabled>
                  All
                </TabsTrigger>
                <TabsTrigger value="upper" disabled>
                  Upper Body
                </TabsTrigger>
                <TabsTrigger value="lower" disabled>
                  Lower Body
                </TabsTrigger>
                <TabsTrigger value="core" disabled>
                  Core
                </TabsTrigger>
                <TabsTrigger value="cardio" disabled>
                  Cardio
                </TabsTrigger>
                <TabsTrigger value="stretch" disabled>
                  Stretching
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {Array(9)
                    .fill(0)
                    .map((_, i) => (
                      <Card key={i} className="overflow-hidden">
                        <Skeleton className="h-48 w-full" />
                        <CardContent className="p-4">
                          <Skeleton className="h-6 w-3/4 mb-2" />
                          <Skeleton className="h-4 w-1/2 mb-2" />
                          <Skeleton className="h-4 w-2/3" />
                        </CardContent>
                      </Card>
                    ))}
                </div>

                <div className="flex justify-center mt-8">
                  <Skeleton className="h-10 w-40" />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

