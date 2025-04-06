"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAuth } from "@/context/auth-context"

interface AuthAwareButtonProps extends React.ComponentProps<typeof Button> {
  onAuthenticatedClick: () => void
  saveAction?: string
  redirectTo?: string
}

export function AuthAwareButton({
  children,
  onAuthenticatedClick,
  saveAction = "save this item",
  redirectTo = "/login",
  ...props
}: AuthAwareButtonProps) {
  const { user } = useAuth()
  const router = useRouter()
  const [showDialog, setShowDialog] = useState(false)

  const handleClick = () => {
    if (user) {
      // User is authenticated, perform the action
      onAuthenticatedClick()
    } else {
      // User is not authenticated, show the dialog
      setShowDialog(true)
    }
  }

  const handleSignIn = () => {
    setShowDialog(false)
    router.push(redirectTo)
  }

  const handleContinue = () => {
    setShowDialog(false)
    // Allow the action but user will lose progress
    console.log("User continuing without authentication")
  }

  return (
    <>
      <Button onClick={handleClick} {...props}>
        {children}
      </Button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign in to {saveAction}</DialogTitle>
            <DialogDescription>
              You need to be signed in to {saveAction} and track your progress. Would you like to sign in now?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={handleContinue}>
              Continue Without Saving
            </Button>
            <Button onClick={handleSignIn}>Sign In</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

