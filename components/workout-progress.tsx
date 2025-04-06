"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data for the workout progress chart
const progressData = [
  { day: "Mon", workouts: 1, duration: 45, weight: 120 },
  { day: "Tue", workouts: 0, duration: 0, weight: 0 },
  { day: "Wed", workouts: 1, duration: 60, weight: 150 },
  { day: "Thu", workouts: 1, duration: 30, weight: 100 },
  { day: "Fri", workouts: 0, duration: 0, weight: 0 },
  { day: "Sat", workouts: 2, duration: 90, weight: 200 },
  { day: "Sun", workouts: 1, duration: 45, weight: 130 },
  { day: "Mon", workouts: 1, duration: 60, weight: 140 },
  { day: "Tue", workouts: 1, duration: 45, weight: 120 },
  { day: "Wed", workouts: 0, duration: 0, weight: 0 },
  { day: "Thu", workouts: 1, duration: 60, weight: 160 },
  { day: "Fri", workouts: 1, duration: 45, weight: 130 },
  { day: "Sat", workouts: 2, duration: 120, weight: 220 },
  { day: "Sun", workouts: 0, duration: 0, weight: 0 },
  { day: "Mon", workouts: 1, duration: 45, weight: 140 },
  { day: "Tue", workouts: 1, duration: 60, weight: 150 },
  { day: "Wed", workouts: 1, duration: 30, weight: 110 },
  { day: "Thu", workouts: 0, duration: 0, weight: 0 },
  { day: "Fri", workouts: 1, duration: 45, weight: 130 },
  { day: "Sat", workouts: 2, duration: 90, weight: 210 },
  { day: "Sun", workouts: 1, duration: 60, weight: 160 },
]

export function WorkoutProgress() {
  return (
    <ChartContainer
      config={{
        weight: {
          label: "Weight Lifted (kg)",
          color: "hsl(var(--chart-1))",
        },
        duration: {
          label: "Duration (min)",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={progressData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="var(--color-weight)"
            name="Weight Lifted (kg)"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="duration"
            stroke="var(--color-duration)"
            name="Duration (min)"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

