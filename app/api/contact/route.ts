import { NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10),
  honeypot: z.string().max(0).optional(),
})

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
    const body = await request.json()

    // Validate request
    const validation = contactSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: validation.error.errors },
        { status: 400 }
      )
    }

    const { name, email, subject, message, honeypot } = validation.data

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
    })
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}

