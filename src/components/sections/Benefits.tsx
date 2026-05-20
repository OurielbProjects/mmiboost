'use client'

import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionBadge from '@/components/ui/SectionBadge'
import { useLanguage } from '@/lib/i18n/LanguageContext'

const colors = [
  { color: 'from-blue-500/20 to-blue-600/10', border: 'border-blue-500/20', glow: 'shadow-blue-500/10' },
  { color: 'from-violet-500/20 to-violet-600/10', border: 'border-violet-500/20', glow: 'shadow-violet-500/10' },
  { color: 'from-green-500/20 to-emerald-600/10', border: 'border-green-500/20', glow: 'shadow-green-500/10' },
  { color: 'from-amber-500/20 to-orange-600/10', border: 'border-amber-500/20', glow: 'shadow-amber-500/10' },
  { color: 'from-pink-500/20 to-rose-600/10', border: 'border-pink-500/20', glow: 'shadow-pink-500/10' },
  { color: 'from-cyan-500/20 to-teal-600/10', border: 'border-cyan-500/20', glow: 'shadow-cyan-500/10' },
]

export default function Benefits() {
  const { T } = useLanguage()
  const b = T.benefits

  return (
    <>
      {/* Benefits section */}
      <section id="benefices" className="section bg-[#0A0A0F] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-10"
            style={{ background: 'radial-gradient(ellipse, #3B82F6 0%, transparent 60%)' }}
          />
        </div>

        <div className="container-xl relative z-10">
          <AnimatedSection className="text-center mb-16">
            <SectionBadge icon="✨">{b.badge}</SectionBadge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">
              {b.title1}
              <br />
              {b.title2} <span className="gradient-text">{b.titleGradient}</span> {b.title3}
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">{b.desc}</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {b.items.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.08}>
                <div
                  className={`group h-full p-6 rounded-2xl bg-gradient-to-br ${colors[i].color} border ${colors[i].border} shadow-lg ${colors[i].glow} hover:scale-[1.02] hover:shadow-xl transition-all duration-300 cursor-default`}
                >
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="font-display text-lg font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process section */}
      <section className="section bg-[#080810] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="divider-gradient absolute top-0 left-0 right-0" />
          <div className="divider-gradient absolute bottom-0 left-0 right-0" />
        </div>

        <div className="container-xl relative z-10">
          <AnimatedSection className="text-center mb-16">
            <SectionBadge icon="🗺️">{b.processBadge}</SectionBadge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">
              {b.processTitle1}{' '}
              <span className="gradient-text">{b.processTitleGradient}</span>
            </h2>
          </AnimatedSection>

          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {b.process.map((p, i) => (
                <AnimatedSection key={p.step} delay={i * 0.12} className="relative">
                  <div className="text-center">
                    <div
                      className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5 relative z-10"
                      style={{
                        background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(124,58,237,0.2))',
                        border: '1px solid rgba(59,130,246,0.3)',
                      }}
                    >
                      <span className="font-display text-xl font-bold gradient-text">{p.step}</span>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-white mb-3">{p.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{p.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* CTA band */}
          <AnimatedSection delay={0.4} className="mt-16">
            <div
              className="relative overflow-hidden rounded-3xl p-10 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(124,58,237,0.15))',
                border: '1px solid rgba(59,130,246,0.2)',
              }}
            >
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(circle, #7C3AED, transparent)' }}
              />
              <h3 className="font-display text-3xl font-bold text-white mb-3">{b.ctaTitle}</h3>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto">{b.ctaDesc}</p>
              <a href="/formules" className="btn-primary inline-flex text-base px-10 py-4">
                {b.ctaButton}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
