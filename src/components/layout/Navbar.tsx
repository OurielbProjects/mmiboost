'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const { lang, setLang, T } = useLanguage()

  const navLinks = [
    { href: '/', label: T.nav.home },
    { href: '/formules', label: T.nav.formulas },
    { href: '/#benefices', label: T.nav.benefits },
    { href: '/#temoignages', label: T.nav.testimonials },
    { href: '/#faq', label: T.nav.faq },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-[#0A0A0F]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 opacity-40 blur-md group-hover:opacity-70 transition-opacity" />
              <span className="relative z-10 flex items-center justify-center h-full text-white font-bold text-sm font-display">M</span>
            </div>
            <span className="font-display font-bold text-xl text-white tracking-tight">
              MMI <span className="gradient-text">Boost</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? 'text-white bg-white/8'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Language toggle */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language switcher */}
            <div className="flex items-center rounded-lg overflow-hidden border border-white/10 text-xs font-semibold">
              <button
                onClick={() => setLang('fr')}
                className={`px-2.5 py-1.5 transition-colors ${lang === 'fr' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
              >
                FR
              </button>
              <div className="w-px h-4 bg-white/10" />
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1.5 transition-colors ${lang === 'en' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
              >
                EN
              </button>
            </div>
            <Link
              href="/admin"
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors px-2 py-1"
            >
              Admin
            </Link>
            <Link href="/formules" className="btn-primary text-sm py-2.5 px-6">
              {T.nav.cta}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Menu"
          >
            <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'w-5 translate-y-2 rotate-45' : 'w-5'}`} />
            <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'w-0 opacity-0' : 'w-4'}`} />
            <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'w-5 -translate-y-2 -rotate-45' : 'w-5'}`} />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[65px] z-40 md:hidden"
          >
            <div className="mx-4 rounded-2xl border border-white/8 bg-[#111118]/95 backdrop-blur-2xl shadow-2xl p-4">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              {/* Mobile language switcher */}
              <div className="mt-3 flex items-center gap-2 px-4">
                <span className="text-xs text-gray-500">Lang :</span>
                <button
                  onClick={() => setLang('fr')}
                  className={`text-xs font-semibold px-2 py-1 rounded ${lang === 'fr' ? 'bg-white/10 text-white' : 'text-gray-500'}`}
                >FR</button>
                <button
                  onClick={() => setLang('en')}
                  className={`text-xs font-semibold px-2 py-1 rounded ${lang === 'en' ? 'bg-white/10 text-white' : 'text-gray-500'}`}
                >EN</button>
              </div>
              <div className="mt-4 pt-4 border-t border-white/8">
                <Link
                  href="/formules"
                  onClick={() => setMenuOpen(false)}
                  className="btn-primary w-full text-sm py-3"
                >
                  {T.nav.cta} →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
