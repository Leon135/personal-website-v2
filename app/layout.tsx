import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const BASE_URL = "https://leon135.xyz"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Kuba (Leon135) — Student Developer",
    template: "%s | Kuba (Leon135)",
  },
  description:
    "Portfolio of Kuba, also known as Leon135 — a student developer passionate about building clean, functional web applications.",
  keywords: [
    "Leon135",
    "Kuba",
    "developer portfolio",
    "student developer",
    "web development",
    "frontend",
    "fullstack",
  ],
  authors: [{ name: "Kuba", url: BASE_URL }],
  creator: "Kuba (Leon135)",
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Leon135 — Developer Portfolio",
    title: "Kuba (Leon135) — Student Developer",
    description:
      "Portfolio of Kuba, also known as Leon135 — a student developer passionate about building clean, functional web applications.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kuba (Leon135) — Student Developer",
    description:
      "Portfolio of Kuba, also known as Leon135 — a student developer passionate about building clean, functional web applications.",
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
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
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
      </body>
    </html>
  )
}
