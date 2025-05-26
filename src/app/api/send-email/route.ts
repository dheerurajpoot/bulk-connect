import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { contacts, subject, message, campaignName } = await request.json()

    // Simulate Email API integration
    const results = []

    for (const contact of contacts) {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 50))

      // Simulate success/failure
      const success = Math.random() > 0.05 // 95% success rate for emails

      results.push({
        contact: contact.email,
        name: contact.name,
        status: success ? "delivered" : "failed",
        timestamp: new Date().toISOString(),
        messageId: success ? `email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` : null,
      })
    }

    // Save campaign to database (simulated)
    const campaign = {
      id: `campaign_${Date.now()}`,
      name: campaignName,
      type: "email",
      subject,
      status: "completed",
      totalSent: results.filter((r) => r.status === "delivered").length,
      totalFailed: results.filter((r) => r.status === "failed").length,
      createdAt: new Date().toISOString(),
      results,
    }

    return NextResponse.json({
      success: true,
      campaign,
      summary: {
        total: contacts.length,
        delivered: results.filter((r) => r.status === "delivered").length,
        failed: results.filter((r) => r.status === "failed").length,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to send emails" }, { status: 500 })
  }
}
