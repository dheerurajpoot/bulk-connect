"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Mail, Send, Users, BarChart3 } from "lucide-react"

export function InteractiveDemo() {
  const [demoStep, setDemoStep] = useState(1)
  const [demoData, setDemoData] = useState({
    contacts: 0,
    message: "",
    type: "whatsapp",
  })

  const handleDemo = () => {
    if (demoStep < 3) {
      setDemoStep(demoStep + 1)
      if (demoStep === 1) {
        setDemoData((prev) => ({ ...prev, contacts: 1250 }))
      }
    } else {
      setDemoStep(1)
      setDemoData({ contacts: 0, message: "", type: "whatsapp" })
    }
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Try It Yourself</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the power of BulkConnect with our interactive demo. See how easy it is to create and send
            campaigns.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Demo Interface */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Send className="w-5 h-5 mr-2" />
                  Create Campaign Demo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Step 1: Choose Type */}
                <div className={`transition-opacity ${demoStep >= 1 ? "opacity-100" : "opacity-50"}`}>
                  <label className="block text-sm font-medium mb-2">Campaign Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={demoData.type === "whatsapp" ? "default" : "outline"}
                      onClick={() => setDemoData((prev) => ({ ...prev, type: "whatsapp" }))}
                      className="justify-start"
                      disabled={demoStep !== 1}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      WhatsApp
                    </Button>
                    <Button
                      variant={demoData.type === "email" ? "default" : "outline"}
                      onClick={() => setDemoData((prev) => ({ ...prev, type: "email" }))}
                      className="justify-start"
                      disabled={demoStep !== 1}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </div>

                {/* Step 2: Upload Contacts */}
                <div className={`transition-opacity ${demoStep >= 2 ? "opacity-100" : "opacity-50"}`}>
                  <label className="block text-sm font-medium mb-2">Contact List</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    {demoStep >= 2 ? (
                      <div className="flex items-center justify-center">
                        <Users className="w-5 h-5 mr-2 text-green-600" />
                        <span className="text-green-600 font-medium">
                          {demoData.contacts.toLocaleString()} contacts uploaded
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-500">Upload your contact list</span>
                    )}
                  </div>
                </div>

                {/* Step 3: Write Message */}
                <div className={`transition-opacity ${demoStep >= 3 ? "opacity-100" : "opacity-50"}`}>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea
                    placeholder={`Type your ${demoData.type} message here...`}
                    value={demoData.message}
                    onChange={(e) => setDemoData((prev) => ({ ...prev, message: e.target.value }))}
                    disabled={demoStep !== 3}
                    className="min-h-[100px]"
                  />
                </div>

                <Button
                  onClick={handleDemo}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  {demoStep === 1 ? "Upload Contacts" : demoStep === 2 ? "Write Message" : "Send Campaign"}
                </Button>
              </CardContent>
            </Card>

            {/* Demo Results */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Campaign Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                {demoStep === 1 && (
                  <div className="text-center py-8">
                    <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Start the demo to see results</p>
                  </div>
                )}

                {demoStep === 2 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Contacts Loaded:</span>
                      <Badge className="bg-green-100 text-green-800">{demoData.contacts.toLocaleString()}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Valid Contacts:</span>
                      <Badge className="bg-blue-100 text-blue-800">
                        {Math.floor(demoData.contacts * 0.95).toLocaleString()}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Estimated Cost:</span>
                      <Badge className="bg-purple-100 text-purple-800">
                        ${(demoData.contacts * (demoData.type === "whatsapp" ? 0.05 : 0.01)).toFixed(2)}
                      </Badge>
                    </div>
                  </div>
                )}

                {demoStep === 3 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {Math.floor(demoData.contacts * 0.94).toLocaleString()}
                        </div>
                        <div className="text-sm text-green-700">Delivered</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">94.2%</div>
                        <div className="text-sm text-blue-700">Success Rate</div>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">Campaign Summary</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Messages sent in under 5 minutes</li>
                        <li>• Real-time delivery tracking</li>
                        <li>• Detailed analytics available</li>
                        <li>
                          • Cost: ${(demoData.contacts * (demoData.type === "whatsapp" ? 0.05 : 0.01)).toFixed(2)}
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
