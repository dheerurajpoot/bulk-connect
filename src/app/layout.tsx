import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "BulkConnect - Professional Bulk Messaging Platform",
	description:
		"Send bulk WhatsApp and Email campaigns to thousands of customers instantly. Professional messaging platform for businesses.",
	keywords:
		"bulk messaging, whatsapp marketing, email marketing, bulk sms, campaign management",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' suppressHydrationWarning={true}>
			<body className={inter.className} suppressHydrationWarning={true}>
				<Header />
				<main className='min-h-screen'>{children}</main>
				<Footer />
			</body>
		</html>
	);
}
