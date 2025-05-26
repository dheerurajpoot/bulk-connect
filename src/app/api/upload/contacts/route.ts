import { type NextRequest, NextResponse } from "next/server"
import * as XLSX from "xlsx"

interface Contact {
  name: string
  email: string
  whatsapp?: string
  phone?: string
  company?: string
  location?: string
  tags?: string
  status: "valid" | "invalid" | "partial"
  errors?: string[]
}

// Validate email format
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate phone number format
const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/[\s\-$$$$]/g, ""))
}

// Clean and format phone number
const formatPhone = (phone: string): string => {
  let cleaned = phone.replace(/[\s\-$$$$]/g, "")
  if (!cleaned.startsWith("+")) {
    // Assume US number if no country code
    if (cleaned.length === 10) {
      cleaned = "+1" + cleaned
    } else if (cleaned.length === 11 && cleaned.startsWith("1")) {
      cleaned = "+" + cleaned
    }
  }
  return cleaned
}

// Validate and process contact
const processContact = (rawContact: any): Contact => {
  const contact: Contact = {
    name: "",
    email: "",
    status: "valid",
    errors: [],
  }

  // Extract fields (case-insensitive)
  const fields = Object.keys(rawContact)

  for (const field of fields) {
    const lowerField = field.toLowerCase()
    const value = rawContact[field]?.toString().trim() || ""

    if (lowerField.includes("name")) {
      contact.name = value
    } else if (lowerField.includes("email")) {
      contact.email = value
    } else if (lowerField.includes("whatsapp") || lowerField.includes("whats")) {
      contact.whatsapp = value
    } else if (lowerField.includes("phone") || lowerField.includes("mobile")) {
      contact.phone = value
    } else if (lowerField.includes("company") || lowerField.includes("organization")) {
      contact.company = value
    } else if (lowerField.includes("location") || lowerField.includes("city") || lowerField.includes("address")) {
      contact.location = value
    } else if (lowerField.includes("tag") || lowerField.includes("category")) {
      contact.tags = value
    }
  }

  // Validation
  if (!contact.name) {
    contact.errors?.push("Name is required")
  }

  if (!contact.email) {
    contact.errors?.push("Email is required")
  } else if (!isValidEmail(contact.email)) {
    contact.errors?.push("Invalid email format")
  }

  // Validate and format phone numbers
  if (contact.whatsapp) {
    if (isValidPhone(contact.whatsapp)) {
      contact.whatsapp = formatPhone(contact.whatsapp)
    } else {
      contact.errors?.push("Invalid WhatsApp number format")
    }
  }

  if (contact.phone) {
    if (isValidPhone(contact.phone)) {
      contact.phone = formatPhone(contact.phone)
    } else {
      contact.errors?.push("Invalid phone number format")
    }
  }

  // Set status based on validation
  if (contact.errors && contact.errors.length > 0) {
    contact.status = "invalid"
  } else if (!contact.whatsapp && !contact.phone) {
    contact.status = "partial"
  }

  return contact
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File size too large (max 10MB)" }, { status: 400 })
    }

    // Check file type
    const allowedTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ]

    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(csv|xlsx|xls)$/i)) {
      return NextResponse.json({ error: "Invalid file type. Please upload CSV or Excel files only." }, { status: 400 })
    }

    const buffer = await file.arrayBuffer()
    let data: any[] = []

    try {
      if (file.type === "text/csv" || file.name.endsWith(".csv")) {
        // Parse CSV
        const text = new TextDecoder().decode(buffer)
        const lines = text.split("\n").filter((line) => line.trim())

        if (lines.length < 2) {
          return NextResponse.json(
            { error: "File must contain at least a header row and one data row" },
            { status: 400 },
          )
        }

        const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))

        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(",").map((v) => v.trim().replace(/"/g, ""))
          const row: any = {}

          headers.forEach((header, index) => {
            row[header] = values[index] || ""
          })

          data.push(row)
        }
      } else {
        // Parse Excel
        const workbook = XLSX.read(buffer, { type: "buffer" })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        data = XLSX.utils.sheet_to_json(worksheet)
      }

      if (data.length === 0) {
        return NextResponse.json({ error: "No data found in file" }, { status: 400 })
      }

      // Process contacts
      const contacts = data.map(processContact)

      // Remove duplicates based on email
      const uniqueContacts = contacts.filter(
        (contact, index, self) => index === self.findIndex((c) => c.email === contact.email),
      )

      const duplicatesRemoved = contacts.length - uniqueContacts.length

      // Generate summary
      const summary = {
        total: uniqueContacts.length,
        valid: uniqueContacts.filter((c) => c.status === "valid").length,
        invalid: uniqueContacts.filter((c) => c.status === "invalid").length,
        partial: uniqueContacts.filter((c) => c.status === "partial").length,
        duplicatesRemoved,
      }

      return NextResponse.json({
        success: true,
        contacts: uniqueContacts,
        summary,
        fileName: file.name,
        fileSize: file.size,
        processedAt: new Date().toISOString(),
      })
    } catch (parseError) {
      console.error("File parsing error:", parseError)
      return NextResponse.json(
        {
          error: "Failed to parse file. Please ensure it's a valid CSV or Excel file with proper formatting.",
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      {
        error: "Failed to process file upload",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// Get upload template
export async function GET() {
  try {
    // Create sample CSV template
    const template = `Name,Email,WhatsApp,Phone,Company,Location,Tags
John Doe,john@example.com,+1234567890,+1234567890,Acme Corp,New York,VIP
Jane Smith,jane@example.com,+1234567891,+1234567891,Tech Inc,California,Customer
Bob Johnson,bob@example.com,+1234567892,+1234567892,StartupXYZ,Texas,Lead`

    return new Response(template, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="contacts_template.csv"',
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate template" }, { status: 500 })
  }
}
