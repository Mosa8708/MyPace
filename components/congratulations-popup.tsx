"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { CheckCircle } from "lucide-react"

interface CongratulationsPopupProps {
  isOpen: boolean
  onClose: () => void
  username: string
}

export function CongratulationsPopup({ isOpen, onClose, username }: CongratulationsPopupProps) {
  const [progress, setProgress] = useState(0)

  // Launch confetti when popup opens
  useEffect(() => {
    if (isOpen) {
      // Reset progress
      setProgress(0)

      // Launch confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })

      // Start progress timer
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 1
        })
      }, 50) // 5 seconds = 100 steps * 50ms

      return () => clearInterval(interval)
    }
  }, [isOpen])

  // Close popup when progress reaches 100%
  useEffect(() => {
    if (progress >= 100) {
      onClose()
    }
  }, [progress, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full relative overflow-hidden"
            initial={{ scale: 0.8, opacity: 0, y: 20, rotateX: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20, rotateX: 10 }}
            transition={{ type: "spring", damping: 15 }}
          >
            {/* Progress bar */}
            <div className="absolute top-0 left-0 h-1 bg-primary" style={{ width: `${progress}%` }} />

            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="h-10 w-10 text-primary" />
              </div>

              <h2 className="text-3xl font-bold mb-2">Welcome to MyPace!</h2>
              <p className="text-xl mb-6">
                Congratulations, <span className="font-bold">{username}</span>! Your fitness journey begins now.
              </p>

              <p className="text-sm text-gray-500">
                Redirecting to your dashboard in {Math.ceil((100 - progress) / 20)} seconds...
              </p>
            </div>

            {/* 3D effect elements */}
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

