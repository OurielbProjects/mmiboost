'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionBadge from '@/components/ui/SectionBadge'
import { faqs } from '@/lib/data'

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <AnimatedSection delay={index * 0.05}>
      <div
        className={`rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${
          open
            ? 'border-blue-500/30 bg-blue-500/5'
            : 'border-white/6 bg-white/2 hover:border-white/12 hover:bg-white/4'
        }`}
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center justify-between gap-4 p-5 sm:p-6">
          <h3 className="text-sm sm:text-base font-medium text-white pr-4">{faq.question}</h3>
          <div
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              open
                ? 'bg-blue-500/20 text-blue-400 rotate-180'
                : 'bg-white/5 text-gray-400'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-white/5">
                <p className="text-sm text-gray-400 leading-relaxed pt-4">{faq.answer}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatedSection>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="section bg-[#080810] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="divider-gradient absolute top-0 left-0 right-0" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] opacity-8"
          style={{ background: 'radial-gradient(ellipse, #3B82F6 0%, transparent 70%)' }}
        />
      </div>

      <div className="container-xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <AnimatedSection>
            <SectionBadge icon="💬">FAQ</SectionBadge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">
              Questions{' '}
              <span className="gradient-text">fréquentes</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Tout ce que vous devez savoir sur nos formules, nos guides et
              nos accompagnements VIP.
            </p>

            <div
              className="p-6 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(124,58,237,0.1))',
                border: '1px solid rgba(59,130,246,0.2)',
              }}
            >
              <div className="text-2xl mb-3">💬</div>
              <h3 className="font-semibold text-white mb-2">Vous avez une autre question ?</h3>
              <p className="text-sm text-gray-400 mb-4">
                Notre équipe est disponible pour répondre à toutes vos questions
                dans les 24 heures.
              </p>
              <a
                href="mailto:contact@mmiboost.com"
                className="btn-primary text-sm py-2.5 px-6 inline-flex"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Nous contacter
              </a>
            </div>
          </AnimatedSection>

          {/* Right – accordion */}
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
