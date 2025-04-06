"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { StepGoals } from "./step-goals"
import { StepExperience } from "./step-experience"
import { StepEquipment } from "./step-equipment"
import { StepSchedule } from "./step-schedule"
import { StepTemplates } from "./step-templates"
import { StepCustomize } from "./step-customize"
import { StepReview } from "./step-review"
import { StepIndicator } from "./step-indicator"

interface PlanWizardProps {
  onSubmit: (data: any) => void
}

export function PlanWizard({ onSubmit }: PlanWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    goals: [],
    experience: "",
    equipment: [],
    schedule: {
      daysPerWeek: 3,
      timePerWorkout: 45,
      preferredDays: [],
    },
    selectedTemplate: null,
    customizations: {
      exercises: [],
    },
  })

  const steps = [
    { id: "goals", title: "Goals", component: StepGoals },
    { id: "experience", title: "Experience", component: StepExperience },
    { id: "equipment", title: "Equipment", component: StepEquipment },
    { id: "schedule", title: "Schedule", component: StepSchedule },
    { id: "templates", title: "Templates", component: StepTemplates },
    { id: "customize", title: "Customize", component: StepCustomize },
    { id: "review", title: "Review", component: StepReview },
  ]

  const handleNext = (stepData: any) => {
    // Update form data with the current step's data
    setFormData((prev) => ({
      ...prev,
      ...stepData,
    }))

    // Move to next step
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = (finalData: any) => {
    // Combine all form data
    const completeData = {
      ...formData,
      ...finalData,
    }

    // Pass the complete data to the parent component
    onSubmit(completeData)
  }

  // Get the current step component
  const StepComponent = steps[currentStep].component

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <StepIndicator steps={steps.map((step) => step.title)} currentStep={currentStep} />

      {/* Step Content */}
      <Card className="p-6">
        <StepComponent
          data={formData}
          onNext={handleNext}
          onBack={handleBack}
          onSubmit={handleSubmit}
          isFirstStep={currentStep === 0}
          isLastStep={currentStep === steps.length - 1}
        />
      </Card>
    </div>
  )
}

