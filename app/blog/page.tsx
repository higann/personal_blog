'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import Image from 'next/image'

interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  tags?: string[]
  featuredImage?: string
  readingTime?: number
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch posts on client side since getAllPosts uses fs which is server-only
    fetch('/api/blog-posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data)
        setLoading(false)
      })
      .catch((e) => {
        console.error('Error loading posts:', e)
        setPosts([])
        setLoading(false)
      })
  }, [])

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-display font-bold text-primary mb-8 text-center">Blog</h1>
        <p className="text-xl text-text-light text-center mb-12 max-w-2xl mx-auto">
          Read my latest thoughts, tutorials, and insights.
        </p>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            <p className="mt-4 text-text-light">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-light mb-4">No blog posts yet. Check back soon!</p>
            <p className="text-sm text-text-light">
              To add posts, create MDX files in the <code className="bg-background-alt px-2 py-1 rounded">content/blog</code> directory.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-background-alt rounded-retro-lg retro-shadow hover:retro-shadow-lg transition-all h-full flex flex-col"
                >
                  {post.featuredImage && (
                    <div className="relative h-48 w-full overflow-hidden rounded-t-retro-lg">
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <h2 className="text-2xl font-display font-semibold text-primary mb-3 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-text-light mb-4 flex-1 line-clamp-3">
                      {post.excerpt || post.content.substring(0, 150) + '...'}
                    </p>
                    <div className="flex items-center justify-between text-sm text-text-light mt-auto">
                      <time className="font-mono">
                        {format(new Date(post.date), 'MMM d, yyyy')}
                      </time>
                      {post.readingTime && (
                        <span className="font-mono">{post.readingTime} min read</span>
                      )}
                    </div>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-retro"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}

