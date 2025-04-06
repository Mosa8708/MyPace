"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type User = {
  id: string
  fullName: string
  email: string
  isLoggedIn: boolean
} | null

type AuthContextType = {
  user: User
  login: (email: string, password: string) => Promise<boolean>
  signup: (fullName: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("mypace_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Validate inputs
      if (!email || !password) {
        setIsLoading(false)
        return false
      }

      // For demo purposes, we'll just check if the email contains "test"
      // In a real app, this would validate against a backend
      if (email.includes("test") || email === "demo@mypace.com") {
        const user = {
          id: "user_" + Date.now(),
          fullName: "Test User",
          email,
          isLoggedIn: true,
        }

        // Store user data in localStorage
        try {
          localStorage.setItem("mypace_user", JSON.stringify(user))
        } catch (storageError) {
          console.error("Error storing user data:", storageError)
          // Continue even if localStorage fails
        }

        setUser(user)
        setIsLoading(false)
        return true
      }

      setIsLoading(false)
      return false
    } catch (error) {
      console.error("Authentication error:", error)
      setIsLoading(false)
      return false
    }
  }

  const signup = async (fullName: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const user = {
        id: "user_" + Date.now(),
        fullName,
        email,
        isLoggedIn: true,
      }

      localStorage.setItem("mypace_user", JSON.stringify(user))
      setUser(user)
      setIsLoading(false)
      return true
    } catch (error) {
      setIsLoading(false)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("mypace_user")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

