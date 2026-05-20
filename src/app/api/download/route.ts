import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'
import { readFile } from 'fs/promises'
import path from 'path'
import { formulas } from '@/lib/data'

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000 // 24 heures

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const formulaId = searchParams.get('formula')
  const token = searchParams.get('token')

  // Vérifications basiques
  if (!formulaId || !token) {
    return NextResponse.json({ error: 'Paramètres manquants' }, { status: 400 })
  }

  const secret = process.env.DOWNLOAD_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
  }

  // Décoder et valider le token
  let decoded: string
  try {
    decoded = Buffer.from(token, 'base64url').toString('utf-8')
  } catch {
    return NextResponse.json({ error: 'Token invalide' }, { status: 401 })
  }

  const parts = decoded.split(':')
  if (parts.length !== 3) {
    return NextResponse.json({ error: 'Token malformé' }, { status: 401 })
  }

  const [tokenFormulaId, timestampStr, signature] = parts
  const timestamp = parseInt(timestampStr, 10)

  // Vérifier que le token correspond à la formule demandée
  if (tokenFormulaId !== formulaId) {
    return NextResponse.json({ error: 'Token invalide pour cette formule' }, { status: 401 })
  }

  // Vérifier la signature HMAC
  const payload = `${tokenFormulaId}:${timestampStr}`
  const expectedSig = createHmac('sha256', secret).update(payload).digest('hex')
  if (signature !== expectedSig) {
    return NextResponse.json({ error: 'Signature invalide' }, { status: 401 })
  }

  // Vérifier l'expiration (24h)
  if (Date.now() - timestamp > TOKEN_TTL_MS) {
    return NextResponse.json({ error: 'Lien de téléchargement expiré' }, { status: 401 })
  }

  // Trouver la formule
  const formula = formulas.find((f) => f.id === formulaId)
  if (!formula) {
    return NextResponse.json({ error: 'Formule introuvable' }, { status: 404 })
  }

  // Lire le PDF depuis le dossier privé (hors de /public)
  const guidesDir = path.join(process.cwd(), 'guides')
  const filePath = path.join(guidesDir, formula.pdfGuide)

  // Sécurité : empêcher la traversée de chemin
  if (!filePath.startsWith(guidesDir)) {
    return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
  }

  let fileBuffer: Buffer
  try {
    fileBuffer = await readFile(filePath)
  } catch {
    return NextResponse.json({ error: 'Guide introuvable' }, { status: 404 })
  }

  // Retourner le PDF avec les bons headers
  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="mmiboost-${formula.name.toLowerCase()}-guide.pdf"`,
      'Content-Length': fileBuffer.length.toString(),
      'Cache-Control': 'no-store',
    },
  })
}
