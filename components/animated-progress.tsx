"use client"

import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"

interface AnimatedProgressProps {
  value: number
  className?: string
}

export function AnimatedProgress({ value, className }: AnimatedProgressProps) {
  const [animatedValue, setAnimatedValue] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value)
    }, 300)
    return () => clearTimeout(timer)
  }, [value])

  return (
    <div className="relative">
      <Progress value={animatedValue} className={`transition-all duration-1000 ease-out ${className}`} />
      <div
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#4A7BF7] to-[#FF3A6E] rounded-full transition-all duration-1000 ease-out opacity-20"
        style={{ width: `${animatedValue}%` }}
      />
    </div>
  )
}
