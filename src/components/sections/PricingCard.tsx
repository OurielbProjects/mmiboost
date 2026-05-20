'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { Formula } from '@/lib/data'

const categoryColors: Record<Formula['category'], {
  badge: string; glow: string; border: string; bg: string
}> = {
  starter: {
    badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    glow: 'hover:shadow-blue-500/10',
    border: 'border-white/8 hover:border-blue-500/30',
    bg: 'bg-[#111118]',
  },
  growth: {
    badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    glow: 'hover:shadow-violet-500/10',
    border: 'border-white/8 hover:border-violet-500/30',
    bg: 'bg-[#111118]',
  },
  premium: {
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    glow: 'hover:shadow-amber-500/10',
    border: 'border-white/8 hover:border-amber-500/30',
    bg: 'bg-[#111118]',
  },
  vip: {
    badge: 'bg-gradient-to-r from-amber-400/20 to-violet-400/20 text-amber-300 border-amber-400/30',
    glow: 'hover:shadow-amber-500/20',
    border: 'border-amber-500/20 hover:border-amber-400/50',
    bg: 'bg-gradient-to-b from-[#1A1610] to-[#111118]',
  },
}

const categoryLabel: Record<Formula['category'], string> = {
  starter: 'Starter',
  growth: 'Growth',
  premium: 'Premium',
  vip: 'VIP',
}

interface PricingCardProps {
  formula: Formula
  index: number
}

export default function PricingCard({ formula, index }: PricingCardProps) {
  const colors = categoryColors[formula.category]
  const isVip = formula.category === 'vip'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative h-full"
    >
      {/* Popular badge */}
      {formula.isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
          <div className="px-4 py-1 rounded-full text-xs font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #3B82F6, #7C3AED)' }}
          >
            ⚡ Le plus populaire
          </div>
        </div>
      )}

      {formula.isVip && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
          <div className="px-4 py-1 rounded-full text-xs font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #F59E0B, #7C3AED)' }}
          >
            👑 Offre VIP Elite
          </div>
        </div>
      )}

      <div
        className={`relative h-full flex flex-col rounded-2xl border transition-all duration-300 overflow-hidden
          ${colors.bg} ${colors.border} ${colors.glow}
          hover:scale-[1.02] hover:shadow-2xl
          ${formula.isPopular ? 'ring-1 ring-blue-500/40' : ''}
          ${formula.isVip ? 'ring-1 ring-amber-500/40' : ''}
        `}
      >
        {/* VIP shimmer */}
        {isVip && (
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, transparent 40%, rgba(245,158,11,0.1) 50%, transparent 60%)',
            }}
          />
        )}

        <div className="p-6 flex flex-col h-full">
          {/* Header */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colors.badge}`}>
                {categoryLabel[formula.category]}
              </span>
              {formula.followUp && (
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Suivi inclus
                </span>
              )}
            </div>

            <h3 className="font-display text-xl font-bold text-white mb-1">{formula.name}</h3>
            <p className="text-xs text-gray-500 italic">{formula.tagline}</p>
          </div>

          {/* Price */}
          <div className="mb-5">
            <div className="flex items-end gap-1">
              <span className={`font-display text-4xl font-bold ${isVip ? 'gradient-text-gold' : 'gradient-text'}`}>
                £{formula.price}
              </span>
              <span className="text-gray-500 text-sm mb-1">/ unique</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-400 leading-relaxed mb-5">{formula.description}</p>

          {/* Benefits */}
          <ul className="space-y-2.5 mb-6 flex-grow">
            {formula.benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <svg
                  className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isVip ? 'text-amber-400' : 'text-blue-400'}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-300">{benefit}</span>
              </li>
            ))}
          </ul>

          {/* Follow-up badge */}
          {formula.followUp && (
            <div className="mb-4 px-3 py-2 rounded-xl text-xs text-center font-medium"
              style={{
                background: 'rgba(245,158,11,0.1)',
                border: '1px solid rgba(245,158,11,0.2)',
                color: '#FCD34D',
              }}
            >
              🤝 {formula.followUp}
            </div>
          )}

          {/* CTA */}
          <Link
            href={`/checkout?formula=${formula.id}`}
            className={`w-full text-center font-semibold text-sm py-3.5 rounded-xl transition-all duration-300 ${
              isVip
                ? 'text-white'
                : formula.isPopular
                ? 'btn-primary'
                : 'btn-secondary'
            }`}
            style={isVip ? {
              background: 'linear-gradient(135deg, #F59E0B, #7C3AED)',
              boxShadow: '0 0 30px rgba(245,158,11,0.2)',
            } : undefined}
          >
            {formula.price >= 150 ? 'Commencer l\'accompagnement' : 'Télécharger le guide'}
            <span className="ml-2">→</span>
          </Link>

          {/* PDF note */}
          <p className="text-center text-xs text-gray-600 mt-3">
            {formula.price <= 100
              ? '📄 Guide PDF · Accès immédiat'
              : '📄 Guides PDF + Suivi personnalisé'}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
