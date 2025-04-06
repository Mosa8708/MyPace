export interface Exercise {
  id: string
  name: string
  category: string
  sets: number
  reps: number
  weight?: number
  restTime?: number
  completed?: boolean
  notes?: string
  instructions?: string
}

export interface Workout {
  id: string
  title: string
  description: string
  category: string
  difficulty: string
  duration: number
  scheduledFor: string
  programId?: string
  programName?: string
  exercises: Exercise[]
}

export const upcomingWorkouts: Workout[] = [
  {
    id: "workout-1",
    title: "Upper Body Focus",
    description: "A comprehensive upper body workout targeting chest, shoulders, and arms",
    category: "strength",
    difficulty: "intermediate",
    duration: 60,
    scheduledFor: "Tomorrow, 6:00 AM",
    programId: "program-1",
    programName: "Strength Builder",
    exercises: [
      {
        id: "ex-1",
        name: "Bench Press",
        category: "chest",
        sets: 4,
        reps: 10,
        weight: 80,
        restTime: 90,
        notes: "Focus on full range of motion and controlled descent",
      },
      {
        id: "ex-2",
        name: "Overhead Press",
        category: "shoulders",
        sets: 3,
        reps: 12,
        weight: 50,
        restTime: 60,
        notes: "Keep core tight throughout the movement",
      },
      {
        id: "ex-3",
        name: "Pull-ups",
        category: "back",
        sets: 4,
        reps: 8,
        restTime: 90,
        notes: "Use assistance band if needed",
      },
      {
        id: "ex-4",
        name: "Tricep Extensions",
        category: "arms",
        sets: 3,
        reps: 15,
        weight: 25,
        restTime: 45,
      },
      {
        id: "ex-5",
        name: "Bicep Curls",
        category: "arms",
        sets: 3,
        reps: 12,
        weight: 20,
        restTime: 45,
      },
    ],
  },
  {
    id: "workout-2",
    title: "Lower Body Strength",
    description: "Build strength and power in your legs with this focused lower body workout",
    category: "strength",
    difficulty: "intermediate",
    duration: 50,
    scheduledFor: "Thursday, 5:30 PM",
    programId: "program-1",
    programName: "Strength Builder",
    exercises: [
      {
        id: "ex-6",
        name: "Squats",
        category: "legs",
        sets: 5,
        reps: 8,
        weight: 100,
        restTime: 120,
        notes: "Focus on depth and keeping knees in line with toes",
      },
      {
        id: "ex-7",
        name: "Romanian Deadlift",
        category: "legs",
        sets: 4,
        reps: 10,
        weight: 90,
        restTime: 90,
        notes: "Keep back straight and focus on the hamstring stretch",
      },
      {
        id: "ex-8",
        name: "Leg Press",
        category: "legs",
        sets: 3,
        reps: 12,
        weight: 150,
        restTime: 90,
      },
      {
        id: "ex-9",
        name: "Calf Raises",
        category: "legs",
        sets: 4,
        reps: 15,
        weight: 60,
        restTime: 60,
      },
    ],
  },
  {
    id: "workout-3",
    title: "Full Body HIIT",
    description: "A high-intensity interval training session to boost your metabolism and improve conditioning",
    category: "cardio",
    difficulty: "advanced",
    duration: 45,
    scheduledFor: "Saturday, 9:00 AM",
    programId: "program-2",
    programName: "Conditioning",
    exercises: [
      {
        id: "ex-10",
        name: "Burpees",
        category: "full-body",
        sets: 5,
        reps: 15,
        restTime: 45,
        notes: "Perform as quickly as possible while maintaining form",
      },
      {
        id: "ex-11",
        name: "Mountain Climbers",
        category: "core",
        sets: 5,
        reps: 30,
        restTime: 30,
      },
      {
        id: "ex-12",
        name: "Kettlebell Swings",
        category: "full-body",
        sets: 5,
        reps: 20,
        weight: 16,
        restTime: 45,
        notes: "Focus on hip hinge and explosive movement",
      },
      {
        id: "ex-13",
        name: "Box Jumps",
        category: "legs",
        sets: 5,
        reps: 12,
        restTime: 45,
      },
      {
        id: "ex-14",
        name: "Battle Ropes",
        category: "upper-body",
        sets: 5,
        reps: 30,
        restTime: 45,
        notes: "30 seconds of work",
      },
    ],
  },
]

