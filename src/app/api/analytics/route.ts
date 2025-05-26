import { NextResponse } from "next/server"

export async function GET() {
  // Simulate analytics data
  const analytics = {
    overview: {
      totalContacts: 15420,
      whatsappSent: 8934,
      emailsSent: 12567,
      campaignsActive: 5,
      deliveryRate: 94.2,
      openRate: 68.5,
      clickRate: 12.3,
    },
    chartData: {
      daily: [
        { date: "2024-12-15", whatsapp: 450, email: 1200 },
        { date: "2024-12-16", whatsapp: 380, email: 980 },
        { date: "2024-12-17", whatsapp: 520, email: 1450 },
        { date: "2024-12-18", whatsapp: 610, email: 1680 },
        { date: "2024-12-19", whatsapp: 490, email: 1320 },
        { date: "2024-12-20", whatsapp: 720, email: 1890 },
        { date: "2024-12-21", whatsapp: 580, email: 1560 },
      ],
      monthly: [
        { month: "Aug", whatsapp: 12500, email: 28000 },
        { month: "Sep", whatsapp: 14200, email: 31500 },
        { month: "Oct", whatsapp: 16800, email: 35200 },
        { month: "Nov", whatsapp: 18900, email: 38700 },
        { month: "Dec", whatsapp: 21200, email: 42100 },
      ],
    },
    topCampaigns: [
      {
        name: "Holiday Sale Announcement",
        type: "whatsapp",
        sent: 2450,
        delivered: 2380,
        opened: 1890,
        clicked: 456,
      },
      {
        name: "Newsletter - December Edition",
        type: "email",
        sent: 5200,
        delivered: 5100,
        opened: 3570,
        clicked: 892,
      },
      {
        name: "Black Friday Deals",
        type: "whatsapp",
        sent: 3200,
        delivered: 3150,
        opened: 2680,
        clicked: 734,
      },
    ],
  }

  return NextResponse.json(analytics)
}
