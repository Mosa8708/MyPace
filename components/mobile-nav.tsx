"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"
import { useAuth } from "@/context/auth-context"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <div className="flex items-center justify-between border-b pb-4">
          <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <div className="bg-primary h-8 w-8 flex items-center justify-center rounded">
              <span className="text-primary-foreground font-bold">MP</span>
            </div>
            <span className="font-bold text-xl">MyPace</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X className="h-6 w-6" />
            <span className="sr-only">Close menu</span>
          </Button>
        </div>

        <div className="flex flex-col gap-4 py-4">
          <Link
            href="/dashboard"
            className="text-lg font-medium py-2 hover:text-primary transition-colors"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            href="/programs"
            className="text-lg font-medium py-2 hover:text-primary transition-colors"
            onClick={() => setOpen(false)}
          >
            Programs
          </Link>
          <Link
            href="/exercises"
            className="text-lg font-medium py-2 hover:text-primary transition-colors"
            onClick={() => setOpen(false)}
          >
            Exercises
          </Link>
          <Link
            href="/community"
            className="text-lg font-medium py-2 hover:text-primary transition-colors"
            onClick={() => setOpen(false)}
          >
            Community
          </Link>
          <div className="pl-4 flex flex-col gap-2">
            <Link
              href="/community/challenges"
              className="text-base font-medium py-1 hover:text-primary transition-colors"
              onClick={() => setOpen(false)}
            >
              Challenges
            </Link>
            <Link
              href="/community/groups"
              className="text-base font-medium py-1 hover:text-primary transition-colors"
              onClick={() => setOpen(false)}
            >
              Groups
            </Link>
          </div>
        </div>

        <div className="mt-auto border-t pt-4 flex flex-col gap-2">
          {user ? (
            <>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  {user.fullName.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{user.fullName}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <Button variant="outline" asChild onClick={() => setOpen(false)}>
                <Link href="/profile">My Profile</Link>
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  logout()
                  setOpen(false)
                }}
              >
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button asChild onClick={() => setOpen(false)}>
                <Link href="/signup">Sign In</Link>
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

