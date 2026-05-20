import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4 text-center">
      <div>
        <div className="font-display text-8xl font-bold gradient-text mb-4">404</div>
        <h2 className="font-display text-2xl font-bold text-white mb-4">Page introuvable</h2>
        <p className="text-gray-400 mb-8">Cette page n&apos;existe pas ou a été déplacée.</p>
        <Link href="/" className="btn-primary inline-flex">
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  )
}
