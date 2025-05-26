import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Simulate file processing
    const text = await file.text()
    const lines = text.split("\n")
    const headers = lines[0].split(",").map((h) => h.trim())

    const contacts = []
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        const values = lines[i].split(",").map((v) => v.trim())
        const contact: any = {}

        headers.forEach((header, index) => {
          contact[header.toLowerCase()] = values[index] || ""
        })

        // Validate contact
        contact.status = "valid"
        if (!contact.email || !contact.email.includes("@")) {
          contact.status = "invalid"
        } else if (!contact.whatsapp || !contact.name) {
          contact.status = "partial"
        }

        contacts.push(contact)
      }
    }

    return NextResponse.json({
      success: true,
      contacts,
      summary: {
        total: contacts.length,
        valid: contacts.filter((c) => c.status === "valid").length,
        invalid: contacts.filter((c) => c.status === "invalid").length,
        partial: contacts.filter((c) => c.status === "partial").length,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to process file" }, { status: 500 })
  }
}
