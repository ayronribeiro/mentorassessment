"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export function Logo() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div
      className={`flex items-center gap-3 transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
    >
      <div className="relative group">
        <Image
          src="/mentor-academy-logo.png"
          alt="Mentor Academy"
          width={180}
          height={60}
          className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#4A7BF7]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg blur-xl"></div>
      </div>
    </div>
  )
}
