import { Geist, Geist_Mono } from 'next/font/google';

import '@workspace/ui/globals.css';

import { Providers } from '@/components/providers';
import type { Metadata } from 'next';

const fontSans = Geist({
	subsets: ['latin'],
	variable: '--font-sans',
});

const fontMono = Geist_Mono({
	subsets: ['latin'],
	variable: '--font-mono',
});

export const metadata: Metadata = {
	title: 'Disaster Education System',
	description: 'Interactive disaster management education platform for schools and colleges',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}>
				<Providers>
					{children}
				</Providers>
			</body>
		</html>
	);
}
