import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const BASE_URL = "https://leon135.xyz"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Leon135",
    template: "%s | Leon135",
  },
  description:
    "Portfolio of Leon135",
  keywords: [
    "Leon135",
    "developer portfolio",
    "student developer",
    "software development",
    "fullstack",
    "cybersecurity",
  ],
  authors: [{ name: "Leon135", url: BASE_URL }],
  creator: "Kuba (Leon135)",
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Leon135",
    title: "Leon135r",
    description:
      "Portfolio of Leon135",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leon135",
    description:
      "Portfolio of Leon135",
    creator: "@Leon135",
  },
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
  icons: "/pfp.jpg"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}
