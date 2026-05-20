'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import { formulas } from '@/lib/data'

function SuccessContent() {
  const searchParams = useSearchParams()
  const formulaId = searchParams.get('formula')
  const email = searchParams.get('email') ?? 'votre@email.com'
  const formula = formulas.find((f) => f.id === formulaId)

  const token = searchParams.get('token')
  const [downloadStarted, setDownloadStarted] = useState(false)
  const [confettiDone, setConfettiDone] = useState(false)

  useEffect(() => {
    setTimeout(() => setConfettiDone(true), 3000)
  }, [])

  const handleDownload = () => {
    if (!token || !formulaId) return
    setDownloadStarted(true)
    const a = document.createElement('a')
    a.href = `/api/download?formula=${formulaId}&token=${token}`
    a.download = formula ? `mmiboost-${formula.name.toLowerCase()}-guide.pdf` : 'mmiboost-guide.pdf'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4 py-20">
      {/* Confetti effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            initial={{
              top: '-10px',
              left: `${Math.random() * 100}%`,
              backgroundColor: ['#3B82F6', '#7C3AED', '#F59E0B', '#10B981', '#EC4899'][i % 5],
            }}
            animate={{
              top: '110%',
              rotate: Math.random() * 720,
              x: (Math.random() - 0.5) * 200,
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              delay: Math.random() * 1.5,
              ease: 'easeIn',
            }}
          />
        ))}
      </div>

      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'backOut' }}
          className="glass rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden"
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, #7C3AED, transparent 70%)' }}
          />

          {/* Success icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 relative"
            style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(59,130,246,0.2))', border: '2px solid rgba(16,185,129,0.4)' }}
          >
            <motion.svg
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-12 h-12 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </motion.svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-sm font-medium text-green-400 mb-2 uppercase tracking-widest">
              Paiement confirmé
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              Félicitations ! 🎉
            </h1>

            {formula && (
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
                style={{
                  background: 'rgba(59,130,246,0.1)',
                  border: '1px solid rgba(59,130,246,0.25)',
                  color: '#60A5FA',
                }}
              >
                {formula.name} · £{formula.price}
              </div>
            )}

            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Votre achat a bien été confirmé. Votre guide PDF a été envoyé à{' '}
              <span className="text-white font-medium">{decodeURIComponent(email)}</span>.
              Vérifiez votre boîte email (et les spams).
            </p>

            {/* Download CTA */}
            <button
              onClick={handleDownload}
              disabled={!token}
              className="btn-primary w-full sm:w-auto text-base px-10 py-4 mb-4 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {downloadStarted ? (
                <>
                  <svg className="w-5 h-5 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Téléchargement lancé !
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Télécharger mon guide PDF
                </>
              )}
            </button>

            {/* VIP follow-up notice */}
            {formula && formula.followUp && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-6 p-5 rounded-2xl text-left"
                style={{
                  background: 'rgba(245,158,11,0.08)',
                  border: '1px solid rgba(245,158,11,0.2)',
                }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🤝</span>
                  <div>
                    <p className="font-semibold text-amber-300 mb-1">Votre suivi personnalisé commence bientôt</p>
                    <p className="text-sm text-gray-400">
                      Notre équipe va vous contacter dans les <strong className="text-white">24 heures</strong> à l&apos;adresse email indiquée pour initier votre <strong className="text-amber-300">{formula.followUp}</strong>.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Next steps */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              {[
                { step: '1', title: 'Vérifiez votre email', desc: 'Guide PDF envoyé instantanément' },
                { step: '2', title: 'Lisez le guide', desc: 'De A à Z, chaque section compte' },
                { step: '3', title: 'Appliquez & Croissez', desc: 'Résultats dès les premières semaines' },
              ].map((item) => (
                <div
                  key={item.step}
                  className="p-4 rounded-xl text-center"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white mx-auto mb-2"
                    style={{ background: 'linear-gradient(135deg, #3B82F6, #7C3AED)' }}
                  >
                    {item.step}
                  </div>
                  <p className="text-white text-sm font-medium mb-1">{item.title}</p>
                  <p className="text-gray-500 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Back links */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link href="/" className="text-sm text-gray-500 hover:text-white transition-colors">
                ← Retour à l&apos;accueil
              </Link>
              <span className="text-gray-700 hidden sm:block">·</span>
              <Link href="/formules" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                Voir les autres formules
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={
        <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
          <div className="loader-ring" />
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </>
  )
}
