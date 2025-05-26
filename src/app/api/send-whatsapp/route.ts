import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { contacts, message, campaignName } = await request.json()

    // Simulate WhatsApp API integration
    const results = []

    for (const contact of contacts) {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 100))

      // Simulate success/failure
      const success = Math.random() > 0.1 // 90% success rate

      results.push({
        contact: contact.whatsapp,
        name: contact.name,
        status: success ? "delivered" : "failed",
        timestamp: new Date().toISOString(),
        messageId: success ? `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` : null,
      })
    }

    // Save campaign to database (simulated)
    const campaign = {
      id: `campaign_${Date.now()}`,
      name: campaignName,
      type: "whatsapp",
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
    return NextResponse.json({ error: "Failed to send WhatsApp messages" }, { status: 500 })
  }
}
