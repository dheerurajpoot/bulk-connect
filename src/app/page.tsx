import { HeroSection } from "@/components/hero-section";
import { FeaturesShowcase } from "@/components/features-showcase";
import { Testimonials } from "@/components/testimonials";
import { InteractiveDemo } from "@/components/interactive-demo";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
	const pricingPlans = [
		{
			name: "Starter",
			price: 29,
			description: "Perfect for small businesses",
			features: [
				"1,000 WhatsApp messages",
				"5,000 emails",
				"Basic analytics",
				"Email support",
			],
			popular: false,
		},
		{
			name: "Professional",
			price: 79,
			description: "Ideal for growing businesses",
			features: [
				"5,000 WhatsApp messages",
				"25,000 emails",
				"Advanced analytics",
				"Priority support",
			],
			popular: true,
		},
		{
			name: "Enterprise",
			price: 199,
			description: "For large organizations",
			features: [
				"25,000 WhatsApp messages",
				"100,000 emails",
				"Custom integrations",
				"24/7 support",
			],
			popular: false,
		},
	];

	return (
		<div className='min-h-screen'>
			{/* Hero Section */}
			<HeroSection />

			{/* Features Showcase */}
			<FeaturesShowcase />

			{/* Interactive Demo */}
			<InteractiveDemo />

			{/* Testimonials */}
			<Testimonials />

			{/* Pricing Section */}
			<section className='py-16 px-4'>
				<div className='container mx-auto'>
					<div className='text-center mb-12'>
						<h2 className='text-3xl md:text-4xl font-bold mb-4 text-gray-800'>
							Simple, Transparent Pricing
						</h2>
						<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
							Choose the perfect plan for your business. Start
							with our free trial and scale as you grow.
						</p>
					</div>

					<div className='grid md:grid-cols-3 gap-8 max-w-5xl mx-auto'>
						{pricingPlans.map((plan, index) => (
							<Card
								key={index}
								className={`border-0 shadow-lg hover:shadow-xl transition-shadow bg-white/80 backdrop-blur-sm relative ${
									plan.popular
										? "ring-2 ring-purple-500 scale-105"
										: ""
								}`}>
								{plan.popular && (
									<Badge className='absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600'>
										Most Popular
									</Badge>
								)}
								<CardHeader className='text-center'>
									<CardTitle className='text-2xl'>
										{plan.name}
									</CardTitle>
									<CardDescription>
										{plan.description}
									</CardDescription>
									<div className='mt-4'>
										<span className='text-4xl font-bold'>
											${plan.price}
										</span>
										<span className='text-gray-600'>
											/month
										</span>
									</div>
								</CardHeader>
								<CardContent className='space-y-4'>
									<ul className='space-y-3'>
										{plan.features.map((feature, idx) => (
											<li
												key={idx}
												className='flex items-center'>
												<CheckCircle className='w-4 h-4 text-green-500 mr-3 flex-shrink-0' />
												<span className='text-sm'>
													{feature}
												</span>
											</li>
										))}
									</ul>
									<Button
										className={`w-full ${
											plan.popular
												? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
												: ""
										}`}
										variant={
											plan.popular ? "default" : "outline"
										}
										asChild>
										<Link href='/signup'>
											Start Free Trial
										</Link>
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className='py-16 px-4 bg-gray-50'>
				<div className='container mx-auto'>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
						<div>
							<div className='text-4xl font-bold text-purple-600 mb-2'>
								100M+
							</div>
							<div className='text-gray-600'>Messages Sent</div>
						</div>
						<div>
							<div className='text-4xl font-bold text-blue-600 mb-2'>
								50K+
							</div>
							<div className='text-gray-600'>Active Users</div>
						</div>
						<div>
							<div className='text-4xl font-bold text-green-600 mb-2'>
								150+
							</div>
							<div className='text-gray-600'>Countries</div>
						</div>
						<div>
							<div className='text-4xl font-bold text-orange-600 mb-2'>
								99.9%
							</div>
							<div className='text-gray-600'>Uptime</div>
						</div>
					</div>
				</div>
			</section>

			{/* Final CTA */}
			<section className='py-16 px-4 bg-gradient-to-r from-purple-600 to-blue-600'>
				<div className='container mx-auto text-center'>
					<h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
						Ready to Transform Your Marketing?
					</h2>
					<p className='text-xl text-purple-100 mb-8 max-w-2xl mx-auto'>
						Join thousands of businesses already using BulkConnect
						to reach their customers effectively.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<Button
							size='lg'
							className='bg-white text-purple-600 hover:bg-gray-100'
							asChild>
							<Link href='/signup'>
								Start Your Free Trial
								<ArrowRight className='ml-2 h-5 w-5' />
							</Link>
						</Button>
						<Button
							size='lg'
							variant='outline'
							className='border-white text-white hover:bg-white hover:text-purple-600'
							asChild>
							<Link href='/contact'>Contact Sales</Link>
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
