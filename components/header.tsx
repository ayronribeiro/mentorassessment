"use client"

import { Logo } from "./logo"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isProgramDropdownOpen, setIsProgramDropdownOpen] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleMouseEnter = () => {
      clearTimeout(timeoutId)
      setIsDropdownOpen(true)
    }

    const handleMouseLeave = () => {
      timeoutId = setTimeout(() => {
        setIsDropdownOpen(false)
      }, 150)
    }

    const dropdownTrigger = document.querySelector("[data-dropdown-trigger]")
    const dropdownContent = document.querySelector("[data-dropdown-content]")

    if (dropdownTrigger && dropdownContent) {
      dropdownTrigger.addEventListener("mouseenter", handleMouseEnter)
      dropdownTrigger.addEventListener("mouseleave", handleMouseLeave)
      dropdownContent.addEventListener("mouseenter", handleMouseEnter)
      dropdownContent.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      clearTimeout(timeoutId)
      if (dropdownTrigger && dropdownContent) {
        dropdownTrigger.removeEventListener("mouseenter", handleMouseEnter)
        dropdownTrigger.removeEventListener("mouseleave", handleMouseLeave)
        dropdownContent.removeEventListener("mouseenter", handleMouseEnter)
        dropdownContent.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleMouseEnter = () => {
      clearTimeout(timeoutId)
      setIsProgramDropdownOpen(true)
    }

    const handleMouseLeave = () => {
      timeoutId = setTimeout(() => {
        setIsProgramDropdownOpen(false)
      }, 150)
    }

    const programDropdownTrigger = document.querySelector("[data-program-dropdown-trigger]")
    const programDropdownContent = document.querySelector("[data-program-dropdown-content]")

    if (programDropdownTrigger && programDropdownContent) {
      programDropdownTrigger.addEventListener("mouseenter", handleMouseEnter)
      programDropdownTrigger.addEventListener("mouseleave", handleMouseLeave)
      programDropdownContent.addEventListener("mouseenter", handleMouseEnter)
      programDropdownContent.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      clearTimeout(timeoutId)
      if (programDropdownTrigger && programDropdownContent) {
        programDropdownTrigger.removeEventListener("mouseenter", handleMouseEnter)
        programDropdownTrigger.removeEventListener("mouseleave", handleMouseLeave)
        programDropdownContent.removeEventListener("mouseenter", handleMouseEnter)
        programDropdownContent.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#001A3A]/95 backdrop-blur-md shadow-lg" : "bg-[#001A3A]"
      } py-4 px-6`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Logo />
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="https://beyondyourshadow.com/get-the-book/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#4A7BF7] text-sm font-medium transition-all duration-300 hover:scale-105 relative group"
          >
            Get The Book
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4A7BF7] transition-all duration-300 group-hover:w-full"></span>
          </a>

          <DropdownMenu>
            <DropdownMenuTrigger
              data-dropdown-trigger
              className="text-white hover:text-[#4A7BF7] text-sm font-medium transition-all duration-300 hover:scale-105 relative group flex items-center gap-1 bg-transparent border-none outline-none"
            >
              Resources
              <ChevronDown className="w-3 h-3" />
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4A7BF7] transition-all duration-300 group-hover:w-full"></span>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              data-dropdown-content
              className="w-80 bg-white border border-gray-200 shadow-lg p-2 space-y-1 font-medium"
            >
              <DropdownMenuItem
                asChild
                className="hover:bg-transparent focus:bg-transparent p-3 border-none outline-none cursor-pointer bg-slate-50"
              >
                <a
                  href="https://mentoracademy.co/newsletter/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-gray-700 hover:text-[#FF5A6F] transition-colors duration-200"
                >
                  Mentor Maker Newsletter
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="hover:bg-transparent focus:bg-transparent p-3 border-none outline-none cursor-pointer bg-slate-50"
              >
                <a
                  href="https://mentoracademy.co/5-signs-youre-ready-to-become-a-professional-mentor/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-gray-700 hover:text-[#FF5A6F] transition-colors duration-200"
                >
                  5 Signs You're Ready to Become a Professional Mentor
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="hover:bg-transparent focus:bg-transparent p-3 border-none outline-none cursor-pointer bg-slate-50"
              >
                <a
                  href="https://mentoracademy.co/90-day-mentor-business-launch-checklist/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-gray-700 hover:text-[#FF5A6F] transition-colors duration-200"
                >
                  90-Day Mentor Business Launch Checklist
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="hover:bg-transparent focus:bg-transparent p-3 border-none outline-none cursor-pointer bg-slate-50"
              >
                <a
                  href="https://mentoracademy.co/how-to-price-your-mentoring-services/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-gray-700 hover:text-[#FF5A6F] transition-colors duration-200"
                >
                  How to Package Your Expertise Into Income
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="hover:bg-transparent focus:bg-transparent p-3 border-none outline-none cursor-pointer bg-slate-50"
              >
                <a
                  href="https://mentoracademy.co/mentorship-roi-calculator/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-gray-700 hover:text-[#FF5A6F] transition-colors duration-200"
                >
                  Mentorship ROI Calculator
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="hover:bg-transparent focus:bg-transparent p-3 border-none outline-none cursor-pointer bg-slate-50"
              >
                <a
                  href="https://mentoracademy.co/the-mentor-readiness-assessment/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-gray-700 hover:text-[#FF5A6F] transition-colors duration-200"
                >
                  The Mentor Readiness Assessment
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="hover:bg-transparent focus:bg-transparent p-3 border-none outline-none cursor-pointer bg-slate-50"
              >
                <a
                  href="https://mentoracademy.co/how-to-attract-more-mentoring-clients/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-gray-700 hover:text-[#FF5A6F] transition-colors duration-200"
                >
                  How To Attract More Mentoring Clients
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="hover:bg-transparent focus:bg-transparent p-3 border-none outline-none cursor-pointer bg-slate-50"
              >
                <a
                  href="https://mentoracademy.co/how-to-start-a-mentoring-business-2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-gray-700 hover:text-[#FF5A6F] transition-colors duration-200"
                >
                  How to Start a Mentoring Business
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="hover:bg-transparent focus:bg-transparent p-3 border-none outline-none cursor-pointer bg-slate-50"
              >
                <a
                  href="https://mentoracademy.co/how-to-price-your-mentoring-services-2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-gray-700 hover:text-[#FF5A6F] transition-colors duration-200"
                >
                  How to Price your Mentoring Services
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="hover:bg-transparent focus:bg-transparent p-3 border-none outline-none cursor-pointer bg-slate-50"
              >
                <a
                  href="https://mentoracademy.co/8-mistakes-that-mentors-make/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-gray-700 hover:text-[#FF5A6F] transition-colors duration-200"
                >
                  8 Mistakes that Mentors make
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger
              data-program-dropdown-trigger
              className="text-white hover:text-[#4A7BF7] text-sm font-medium transition-all duration-300 hover:scale-105 relative group flex items-center gap-1 bg-transparent border-none outline-none"
            >
              Program Features
              <ChevronDown className="w-3 h-3" />
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4A7BF7] transition-all duration-300 group-hover:w-full"></span>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              data-program-dropdown-content
              className="w-80 bg-white border border-gray-200 shadow-lg p-2 space-y-1 font-medium"
            >
              <DropdownMenuItem
                asChild
                className="hover:bg-transparent focus:bg-transparent p-3 border-none outline-none cursor-pointer bg-slate-50"
              >
                <a
                  href="https://mentoracademy.co/marketing-tools/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-gray-700 hover:text-[#FF5A6F] transition-colors duration-200"
                >
                  Mentor Maker
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="hover:bg-transparent focus:bg-transparent p-3 border-none outline-none cursor-pointer bg-slate-50"
              >
                <a
                  href="https://mentoracademy.co/offers/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-gray-700 hover:text-[#FF5A6F] transition-colors duration-200"
                >
                  Offer Builder
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="hover:bg-transparent focus:bg-transparent p-3 border-none outline-none cursor-pointer bg-slate-50"
              >
                <a
                  href="https://mentoracademy.co/content/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-gray-700 hover:text-[#FF5A6F] transition-colors duration-200"
                >
                  Done-For-You Lead Templates
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="hover:bg-transparent focus:bg-transparent p-3 border-none outline-none cursor-pointer bg-slate-50"
              >
                <a
                  href="https://mentoracademy.co/done-for-you-lead-templates/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-gray-700 hover:text-[#FF5A6F] transition-colors duration-200"
                >
                  Mentor Growth Program
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="hover:bg-transparent focus:bg-transparent p-3 border-none outline-none cursor-pointer bg-slate-50"
              >
                <a
                  href="https://mentoracademy.co/mentor-hub/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-gray-700 hover:text-[#FF5A6F] transition-colors duration-200"
                >
                  Mentor Hub
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="hover:bg-transparent focus:bg-transparent p-3 border-none outline-none cursor-pointer bg-slate-50"
              >
                <a
                  href="https://mentoracademy.co/pricing/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-gray-700 hover:text-[#FF5A6F] transition-colors duration-200"
                >
                  Pricing
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <a
            href="https://mentoracademy.co/#about"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#4A7BF7] text-sm font-medium transition-all duration-300 hover:scale-105 relative group"
          >
            About Us
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4A7BF7] transition-all duration-300 group-hover:w-full"></span>
          </a>
        </nav>
        <a
          href="https://api.leadconnectorhq.com/widget/bookings/jakescalendar"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="bg-[#FF3A6E] hover:bg-[#ff1c59] text-white rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FF3A6E]/25 animate-pulse-subtle">
            Schedule a Call
          </Button>
        </a>
      </div>
    </header>
  )
}
