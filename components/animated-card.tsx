"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function AnimatedCard({ children, className = "", delay = 0 }: AnimatedCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={cardRef}>
      <Card
        className={`transition-all duration-700 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        } ${className}`}
      >
        {children}
      </Card>
    </div>
  )
}
