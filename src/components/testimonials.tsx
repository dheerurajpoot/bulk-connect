"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"

export function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechStart Inc.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      content:
        "BulkConnect transformed our customer engagement. We saw a 300% increase in response rates with WhatsApp campaigns compared to traditional email marketing.",
    },
    {
      name: "Michael Chen",
      role: "E-commerce Owner",
      company: "Fashion Forward",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      content:
        "The platform is incredibly user-friendly. I can upload my customer list and send personalized messages to thousands of customers in minutes. Game changer!",
    },
    {
      name: "Emily Rodriguez",
      role: "Small Business Owner",
      company: "Local Bakery",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      content:
        "As a small business, I needed something affordable yet powerful. BulkConnect gave me enterprise-level features at a fraction of the cost.",
    },
    {
      name: "David Kim",
      role: "Digital Marketing Manager",
      company: "Growth Agency",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      content:
        "The analytics are phenomenal. I can track every message, see real-time delivery rates, and optimize campaigns on the fly. ROI has never been better.",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-blue-600">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Trusted by Thousands of Businesses</h2>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            See what our customers are saying about their success with BulkConnect.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <Quote className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                  "{testimonials[currentTestimonial].content}"
                </p>

                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <div className="flex items-center justify-center">
                  <Avatar className="w-12 h-12 mr-4">
                    <AvatarImage src={testimonials[currentTestimonial].avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {testimonials[currentTestimonial].name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <div className="font-semibold text-gray-800">{testimonials[currentTestimonial].name}</div>
                    <div className="text-sm text-gray-600">
                      {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial ? "bg-purple-600" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
