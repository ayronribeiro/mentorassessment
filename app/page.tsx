"use client"

import type React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Circle, ArrowRight, BarChart3, Target, Clock, Heart, Briefcase, Sparkles } from "lucide-react"
import { Header } from "@/components/header"
import { AnimatedCard } from "@/components/animated-card"
import { AnimatedProgress } from "@/components/animated-progress"
import ContactForm from "@/components/contact-form"

interface Question {
  id: string
  text: string
  score: number
}

interface Section {
  id: string
  title: string
  description: string
  maxPoints: number
  icon: React.ReactNode
  questions: Question[]
}

const initialSections: Section[] = [
  {
    id: "core",
    title: "Core Mentoring Readiness",
    description: "Personal qualities and communication skills essential for effective mentoring",
    maxPoints: 50,
    icon: <Heart className="w-5 h-5" />,
    questions: [
      { id: "core1", text: "I genuinely enjoy helping others succeed and grow professionally", score: 0 },
      { id: "core2", text: "I have patience for people who learn differently or at different speeds", score: 0 },
      { id: "core3", text: "I can remain calm and supportive when someone is struggling", score: 0 },
      { id: "core4", text: "I'm comfortable giving direct feedback even when it might be difficult to hear", score: 0 },
      { id: "core5", text: "I can separate my own ego from my mentee's success or failure", score: 0 },
      { id: "core6", text: "I'm an excellent listener who asks thoughtful questions", score: 0 },
      { id: "core7", text: "I can explain complex concepts in simple, understandable terms", score: 0 },
      { id: "core8", text: "I adapt my communication style to different personality types", score: 0 },
      { id: "core9", text: "I'm comfortable having difficult conversations about performance or behavior", score: 0 },
      { id: "core10", text: "I can provide constructive feedback without being critical or judgmental", score: 0 },
    ],
  },
  {
    id: "experience",
    title: "Professional Experience & Expertise",
    description: "Depth of experience and proven track record in your field",
    maxPoints: 60,
    icon: <Briefcase className="w-5 h-5" />,
    questions: [
      { id: "exp1", text: "I have at least 10+ years of experience in my field", score: 0 },
      { id: "exp2", text: "I've held leadership positions and managed teams or projects", score: 0 },
      { id: "exp3", text: "I've successfully navigated major career transitions or challenges", score: 0 },
      { id: "exp4", text: "I've achieved measurable results that others would want to replicate", score: 0 },
      { id: "exp5", text: "I have specialized knowledge or skills that are valuable in today's market", score: 0 },
      { id: "exp6", text: "I've overcome significant professional obstacles and learned from failures", score: 0 },
      { id: "exp7", text: "I've informally mentored colleagues or employees with positive results", score: 0 },
      { id: "exp8", text: "People regularly seek me out for advice in my area of expertise", score: 0 },
      { id: "exp9", text: "I've helped others achieve promotions, career changes, or business growth", score: 0 },
      { id: "exp10", text: "I have specific examples of people I've helped succeed", score: 0 },
      { id: "exp11", text: "I can articulate the methods and strategies that led to my success", score: 0 },
      { id: "exp12", text: "I stay current with trends and developments in my industry", score: 0 },
    ],
  },
  {
    id: "business",
    title: "Business Readiness",
    description: "Entrepreneurial mindset and understanding of business fundamentals",
    maxPoints: 70,
    icon: <BarChart3 className="w-5 h-5" />,
    questions: [
      { id: "bus1", text: "I'm comfortable with the uncertainty of running my own business", score: 0 },
      { id: "bus2", text: "I'm willing to invest time and money in building my mentoring practice", score: 0 },
      { id: "bus3", text: "I can handle rejection and setbacks without giving up", score: 0 },
      { id: "bus4", text: "I'm motivated by building something of my own, not just helping others", score: 0 },
      { id: "bus5", text: "I understand that building a business takes time and consistent effort", score: 0 },
      { id: "bus6", text: "I can clearly articulate the value I provide to mentees", score: 0 },
      { id: "bus7", text: "I'm comfortable charging money for my expertise and guidance", score: 0 },
      { id: "bus8", text: "I understand that my time and knowledge have monetary value", score: 0 },
      { id: "bus9", text: "I can confidently discuss pricing without feeling guilty or apologetic", score: 0 },
      { id: "bus10", text: "I believe my expertise can solve real problems for people", score: 0 },
      { id: "bus11", text: "I know who my ideal mentees are and what they need", score: 0 },
      { id: "bus12", text: "I understand what people in my target market are willing to pay for", score: 0 },
      { id: "bus13", text: "I can identify the specific problems my mentoring solves", score: 0 },
      { id: "bus14", text: "I know how to reach and attract potential mentees", score: 0 },
    ],
  },
  {
    id: "time",
    title: "Time & Commitment Readiness",
    description: "Availability and long-term commitment to building your practice",
    maxPoints: 40,
    icon: <Clock className="w-5 h-5" />,
    questions: [
      { id: "time1", text: "I have at least 10-15 hours per week to dedicate to mentoring", score: 0 },
      { id: "time2", text: "I can commit to regular, consistent schedules with mentees", score: 0 },
      { id: "time3", text: "I have the support of my family for this new venture", score: 0 },
      { id: "time4", text: "I can balance my mentoring business with other responsibilities", score: 0 },
      { id: "time5", text: "I'm willing to invest 6-12 months building my mentoring practice", score: 0 },
      { id: "time6", text: "I can financially support myself during the initial growth phase", score: 0 },
      { id: "time7", text: "I'm committed to continuously improving my mentoring skills", score: 0 },
      { id: "time8", text: "I see mentoring as a long-term business, not a short-term side project", score: 0 },
    ],
  },
  {
    id: "emotional",
    title: "Emotional & Psychological Readiness",
    description: "Emotional maturity and psychological preparedness for mentoring",
    maxPoints: 30,
    icon: <Target className="w-5 h-5" />,
    questions: [
      { id: "emo1", text: "I can handle difficult conversations without becoming defensive", score: 0 },
      { id: "emo2", text: "I don't need to be the smartest person in the room", score: 0 },
      { id: "emo3", text: "I can celebrate others' successes without feeling threatened", score: 0 },
      { id: "emo4", text: "I'm comfortable admitting when I don't know something", score: 0 },
      { id: "emo5", text: "I can maintain professional boundaries while being supportive", score: 0 },
      { id: "emo6", text: "I'm secure enough in my own achievements to focus on others' growth", score: 0 },
    ],
  },
]

export default function MentorAssessment() {
  const [sections, setSections] = useState<Section[]>(initialSections)
  const [currentSection, setCurrentSection] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactData, setContactData] = useState<{
    firstName: string
    lastName: string
    email: string
    phone: string
  } | null>(null)
  const [isSubmittingToGHL, setIsSubmittingToGHL] = useState(false)

  const updateScore = (sectionId: string, questionId: string, score: number) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              questions: section.questions.map((q) => (q.id === questionId ? { ...q, score } : q)),
            }
          : section,
      ),
    )
  }

  const getSectionScore = (section: Section) => {
    return section.questions.reduce((sum, q) => sum + q.score, 0)
  }

  const getTotalScore = () => {
    return sections.reduce((sum, section) => sum + getSectionScore(section), 0)
  }

  const getReadinessLevel = (score: number) => {
    if (score >= 200)
      return {
        level: "Ready to Launch",
        color: "bg-gradient-to-r from-green-500 to-emerald-500",
        description:
          "You have the experience, mindset, and readiness to start building a professional mentoring business.",
      }
    if (score >= 150)
      return {
        level: "Almost Ready",
        color: "bg-gradient-to-r from-yellow-500 to-orange-500",
        description:
          "You have strong mentoring capabilities but may need to develop certain business skills or mindset shifts.",
      }
    if (score >= 100)
      return {
        level: "Needs Development",
        color: "bg-gradient-to-r from-orange-500 to-red-500",
        description:
          "You have mentoring potential but need significant preparation before launching a professional practice.",
      }
    return {
      level: "Not Ready Yet",
      color: "bg-gradient-to-r from-red-500 to-pink-500",
      description:
        "You may benefit from more experience, training, or personal development before pursuing professional mentoring.",
    }
  }

  const getSectionReadiness = (section: Section, score: number) => {
    const percentage = (score / section.maxPoints) * 100
    if (percentage >= 85) return { level: "Strong", color: "text-green-600" }
    if (percentage >= 70) return { level: "Good", color: "text-yellow-600" }
    if (percentage >= 50) return { level: "Needs Work", color: "text-orange-600" }
    return { level: "Weak", color: "text-red-600" }
  }

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1)
    } else {
      setShowContactForm(true)
    }
  }

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
    }
  }

  const handleContactSubmit = async (formData: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }) => {
    setIsSubmittingToGHL(true)
    setContactData(formData)

    try {
      const totalScore = sections.reduce((sum, section) => sum + getSectionScore(section), 0)
      const maxScore = sections.reduce((sum, section) => sum + section.maxPoints, 0)
      const percentage = Math.round((totalScore / maxScore) * 100)

      let readinessLevel = ""
      let recommendations: string[] = []

      if (percentage >= 85) {
        readinessLevel = "Highly Ready"
        recommendations = [
          "You are exceptionally well-prepared to start your mentoring business",
          "Consider launching your practice within the next 30 days",
          "Focus on building your marketing and client acquisition systems",
        ]
      } else if (percentage >= 70) {
        readinessLevel = "Ready with Minor Gaps"
        recommendations = [
          "You have strong foundational readiness with a few areas to strengthen",
          "Address the lower-scoring areas before launching",
          "Consider joining a mentor training program for additional support",
        ]
      } else if (percentage >= 55) {
        readinessLevel = "Developing Readiness"
        recommendations = [
          "You have good potential but need more development in key areas",
          "Focus on building experience and business skills",
          "Consider starting with informal mentoring to build confidence",
        ]
      } else {
        readinessLevel = "Early Development Stage"
        recommendations = [
          "You would benefit from more experience and skill development",
          "Focus on building your expertise and leadership experience",
          "Consider being mentored yourself before mentoring others",
        ]
      }

      const quizData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        totalScore,
        maxScore,
        percentage,
        readinessLevel,
        sectionScores: {
          core: getSectionScore(sections[0]),
          experience: getSectionScore(sections[1]),
          business: getSectionScore(sections[2]),
          time: getSectionScore(sections[3]),
          emotional: getSectionScore(sections[4]),
        },
        recommendations,
      }

      const response = await fetch("/api/gohighlevel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizData),
      })

      if (!response.ok) {
        console.error("Failed to send data to GoHighLevel")
      }

      setShowContactForm(false)
      setShowResults(true)
    } catch (error) {
      console.error("Error processing quiz results:", error)
      setShowContactForm(false)
      setShowResults(true)
    } finally {
      setIsSubmittingToGHL(false)
    }
  }

  useEffect(() => {
    if (showResults) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [showResults])

  if (showContactForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#4A7BF7]/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FF3A6E]/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <Header />
        <div className="max-w-4xl mx-auto space-y-6 p-4 pt-8 relative z-10">
          <div className="flex justify-center items-center min-h-[60vh]">
            <ContactForm onSubmit={handleContactSubmit} isSubmitting={isSubmittingToGHL} />
          </div>
        </div>
      </div>
    )
  }

  if (showResults) {
    const totalScore = getTotalScore()
    const readiness = getReadinessLevel(totalScore)

    return (
      <div className="min-h-screen bg-[#001A3A] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#4A7BF7]/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FF3A6E]/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <Header />
        <div className="max-w-4xl mx-auto space-y-6 p-4 pt-8 relative z-10">
          <div className="text-center mb-8 animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 text-[#4A7BF7] animate-spin-slow" />
              <h1 className="text-4xl font-bold text-white">Your Assessment Results</h1>
              <Sparkles className="w-8 h-8 text-[#FF3A6E] animate-spin-slow" style={{ animationDelay: "1s" }} />
            </div>
            <p className="text-[#4A7BF7] text-xl animate-slide-up" style={{ animationDelay: "0.3s" }}>
              Find out if you're ready to build your mentoring business
            </p>
          </div>

          <AnimatedCard className="text-center border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
            <CardHeader>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-[#001A3A] to-[#4A7BF7] bg-clip-text text-transparent">
                Your Readiness Score
              </CardTitle>
              <CardDescription>Based on your responses, here's your mentoring readiness evaluation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-6xl font-bold text-[#001A3A] mb-2 animate-count-up">{totalScore}</div>
                <div className="text-lg text-gray-600 mb-4">out of 250 points</div>
                <Badge
                  className={`${readiness.color} text-white text-lg px-6 py-3 rounded-full shadow-lg animate-bounce-subtle`}
                >
                  {readiness.level}
                </Badge>
                <p className="mt-4 text-gray-700 max-w-2xl mx-auto">{readiness.description}</p>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
                <div
                  className={`h-6 rounded-full ${readiness.color} transition-all duration-2000 ease-out shadow-lg`}
                  style={{ width: `${(totalScore / 250) * 100}%` }}
                ></div>
              </div>

              <div className="pt-4 animate-bounce-in" style={{ animationDelay: "1s" }}>
                <a href="https://mentoracademy.co/#join" target="_blank" rel="noopener noreferrer">
                  <Button
                    className="bg-[#FF3A6E] hover:bg-[#ff1c59] text-white rounded-full px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-[#FF3A6E]/30 animate-pulse-cta"
                    size="lg"
                  >
                    🚀 Join Mentor Academy Now
                  </Button>
                </a>
                <p className="text-sm text-gray-600 mt-2">Start building your mentoring business today</p>
              </div>
            </CardContent>
          </AnimatedCard>

          <AnimatedCard className="border-0 shadow-2xl" delay={200}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#4A7BF7]" />
                Section-by-Section Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {sections.map((section, index) => {
                  const score = getSectionScore(section)
                  const readiness = getSectionReadiness(section, score)
                  const percentage = (score / section.maxPoints) * 100

                  return (
                    <div
                      key={section.id}
                      className="border rounded-lg p-4 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-gradient-to-r from-white to-gray-50"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-full bg-[#4A7BF7]/10">{section.icon}</div>
                          <h3 className="font-semibold">{section.title}</h3>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">
                            {score}/{section.maxPoints}
                          </div>
                          <div className={`text-sm font-medium ${readiness.color}`}>{readiness.level}</div>
                        </div>
                      </div>
                      <AnimatedProgress value={percentage} className="h-3" />
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </AnimatedCard>

          <AnimatedCard className="border-0 shadow-2xl" delay={400}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-[#FF3A6E]" />
                Your Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              {totalScore >= 200 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-green-600 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Ready to Launch - Recommended Actions:
                  </h3>
                  <ul className="space-y-3 text-sm">
                    {[
                      "Define your specific mentoring niche and ideal client",
                      "Create your first structured mentoring program",
                      "Set your pricing strategy",
                      "Build your marketing and client acquisition plan",
                      "Launch with your first few clients",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 animate-slide-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div
                    className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 animate-bounce-in"
                    style={{ animationDelay: "1.5s" }}
                  >
                    <div className="text-center">
                      <h4 className="font-semibold text-green-800 mb-2">🎉 You're Ready to Launch!</h4>
                      <p className="text-green-700 text-sm mb-4">
                        Don't wait - start building your mentoring business now
                      </p>
                      <a href="https://mentoracademy.co/#join" target="_blank" rel="noopener noreferrer">
                        <Button className="bg-[#FF3A6E] hover:bg-[#ff1c59] text-white rounded-full px-6 py-3 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#FF3A6E]/25 animate-wiggle">
                          ✨ Join Mentor Academy
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {totalScore >= 150 && totalScore < 200 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-yellow-600">Almost Ready - Focus Areas:</h3>
                  <ul className="space-y-2 text-sm">
                    {[
                      "Focus on your lowest-scoring sections first",
                      "Gain confidence in your value and pricing",
                      "Develop business and marketing skills",
                      "Create more structure around your mentoring approach",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 animate-slide-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <Circle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {totalScore >= 100 && totalScore < 150 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-orange-600">Needs Development - Preparation Steps:</h3>
                  <ul className="space-y-2 text-sm">
                    {[
                      "Gain more experience and develop your expertise",
                      "Build confidence in your abilities",
                      "Learn fundamental business skills",
                      "Clarify your unique value proposition",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 animate-slide-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <Circle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {totalScore < 100 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-red-600">Not Ready Yet - Foundation Building:</h3>
                  <ul className="space-y-2 text-sm">
                    {[
                      "Continue developing your professional expertise",
                      "Gain more informal mentoring experience",
                      "Work on personal development and business skills",
                      "Reassess your goals and timeline",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 animate-slide-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <Circle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </AnimatedCard>

          <AnimatedCard
            className="bg-gradient-to-r from-[#001A3A] to-[#0A2A4A] text-white border-0 shadow-2xl overflow-hidden relative"
            delay={600}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#4A7BF7]/10 to-[#FF3A6E]/10 animate-pulse"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="text-3xl font-bold text-center">Start Your Mentoring Business in 60 days</CardTitle>
              <CardDescription className="text-[#4A7BF7] text-center text-lg">
                Mentor Academy helps experienced leaders like you turn expertise into income.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="mb-6 text-gray-300 text-center text-lg">
                Whether you scored "Ready to Launch" or "Almost Ready," you don't have to figure this out alone. Mentor
                Academy provides everything you need to build a profitable mentoring business.
              </p>

              <div className="text-center space-y-4">
                <div className="animate-bounce-in" style={{ animationDelay: "0.5s" }}>
                  <a href="https://mentoracademy.co/#join" target="_blank" rel="noopener noreferrer">
                    <Button
                      className="bg-[#FF3A6E] hover:bg-[#ff1c59] text-white rounded-full px-6 md:px-12 py-4 md:py-6 text-lg md:text-xl font-bold transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-[#FF3A6E]/40 animate-pulse-cta"
                      size="lg"
                    >
                      🚀 Join Mentor Academy Now
                    </Button>
                  </a>
                  <p className="text-[#4A7BF7] text-sm mt-2 animate-fade-in" style={{ animationDelay: "1s" }}>
                    Limited spots available - Start your 60-day journey today
                  </p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-6">
                  <a
                    href="https://api.leadconnectorhq.com/widget/bookings/jakescalendar"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      className="text-white border-white hover:bg-white/10 rounded-full bg-transparent transition-all duration-300 hover:scale-105 px-8 py-3"
                      size="lg"
                    >
                      📞 Schedule a Call
                    </Button>
                  </a>
                  <span className="text-gray-400 text-sm">or</span>
                  <a href="https://beyondyourshadow.com/get-the-book/" target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      className="text-[#4A7BF7] border-[#4A7BF7] hover:bg-[#4A7BF7]/10 rounded-full bg-transparent transition-all duration-300 hover:scale-105 px-8 py-3"
                      size="lg"
                    >
                      📖 Get The Book
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </AnimatedCard>

          <div className="text-center pt-4 space-y-4">
            <Button
              variant="outline"
              className="text-white border-white hover:bg-white/10 bg-transparent transition-all duration-300 hover:scale-105"
              onClick={() => {
                setShowResults(false)
                setCurrentSection(0)
                setSections(initialSections)
              }}
            >
              Retake Assessment
            </Button>

            <div className="animate-bounce-in" style={{ animationDelay: "2s" }}>
              <p className="text-[#4A7BF7] text-sm mb-2">Ready to transform your expertise into income?</p>
              <a href="https://mentoracademy.co/#join" target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#FF3A6E] hover:bg-[#ff1c59] text-white rounded-full px-8 py-3 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FF3A6E]/25">
                  Join Mentor Academy
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const currentSectionData = sections[currentSection]
  const sectionScore = getSectionScore(currentSectionData)

  return (
    <div className="min-h-screen bg-[#001A3A] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#4A7BF7]/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FF3A6E]/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <Header />
      <div className="max-w-3xl mx-auto space-y-6 p-4 pt-8 relative z-10">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-white mb-2">The Mentor Readiness Assessment</h1>
          <p className="text-[#4A7BF7] text-xl">Are You Ready to Build a Professional Mentoring Business?</p>
        </div>

        <AnimatedCard className={`border-0 shadow-2xl transition-all duration-500`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-gradient-to-r from-[#4A7BF7]/20 to-[#FF3A6E]/20 animate-pulse-subtle">
                  {currentSectionData.icon}
                </div>
                <div>
                  <CardTitle className="animate-slide-in">{currentSectionData.title}</CardTitle>
                  <CardDescription className="animate-slide-in" style={{ animationDelay: "0.1s" }}>
                    {currentSectionData.description}
                  </CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="animate-bounce-subtle">
                Section {currentSection + 1} of {sections.length}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Progress</span>
                <span>
                  {currentSection + 1}/{sections.length}
                </span>
              </div>
              <AnimatedProgress value={((currentSection + 1) / sections.length) * 100} className="bg-gray-200" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 animate-slide-up">
              <p className="text-sm text-gray-700 mb-2">Rate each statement on a scale of 1-5:</p>
              <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-600">
                <span className="px-2 py-1 bg-white rounded-full">1 = Not at all true</span>
                <span className="px-2 py-1 bg-white rounded-full">2 = Somewhat true</span>
                <span className="px-2 py-1 bg-white rounded-full">3 = Moderately true</span>
                <span className="px-2 py-1 bg-white rounded-full">4 = Mostly true</span>
                <span className="px-2 py-1 bg-white rounded-full">5 = Completely true</span>
              </div>
            </div>

            <div className="space-y-6">
              {currentSectionData.questions.map((question, index) => (
                <div
                  key={question.id}
                  className="space-y-3 animate-slide-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <p className="font-medium text-gray-800">
                    {index + 1}. {question.text}
                  </p>
                  <div className="flex gap-2 justify-center">
                    {[1, 2, 3, 4, 5].map((score) => (
                      <Button
                        key={score}
                        variant={question.score === score ? "default" : "outline"}
                        size="sm"
                        className={`w-12 h-12 rounded-full transition-all duration-300 hover:scale-110 ${
                          question.score === score
                            ? "bg-[#6B73FF] hover:bg-[#5A63E8] text-white shadow-lg shadow-[#6B73FF]/25"
                            : "hover:border-[#6B73FF] hover:text-[#6B73FF] hover:bg-[#6B73FF]/5"
                        }`}
                        onClick={() => updateScore(currentSectionData.id, question.id, score)}
                      >
                        {score}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Section Score:{" "}
                <span className="font-bold text-lg text-[#6B73FF]">
                  {sectionScore}/{currentSectionData.maxPoints}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={prevSection}
                  disabled={currentSection === 0}
                  className="transition-all duration-300 hover:scale-105 bg-transparent"
                >
                  Previous
                </Button>
                <Button
                  onClick={nextSection}
                  disabled={currentSectionData.questions.some((q) => q.score === 0)}
                  className="bg-[#FF3A6E] hover:bg-[#ff1c59] flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  {currentSection === sections.length - 1 ? "View Results" : "Next Section"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </AnimatedCard>
      </div>
    </div>
  )
}
