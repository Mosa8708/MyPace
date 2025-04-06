"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { UserMenu } from "@/components/user-menu"
import { MobileNav } from "@/components/mobile-nav"
import { useAuth } from "@/context/auth-context"
import { PlanWizard } from "@/components/plan-wizard/plan-wizard"
import { SignupPromptModal } from "@/components/plan-wizard/signup-prompt-modal"

export default function CreatePlanPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [showSignupPrompt, setShowSignupPrompt] = useState(false)
  const [planData, setPlanData] = useState<any>(null)

  // Function to handle plan submission
  const handlePlanSubmit = (data: any) => {
    if (user) {
      // User is logged in, save the plan
      console.log("Saving plan for logged in user:", data)
      // In a real app, you would save this to a database
      router.push("/dashboard?plan=created")
    } else {
      // User is not logged in, show signup prompt
      setPlanData(data)
      setShowSignupPrompt(true)
    }
  }

  // Function to handle signup prompt actions
  const handleSignupPromptAction = (action: "signup" | "login" | "cancel") => {
    setShowSignupPrompt(false)

    if (action === "signup") {
      // Store plan data in localStorage to retrieve after signup
      localStorage.setItem("pendingPlan", JSON.stringify(planData))
      router.push("/signup?returnTo=create-plan")
    } else if (action === "login") {
      localStorage.setItem("pendingPlan", JSON.stringify(planData))
      router.push("/login?returnTo=create-plan")
    }
    // For cancel, just close the modal and stay on the page
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
            <Link href="/community" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Community
            </Link>
            <Link href="/create-plan" className="text-sm font-medium text-primary">
              Create Plan
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
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Create Your Plan</h1>
            <p className="text-muted-foreground mb-8">
              Design a personalized fitness plan tailored to your goals, preferences, and schedule.
            </p>

            <PlanWizard onSubmit={handlePlanSubmit} />
          </div>
        </div>
      </main>

      {/* Signup Prompt Modal */}
      <SignupPromptModal isOpen={showSignupPrompt} onAction={handleSignupPromptAction} />
    </div>
  )
}

