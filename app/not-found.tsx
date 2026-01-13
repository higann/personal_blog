'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto text-center"
      >
        <h1 className="text-8xl font-display font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-display font-semibold text-text mb-6">Page Not Found</h2>
        <p className="text-text-light mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-primary text-white font-semibold py-3 px-8 rounded-retro hover:bg-primary-light transition-colors retro-shadow hover:retro-shadow-lg"
        >
          Go Home
        </Link>
      </motion.div>
    </div>
  )
}

