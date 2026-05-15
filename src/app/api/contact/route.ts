import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company, product, message } = body

    // Log for now — replace with email service (Resend, Nodemailer) as needed
    console.log('[Contact Form]', { name, email, company, product, message })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 })
  }
}
