"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Save, LogIn, X } from "lucide-react"

interface SignupPromptModalProps {
  isOpen: boolean
  onAction: (action: "signup" | "login" | "cancel") => void
}

export function SignupPromptModal({ isOpen, onAction }: SignupPromptModalProps) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onAction("cancel")}
          />

          <motion.div
            className="relative z-10 w-full max-w-md"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <Card className="p-6 shadow-xl">
              <div className="flex justify-end mb-2">
                <Button variant="ghost" size="icon" onClick={() => onAction("cancel")}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">Save Your Plan</h3>
                <p className="text-muted-foreground">
                  To save and access your personalized fitness plan, you'll need to create an account or sign in.
                </p>
              </div>

              <div className="space-y-4">
                <Button
                  className="w-full bg-primary text-white hover:bg-primary/90 hover:scale-[1.02] hover:shadow-md transition-all duration-300"
                  onClick={() => onAction("signup")}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Create Account
                </Button>

                <Button
                  variant="outline"
                  className="w-full hover:bg-primary/10 hover:text-primary hover:scale-[1.02] hover:shadow-md transition-all duration-300"
                  onClick={() => onAction("login")}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>

                <Button variant="ghost" className="w-full" onClick={() => onAction("cancel")}>
                  Continue Without Saving
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

