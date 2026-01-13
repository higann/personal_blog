import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read my latest thoughts, tutorials, and insights.',
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

