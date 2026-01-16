'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import YouTubeEmbed from '@/components/YouTubeEmbed'

interface Video {
  id: string
  title: string
  description: string
  thumbnail: string
  publishedAt: string
}

// Example video data - replace with actual YouTube API integration
const exampleVideos: Video[] = [
  {
    id: 'F64yFFnZfkI',
    title: 'Example Video 1',
    description: 'This is an example video description.',
    thumbnail: 'https://img.youtube.com/vi/F64yFFnZfkI/hqdefault.jpg',
    publishedAt: '2024-01-15',
  },
  {
    id: 'jNQXAC9IVRw',
    title: 'Example Video 2',
    description: 'Another example video description.',
    thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg',
    publishedAt: '2024-01-20',
  },
]

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API call - replace with actual YouTube Data API v3 integration
    const fetchVideos = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/youtube-videos')
        const result = await response.json()
        
        if (response.ok && result.videos && result.videos.length > 0) {
          setVideos(result.videos)
        } else {
          // Fallback to example videos if API not configured
          setVideos(exampleVideos)
          if (result.message) {
            console.info(result.message)
          }
        }
        setError(null)
      } catch (err) {
        setError('Failed to load videos. Please try again later.')
        console.error('Error fetching videos:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-display font-bold text-primary mb-8 text-center">Videos</h1>
        <p className="text-xl text-text-light text-center mb-12 max-w-2xl mx-auto">
          Watch my latest video content and creative projects.
        </p>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            <p className="mt-4 text-text-light">Loading videos...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-retro-lg p-6 text-center max-w-2xl mx-auto">
            <p className="text-red-800">{error}</p>
            <p className="text-sm text-red-600 mt-2">
              Note: YouTube API integration required. See README for setup instructions.
            </p>
          </div>
        )}

        {!loading && !error && videos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-light">No videos available at the moment.</p>
          </div>
        )}

        {!loading && !error && videos.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-background-alt rounded-retro-lg retro-shadow overflow-hidden hover:retro-shadow-lg transition-all"
              >
                <div className="relative aspect-video bg-gray-200">
                  <YouTubeEmbed
                    id={video.id}
                    title={video.title}
                    adNetwork="false"
                    params="rel=0"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-display font-semibold text-primary mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-sm text-text-light mb-4 line-clamp-2">
                    {video.description}
                  </p>
                  <p className="text-xs text-text-light font-mono">
                    {new Date(video.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}

