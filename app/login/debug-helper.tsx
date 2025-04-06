"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export function DebugHelper() {
  const [showDebug, setShowDebug] = useState(false)
  const [debugInfo, setDebugInfo] = useState<any>(null)

  const checkLocalStorage = () => {
    try {
      const user = localStorage.getItem("mypace_user")
      const parsedUser = user ? JSON.parse(user) : null
      setDebugInfo({
        hasLocalStorage: typeof localStorage !== "undefined",
        userInStorage: !!user,
        userData: parsedUser,
        storageSize: JSON.stringify(localStorage).length,
      })
    } catch (error) {
      setDebugInfo({
        error: String(error),
        hasLocalStorage: typeof localStorage !== "undefined",
      })
    }
  }

  if (!showDebug) {
    return (
      <button
        onClick={() => setShowDebug(true)}
        className="fixed bottom-4 right-4 p-2 bg-gray-200 rounded-full opacity-50 hover:opacity-100"
        aria-label="Debug helper"
      >
        <AlertCircle className="h-5 w-5" />
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-white shadow-lg rounded-lg border max-w-sm z-50">
      <div className="flex justify-between mb-2">
        <h4 className="font-bold">Debug Helper</h4>
        <button onClick={() => setShowDebug(false)} className="text-gray-500">
          ×
        </button>
      </div>

      <div className="space-y-2">
        <Button size="sm" onClick={checkLocalStorage} variant="outline">
          Check Auth State
        </Button>

        {debugInfo && (
          <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-40">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        )}

        <Button
          size="sm"
          variant="destructive"
          onClick={() => {
            localStorage.removeItem("mypace_user")
            setDebugInfo({ message: "User data cleared from localStorage" })
          }}
        >
          Clear User Data
        </Button>
      </div>
    </div>
  )
}

