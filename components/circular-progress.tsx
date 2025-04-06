"use client"

import { useEffect, useState } from "react"

interface CircularProgressProps {
  value: number
  maxValue: number
  label?: string
  metric?: string
}

export function CircularProgress({ value, maxValue, label, metric }: CircularProgressProps) {
  const [progress, setProgress] = useState(0)

  // Calculate the circumference of the circle
  const radius = 80
  const circumference = 2 * Math.PI * radius

  // Calculate the stroke-dashoffset based on the progress
  const calculateOffset = (val: number) => {
    const percentage = (val / maxValue) * 100
    return circumference - (percentage / 100) * circumference
  }

  useEffect(() => {
    // Animate the progress
    const timer = setTimeout(() => {
      setProgress(value)
    }, 100)

    return () => clearTimeout(timer)
  }, [value])

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="200" height="200" viewBox="0 0 200 200">
        {/* Background circle */}
        <circle cx="100" cy="100" r={radius} fill="transparent" stroke="#e6e6e6" strokeWidth="12" />

        {/* Progress circle */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="transparent"
          stroke="#ff4500"
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={calculateOffset(progress)}
          strokeLinecap="round"
          transform="rotate(-90 100 100)"
          style={{
            transition: "stroke-dashoffset 1s ease-in-out",
          }}
        />

        {/* Min label */}
        <text x="30" y="170" fill="#666" fontSize="12" textAnchor="middle">
          0
        </text>

        {/* Max label */}
        <text x="170" y="170" fill="#666" fontSize="12" textAnchor="middle">
          {maxValue}
        </text>
      </svg>

      {/* Center text */}
      <div className="absolute flex flex-col items-center justify-center">
        {label && <div className="text-xs text-gray-500 mb-1">{label}</div>}
        {metric && <div className="text-3xl font-bold">{metric}</div>}
      </div>
    </div>
  )
}

