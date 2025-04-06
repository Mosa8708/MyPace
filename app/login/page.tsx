"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import { GymEquipmentAnimation } from "@/components/gym-equipment-animation"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/context/auth-context"

// Import and add the debug helper at the end of the component

import { DebugHelper } from "./debug-helper"

// Form validation schema
const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
  rememberMe: z.boolean().optional(),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { login } = useAuth()

  // Initialize form with react-hook-form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  // Form submission handler
  async function onSubmit(data: LoginFormValues) {
    try {
      setIsLoading(true)

      // Add validation feedback
      if (!data.email || !data.password) {
        toast({
          title: "Missing information",
          description: "Please enter both email and password.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      const success = await login(data.email, data.password)

      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome back to MyPace!",
        })
        router.push("/dashboard")
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Login failed",
        description: "There was a problem logging in. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="container mx-auto px-4 py-6">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="bg-primary h-10 w-10 flex items-center justify-center rounded">
            <span className="text-primary-foreground font-bold text-xl">MP</span>
          </div>
          <span className="font-bold text-2xl">MyPace</span>
        </Link>
      </header>

      <main className="flex-1 relative">
        {/* Background with animation */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/login-background.jpg"
            alt="Fitness background showing a modern gym with equipment"
            fill
            className="object-cover opacity-10"
          />
          <GymEquipmentAnimation />
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="max-w-md mx-auto">
            <Link href="/" className="inline-flex items-center text-sm mb-6 hover:text-primary transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-3xl">SIGN IN</CardTitle>
                <CardDescription>Welcome back to MyPace</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} />
                              <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex items-center justify-between">
                      <FormField
                        control={form.control}
                        name="rememberMe"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Remember me</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />

                      <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full text-lg py-6 bg-primary text-white hover:bg-primary/90 hover:scale-[1.02] hover:shadow-md transition-all duration-300 btn-glow"
                    >
                      {isLoading ? (
                        <>
                          <span className="mr-2">Signing in</span>
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <p className="text-sm text-gray-500">
                  Already have an account?{" "}
                  <Link href="/signup" className="text-primary hover:underline">
                    Sign up
                  </Link>
                </p>
                <div className="text-xs text-muted-foreground p-2 bg-muted rounded-md">
                  <p className="font-medium">Demo Account:</p>
                  <p>Email: demo@mypace.com</p>
                  <p>Password: any password will work</p>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <DebugHelper />
    </div>
  )
}

