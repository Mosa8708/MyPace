export function GymEquipmentAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Dumbbell */}
      <svg
        className="gym-equipment dumbbell absolute top-[10%] left-[10%] w-24 h-24 text-white"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14 4.14 5.57 2 7.71 3.43 9.14 2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22 14.86 20.57 16.29 22 18.43 19.86 19.86 21.29 21.29 19.86 19.86 18.43 22 16.29 20.57 14.86z" />
      </svg>

      {/* Kettlebell */}
      <svg
        className="gym-equipment kettlebell absolute top-[30%] right-[15%] w-32 h-32 text-white"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
      </svg>

      {/* Barbell */}
      <svg
        className="gym-equipment barbell absolute bottom-[20%] left-[25%] w-40 h-40 text-white"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14 4.14 5.57 2 7.71 3.43 9.14 2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22 14.86 20.57 16.29 22 18.43 19.86 19.86 21.29 21.29 19.86 19.86 18.43 22 16.29 20.57 14.86z" />
      </svg>
    </div>
  )
}

