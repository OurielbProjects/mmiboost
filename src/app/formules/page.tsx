'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PricingCard from '@/components/sections/PricingCard'
import { formulas } from '@/lib/data'
import type { Formula } from '@/lib/data'
import { useLanguage } from '@/lib/i18n/LanguageContext'

type CategoryKey = Formula['category']

const categoryIcons: Record<CategoryKey, string> = {
  starter: '🌱',
  growth: '🚀',
  premium: '💎',
  vip: '👑',
}

const categoryOrder: CategoryKey[] = ['starter', 'growth', 'premium', 'vip']

export default function FormulesPage() {
  const { T } = useLanguage()
  const p = T.pricing

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0A0A0F]">

        {/* Hero */}
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] opacity-15 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, #7C3AED, transparent)' }} />
            <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] opacity-10 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, #3B82F6, transparent)' }} />
            <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.25)' }}>
              <span className="text-violet-400 text-sm font-medium">{p.badge}</span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {p.title1}{' '}
              <span className="gradient-text">{p.titleGradient}</span>
            </h1>

            <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-8 leading-relaxed">{p.desc}</p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {p.props.map((item) => (
                <div key={item.text} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm text-gray-300" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <span>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing grid by category */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-20">
          {categoryOrder.map((key) => {
            const group = p.categories[key]
            const groupFormulas = formulas.filter((f) => f.category === key)
            return (
              <div key={key} id={key === 'vip' ? 'vip' : key}>
                {/* Group header */}
                <div className="text-center mb-10">
                  <div
                    className="inline-flex items-center gap-3 px-5 py-2 rounded-full mb-4"
                    style={{
                      background: key === 'vip' ? 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(124,58,237,0.15))' : 'rgba(255,255,255,0.04)',
                      border: key === 'vip' ? '1px solid rgba(245,158,11,0.25)' : '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <span className="text-xl">{categoryIcons[key]}</span>
                    <span className={`font-display text-lg font-bold ${key === 'vip' ? 'gradient-text-gold' : 'text-white'}`}>
                      {p.categoryPrefix ? `${p.categoryPrefix} ${group.label}` : group.label}
                    </span>
                  </div>
                  <p className="text-gray-400">{group.description}</p>

                  {key === 'vip' && (
                    <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-amber-300" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {p.vipNote}
                    </div>
                  )}
                </div>

                <div className={`grid gap-5 ${
                  groupFormulas.length === 2 ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto'
                  : groupFormulas.length === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  : groupFormulas.length === 4 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                }`}>
                  {groupFormulas.map((formula, i) => (
                    <PricingCard key={formula.id} formula={formula} index={i} />
                  ))}
                </div>
              </div>
            )
          })}

          {/* Bottom CTA */}
          <div className="relative overflow-hidden rounded-3xl p-10 sm:p-14 text-center" style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(124,58,237,0.12))', border: '1px solid rgba(59,130,246,0.2)' }}>
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, #7C3AED, transparent)' }} />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl opacity-15 pointer-events-none" style={{ background: 'radial-gradient(circle, #3B82F6, transparent)' }} />
            <div className="relative z-10">
              <div className="text-4xl mb-4">🤔</div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">{p.ctaTitle}</h2>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto text-lg">{p.ctaDesc}</p>
              <a href="mailto:contact@mmiboost.com" className="btn-primary inline-flex text-base px-10 py-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {p.ctaBtn}
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
