'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import { formulas } from '@/lib/data'
import type { Formula } from '@/lib/data'

function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const formulaId = searchParams.get('formula')

  const formula = formulas.find((f) => f.id === formulaId) ?? formulas[5]

  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const formatCardNumber = (val: string) =>
    val.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19)

  const formatExpiry = (val: string) =>
    val.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let v = value
    if (name === 'cardNumber') v = formatCardNumber(value)
    if (name === 'cardExpiry') v = formatExpiry(value)
    if (name === 'cardCvc') v = value.replace(/\D/g, '').slice(0, 3)
    setForm((f) => ({ ...f, [name]: v }))
    setErrors((e) => ({ ...e, [name]: '' }))
  }

  const validateStep1 = () => {
    const errs: Record<string, string> = {}
    if (!form.email.includes('@')) errs.email = 'Email invalide'
    if (form.firstName.length < 2) errs.firstName = 'Prénom requis'
    if (form.lastName.length < 2) errs.lastName = 'Nom requis'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const validateStep2 = () => {
    const errs: Record<string, string> = {}
    if (form.cardNumber.replace(/\s/g, '').length < 16) errs.cardNumber = 'Numéro invalide'
    if (form.cardExpiry.length < 5) errs.cardExpiry = 'Date invalide'
    if (form.cardCvc.length < 3) errs.cardCvc = 'CVC invalide'
    if (form.cardName.length < 3) errs.cardName = 'Nom requis'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleNextStep1 = () => {
    if (validateStep1()) setStep(2)
  }

  const handlePayment = async () => {
    if (!validateStep2()) return
    setLoading(true)

    // Simulate payment processing
    await new Promise((r) => setTimeout(r, 2200))

    // Generate a signed download token server-side
    const res = await fetch('/api/generate-download-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formulaId: formula.id }),
    })
    const { token } = await res.json()

    setLoading(false)
    router.push(
      `/success?formula=${formula.id}&email=${encodeURIComponent(form.email)}&token=${token}`
    )
  }

  const isVip = formula.category === 'vip'
  const steps = ['Informations', 'Paiement', 'Confirmation']

  return (
    <div className="min-h-screen bg-[#0A0A0F] pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">

        {/* Back link */}
        <Link href="/formules" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-8">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour aux formules
        </Link>

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    i + 1 === step
                      ? 'bg-gradient-brand text-white'
                      : i + 1 < step
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-white/5 text-gray-600 border border-white/10'
                  }`}
                  style={i + 1 === step ? { background: 'linear-gradient(135deg, #3B82F6, #7C3AED)' } : {}}
                >
                  {i + 1 < step ? '✓' : i + 1}
                </div>
                <span className={`text-sm font-medium hidden sm:block ${i + 1 === step ? 'text-white' : 'text-gray-600'}`}>
                  {s}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-12 h-px transition-colors ${i + 1 < step ? 'bg-green-500/40' : 'bg-white/10'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="glass rounded-3xl p-8"
                >
                  <h2 className="font-display text-2xl font-bold text-white mb-6">Vos informations</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">Prénom</label>
                      <input
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="Sophie"
                        className={`input-dark ${errors.firstName ? 'border-red-500/50' : ''}`}
                      />
                      {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">Nom</label>
                      <input
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Laurent"
                        className={`input-dark ${errors.lastName ? 'border-red-500/50' : ''}`}
                      />
                      {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm text-gray-400 mb-1.5">Adresse email</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="vous@exemple.com"
                      className={`input-dark ${errors.email ? 'border-red-500/50' : ''}`}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    <p className="text-xs text-gray-600 mt-1.5">
                      Votre guide PDF sera envoyé à cette adresse email
                    </p>
                  </div>

                  <button onClick={handleNextStep1} className="btn-primary w-full text-base py-4">
                    Continuer vers le paiement
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="glass rounded-3xl p-8"
                >
                  <h2 className="font-display text-2xl font-bold text-white mb-2">Paiement sécurisé</h2>
                  <div className="flex items-center gap-2 text-xs text-green-400 mb-6">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Connexion SSL 256-bit · Sécurisé par Stripe
                  </div>

                  {/* Card visual */}
                  <div
                    className="relative h-40 rounded-2xl p-5 mb-6 overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)' }}
                  >
                    <div className="absolute top-4 right-4 flex gap-1">
                      <div className="w-8 h-8 rounded-full bg-red-500 opacity-80" />
                      <div className="w-8 h-8 rounded-full bg-amber-400 opacity-80 -ml-3" />
                    </div>
                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="text-white/50 text-xs mb-1 font-mono tracking-widest">
                        {form.cardNumber || '•••• •••• •••• ••••'}
                      </p>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-white/40 text-xs">Titulaire</p>
                          <p className="text-white text-sm font-semibold font-mono tracking-wide">
                            {form.cardName || 'VOTRE NOM'}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-white/40 text-xs">Expire</p>
                          <p className="text-white text-sm font-mono">{form.cardExpiry || 'MM/YY'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">Numéro de carte</label>
                      <input
                        name="cardNumber"
                        value={form.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        className={`input-dark font-mono tracking-widest ${errors.cardNumber ? 'border-red-500/50' : ''}`}
                      />
                      {errors.cardNumber && <p className="text-red-400 text-xs mt-1">{errors.cardNumber}</p>}
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">Titulaire de la carte</label>
                      <input
                        name="cardName"
                        value={form.cardName}
                        onChange={handleChange}
                        placeholder="SOPHIE LAURENT"
                        className={`input-dark uppercase ${errors.cardName ? 'border-red-500/50' : ''}`}
                      />
                      {errors.cardName && <p className="text-red-400 text-xs mt-1">{errors.cardName}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">Date d&apos;expiration</label>
                        <input
                          name="cardExpiry"
                          value={form.cardExpiry}
                          onChange={handleChange}
                          placeholder="MM/YY"
                          className={`input-dark font-mono ${errors.cardExpiry ? 'border-red-500/50' : ''}`}
                        />
                        {errors.cardExpiry && <p className="text-red-400 text-xs mt-1">{errors.cardExpiry}</p>}
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">CVC</label>
                        <input
                          name="cardCvc"
                          value={form.cardCvc}
                          onChange={handleChange}
                          placeholder="123"
                          type="password"
                          className={`input-dark font-mono ${errors.cardCvc ? 'border-red-500/50' : ''}`}
                        />
                        {errors.cardCvc && <p className="text-red-400 text-xs mt-1">{errors.cardCvc}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setStep(1)}
                      className="btn-secondary flex-1 text-sm py-4"
                    >
                      ← Retour
                    </button>
                    <button
                      onClick={handlePayment}
                      disabled={loading}
                      className="btn-primary flex-[2] text-base py-4 disabled:opacity-60"
                    >
                      {loading ? (
                        <span className="flex items-center gap-3 justify-center">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Traitement...
                        </span>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          Payer £{formula.price} maintenant
                        </>
                      )}
                    </button>
                  </div>

                  {/* Accepted cards */}
                  <div className="flex items-center justify-center gap-3 mt-4">
                    {['VISA', 'MC', 'AMEX', 'PAYPAL'].map((card) => (
                      <div
                        key={card}
                        className="px-2 py-1 rounded text-xs font-bold text-gray-500 bg-white/5 border border-white/8"
                      >
                        {card}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <div
                className="rounded-3xl p-6 border"
                style={{
                  background: isVip
                    ? 'linear-gradient(135deg, rgba(245,158,11,0.08), rgba(124,58,237,0.08))'
                    : 'rgba(255,255,255,0.03)',
                  borderColor: isVip ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.08)',
                }}
              >
                <h3 className="font-display font-semibold text-white mb-4 text-lg">Récapitulatif</h3>

                {/* Formula info */}
                <div className="flex items-start gap-3 mb-5 pb-5 border-b border-white/8">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{
                      background: isVip
                        ? 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(124,58,237,0.2))'
                        : 'rgba(59,130,246,0.15)',
                    }}
                  >
                    {formula.category === 'starter' ? '🌱' :
                     formula.category === 'growth' ? '🚀' :
                     formula.category === 'premium' ? '💎' : '👑'}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{formula.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{formula.tagline}</p>
                    {formula.followUp && (
                      <p className="text-xs text-amber-400 mt-1">✓ {formula.followUp}</p>
                    )}
                  </div>
                </div>

                {/* What's included */}
                <div className="space-y-2 mb-5 pb-5 border-b border-white/8">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Inclus</p>
                  {formula.benefits.slice(0, 4).map((b, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <svg className="w-3.5 h-3.5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {b}
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Sous-total</span>
                  <span className="text-white font-semibold">£{formula.price}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400 text-sm">TVA</span>
                  <span className="text-gray-500 text-sm">Incluse</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/8">
                  <span className="font-semibold text-white">Total</span>
                  <span className={`font-display text-2xl font-bold ${isVip ? 'gradient-text-gold' : 'gradient-text'}`}>
                    £{formula.price}
                  </span>
                </div>

                {/* Guarantees */}
                <div className="mt-5 pt-4 border-t border-white/8 space-y-2">
                  {[
                    { icon: '🔒', text: 'Paiement 100% sécurisé' },
                    { icon: '⚡', text: 'Accès PDF immédiat' },
                    { icon: '↩️', text: 'Remboursement 7 jours' },
                  ].map((g) => (
                    <div key={g.text} className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{g.icon}</span>
                      {g.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={
        <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
          <div className="loader-ring" />
        </div>
      }>
        <CheckoutContent />
      </Suspense>
    </>
  )
}
