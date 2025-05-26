"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { MessageSquare, Mail, Phone, MapPin, Clock } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle form submission
		console.log("Form submitted:", formData);
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100'>
			<div className='container mx-auto px-4 py-16'>
				{/* Hero Section */}
				<div className='text-center mb-16'>
					<h1 className='text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent'>
						Get in Touch
					</h1>
					<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
						Have questions about BulkConnect? We&apos;re here to
						help! Reach out to our team and we&apos;ll get back to
						you as soon as possible.
					</p>
				</div>

				<div className='grid lg:grid-cols-3 gap-8'>
					{/* Contact Form */}
					<div className='lg:col-span-2'>
						<Card className='border-0 shadow-lg bg-white/80 backdrop-blur-sm'>
							<CardHeader>
								<CardTitle>Send us a Message</CardTitle>
								<CardDescription>
									Fill out the form below and we'll respond
									within 24 hours
								</CardDescription>
							</CardHeader>
							<CardContent>
								<form
									onSubmit={handleSubmit}
									className='space-y-6'>
									<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
										<div className='space-y-2'>
											<Label htmlFor='name'>
												Full Name
											</Label>
											<Input
												id='name'
												value={formData.name}
												onChange={(e) =>
													setFormData({
														...formData,
														name: e.target.value,
													})
												}
												placeholder='Enter your full name'
												required
											/>
										</div>
										<div className='space-y-2'>
											<Label htmlFor='email'>
												Email Address
											</Label>
											<Input
												id='email'
												type='email'
												value={formData.email}
												onChange={(e) =>
													setFormData({
														...formData,
														email: e.target.value,
													})
												}
												placeholder='Enter your email'
												required
											/>
										</div>
									</div>

									<div className='space-y-2'>
										<Label htmlFor='subject'>Subject</Label>
										<Select
											onValueChange={(value) =>
												setFormData({
													...formData,
													subject: value,
												})
											}>
											<SelectTrigger>
												<SelectValue placeholder='Select a subject' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='general'>
													General Inquiry
												</SelectItem>
												<SelectItem value='support'>
													Technical Support
												</SelectItem>
												<SelectItem value='billing'>
													Billing Question
												</SelectItem>
												<SelectItem value='partnership'>
													Partnership
												</SelectItem>
												<SelectItem value='feature'>
													Feature Request
												</SelectItem>
											</SelectContent>
										</Select>
									</div>

									<div className='space-y-2'>
										<Label htmlFor='message'>Message</Label>
										<Textarea
											id='message'
											value={formData.message}
											onChange={(e) =>
												setFormData({
													...formData,
													message: e.target.value,
												})
											}
											placeholder='Tell us how we can help you...'
											className='min-h-[120px]'
											required
										/>
									</div>

									<Button
										type='submit'
										className='w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'>
										Send Message
									</Button>
								</form>
							</CardContent>
						</Card>
					</div>

					{/* Contact Information */}
					<div className='space-y-6'>
						<Card className='border-0 shadow-lg bg-white/80 backdrop-blur-sm'>
							<CardHeader>
								<CardTitle>Contact Information</CardTitle>
							</CardHeader>
							<CardContent className='space-y-6'>
								<div className='flex items-start space-x-3'>
									<div className='w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center'>
										<Mail className='w-5 h-5 text-white' />
									</div>
									<div>
										<h4 className='font-medium'>Email</h4>
										<p className='text-gray-600'>
											support@bulkconnect.com
										</p>
										<p className='text-gray-600'>
											sales@bulkconnect.com
										</p>
									</div>
								</div>

								<div className='flex items-start space-x-3'>
									<div className='w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center'>
										<Phone className='w-5 h-5 text-white' />
									</div>
									<div>
										<h4 className='font-medium'>Phone</h4>
										<p className='text-gray-600'>
											+1 (555) 123-4567
										</p>
										<p className='text-gray-600'>
											+1 (555) 987-6543
										</p>
									</div>
								</div>

								<div className='flex items-start space-x-3'>
									<div className='w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center'>
										<MapPin className='w-5 h-5 text-white' />
									</div>
									<div>
										<h4 className='font-medium'>Address</h4>
										<p className='text-gray-600'>
											123 Business Street
										</p>
										<p className='text-gray-600'>
											San Francisco, CA 94105
										</p>
									</div>
								</div>

								<div className='flex items-start space-x-3'>
									<div className='w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center'>
										<Clock className='w-5 h-5 text-white' />
									</div>
									<div>
										<h4 className='font-medium'>
											Business Hours
										</h4>
										<p className='text-gray-600'>
											Monday - Friday: 9:00 AM - 6:00 PM
											PST
										</p>
										<p className='text-gray-600'>
											Saturday: 10:00 AM - 4:00 PM PST
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card className='border-0 shadow-lg bg-white/80 backdrop-blur-sm'>
							<CardHeader>
								<CardTitle>Quick Support</CardTitle>
							</CardHeader>
							<CardContent className='space-y-4'>
								<p className='text-gray-600 text-sm'>
									Need immediate help? Check out our
									resources:
								</p>
								<div className='space-y-2'>
									<Button
										variant='outline'
										className='w-full justify-start'>
										📚 Documentation
									</Button>
									<Button
										variant='outline'
										className='w-full justify-start'>
										💬 Live Chat
									</Button>
									<Button
										variant='outline'
										className='w-full justify-start'>
										🎥 Video Tutorials
									</Button>
									<Button
										variant='outline'
										className='w-full justify-start'>
										❓ FAQ
									</Button>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
