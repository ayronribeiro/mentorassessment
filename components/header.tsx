"use client"

import { Logo } from "./logo"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isResourcesOpen, setIsResourcesOpen] = useState(false)
  const [isProgramFeaturesOpen, setIsProgramFeaturesOpen] = useState(false)

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

  const resourcesLinks = [
    { href: "https://mentoracademy.co/newsletter/", text: "Mentor Maker Newsletter" },
    { href: "https://mentoracademy.co/5-signs-youre-ready-to-become-a-professional-mentor/", text: "5 Signs You're Ready to Become a Professional Mentor" },
    { href: "https://mentoracademy.co/90-day-mentor-business-launch-checklist/", text: "90-Day Mentor Business Launch Checklist" },
    { href: "https://mentoracademy.co/how-to-price-your-mentoring-services/", text: "How to Package Your Expertise Into Income" },
    { href: "https://mentoracademy.co/mentorship-roi-calculator/", text: "Mentorship ROI Calculator" },
    { href: "https://mentoracademy.co/the-mentor-readiness-assessment/", text: "The Mentor Readiness Assessment" },
    { href: "https://mentoracademy.co/how-to-attract-more-mentoring-clients/", text: "How To Attract More Mentoring Clients" },
    { href: "https://mentoracademy.co/how-to-start-a-mentoring-business-2/", text: "How to Start a Mentoring Business" },
    { href: "https://mentoracademy.co/how-to-price-your-mentoring-services-2/", text: "How to Price your Mentoring Services" },
    { href: "https://mentoracademy.co/8-mistakes-that-mentors-make/", text: "8 Mistakes that Mentors make" }
  ]

  const programFeaturesLinks = [
    { href: "https://mentoracademy.co/marketing-tools/", text: "Mentor Maker" },
    { href: "https://mentoracademy.co/offers/", text: "Offer Builder" },
    { href: "https://mentoracademy.co/content/", text: "Done-For-You Lead Templates" },
    { href: "https://mentoracademy.co/done-for-you-lead-templates/", text: "Mentor Growth Program" },
    { href: "https://mentoracademy.co/mentor-hub/", text: "Mentor Hub" },
    { href: "https://mentoracademy.co/pricing/", text: "Pricing" }
  ]

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#001A3A]/95 backdrop-blur-md shadow-lg" : "bg-[#001A3A]"
      } py-4 px-6`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Logo />
        
        {/* Desktop Menu */}
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
              {resourcesLinks.map((link, index) => (
                <DropdownMenuItem
                  key={index}
                  asChild
                  className="hover:bg-transparent focus:bg-transparent p-3 border-none outline-none cursor-pointer bg-slate-50"
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block text-gray-700 hover:text-[#FF5A6F] transition-colors duration-200"
                  >
                    {link.text}
                  </a>
                </DropdownMenuItem>
              ))}
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
              {programFeaturesLinks.map((link, index) => (
                <DropdownMenuItem
                  key={index}
                  asChild
                  className="hover:bg-transparent focus:bg-transparent p-3 border-none outline-none cursor-pointer bg-slate-50"
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block text-gray-700 hover:text-[#FF5A6F] transition-colors duration-200"
                  >
                    {link.text}
                  </a>
                </DropdownMenuItem>
              ))}
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

        {/* Desktop CTA Button */}
        <a
          href="https://api.leadconnectorhq.com/widget/bookings/jakescalendar"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block"
        >
          <Button className="bg-[#FF3A6E] hover:bg-[#ff1c59] text-white rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FF3A6E]/25 animate-pulse-subtle">
            Schedule a Call
          </Button>
        </a>

        {/* Mobile CTA Button and Menu */}
        <div className="flex items-center gap-3 md:hidden">
          <a
            href="https://api.leadconnectorhq.com/widget/bookings/jakescalendar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-[#FF3A6E] hover:bg-[#ff1c59] text-white rounded-full px-4 py-2 text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FF3A6E]/25">
              Schedule a Call
            </Button>
          </a>
          
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-[#001A3A] border-l border-white/20 sheet-close-button">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="mt-8 space-y-6">
                {/* Get The Book */}
                <a
                  href="https://beyondyourshadow.com/get-the-book/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white hover:text-[#4A7BF7] text-lg font-medium transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get The Book
                </a>

                {/* Resources Collapsible */}
                <Collapsible open={isResourcesOpen} onOpenChange={setIsResourcesOpen}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full text-white hover:text-[#4A7BF7] text-lg font-medium transition-colors duration-200">
                    Resources
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isResourcesOpen ? 'rotate-180' : ''}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4 space-y-3 pl-4">
                    {resourcesLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-gray-300 hover:text-[#4A7BF7] text-sm transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.text}
                      </a>
                    ))}
                  </CollapsibleContent>
                </Collapsible>

                {/* Program Features Collapsible */}
                <Collapsible open={isProgramFeaturesOpen} onOpenChange={setIsProgramFeaturesOpen}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full text-white hover:text-[#4A7BF7] text-lg font-medium transition-colors duration-200">
                    Program Features
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isProgramFeaturesOpen ? 'rotate-180' : ''}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4 space-y-3 pl-4">
                    {programFeaturesLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-gray-300 hover:text-[#4A7BF7] text-sm transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.text}
                      </a>
                    ))}
                  </CollapsibleContent>
                </Collapsible>

                {/* About Us */}
                <a
                  href="https://mentoracademy.co/#about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white hover:text-[#4A7BF7] text-lg font-medium transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Us
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
