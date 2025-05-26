import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, X, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: 29,
      description: "Perfect for small businesses getting started",
      features: [
        "1,000 WhatsApp messages/month",
        "5,000 emails/month",
        "Up to 1,000 contacts",
        "Basic analytics",
        "Email support",
        "CSV upload",
      ],
      notIncluded: ["Advanced automation", "API access", "Priority support", "Custom integrations"],
      popular: false,
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Professional",
      price: 79,
      description: "Ideal for growing businesses",
      features: [
        "5,000 WhatsApp messages/month",
        "25,000 emails/month",
        "Up to 10,000 contacts",
        "Advanced analytics",
        "Priority support",
        "Automation workflows",
        "A/B testing",
        "Custom templates",
      ],
      notIncluded: ["API access", "Custom integrations", "Dedicated manager"],
      popular: true,
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Enterprise",
      price: 199,
      description: "For large organizations with advanced needs",
      features: [
        "25,000 WhatsApp messages/month",
        "100,000 emails/month",
        "Unlimited contacts",
        "Advanced analytics & reporting",
        "24/7 phone support",
        "Advanced automation",
        "API access",
        "Custom integrations",
        "Dedicated account manager",
        "White-label options",
      ],
      notIncluded: [],
      popular: false,
      color: "from-orange-500 to-red-500",
    },
  ]

  const features = [
    { name: "WhatsApp Messages", starter: "1,000", professional: "5,000", enterprise: "25,000" },
    { name: "Email Messages", starter: "5,000", professional: "25,000", enterprise: "100,000" },
    { name: "Contacts", starter: "1,000", professional: "10,000", enterprise: "Unlimited" },
    { name: "Analytics", starter: "Basic", professional: "Advanced", enterprise: "Advanced + Custom" },
    { name: "Support", starter: "Email", professional: "Priority", enterprise: "24/7 Phone" },
    { name: "Automation", starter: false, professional: true, enterprise: true },
    { name: "API Access", starter: false, professional: false, enterprise: true },
    { name: "Custom Integrations", starter: false, professional: false, enterprise: true },
  ]

  const faqs = [
    {
      question: "Can I change my plan anytime?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
    },
    {
      question: "What happens if I exceed my message limit?",
      answer:
        "You'll be charged overage fees: $0.05 per WhatsApp message and $0.01 per email. We'll notify you before you reach your limit.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "Yes, we offer a 14-day free trial with full access to Professional plan features. No credit card required.",
    },
    {
      question: "Do you offer custom enterprise plans?",
      answer:
        "Yes, we can create custom plans for large organizations with specific needs. Contact our sales team for details.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers for enterprise customers.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your business. Start with our free trial and scale as you grow.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`border-0 shadow-lg hover:shadow-xl transition-shadow bg-white/80 backdrop-blur-sm relative ${plan.popular ? "ring-2 ring-purple-500" : ""}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center">
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${plan.color} rounded-lg flex items-center justify-center mx-auto mb-4`}
                >
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2 opacity-50">
                      <X className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${plan.popular ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                  asChild
                >
                  <Link href="/signup">{plan.name === "Enterprise" ? "Contact Sales" : "Start Free Trial"}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Compare Plans</h2>
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-semibold">Features</th>
                    <th className="text-center p-4 font-semibold">Starter</th>
                    <th className="text-center p-4 font-semibold">Professional</th>
                    <th className="text-center p-4 font-semibold">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-4 font-medium">{feature.name}</td>
                      <td className="p-4 text-center">
                        {typeof feature.starter === "boolean" ? (
                          feature.starter ? (
                            <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-gray-400 mx-auto" />
                          )
                        ) : (
                          feature.starter
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {typeof feature.professional === "boolean" ? (
                          feature.professional ? (
                            <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-gray-400 mx-auto" />
                          )
                        ) : (
                          feature.professional
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {typeof feature.enterprise === "boolean" ? (
                          feature.enterprise ? (
                            <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-gray-400 mx-auto" />
                          )
                        ) : (
                          feature.enterprise
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-600 to-blue-600">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                Start your 14-day free trial today. No credit card required.
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
