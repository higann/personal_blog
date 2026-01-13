import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Videos',
  description: 'Watch my latest video content and creative projects.',
}

export default function VideosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

