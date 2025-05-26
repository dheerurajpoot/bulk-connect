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
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
	MessageSquare,
	AlertCircle,
	CheckCircle,
	ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		try {
			const response = await fetch("/api/auth/forgot-password", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});

			const data = await response.json();

			if (response.ok) {
				setSuccess(true);
			} else {
				setError(data.error || "Failed to send reset email");
			}
		} catch (error) {
			setError("Network error. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	if (success) {
		return (
			<div className='min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4'>
				<Card className='border-0 shadow-xl bg-white/90 backdrop-blur-sm max-w-md w-full'>
					<CardContent className='text-center p-8'>
						<CheckCircle className='w-16 h-16 text-green-500 mx-auto mb-4' />
						<h2 className='text-2xl font-bold text-gray-800 mb-2'>
							Check Your Email
						</h2>
						<p className='text-gray-600 mb-6'>
							We&apos;ve sent a password reset link to{" "}
							<strong>{email}</strong>
						</p>
						<p className='text-sm text-gray-500 mb-6'>
							Didn&apos;t receive the email? Check your spam
							folder or try again.
						</p>
						<div className='space-y-3'>
							<Button
								onClick={() => setSuccess(false)}
								variant='outline'
								className='w-full'>
								Try Different Email
							</Button>
							<Link href='/login'>
								<Button className='w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'>
									Back to Login
								</Button>
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4'>
			<div className='w-full max-w-md'>
				{/* Logo */}
				<div className='text-center mb-8'>
					<Link
						href='/'
						className='inline-flex items-center space-x-2'>
						<div className='w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center'>
							<MessageSquare className='w-6 h-6 text-white' />
						</div>
						<span className='text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent'>
							BulkConnect
						</span>
					</Link>
				</div>

				<Card className='border-0 shadow-xl bg-white/90 backdrop-blur-sm'>
					<CardHeader className='text-center'>
						<CardTitle className='text-2xl'>
							Reset Password
						</CardTitle>
						<CardDescription>
							Enter your email address and we'll send you a link
							to reset your password
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className='space-y-4'>
							{error && (
								<Alert variant='destructive'>
									<AlertCircle className='h-4 w-4' />
									<AlertDescription>{error}</AlertDescription>
								</Alert>
							)}

							<div className='space-y-2'>
								<Label htmlFor='email'>Email Address</Label>
								<Input
									id='email'
									type='email'
									placeholder='Enter your email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>

							<Button
								type='submit'
								className='w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
								disabled={isLoading}>
								{isLoading ? "Sending..." : "Send Reset Link"}
							</Button>
						</form>

						<div className='mt-6 text-center'>
							<Link
								href='/login'
								className='inline-flex items-center text-sm text-purple-600 hover:text-purple-700 hover:underline'>
								<ArrowLeft className='w-4 h-4 mr-1' />
								Back to Login
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
