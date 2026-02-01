'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address').max(255),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
  honeypot: z.string().max(0, 'Bot detected'), // Honeypot field
  csrfToken: z.string().min(1, 'Security token is required'),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  const [csrfToken, setCsrfToken] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  // Fetch CSRF token on component mount
  useEffect(() => {
    fetch('/api/csrf')
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          setCsrfToken(data.token)
        }
      })
      .catch(error => {
        console.error('Error fetching CSRF token:', error)
      })
  }, [])

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Include CSRF token in submission
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          csrfToken,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        // Handle rate limiting
        if (response.status === 429) {
          const retryAfter = result.retryAfter || 60
          throw new Error(`Too many requests. Please try again in ${retryAfter} seconds.`)
        }
        throw new Error(result.error || 'Failed to send message')
      }

      setSubmitStatus('success')
      setSubmitMessage('Thank you! Your message has been sent successfully.')
      reset()
      
      // Refresh CSRF token after successful submission
      fetch('/api/csrf')
        .then(res => res.json())
        .then(data => {
          if (data.token) {
            setCsrfToken(data.token)
          }
        })
    } catch (error) {
      setSubmitStatus('error')
      setSubmitMessage(error instanceof Error ? error.message : 'Failed to send message. Please try again later or email directly.')
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="text-5xl font-display font-bold text-primary mb-8 text-center">Contact</h1>
        <p className="text-xl text-text-light text-center mb-12">
          Have a question or want to get in touch? Send me a message!
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-background-alt p-8 rounded-retro-lg retro-shadow">
          {/* Honeypot field - hidden from users */}
          <input
            type="text"
            {...register('honeypot')}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
              Name *
            </label>
            <input
              id="name"
              type="text"
              {...register('name')}
              className={`w-full px-4 py-3 rounded-retro border-2 ${
                errors.name ? 'border-red-500' : 'border-primary/20'
              } bg-background focus:outline-none focus:border-primary transition-colors`}
              aria-invalid={errors.name ? 'true' : 'false'}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
              Email *
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className={`w-full px-4 py-3 rounded-retro border-2 ${
                errors.email ? 'border-red-500' : 'border-primary/20'
              } bg-background focus:outline-none focus:border-primary transition-colors`}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="subject" className="block text-sm font-medium text-text mb-2">
              Subject *
            </label>
            <input
              id="subject"
              type="text"
              {...register('subject')}
              className={`w-full px-4 py-3 rounded-retro border-2 ${
                errors.subject ? 'border-red-500' : 'border-primary/20'
              } bg-background focus:outline-none focus:border-primary transition-colors`}
              aria-invalid={errors.subject ? 'true' : 'false'}
            />
            {errors.subject && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.subject.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
              Message *
            </label>
            <textarea
              id="message"
              rows={6}
              {...register('message')}
              className={`w-full px-4 py-3 rounded-retro border-2 ${
                errors.message ? 'border-red-500' : 'border-primary/20'
              } bg-background focus:outline-none focus:border-primary transition-colors resize-none`}
              aria-invalid={errors.message ? 'true' : 'false'}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.message.message}
              </p>
            )}
          </div>

          {submitStatus !== 'idle' && (
            <div
              className={`mb-6 p-4 rounded-retro ${
                submitStatus === 'success'
                  ? 'bg-green-50 border-2 border-green-200 text-green-800'
                  : 'bg-red-50 border-2 border-red-200 text-red-800'
              }`}
              role="alert"
            >
              {submitMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !csrfToken}
            className="w-full bg-primary text-white font-semibold py-3 px-6 rounded-retro hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed retro-shadow hover:retro-shadow-lg"
          >
            {isSubmitting ? 'Sending...' : !csrfToken ? 'Loading...' : 'Send Message'}
          </button>

          <p className="mt-4 text-sm text-text-light text-center">
            Note: Contact form API integration required. See README for setup instructions.
          </p>
        </form>
      </motion.div>
    </div>
  )
}

