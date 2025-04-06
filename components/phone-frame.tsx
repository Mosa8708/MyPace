"use client"

import { useState } from "react"
import Image from "next/image"
import { Maximize2 } from "lucide-react"

export function PhoneFrame() {
  const [currentExercise, setCurrentExercise] = useState("Bench Press")
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="relative mx-auto border-[14px] border-black rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
      <div className="w-[148px] h-[18px] bg-black absolute top-0 left-1/2 transform -translate-x-1/2 rounded-b-[1rem] z-10"></div>
      <div className="h-full w-full bg-black overflow-hidden">
        {/* Status Bar */}
        <div className="bg-black text-white px-4 py-2 flex justify-between items-center text-xs">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-white"></div>
            <div className="h-2 w-2 rounded-full bg-white"></div>
            <div className="h-2 w-2 rounded-full bg-white"></div>
          </div>
        </div>

        {/* App Content */}
        <div className="bg-black h-full text-white">
          {/* Video Player */}
          <div className="relative h-[200px] bg-gray-800">
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/images/app-exercise-demo.jpg"
                alt="Exercise video showing a person performing bench press with proper form"
                width={300}
                height={200}
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-2 left-2 text-xs text-white bg-black/50 px-2 py-1 rounded">00:18</div>
            <div className="absolute top-2 right-2 flex gap-2">
              <button className="bg-black/50 p-1 rounded">
                <Maximize2 size={16} />
              </button>
            </div>
          </div>

          {/* Exercise Info */}
          <div className="p-4 border-b border-gray-800">
            <h3 className="font-bold">{currentExercise}</h3>
            <p className="text-xs text-gray-400">4 sets x 10 reps</p>
          </div>

          {/* Exercise List */}
          <div className="overflow-auto">
            <div className="flex items-center p-4 border-b border-gray-800 bg-orange-600">
              <div className="w-12 text-xs">00:12</div>
              <div className="flex-1">Bench Press</div>
              <div className="w-6">✓</div>
            </div>

            <div className="flex items-center p-4 border-b border-gray-800">
              <div className="w-12 text-xs">00:30</div>
              <div className="flex-1">Rest</div>
              <div className="w-6"></div>
            </div>

            <div className="flex items-center p-4 border-b border-gray-800">
              <div className="w-12 text-xs">00:30</div>
              <div className="flex-1">Bench Press</div>
              <div className="w-6"></div>
            </div>

            <div className="flex items-center p-4 border-b border-gray-800">
              <div className="w-12 text-xs">00:30</div>
              <div className="flex-1">Rest</div>
              <div className="w-6"></div>
            </div>

            <div className="flex items-center p-4 border-b border-gray-800">
              <div className="w-12 text-xs">00:30</div>
              <div className="flex-1">Bench Press</div>
              <div className="w-6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

