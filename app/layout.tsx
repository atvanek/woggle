import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/redux/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Woggle',
	description: 'An Online Multiplayer Word Game',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
