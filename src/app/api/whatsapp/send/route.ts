import { type NextRequest, NextResponse } from "next/server"
import { makeWASocket, DisconnectReason, useMultiFileAuthState } from "@whiskeysockets/baileys"
import type { Boom } from "@hapi/boom"
import fs from "fs"
import path from "path"

// Store for active WhatsApp connections
const connections = new Map()

export async function POST(request: NextRequest) {
  try {
    const { contacts, message, campaignName } = await request.json()

    if (!contacts || !message || !campaignName) {
      return NextResponse.json({ error: "Missing required fields: contacts, message, campaignName" }, { status: 400 })
    }

    // Initialize WhatsApp connection
    const sessionPath = path.join(process.cwd(), "whatsapp-session")

    // Ensure session directory exists
    if (!fs.existsSync(sessionPath)) {
      fs.mkdirSync(sessionPath, { recursive: true })
    }

    const { state, saveCreds } = await useMultiFileAuthState(sessionPath)

    const sock = makeWASocket({
      auth: state,
      printQRInTerminal: true,
      logger: {
        level: "silent",
        child: () => ({ level: "silent" }),
        trace: () => {},
        debug: () => {},
        info: () => {},
        warn: () => {},
        error: () => {},
        fatal: () => {},
      },
    })

    sock.ev.on("creds.update", saveCreds)

    // Handle connection updates
    sock.ev.on("connection.update", (update) => {
      const { connection, lastDisconnect, qr } = update

      if (qr) {
        console.log("QR Code generated, scan with WhatsApp")
      }

      if (connection === "close") {
        const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut
        console.log("Connection closed due to ", lastDisconnect?.error, ", reconnecting ", shouldReconnect)

        if (shouldReconnect) {
          // Reconnect logic would go here
        }
      } else if (connection === "open") {
        console.log("WhatsApp connection opened")
      }
    })

    // Wait for connection to be established
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Connection timeout"))
      }, 30000) // 30 second timeout

      sock.ev.on("connection.update", (update) => {
        if (update.connection === "open") {
          clearTimeout(timeout)
          resolve(true)
        } else if (update.connection === "close") {
          clearTimeout(timeout)
          reject(new Error("Connection failed"))
        }
      })
    })

    const results = []

    // Send messages to each contact
    for (const contact of contacts) {
      try {
        // Format phone number (ensure it has country code)
        let phoneNumber = contact.whatsapp || contact.phone
        if (!phoneNumber) continue

        // Clean and format phone number
        phoneNumber = phoneNumber.replace(/[^\d+]/g, "")
        if (!phoneNumber.startsWith("+")) {
          phoneNumber = "+" + phoneNumber
        }

        // Convert to WhatsApp format
        const whatsappNumber = phoneNumber.replace("+", "") + "@s.whatsapp.net"

        // Personalize message
        const personalizedMessage = message.replace(/{name}/g, contact.name || "there")

        // Send message
        await sock.sendMessage(whatsappNumber, { text: personalizedMessage })

        results.push({
          contact: contact.whatsapp || contact.phone,
          name: contact.name,
          status: "delivered",
          timestamp: new Date().toISOString(),
          messageId: `wa_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        })

        // Rate limiting - wait 1 second between messages
        await new Promise((resolve) => setTimeout(resolve, 1000))
      } catch (error) {
        console.error(`Failed to send message to ${contact.whatsapp}:`, error)
        results.push({
          contact: contact.whatsapp || contact.phone,
          name: contact.name,
          status: "failed",
          timestamp: new Date().toISOString(),
          error: error instanceof Error ? error.message : "Unknown error",
        })
      }
    }

    // Close connection
    await sock.logout()

    // Create campaign record
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
    console.error("WhatsApp send error:", error)
    return NextResponse.json(
      {
        error: "Failed to send WhatsApp messages",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// Get WhatsApp connection status
export async function GET() {
  try {
    return NextResponse.json({
      status: "ready",
      message: "WhatsApp service is available",
    })
  } catch (error) {
    return NextResponse.json({ error: "WhatsApp service unavailable" }, { status: 503 })
  }
}
