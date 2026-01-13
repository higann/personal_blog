import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Photo Gallery',
  description: 'Browse through my collection of photographs and visual work.',
}

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

