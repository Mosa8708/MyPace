"use client"

import { Check } from "lucide-react"

interface StepIndicatorProps {
  steps: string[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="relative">
      <div className="flex items-center justify-between w-full">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 z-10 
                ${
                  index <= currentStep
                    ? "bg-primary border-primary text-white"
                    : "bg-white border-gray-300 text-gray-500"
                }`}
            >
              {index < currentStep ? <Check className="h-5 w-5" /> : <span>{index + 1}</span>}
            </div>
            <span className={`text-xs mt-2 font-medium ${index <= currentStep ? "text-primary" : "text-gray-500"}`}>
              {step}
            </span>
          </div>
        ))}
      </div>

      {/* Connecting line */}
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        ></div>
      </div>
    </div>
  )
}

