"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Mail, Users, Send, Clock } from "lucide-react"
import Link from "next/link"

export default function NewCampaignPage() {
  const [campaignType, setCampaignType] = useState("whatsapp")
  const [selectedContacts, setSelectedContacts] = useState(0)
  const [scheduleEnabled, setScheduleEnabled] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              BulkConnect
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/dashboard" className="text-gray-600 hover:text-purple-600 transition-colors">
              Dashboard
            </Link>
            <Link href="/dashboard/contacts" className="text-gray-600 hover:text-purple-600 transition-colors">
              Contacts
            </Link>
            <Link href="/dashboard/campaigns" className="text-purple-600 font-medium">
              Campaigns
            </Link>
            <Link href="/dashboard/analytics" className="text-gray-600 hover:text-purple-600 transition-colors">
              Analytics
            </Link>
          </nav>
          <Button variant="outline">Profile</Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create New Campaign</h1>
          <p className="text-gray-600">Design and send your marketing message to your audience</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Campaign Details</CardTitle>
                <CardDescription>Set up your campaign basic information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="campaign-name">Campaign Name</Label>
                  <Input id="campaign-name" placeholder="Enter campaign name" />
                </div>

                <div className="space-y-2">
                  <Label>Campaign Type</Label>
                  <Tabs value={campaignType} onValueChange={setCampaignType} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="whatsapp" className="flex items-center space-x-2">
                        <MessageSquare className="w-4 h-4" />
                        <span>WhatsApp</span>
                      </TabsTrigger>
                      <TabsTrigger value="email" className="flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>Email</span>
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value={campaignType} className="mt-0">
                      {campaignType === "whatsapp" ? (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="whatsapp-message">Message</Label>
                            <Textarea
                              id="whatsapp-message"
                              placeholder="Type your WhatsApp message here..."
                              className="min-h-[120px]"
                            />
                            <p className="text-sm text-gray-500">Use {"{name}"} to personalize with contact names</p>
                          </div>

                          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                            <h4 className="font-medium text-green-800 mb-2">Preview</h4>
                            <div className="bg-white p-3 rounded-lg shadow-sm">
                              <p className="text-sm">
                                Hi John, 🎉 Special offer just for you! Get 50% off on all products. Limited time only.
                                Shop now!
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="email-subject">Subject Line</Label>
                            <Input id="email-subject" placeholder="Enter email subject" />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email-content">Email Content</Label>
                            <Textarea
                              id="email-content"
                              placeholder="Compose your email message..."
                              className="min-h-[200px]"
                            />
                          </div>

                          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <h4 className="font-medium text-blue-800 mb-2">Email Preview</h4>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                              <div className="border-b pb-2 mb-3">
                                <p className="font-medium">Special Holiday Offer!</p>
                                <p className="text-sm text-gray-600">From: your-business@example.com</p>
                              </div>
                              <p className="text-sm">
                                Dear John, We're excited to share our exclusive holiday deals with you...
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-list">Select Contact List</Label>
                  <Select onValueChange={(value) => setSelectedContacts(Number.parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose contact list" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1250">All Contacts (1,250)</SelectItem>
                      <SelectItem value="450">VIP Customers (450)</SelectItem>
                      <SelectItem value="800">Newsletter Subscribers (800)</SelectItem>
                      <SelectItem value="300">Recent Purchases (300)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Message Content */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Message Content</CardTitle>
                <CardDescription>
                  {campaignType === "whatsapp" ? "Compose your WhatsApp message" : "Design your email content"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {campaignType === "whatsapp" ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp-message">Message</Label>
                      <Textarea
                        id="whatsapp-message"
                        placeholder="Type your WhatsApp message here..."
                        className="min-h-[120px]"
                      />
                      <p className="text-sm text-gray-500">Use {"{name}"} to personalize with contact names</p>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-medium text-green-800 mb-2">Preview</h4>
                      <div className="bg-white p-3 rounded-lg shadow-sm">
                        <p className="text-sm">
                          Hi John, 🎉 Special offer just for you! Get 50% off on all products. Limited time only. Shop
                          now!
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-subject">Subject Line</Label>
                      <Input id="email-subject" placeholder="Enter email subject" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email-content">Email Content</Label>
                      <Textarea
                        id="email-content"
                        placeholder="Compose your email message..."
                        className="min-h-[200px]"
                      />
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-800 mb-2">Email Preview</h4>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="border-b pb-2 mb-3">
                          <p className="font-medium">Special Holiday Offer!</p>
                          <p className="text-sm text-gray-600">From: your-business@example.com</p>
                        </div>
                        <p className="text-sm">
                          Dear John, We're excited to share our exclusive holiday deals with you...
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Scheduling */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Scheduling</CardTitle>
                <CardDescription>Choose when to send your campaign</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Switch id="schedule-toggle" checked={scheduleEnabled} onCheckedChange={setScheduleEnabled} />
                  <Label htmlFor="schedule-toggle">Schedule for later</Label>
                </div>

                {scheduleEnabled && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="schedule-date">Date</Label>
                      <Input id="schedule-date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="schedule-time">Time</Label>
                      <Input id="schedule-time" type="time" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Campaign Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Type:</span>
                  <Badge
                    className={
                      campaignType === "whatsapp" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                    }
                  >
                    {campaignType === "whatsapp" ? "WhatsApp" : "Email"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Recipients:</span>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="font-medium">{selectedContacts.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status:</span>
                  <Badge variant="outline">{scheduleEnabled ? "Scheduled" : "Ready to Send"}</Badge>
                </div>

                {scheduleEnabled && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Send Time:</span>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">Dec 25, 9:00 AM</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Estimated Cost</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      {campaignType === "whatsapp" ? "WhatsApp messages" : "Email sends"}:
                    </span>
                    <span className="font-medium">{selectedContacts.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Rate per message:</span>
                    <span className="font-medium">${campaignType === "whatsapp" ? "0.05" : "0.01"}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Total Cost:</span>
                      <span className="font-bold text-purple-600">
                        ${(selectedContacts * (campaignType === "whatsapp" ? 0.05 : 0.01)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Send className="w-4 h-4 mr-2" />
                {scheduleEnabled ? "Schedule Campaign" : "Send Now"}
              </Button>
              <Button variant="outline" className="w-full">
                Save as Draft
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
