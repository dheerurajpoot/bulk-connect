"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Mail, BarChart3, CheckCircle } from "lucide-react"

export function FeaturesShowcase() {
  const [activeFeature, setActiveFeature] = useState("whatsapp")

  const features = {
    whatsapp: {
      icon: MessageSquare,
      title: "WhatsApp Marketing",
      description: "Send bulk WhatsApp messages with high delivery rates",
      stats: { openRate: "98%", responseRate: "45%", deliverySpeed: "Instant" },
      benefits: [
        "Direct personal communication",
        "Rich media support (images, videos, documents)",
        "Real-time delivery confirmations",
        "High engagement rates",
        "Global reach",
      ],
    },
    email: {
      icon: Mail,
      title: "Email Campaigns",
      description: "Create beautiful email campaigns with professional templates",
      stats: { openRate: "22%", clickRate: "3.5%", deliverySpeed: "Minutes" },
      benefits: [
        "Professional HTML templates",
        "A/B testing capabilities",
        "Advanced segmentation",
        "Detailed analytics",
        "Automation workflows",
      ],
    },
    analytics: {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Track campaign performance with detailed insights",
      stats: { accuracy: "99.9%", realTime: "Live", reports: "50+" },
      benefits: ["Real-time tracking", "Delivery reports", "Engagement metrics", "ROI analysis", "Custom dashboards"],
    },
  }

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Everything You Need for Successful Campaigns
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful features designed to help you reach your audience effectively and grow your business.
          </p>
        </div>

        <Tabs value={activeFeature} onValueChange={setActiveFeature} className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
            <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {Object.entries(features).map(([key, feature]) => (
            <TabsContent key={key} value={key}>
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {Object.entries(feature.stats).map(([statKey, value]) => (
                      <div key={statKey} className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{value}</div>
                        <div className="text-sm text-gray-600 capitalize">{statKey.replace(/([A-Z])/g, " $1")}</div>
                      </div>
                    ))}
                  </div>

                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative">
                  <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <feature.icon className="w-5 h-5 mr-2" />
                        Live Demo
                      </CardTitle>
                      <CardDescription>See {feature.title} in action</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Campaign Status</span>
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
                          </div>
                          <div className="text-2xl font-bold text-purple-600">2,450 sent</div>
                          <div className="text-sm text-gray-600">in the last 24 hours</div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-blue-50 rounded-lg text-center">
                            <div className="text-lg font-bold text-blue-600">94.2%</div>
                            <div className="text-xs text-blue-700">Delivery Rate</div>
                          </div>
                          <div className="p-3 bg-green-50 rounded-lg text-center">
                            <div className="text-lg font-bold text-green-600">68.5%</div>
                            <div className="text-xs text-green-700">Open Rate</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
