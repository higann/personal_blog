import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: {
    default: 'Personal Website',
    template: '%s | Personal Website',
  },
  description: 'Personal website with retro aesthetic featuring blog, videos, and photo gallery',
  keywords: ['personal website', 'blog', 'portfolio'],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Personal Website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <StructuredData
          type="Person"
          data={{
            name: 'Your Name',
            url: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
            sameAs: [
              'https://twitter.com',
              'https://github.com',
              'https://linkedin.com',
            ],
          }}
        />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

