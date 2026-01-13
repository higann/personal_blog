'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface Photo {
  id: string
  src: string
  alt: string
  title?: string
}

// Example photos - replace with actual images
const examplePhotos: Photo[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    alt: 'Mountain landscape',
    title: 'Mountain View',
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80',
    alt: 'Ocean waves',
    title: 'Ocean Waves',
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80',
    alt: 'Cityscape',
    title: 'City Lights',
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
    alt: 'Forest path',
    title: 'Forest Path',
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80',
    alt: 'Sunset',
    title: 'Sunset',
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    alt: 'Desert',
    title: 'Desert',
  },
]

export default function GalleryPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [photos] = useState<Photo[]>(examplePhotos)

  const openLightbox = (photo: Photo) => {
    setSelectedPhoto(photo)
  }

  const closeLightbox = () => {
    setSelectedPhoto(null)
  }

  const navigatePhoto = (direction: 'prev' | 'next') => {
    if (!selectedPhoto) return
    
    const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id)
    let newIndex: number

    if (direction === 'next') {
      newIndex = currentIndex === photos.length - 1 ? 0 : currentIndex + 1
    } else {
      newIndex = currentIndex === 0 ? photos.length - 1 : currentIndex - 1
    }

    setSelectedPhoto(photos[newIndex])
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-display font-bold text-primary mb-8 text-center">Photo Gallery</h1>
        <p className="text-xl text-text-light text-center mb-12 max-w-2xl mx-auto">
          Browse through my collection of photographs and visual work.
        </p>

        {/* Masonry-style grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="break-inside-avoid mb-6 cursor-pointer group"
              onClick={() => openLightbox(photo)}
            >
              {/* Polaroid-style frame */}
              <div className="bg-white p-4 rounded-retro-lg retro-shadow hover:retro-shadow-lg transition-all transform hover:scale-105">
                <div className="relative aspect-[4/3] overflow-hidden rounded-retro mb-4">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                {photo.title && (
                  <p className="text-center text-text font-medium">{photo.title}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-6xl max-h-[90vh] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
                  aria-label="Close lightbox"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="relative aspect-video bg-gray-900 rounded-retro-lg overflow-hidden">
                  <Image
                    src={selectedPhoto.src}
                    alt={selectedPhoto.alt}
                    fill
                    className="object-contain"
                    sizes="90vw"
                    priority
                  />
                </div>

                {selectedPhoto.title && (
                  <div className="mt-4 text-center text-white">
                    <h3 className="text-2xl font-display font-semibold">{selectedPhoto.title}</h3>
                  </div>
                )}

                {/* Navigation buttons */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigatePhoto('prev')
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors"
                  aria-label="Previous photo"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigatePhoto('next')
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors"
                  aria-label="Next photo"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

