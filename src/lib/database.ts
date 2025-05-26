// Real data storage (replace with actual database in production)

export interface Contact {
  id: string
  name: string
  email: string
  whatsapp?: string
  phone?: string
  company?: string
  location?: string
  tags?: string[]
  status: "active" | "inactive" | "blocked"
  createdAt: string
  userId: string
}

export interface Campaign {
  id: string
  name: string
  type: "whatsapp" | "email"
  status: "draft" | "scheduled" | "sending" | "completed" | "failed"
  subject?: string
  message: string
  contactIds: string[]
  scheduledAt?: string
  sentAt?: string
  totalSent: number
  totalDelivered: number
  totalFailed: number
  createdAt: string
  userId: string
  results?: MessageResult[]
}

export interface MessageResult {
  contactId: string
  status: "delivered" | "failed" | "pending"
  timestamp: string
  messageId?: string
  error?: string
}

// In-memory storage (replace with database)
const contacts: Contact[] = []
const campaigns: Campaign[] = []

// Contact operations
export function createContact(contactData: Omit<Contact, "id" | "createdAt">): Contact {
  const contact: Contact = {
    id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
    ...contactData,
  }
  contacts.push(contact)
  return contact
}

export function getContactsByUserId(userId: string): Contact[] {
  return contacts.filter((contact) => contact.userId === userId)
}

export function updateContact(id: string, updates: Partial<Contact>): Contact | null {
  const contactIndex = contacts.findIndex((contact) => contact.id === id)
  if (contactIndex === -1) return null

  contacts[contactIndex] = { ...contacts[contactIndex], ...updates }
  return contacts[contactIndex]
}

export function deleteContact(id: string): boolean {
  const contactIndex = contacts.findIndex((contact) => contact.id === id)
  if (contactIndex === -1) return false

  contacts.splice(contactIndex, 1)
  return true
}

// Campaign operations
export function createCampaign(campaignData: Omit<Campaign, "id" | "createdAt">): Campaign {
  const campaign: Campaign = {
    id: `campaign_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
    ...campaignData,
  }
  campaigns.push(campaign)
  return campaign
}

export function getCampaignsByUserId(userId: string): Campaign[] {
  return campaigns.filter((campaign) => campaign.userId === userId)
}

export function updateCampaign(id: string, updates: Partial<Campaign>): Campaign | null {
  const campaignIndex = campaigns.findIndex((campaign) => campaign.id === id)
  if (campaignIndex === -1) return null

  campaigns[campaignIndex] = { ...campaigns[campaignIndex], ...updates }
  return campaigns[campaignIndex]
}

export function getCampaignById(id: string): Campaign | null {
  return campaigns.find((campaign) => campaign.id === id) || null
}
