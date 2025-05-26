import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MessageSquare,
  Mail,
  Upload,
  BarChart3,
  Users,
  Zap,
  Shield,
  Clock,
  Globe,
  Smartphone,
  FileText,
  Target,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

export default function FeaturesPage() {
  const features = [
    {
      icon: MessageSquare,
      title: "WhatsApp Marketing",
      description: "Send bulk WhatsApp messages with high delivery rates and instant engagement.",
      features: ["Bulk messaging", "Media support", "Message templates", "Auto-replies"],
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Mail,
      title: "Email Campaigns",
      description: "Create beautiful email campaigns with professional templates and tracking.",
      features: ["HTML templates", "A/B testing", "Automation", "Analytics"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Upload,
      title: "Easy File Upload",
      description: "Upload contact lists via CSV or Excel files with automatic validation.",
      features: ["CSV/Excel support", "Data validation", "Duplicate detection", "Error reporting"],
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Track campaign performance with detailed analytics and insights.",
      features: ["Real-time tracking", "Delivery reports", "Engagement metrics", "ROI analysis"],
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Users,
      title: "Contact Management",
      description: "Organize contacts into lists, segments, and groups for targeted campaigns.",
      features: ["Smart segmentation", "Custom fields", "Import/Export", "Merge contacts"],
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: Zap,
      title: "Automation",
      description: "Set up automated campaigns and drip sequences for maximum efficiency.",
      features: ["Drip campaigns", "Triggers", "Scheduling", "Workflows"],
      color: "from-yellow-500 to-orange-500",
    },
  ]

  const additionalFeatures = [
    { icon: Shield, title: "Enterprise Security", description: "Bank-level encryption and security" },
    { icon: Clock, title: "24/7 Support", description: "Round-the-clock customer support" },
    { icon: Globe, title: "Global Reach", description: "Send messages worldwide" },
    { icon: Smartphone, title: "Mobile App", description: "Manage campaigns on the go" },
    { icon: FileText, title: "Templates", description: "Pre-built message templates" },
    { icon: Target, title: "Targeting", description: "Advanced audience targeting" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Powerful Features for Modern Marketing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to create, send, and track successful bulk messaging campaigns across WhatsApp and
            Email.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white/80 backdrop-blur-sm"
            >
              <CardHeader>
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-gray-600">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.features.map((item, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Additional Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Feature Comparison */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">WhatsApp vs Email Marketing</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <CardTitle>WhatsApp Marketing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Open Rate</span>
                  <Badge className="bg-green-100 text-green-800">98%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Response Rate</span>
                  <Badge className="bg-green-100 text-green-800">45%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Delivery Speed</span>
                  <Badge className="bg-green-100 text-green-800">Instant</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Best For</span>
                  <span className="text-sm text-gray-600">Personal, Urgent</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Email Marketing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Open Rate</span>
                  <Badge className="bg-blue-100 text-blue-800">22%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Click Rate</span>
                  <Badge className="bg-blue-100 text-blue-800">3.5%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Delivery Speed</span>
                  <Badge className="bg-blue-100 text-blue-800">Minutes</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Best For</span>
                  <span className="text-sm text-gray-600">Newsletters, Formal</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-600 to-blue-600">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                Join thousands of businesses using BulkConnect to reach their customers effectively.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100" asChild>
                  <Link href="/signup">Start Free Trial</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-600"
                  asChild
                >
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
