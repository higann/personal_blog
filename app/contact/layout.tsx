import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Have a question or want to get in touch? Send me a message!',
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

