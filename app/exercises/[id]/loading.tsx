import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { UserMenu } from "@/components/user-menu"
import { MobileNav } from "@/components/mobile-nav"

export default function ExerciseDetailLoading() {
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
              <Skeleton className="h-9 w-32" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Skeleton className="h-[300px] md:h-[400px] rounded-lg" />

              <div className="flex flex-col gap-4">
                <div>
                  <Skeleton className="h-10 w-3/4" />
                  <Skeleton className="h-5 w-1/2 mt-2" />
                </div>

                <div className="flex gap-2">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-24" />
                </div>

                <Skeleton className="h-20 w-full" />

                <div className="flex gap-2 mt-auto">
                  <Skeleton className="h-10 flex-1" />
                  <Skeleton className="h-10 w-10" />
                  <Skeleton className="h-10 w-10" />
                </div>
              </div>
            </div>

            <Tabs defaultValue="instructions" className="mt-6">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="instructions" disabled>
                  Instructions
                </TabsTrigger>
                <TabsTrigger value="muscles" disabled>
                  Muscles
                </TabsTrigger>
                <TabsTrigger value="tips" disabled>
                  Tips
                </TabsTrigger>
                <TabsTrigger value="variations" disabled>
                  Variations
                </TabsTrigger>
              </TabsList>

              <TabsContent value="instructions" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-6 w-3/4" />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="mt-8">
              <Skeleton className="h-8 w-48 mb-4" />
              <div className="grid gap-6 md:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="h-40 w-full" />
                    <CardContent className="p-4">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

