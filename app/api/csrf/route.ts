import { NextResponse } from 'next/server'
import { getCsrfToken } from '@/lib/csrf'

/**
 * CSRF Token API Route
 * Returns a CSRF token for form submissions
 */
export async function GET() {
  try {
    const token = await getCsrfToken()
    return NextResponse.json({ token })
  } catch (error) {
    console.error('Error generating CSRF token:', error)
    return NextResponse.json(
      { error: 'Failed to generate security token' },
      { status: 500 }
    )
  }
}
