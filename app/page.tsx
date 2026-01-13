'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-5xl md:text-6xl font-display font-bold text-primary mb-6 text-center">
          Welcome
        </h1>
        <p className="text-xl text-text-light text-center mb-12 max-w-2xl mx-auto">
          Explore my work, thoughts, and creative journey through videos, photos, and blog posts.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <Link href="/about">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-background-alt p-8 rounded-retro-lg retro-shadow hover:retro-shadow-lg transition-all cursor-pointer"
            >
              <h2 className="text-2xl font-display font-semibold text-primary mb-4">About Me</h2>
              <p className="text-text-light">Learn more about my background, interests, and what drives me.</p>
            </motion.div>
          </Link>

          <Link href="/videos">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-background-alt p-8 rounded-retro-lg retro-shadow hover:retro-shadow-lg transition-all cursor-pointer"
            >
              <h2 className="text-2xl font-display font-semibold text-primary mb-4">Videos</h2>
              <p className="text-text-light">Watch my latest video content and creative projects.</p>
            </motion.div>
          </Link>

          <Link href="/gallery">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-background-alt p-8 rounded-retro-lg retro-shadow hover:retro-shadow-lg transition-all cursor-pointer"
            >
              <h2 className="text-2xl font-display font-semibold text-primary mb-4">Photo Gallery</h2>
              <p className="text-text-light">Browse through my collection of photographs and visual work.</p>
            </motion.div>
          </Link>

          <Link href="/blog">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-background-alt p-8 rounded-retro-lg retro-shadow hover:retro-shadow-lg transition-all cursor-pointer"
            >
              <h2 className="text-2xl font-display font-semibold text-primary mb-4">Blog</h2>
              <p className="text-text-light">Read my latest thoughts, tutorials, and insights.</p>
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

