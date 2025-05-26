import { type NextRequest, NextResponse } from "next/server"

// Simulated database
const campaigns = [
  {
    id: "campaign_1",
    name: "Holiday Sale Announcement",
    type: "whatsapp",
    status: "completed",
    totalSent: 2450,
    totalFailed: 50,
    createdAt: "2024-12-20T10:00:00Z",
    scheduledAt: null,
  },
  {
    id: "campaign_2",
    name: "Newsletter - December Edition",
    type: "email",
    status: "completed",
    totalSent: 5200,
    totalFailed: 100,
    createdAt: "2024-12-19T14:30:00Z",
    scheduledAt: null,
  },
  {
    id: "campaign_3",
    name: "Product Launch Teaser",
    type: "whatsapp",
    status: "scheduled",
    totalSent: 0,
    totalFailed: 0,
    createdAt: "2024-12-21T08:00:00Z",
    scheduledAt: "2024-12-22T09:00:00Z",
  },
]

export async function GET() {
  return NextResponse.json({ campaigns })
}

export async function POST(request: NextRequest) {
  try {
    const campaignData = await request.json()

    const newCampaign = {
      id: `campaign_${Date.now()}`,
      ...campaignData,
      status: campaignData.scheduledAt ? "scheduled" : "draft",
      totalSent: 0,
      totalFailed: 0,
      createdAt: new Date().toISOString(),
    }

    campaigns.push(newCampaign)

    return NextResponse.json({ success: true, campaign: newCampaign })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 })
  }
}
