// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/src/components/providers'; // Import the provider

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VendorHub - Dashboard',
  description: 'Manage your headless store with ease.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Suppress hydration warning due to next-themes if you add dark mode later */}
      <body className={inter.className}>
        <Providers>{children}</Providers> {/* Wrap children with providers */}
      </body>
    </html>
  );
}