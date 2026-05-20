import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'
import { formulas } from '@/lib/data'

export async function POST(req: NextRequest) {
  const { formulaId } = await req.json()

  const formula = formulas.find((f) => f.id === formulaId)
  if (!formula) {
    return NextResponse.json({ error: 'Formula not found' }, { status: 404 })
  }

  const secret = process.env.DOWNLOAD_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
  }

  const timestamp = Date.now()
  const payload = `${formulaId}:${timestamp}`
  const signature = createHmac('sha256', secret).update(payload).digest('hex')
  const token = Buffer.from(`${payload}:${signature}`).toString('base64url')

  return NextResponse.json({ token })
}
