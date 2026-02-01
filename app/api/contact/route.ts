import { NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit, getClientIdentifier } from '@/lib/rateLimit'
import { validateCsrfToken } from '@/lib/csrf'

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(255),
  subject: z.string().min(3).max(200),
  message: z.string().min(10).max(5000),
  honeypot: z.string().max(0).optional(),
  csrfToken: z.string().min(1),
})

// Maximum request body size: 10KB
const MAX_REQUEST_SIZE = 10 * 1024

/**
 * Contact Form API Route
 * 
 * This route handles contact form submissions and sends emails via Resend.
 * 
 * Setup:
 * 1. Sign up for Resend at https://resend.com/
 * 2. Add RESEND_API_KEY and CONTACT_EMAIL to .env.local
 * 3. Install @resend/node: npm install @resend/node
 * 4. Uncomment the code below and replace with your implementation
 */

export async function POST(request: Request) {
  try {
    // Rate limiting: 5 requests per 15 minutes per IP
    const clientId = getClientIdentifier(request)
    const rateLimitResult = rateLimit(clientId, 5, 15 * 60 * 1000)
    
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          error: 'Too many requests. Please try again later.',
          retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
          }
        }
      )
    }

    // Check request size
    const contentLength = request.headers.get('content-length')
    if (contentLength && parseInt(contentLength) > MAX_REQUEST_SIZE) {
      return NextResponse.json(
        { error: 'Request too large' },
        { status: 413 }
      )
    }

    // Parse and validate request body size
    const text = await request.text()
    if (text.length > MAX_REQUEST_SIZE) {
      return NextResponse.json(
        { error: 'Request too large' },
        { status: 413 }
      )
    }

    let body
    try {
      body = JSON.parse(text)
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON' },
        { status: 400 }
      )
    }

    // Validate request schema
    const validation = contactSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: validation.error.errors },
        { status: 400 }
      )
    }

    const { name, email, subject, message, honeypot, csrfToken } = validation.data

    // CSRF token validation
    const isValidCsrf = await validateCsrfToken(csrfToken)
    if (!isValidCsrf) {
      return NextResponse.json(
        { error: 'Invalid security token. Please refresh the page and try again.' },
        { status: 403 }
      )
    }

    // Honeypot check
    if (honeypot && honeypot.length > 0) {
      return NextResponse.json(
        { error: 'Bot detected' },
        { status: 403 }
      )
    }

    // TODO: Implement email sending with Resend
    // Example:
    // const { Resend } = require('@resend/node')
    // const resend = new Resend(process.env.RESEND_API_KEY)
    //
    // await resend.emails.send({
    //   from: 'Contact Form <onboarding@resend.dev>',
    //   to: process.env.CONTACT_EMAIL,
    //   subject: `Contact Form: ${subject}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Subject:</strong> ${subject}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message}</p>
    //   `,
    // })

    // Placeholder response
    return NextResponse.json({
      success: true,
      message: 'Contact form API integration pending. See route file for implementation.',
    }, {
      headers: {
        'X-RateLimit-Limit': '5',
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
      }
    })
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}

