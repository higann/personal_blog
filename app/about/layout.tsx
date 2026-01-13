import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Learn more about my background, interests, and what drives me.',
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

