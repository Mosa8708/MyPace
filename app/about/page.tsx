"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { UserMenu } from "@/components/user-menu"
import { MobileNav } from "@/components/mobile-nav"
import { GymEquipmentAnimation } from "@/components/gym-equipment-animation"
import { CheckCircle, Users, BarChart, Award, Dumbbell, Clock, ArrowRight, Zap, Shield, BookOpen } from "lucide-react"

export default function AboutPage() {
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
            <Link href="/about" className="text-sm font-medium text-primary">
              About
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

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gym.jpg-fcpRIp4oKh8KDUQh5wBc32sPM8135M.jpeg"
              alt="Modern gym interior with people working out"
              fill
              className="object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background"></div>
          </div>

          <GymEquipmentAnimation />

          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                TRANSFORMING FITNESS <span className="text-primary">ONE REP</span> AT A TIME
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                MyPace is on a mission to make science-based fitness accessible, effective, and enjoyable for everyone.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-primary text-white hover:bg-primary/90 hover:scale-[1.02] hover:shadow-md transition-all duration-300"
                  asChild
                >
                  <Link href="/programs">Explore Programs</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="hover:bg-primary/10 hover:text-primary hover:scale-[1.02] hover:shadow-md transition-all duration-300"
                >
                  <Link href="#our-story">Our Story</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">OUR MISSION</h2>
              <p className="text-xl text-muted-foreground">
                At MyPace, we believe that fitness should be accessible to everyone, regardless of their experience
                level or background. Our mission is to provide science-based workout programs that empower individuals
                to achieve their fitness goals at their own pace.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-muted p-8 rounded-lg text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">EVIDENCE-BASED</h3>
                <p className="text-muted-foreground">
                  All our programs are designed by experts and backed by scientific research to ensure optimal results.
                </p>
              </div>

              <div className="bg-muted p-8 rounded-lg text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">INCLUSIVE</h3>
                <p className="text-muted-foreground">
                  We create programs for all fitness levels, from beginners to advanced athletes, ensuring everyone can
                  find their perfect fit.
                </p>
              </div>

              <div className="bg-muted p-8 rounded-lg text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">EMPOWERING</h3>
                <p className="text-muted-foreground">
                  We don't just provide workouts; we educate and empower our users to take control of their fitness
                  journey.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section id="our-story" className="py-20 bg-muted">
          <div className="container">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
                    <Image
                      src="/images/founder-team.jpg"
                      alt="The MyPace founding team in a modern gym setting"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-primary p-4 rounded-lg shadow-lg">
                    <p className="text-white font-bold">EST. 2025</p>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">OUR STORY</h2>
                <p className="text-lg mb-6">
                  MyPace was founded in 2025 by a team of fitness enthusiasts, exercise scientists, and tech enthusiasts
                  who shared a common frustration: the fitness industry was filled with misinformation,
                  one-size-fits-all programs, and unsustainable approaches.
                </p>
                <p className="text-lg mb-6">
                  Our founders—Mr. Kamogelo Morare, and Mosa Rantseli two innovative young men from Tembisa—combined
                  their expertise in exercise science, nutrition, and competitive sports to create a platform that
                  bridges the gap between scientific research and practical application.
                </p>
                <p className="text-lg mb-6">
                  What started as a small collection of evidence-based workout programs has grown into a comprehensive
                  fitness platform serving thousands of users worldwide. Today, MyPace continues to evolve, but our core
                  mission remains the same: to help people transform their bodies and lives at their own pace.
                </p>
                <div className="mt-6"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose MyPace Section */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">WHY CHOOSE MYPACE</h2>
              <p className="text-xl text-muted-foreground">
                With countless fitness apps available, here's why thousands of users trust MyPace for their fitness
                journey.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-6">
                <div className="shrink-0">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Expert-Crafted Programs</h3>
                  <p className="text-muted-foreground">
                    All our programs are designed by renowned coaches with decades of experience in strength training,
                    bodybuilding, and sports performance.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="shrink-0">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <BarChart className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Advanced Progress Tracking</h3>
                  <p className="text-muted-foreground">
                    Our intuitive tracking tools help you monitor your progress, visualize improvements, and stay
                    motivated throughout your fitness journey.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="shrink-0">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <Dumbbell className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Comprehensive Exercise Library</h3>
                  <p className="text-muted-foreground">
                    Access over 200 exercises with HD video demonstrations, ensuring proper form and technique for
                    maximum results and safety.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="shrink-0">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Supportive Community</h3>
                  <p className="text-muted-foreground">
                    Join thousands of like-minded individuals who share tips, celebrate victories, and provide
                    motivation when you need it most.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="shrink-0">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Flexible Scheduling</h3>
                  <p className="text-muted-foreground">
                    Our programs adapt to your schedule, not the other way around. Train when it works for you while
                    still achieving optimal results.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="shrink-0">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Proven Results</h3>
                  <p className="text-muted-foreground">
                    With thousands of success stories, our approach has been proven to deliver sustainable results for
                    users of all fitness levels.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-muted">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">HOW IT WORKS</h2>
              <p className="text-xl text-muted-foreground">
                Getting started with MyPace is simple. Follow these steps to begin your fitness transformation.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="relative">
                  <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl">
                    1
                  </div>
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-primary/30 -z-10"></div>
                </div>
                <h3 className="text-xl font-bold mb-4">Create Account</h3>
                <p className="text-muted-foreground">
                  Sign up for a free account to access our library of workout programs and tracking tools.
                </p>
              </div>

              <div className="text-center">
                <div className="relative">
                  <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl">
                    2
                  </div>
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-primary/30 -z-10"></div>
                </div>
                <h3 className="text-xl font-bold mb-4">Choose Program</h3>
                <p className="text-muted-foreground">
                  Browse our collection of expert-crafted programs and select one that aligns with your goals.
                </p>
              </div>

              <div className="text-center">
                <div className="relative">
                  <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl">
                    3
                  </div>
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-primary/30 -z-10"></div>
                </div>
                <h3 className="text-xl font-bold mb-4">Follow Workouts</h3>
                <p className="text-muted-foreground">
                  Complete your scheduled workouts with the help of our detailed exercise demonstrations.
                </p>
              </div>

              <div className="text-center">
                <div className="relative">
                  <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl">
                    4
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">Track Progress</h3>
                <p className="text-muted-foreground">
                  Monitor your improvements, celebrate milestones, and adjust your approach as needed.
                </p>
              </div>
            </div>

            <div className="text-center mt-16">
              <Button
                size="lg"
                className="bg-primary text-white hover:bg-primary/90 hover:scale-[1.02] hover:shadow-md transition-all duration-300"
                asChild
              >
                <Link href="/signup">Start Your Journey Today</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">WHAT OUR USERS SAY</h2>
              <p className="text-xl text-gray-300">
                Don't just take our word for it. Here's what the MyPace community has to say about their experience.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800 p-8 rounded-lg relative">
                <div className="absolute -top-6 left-8">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-4 border-gray-800">
                    <Image src="/images/mas-testimonial.jpeg" alt="Mas M." fill className="object-cover" />
                  </div>
                </div>
                <div className="pt-6">
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4">
                    "MyPace completely changed my approach to fitness. The structured programs and progress tracking
                    kept me motivated, and the results speak for themselves!"
                  </p>
                  <div>
                    <p className="font-bold">Mas M.</p>
                    <p className="text-sm text-gray-400">Lost 15kg in 3 months</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-8 rounded-lg relative">
                <div className="absolute -top-6 left-8">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-4 border-gray-800">
                    <Image src="/images/mosa-testimonial.jpeg" alt="Mosa R." fill className="object-cover" />
                  </div>
                </div>
                <div className="pt-6">
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4">
                    "As someone who struggled with consistency, the video demonstrations and personalized programs made
                    all the difference. I've never been stronger!"
                  </p>
                  <div>
                    <p className="font-bold">Mosa R.</p>
                    <p className="text-sm text-gray-400">Gained 8kg of muscle</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-8 rounded-lg relative">
                <div className="absolute -top-6 left-8">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-4 border-gray-800">
                    <Image src="/images/kelz-testimonial.jpeg" alt="Kelz K." fill className="object-cover" />
                  </div>
                </div>
                <div className="pt-6">
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4">
                    "The expert-crafted programs are incredible. I've tried many fitness apps, but MyPace's
                    science-based approach and community support are unmatched."
                  </p>
                  <div>
                    <p className="font-bold">Kelz K.</p>
                    <p className="text-sm text-gray-400">Improved strength by 40%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">READY TO TRANSFORM YOUR FITNESS JOURNEY?</h2>
              <p className="text-xl mb-8">
                Join thousands of users who have already achieved their fitness goals with MyPace.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="text-white hover:bg-secondary/80 hover:scale-[1.02] hover:shadow-md transition-all duration-300"
                asChild
              >
                <Link href="/signup">
                  Get Started For Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <div className="mt-8 flex flex-wrap justify-center gap-8">
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 mr-2" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 mr-2" />
                  <span>14-day free access</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 mr-2" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="bg-primary h-10 w-10 flex items-center justify-center rounded">
                  <span className="text-primary-foreground font-bold text-xl">MP</span>
                </div>
                <span className="font-bold text-2xl">MyPace</span>
              </Link>
              <p className="text-gray-400">Making fitness accessible, effective, and enjoyable for everyone.</p>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-4">Features</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Workout Programs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Exercise Library
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Progress Tracking
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Community
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} MyPace. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

