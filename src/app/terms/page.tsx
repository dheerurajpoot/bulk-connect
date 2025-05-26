export default function TermsPage() {
	return (
		<div className='min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100'>
			<div className='container mx-auto px-4 py-16 max-w-4xl'>
				<div className='bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8'>
					<h1 className='text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent'>
						Terms of Service
					</h1>

					<div className='prose prose-lg max-w-none'>
						<p className='text-gray-600 mb-6'>
							<strong>Last updated:</strong> December 2024
						</p>

						<section className='mb-8'>
							<h2 className='text-2xl font-bold text-gray-800 mb-4'>
								1. Acceptance of Terms
							</h2>
							<p className='text-gray-600 leading-relaxed'>
								By accessing and using BulkConnect (&quot;the
								Service&quot;), you accept and agree to be bound
								by the terms and provision of this agreement. If
								you do not agree to abide by the above, please
								do not use this service.
							</p>
						</section>

						<section className='mb-8'>
							<h2 className='text-2xl font-bold text-gray-800 mb-4'>
								2. Description of Service
							</h2>
							<p className='text-gray-600 leading-relaxed mb-4'>
								BulkConnect provides bulk messaging services for
								WhatsApp and Email marketing. Our platform
								allows users to:
							</p>
							<ul className='list-disc list-inside text-gray-600 space-y-2'>
								<li>Upload and manage contact lists</li>
								<li>Send bulk WhatsApp messages</li>
								<li>Create and send email campaigns</li>
								<li>
									Track campaign analytics and performance
								</li>
								<li>Schedule automated messaging campaigns</li>
							</ul>
						</section>

						<section className='mb-8'>
							<h2 className='text-2xl font-bold text-gray-800 mb-4'>
								3. User Responsibilities
							</h2>
							<p className='text-gray-600 leading-relaxed mb-4'>
								As a user of BulkConnect, you agree to:
							</p>
							<ul className='list-disc list-inside text-gray-600 space-y-2'>
								<li>
									Comply with all applicable laws and
									regulations
								</li>
								<li>
									Obtain proper consent before sending
									messages to recipients
								</li>
								<li>
									Not use the service for spam, harassment, or
									illegal activities
								</li>
								<li>
									Respect WhatsApp's Terms of Service and
									anti-spam policies
								</li>
								<li>
									Maintain the security of your account
									credentials
								</li>
								<li>
									Not share your account with unauthorized
									users
								</li>
							</ul>
						</section>

						<section className='mb-8'>
							<h2 className='text-2xl font-bold text-gray-800 mb-4'>
								4. Prohibited Uses
							</h2>
							<p className='text-gray-600 leading-relaxed mb-4'>
								You may not use BulkConnect for:
							</p>
							<ul className='list-disc list-inside text-gray-600 space-y-2'>
								<li>Sending unsolicited messages (spam)</li>
								<li>
									Distributing malware, viruses, or harmful
									content
								</li>
								<li>
									Impersonating others or providing false
									information
								</li>
								<li>Violating intellectual property rights</li>
								<li>
									Engaging in fraudulent or deceptive
									practices
								</li>
								<li>
									Sending content that is illegal, harmful, or
									offensive
								</li>
							</ul>
						</section>

						<section className='mb-8'>
							<h2 className='text-2xl font-bold text-gray-800 mb-4'>
								5. Account Termination
							</h2>
							<p className='text-gray-600 leading-relaxed'>
								We reserve the right to terminate or suspend
								your account immediately, without prior notice
								or liability, for any reason whatsoever,
								including without limitation if you breach the
								Terms. Upon termination, your right to use the
								Service will cease immediately.
							</p>
						</section>

						<section className='mb-8'>
							<h2 className='text-2xl font-bold text-gray-800 mb-4'>
								6. Privacy and Data Protection
							</h2>
							<p className='text-gray-600 leading-relaxed'>
								Your privacy is important to us. Please review
								our Privacy Policy, which also governs your use
								of the Service, to understand our practices
								regarding the collection, use, and disclosure of
								your personal information.
							</p>
						</section>

						<section className='mb-8'>
							<h2 className='text-2xl font-bold text-gray-800 mb-4'>
								7. Limitation of Liability
							</h2>
							<p className='text-gray-600 leading-relaxed'>
								In no event shall BulkConnect, nor its
								directors, employees, partners, agents,
								suppliers, or affiliates, be liable for any
								indirect, incidental, special, consequential, or
								punitive damages, including without limitation,
								loss of profits, data, use, goodwill, or other
								intangible losses, resulting from your use of
								the Service.
							</p>
						</section>

						<section className='mb-8'>
							<h2 className='text-2xl font-bold text-gray-800 mb-4'>
								8. Changes to Terms
							</h2>
							<p className='text-gray-600 leading-relaxed'>
								We reserve the right, at our sole discretion, to
								modify or replace these Terms at any time. If a
								revision is material, we will try to provide at
								least 30 days notice prior to any new terms
								taking effect.
							</p>
						</section>

						<section className='mb-8'>
							<h2 className='text-2xl font-bold text-gray-800 mb-4'>
								9. Contact Information
							</h2>
							<p className='text-gray-600 leading-relaxed'>
								If you have any questions about these Terms of
								Service, please contact us at:
							</p>
							<div className='mt-4 p-4 bg-gray-50 rounded-lg'>
								<p className='text-gray-600'>
									<strong>Email:</strong>{" "}
									legal@bulkconnect.com
									<br />
									<strong>Address:</strong> 123 Business
									Street, San Francisco, CA 94105
								</p>
							</div>
						</section>
					</div>
				</div>
			</div>
		</div>
	);
}
