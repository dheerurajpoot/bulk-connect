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
import { MessageSquare, Eye, EyeOff, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		try {
			const response = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (response.ok) {
				// Set cookie and redirect
				document.cookie = `auth-token=${data.token}; path=/; max-age=${
					7 * 24 * 60 * 60
				}`;
				router.push("/dashboard");
			} else {
				setError(data.error || "Login failed");
			}
		} catch (error) {
			setError("Network error. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

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
						<CardTitle className='text-2xl'>Welcome Back</CardTitle>
						<CardDescription>
							Sign in to your BulkConnect account
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
								<Label htmlFor='email'>Email</Label>
								<Input
									id='email'
									type='email'
									placeholder='Enter your email'
									value={formData.email}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											email: e.target.value,
										}))
									}
									required
								/>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='password'>Password</Label>
								<div className='relative'>
									<Input
										id='password'
										type={
											showPassword ? "text" : "password"
										}
										placeholder='Enter your password'
										value={formData.password}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												password: e.target.value,
											}))
										}
										required
									/>
									<Button
										type='button'
										variant='ghost'
										size='sm'
										className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
										onClick={() =>
											setShowPassword(!showPassword)
										}>
										{showPassword ? (
											<EyeOff className='h-4 w-4 text-gray-400' />
										) : (
											<Eye className='h-4 w-4 text-gray-400' />
										)}
									</Button>
								</div>
							</div>

							<div className='flex items-center justify-between'>
								<Link
									href='/forgot-password'
									className='text-sm text-purple-600 hover:text-purple-700 hover:underline'>
									Forgot password?
								</Link>
							</div>

							<Button
								type='submit'
								className='w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
								disabled={isLoading}>
								{isLoading ? "Signing in..." : "Sign In"}
							</Button>
						</form>

						<div className='mt-6 text-center'>
							<p className='text-sm text-gray-600'>
								Don&apos;t have an account?{" "}
								<Link
									href='/signup'
									className='text-purple-600 hover:text-purple-700 font-medium hover:underline'>
									Sign up
								</Link>
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
