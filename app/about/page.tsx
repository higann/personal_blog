'use client'

import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-5xl font-display font-bold text-primary mb-8">About Me</h1>
        
        <div className="prose prose-lg max-w-none">
          <div className="bg-background-alt p-8 rounded-retro-lg retro-shadow mb-8">
            <p className="text-lg text-text-light mb-6">
              Welcome to my personal website! I&apos;m passionate about creating meaningful content,
              sharing knowledge, and connecting with like-minded individuals.
            </p>
            <p className="text-lg text-text-light mb-6">
              This space serves as a hub for my creative work, including videos, photography,
              and written thoughts on various topics that interest me.
            </p>
            <p className="text-lg text-text-light">
              Feel free to explore my content and reach out if you&apos;d like to connect!
            </p>
          </div>

          <section className="mt-12">
            <h2 className="text-3xl font-display font-semibold text-primary mb-6">Background</h2>
            <div className="bg-background-alt p-8 rounded-retro-lg retro-shadow">
              <p className="text-text-light mb-4">
                [Add your background information here - education, experience, interests, etc.]
              </p>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-3xl font-display font-semibold text-primary mb-6">Contact</h2>
            <div className="bg-background-alt p-8 rounded-retro-lg retro-shadow">
              <p className="text-text-light mb-4">
                You can reach me through the <a href="/contact" className="text-primary hover:underline">contact form</a> or via email.
              </p>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  )
}

