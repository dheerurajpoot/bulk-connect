import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

// Create reusable transporter using SMTP
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: Number.parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const { contacts, subject, message, campaignName, fromName = "BulkConnect" } = await request.json()

    if (!contacts || !subject || !message || !campaignName) {
      return NextResponse.json(
        { error: "Missing required fields: contacts, subject, message, campaignName" },
        { status: 400 },
      )
    }

    // Verify SMTP configuration
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return NextResponse.json({ error: "SMTP configuration missing" }, { status: 500 })
    }

    const transporter = createTransporter()

    // Verify SMTP connection
    try {
      await transporter.verify()
    } catch (error) {
      console.error("SMTP verification failed:", error)
      return NextResponse.json({ error: "SMTP connection failed" }, { status: 500 })
    }

    const results = []

    // Send emails to each contact
    for (const contact of contacts) {
      try {
        if (!contact.email) {
          results.push({
            contact: contact.email,
            name: contact.name,
            status: "failed",
            timestamp: new Date().toISOString(),
            error: "No email address provided",
          })
          continue
        }

        // Personalize message and subject
        const personalizedSubject = subject.replace(/{name}/g, contact.name || "there")
        const personalizedMessage = message.replace(/{name}/g, contact.name || "there")

        // Create HTML email template
        const htmlMessage = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${personalizedSubject}</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
              .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
              .unsubscribe { color: #999; text-decoration: none; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>BulkConnect</h1>
              </div>
              <div class="content">
                ${personalizedMessage.replace(/\n/g, "<br>")}
              </div>
              <div class="footer">
                <p>This email was sent by ${fromName} via BulkConnect</p>
                <p><a href="#" class="unsubscribe">Unsubscribe</a></p>
              </div>
            </div>
          </body>
          </html>
        `

        // Email options
        const mailOptions = {
          from: `"${fromName}" <${process.env.SMTP_USER}>`,
          to: contact.email,
          subject: personalizedSubject,
          text: personalizedMessage, // Plain text version
          html: htmlMessage, // HTML version
          headers: {
            "X-Campaign-Name": campaignName,
            "X-Contact-ID": contact.id || "unknown",
          },
        }

        // Send email
        const info = await transporter.sendMail(mailOptions)

        results.push({
          contact: contact.email,
          name: contact.name,
          status: "delivered",
          timestamp: new Date().toISOString(),
          messageId: info.messageId,
        })

        // Rate limiting - wait 100ms between emails
        await new Promise((resolve) => setTimeout(resolve, 100))
      } catch (error) {
        console.error(`Failed to send email to ${contact.email}:`, error)
        results.push({
          contact: contact.email,
          name: contact.name,
          status: "failed",
          timestamp: new Date().toISOString(),
          error: error instanceof Error ? error.message : "Unknown error",
        })
      }
    }

    // Create campaign record
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
    console.error("Email send error:", error)
    return NextResponse.json(
      {
        error: "Failed to send emails",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// Test SMTP connection
export async function GET() {
  try {
    const transporter = createTransporter()
    await transporter.verify()

    return NextResponse.json({
      status: "ready",
      message: "Email service is configured and ready",
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: "Email service unavailable",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 503 },
    )
  }
}
