import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Users, Award, Globe } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
	return (
		<div className='min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100'>
			<div className='container mx-auto px-4 py-16'>
				{/* Hero Section */}
				<div className='text-center mb-16'>
					<h1 className='text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent'>
						About BulkConnect
					</h1>
					<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
						We&apos;re revolutionizing how businesses communicate
						with their customers through powerful, easy-to-use bulk
						messaging solutions for WhatsApp and Email marketing.
					</p>
				</div>

				{/* Mission Section */}
				<div className='mb-16'>
					<Card className='border-0 shadow-lg bg-white/80 backdrop-blur-sm'>
						<CardContent className='p-12'>
							<div className='text-center'>
								<h2 className='text-3xl font-bold text-gray-800 mb-6'>
									Our Mission
								</h2>
								<p className='text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed'>
									To empower businesses of all sizes with the
									tools they need to reach their customers
									effectively, build meaningful relationships,
									and drive growth through personalized,
									targeted messaging campaigns. We believe
									that every business deserves access to
									enterprise-level marketing tools without the
									complexity.
								</p>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Stats Section */}
				<div className='grid md:grid-cols-4 gap-6 mb-16'>
					<Card className='border-0 shadow-lg bg-white/80 backdrop-blur-sm text-center'>
						<CardContent className='p-6'>
							<div className='w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4'>
								<Users className='w-6 h-6 text-white' />
							</div>
							<div className='text-3xl font-bold text-purple-600 mb-2'>
								50K+
							</div>
							<div className='text-gray-600'>Active Users</div>
						</CardContent>
					</Card>

					<Card className='border-0 shadow-lg bg-white/80 backdrop-blur-sm text-center'>
						<CardContent className='p-6'>
							<div className='w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4'>
								<MessageSquare className='w-6 h-6 text-white' />
							</div>
							<div className='text-3xl font-bold text-green-600 mb-2'>
								100M+
							</div>
							<div className='text-gray-600'>Messages Sent</div>
						</CardContent>
					</Card>

					<Card className='border-0 shadow-lg bg-white/80 backdrop-blur-sm text-center'>
						<CardContent className='p-6'>
							<div className='w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4'>
								<Globe className='w-6 h-6 text-white' />
							</div>
							<div className='text-3xl font-bold text-blue-600 mb-2'>
								150+
							</div>
							<div className='text-gray-600'>Countries</div>
						</CardContent>
					</Card>

					<Card className='border-0 shadow-lg bg-white/80 backdrop-blur-sm text-center'>
						<CardContent className='p-6'>
							<div className='w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-4'>
								<Award className='w-6 h-6 text-white' />
							</div>
							<div className='text-3xl font-bold text-orange-600 mb-2'>
								99.9%
							</div>
							<div className='text-gray-600'>Uptime</div>
						</CardContent>
					</Card>
				</div>

				{/* Values Section */}
				<div className='mb-16'>
					<h2 className='text-3xl font-bold text-center text-gray-800 mb-12'>
						Our Values
					</h2>
					<div className='grid md:grid-cols-3 gap-8'>
						<Card className='border-0 shadow-lg bg-white/80 backdrop-blur-sm'>
							<CardHeader>
								<CardTitle className='text-xl'>
									Simplicity
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='text-gray-600'>
									We believe powerful tools should be easy to
									use. Our platform is designed with
									simplicity in mind, making bulk messaging
									accessible to everyone.
								</p>
							</CardContent>
						</Card>

						<Card className='border-0 shadow-lg bg-white/80 backdrop-blur-sm'>
							<CardHeader>
								<CardTitle className='text-xl'>
									Reliability
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='text-gray-600'>
									Your campaigns matter to your business. We
									ensure 99.9% uptime and reliable message
									delivery so you can focus on growing your
									business.
								</p>
							</CardContent>
						</Card>

						<Card className='border-0 shadow-lg bg-white/80 backdrop-blur-sm'>
							<CardHeader>
								<CardTitle className='text-xl'>
									Innovation
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='text-gray-600'>
									We continuously evolve our platform with the
									latest technologies and features to stay
									ahead of the curve in digital marketing.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Team Section */}
				<div className='mb-16'>
					<h2 className='text-3xl font-bold text-center text-gray-800 mb-12'>
						Our Story
					</h2>
					<Card className='border-0 shadow-lg bg-white/80 backdrop-blur-sm'>
						<CardContent className='p-12'>
							<div className='max-w-4xl mx-auto'>
								<p className='text-lg text-gray-600 leading-relaxed mb-6'>
									Founded in 2024, BulkConnect was born from
									the frustration of small business owners who
									struggled to reach their customers
									effectively. Traditional marketing channels
									were expensive and complex, while newer
									platforms like WhatsApp lacked proper
									business tools.
								</p>
								<p className='text-lg text-gray-600 leading-relaxed mb-6'>
									Our founders, experienced entrepreneurs and
									technologists, set out to create a platform
									that would democratize access to powerful
									marketing tools. Today, we serve over 50,000
									businesses worldwide, from local shops to
									enterprise companies.
								</p>
								<p className='text-lg text-gray-600 leading-relaxed'>
									We&apos;re proud to be at the forefront of
									the messaging revolution, helping businesses
									build stronger relationships with their
									customers through personalized, timely
									communication.
								</p>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* CTA Section */}
				<div className='text-center'>
					<Card className='border-0 shadow-lg bg-gradient-to-r from-purple-600 to-blue-600'>
						<CardContent className='p-12'>
							<h2 className='text-3xl font-bold text-white mb-4'>
								Ready to Transform Your Marketing?
							</h2>
							<p className='text-xl text-purple-100 mb-8 max-w-2xl mx-auto'>
								Join thousands of businesses already using
								BulkConnect to reach their customers
								effectively.
							</p>
							<Button
								size='lg'
								className='bg-white text-purple-600 hover:bg-gray-100'
								asChild>
								<Link href='/dashboard'>
									Start Your Free Trial
								</Link>
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
