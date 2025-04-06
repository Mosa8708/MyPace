"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Dumbbell, Home, Building2, Bike } from "lucide-react"

interface StepEquipmentProps {
  data: any
  onNext: (data: any) => void
  onBack: () => void
  isFirstStep: boolean
}

export function StepEquipment({ data, onNext, onBack, isFirstStep }: StepEquipmentProps) {
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>(data.equipment || [])
  const [selectedLocation, setSelectedLocation] = useState<string>(data.location || "gym")

  const locations = [
    { id: "gym", title: "Gym", icon: Building2, description: "I have access to a fully equipped gym" },
    { id: "home", title: "Home", icon: Home, description: "I prefer to work out at home" },
    { id: "both", title: "Both", icon: Dumbbell, description: "I work out both at home and at the gym" },
    { id: "outdoor", title: "Outdoors", icon: Bike, description: "I prefer outdoor workouts" },
  ]

  const equipmentOptions = {
    gym: [
      { id: "barbell", label: "Barbell" },
      { id: "dumbbell", label: "Dumbbells" },
      { id: "cable", label: "Cable Machines" },
      { id: "smith", label: "Smith Machine" },
      { id: "leg-press", label: "Leg Press" },
      { id: "pullup-bar", label: "Pull-up Bar" },
    ],
    home: [
      { id: "dumbbell", label: "Dumbbells" },
      { id: "kettlebell", label: "Kettlebells" },
      { id: "resistance-bands", label: "Resistance Bands" },
      { id: "pullup-bar", label: "Pull-up Bar" },
      { id: "bench", label: "Workout Bench" },
      { id: "none", label: "No Equipment (Bodyweight Only)" },
    ],
    both: [
      { id: "barbell", label: "Barbell" },
      { id: "dumbbell", label: "Dumbbells" },
      { id: "cable", label: "Cable Machines" },
      { id: "resistance-bands", label: "Resistance Bands" },
      { id: "pullup-bar", label: "Pull-up Bar" },
      { id: "bench", label: "Workout Bench" },
    ],
    outdoor: [
      { id: "none", label: "No Equipment (Bodyweight Only)" },
      { id: "resistance-bands", label: "Resistance Bands" },
      { id: "park-equipment", label: "Park Equipment" },
    ],
  }

  const toggleEquipment = (equipmentId: string) => {
    if (selectedEquipment.includes(equipmentId)) {
      setSelectedEquipment(selectedEquipment.filter((id) => id !== equipmentId))
    } else {
      setSelectedEquipment([...selectedEquipment, equipmentId])
    }
  }

  const handleLocationChange = (locationId: string) => {
    setSelectedLocation(locationId)
    // Reset equipment selection when location changes
    setSelectedEquipment([])
  }

  const handleNext = () => {
    onNext({
      location: selectedLocation,
      equipment: selectedEquipment,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Where will you be working out?</h2>
        <p className="text-muted-foreground mb-6">
          Select your primary workout location and the equipment you have access to.
        </p>
      </div>

      {/* Location Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {locations.map((location) => {
          const Icon = location.icon
          const isSelected = selectedLocation === location.id

          return (
            <Card
              key={location.id}
              className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                isSelected ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/50"
              }`}
              onClick={() => handleLocationChange(location.id)}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-full ${isSelected ? "bg-primary text-white" : "bg-gray-100 text-gray-500"}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">{location.title}</h3>
                  <p className="text-sm text-muted-foreground">{location.description}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Equipment Selection */}
      <div>
        <h3 className="text-xl font-semibold mb-4">What equipment do you have access to?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {equipmentOptions[selectedLocation as keyof typeof equipmentOptions].map((equipment) => (
            <div key={equipment.id} className="flex items-center space-x-2">
              <Checkbox
                id={equipment.id}
                checked={selectedEquipment.includes(equipment.id)}
                onCheckedChange={() => toggleEquipment(equipment.id)}
              />
              <label
                htmlFor={equipment.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {equipment.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="hover:bg-primary/10 hover:text-primary hover:scale-[1.02] hover:shadow-md transition-all duration-300"
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={selectedEquipment.length === 0}
          className="bg-primary text-white hover:bg-primary/90 hover:scale-[1.02] hover:shadow-md transition-all duration-300"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}

