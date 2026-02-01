import { cookies } from 'next/headers'

/**
 * CSRF Token Management
 * Generates and validates CSRF tokens for form submissions
 */

const CSRF_TOKEN_NAME = 'csrf-token'
const CSRF_TOKEN_MAX_AGE = 3600 // 1 hour

/**
 * Generate a random CSRF token
 */
function generateToken(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

/**
 * Get or create CSRF token for the current session
 */
export async function getCsrfToken(): Promise<string> {
  const cookieStore = await cookies()
  let token = cookieStore.get(CSRF_TOKEN_NAME)?.value

  if (!token) {
    token = generateToken()
    cookieStore.set(CSRF_TOKEN_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: CSRF_TOKEN_MAX_AGE,
      path: '/',
    })
  }

  return token
}

/**
 * Validate CSRF token from request
 */
export async function validateCsrfToken(token: string | null): Promise<boolean> {
  if (!token) {
    return false
  }

  const cookieStore = await cookies()
  const storedToken = cookieStore.get(CSRF_TOKEN_NAME)?.value

  if (!storedToken) {
    return false
  }

  // Use constant-time comparison to prevent timing attacks
  return constantTimeEqual(token, storedToken)
}

/**
 * Constant-time string comparison to prevent timing attacks
 */
function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false
  }

  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }

  return result === 0
}
