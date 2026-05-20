'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionBadge from '@/components/ui/SectionBadge'
import { testimonials } from '@/lib/data'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-amber-400' : 'text-gray-600'}`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [active, setActive] = useState(0)

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length)
  const next = () => setActive((a) => (a + 1) % testimonials.length)

  return (
    <section id="temoignages" className="section bg-[#0A0A0F] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] opacity-10"
          style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-0 left-0 w-[400px] h-[400px] opacity-8"
          style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)' }}
        />
      </div>

      <div className="container-xl relative z-10">
        <AnimatedSection className="text-center mb-16">
          <SectionBadge icon="⭐">Témoignages clients</SectionBadge>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">
            Ils ont transformé leur{' '}
            <span className="gradient-text">présence digitale</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Des résultats réels, des clients réels. Découvrez ce que MMI Boost a changé dans leur vie.
          </p>
        </AnimatedSection>

        {/* Grid testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.id} delay={i * 0.07}>
              <div className="glass rounded-2xl p-6 h-full glass-hover transition-all duration-300 cursor-default group">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #3B82F6, #7C3AED)' }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{t.name}</p>
                      <p className="text-xs text-gray-500">{t.role}</p>
                    </div>
                  </div>
                  {/* Growth badge */}
                  <div className="px-2.5 py-1 rounded-full text-xs font-bold text-green-400 bg-green-400/10 border border-green-400/20 flex-shrink-0">
                    {t.growth}
                  </div>
                </div>

                <StarRating rating={t.rating} />

                <p className="text-sm text-gray-300 leading-relaxed mt-3 mb-4">
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="text-xs text-blue-400 font-medium border-t border-white/5 pt-3">
                  {t.formula}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Trust indicators */}
        <AnimatedSection delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            {[
              { icon: '🏆', value: '2 400+', label: 'Clients actifs' },
              { icon: '⭐', value: '4.9/5', label: 'Note moyenne' },
              { icon: '📦', value: '8 500+', label: 'Guides livrés' },
              { icon: '🔄', value: '78%', label: 'Clients récurrents' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div className="text-left">
                  <div className="font-display text-xl font-bold gradient-text">{item.value}</div>
                  <div className="text-xs text-gray-500">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
