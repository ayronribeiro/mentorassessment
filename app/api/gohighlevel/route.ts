import { type NextRequest, NextResponse } from "next/server"

interface QuizData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  totalScore: number
  maxScore: number
  percentage: number
  readinessLevel: string
  sectionScores: {
    core: number
    experience: number
    business: number
    time: number
    emotional: number
  }
  recommendations: string[]
}

export async function POST(request: NextRequest) {
  try {
    const quizData: QuizData = await request.json()

    console.log("Environment variables check:")
    console.log("GHL_API_KEY exists:", !!process.env.GHL_API_KEY)
    console.log("GHL_LOCATION_ID exists:", !!process.env.GHL_LOCATION_ID)
    console.log("GHL_API_KEY length:", process.env.GHL_API_KEY?.length || 0)
    console.log("GHL_LOCATION_ID value:", process.env.GHL_LOCATION_ID)

    const ghlApiKey = process.env.GHL_API_KEY
    const ghlLocationId = process.env.GHL_LOCATION_ID

    if (!ghlApiKey || !ghlLocationId) {
      console.error("Missing GoHighLevel credentials")
      console.error("API Key missing:", !ghlApiKey)
      console.error("Location ID missing:", !ghlLocationId)
      return NextResponse.json({ error: "GoHighLevel API credentials not configured" }, { status: 500 })
    }

    const contactData = {
      locationId: ghlLocationId,
      firstName: quizData.firstName,
      lastName: quizData.lastName,
      email: quizData.email,
      phone: quizData.phone || "",
      source: "Mentor Readiness Assessment",
      tags: [
        "mentor-assessment",
        `readiness-${quizData.readinessLevel.toLowerCase().replace(/\s+/g, "-")}`,
        `score-${Math.round(quizData.percentage)}`,
      ],
      customFields: [
        {
          key: "assessment_total_score",
          field_value: quizData.totalScore.toString(),
        },
        {
          key: "assessment_percentage",
          field_value: `${quizData.percentage}%`,
        },
        {
          key: "readiness_level",
          field_value: quizData.readinessLevel,
        },
        {
          key: "core_score",
          field_value: quizData.sectionScores.core.toString(),
        },
        {
          key: "experience_score",
          field_value: quizData.sectionScores.experience.toString(),
        },
        {
          key: "business_score",
          field_value: quizData.sectionScores.business.toString(),
        },
        {
          key: "time_score",
          field_value: quizData.sectionScores.time.toString(),
        },
        {
          key: "emotional_score",
          field_value: quizData.sectionScores.emotional.toString(),
        },
        {
          key: "recommendations",
          field_value: quizData.recommendations.join("; "),
        },
      ],
    }

    console.log("Sending to GoHighLevel:", JSON.stringify(contactData, null, 2))

    const response = await fetch(`https://services.leadconnectorhq.com/contacts/upsert`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ghlApiKey}`,
        "Content-Type": "application/json",
        Version: "2021-07-28",
      },
      body: JSON.stringify(contactData),
    })

    const responseText = await response.text()
    console.log("GoHighLevel Response Status:", response.status)
    console.log("GoHighLevel Response:", responseText)

    if (!response.ok) {
      console.error("GoHighLevel API Error:", {
        status: response.status,
        statusText: response.statusText,
        body: responseText,
      })
      return NextResponse.json(
        {
          error: "Failed to create contact in GoHighLevel",
          details: responseText,
          status: response.status,
        },
        { status: response.status },
      )
    }

    let result
    try {
      result = JSON.parse(responseText)
    } catch (e) {
      console.error("Failed to parse GoHighLevel response:", responseText)
      return NextResponse.json({ error: "Invalid response from GoHighLevel" }, { status: 500 })
    }

    console.log("Contact created successfully:", result)

    return NextResponse.json({
      success: true,
      contactId: result.contact?.id,
      message: "Contact created successfully in GoHighLevel",
      data: result,
    })
  } catch (error) {
    console.error("Error sending to GoHighLevel:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
