import Link from 'next/link'

const footerLinks = {
  services: [
    { label: 'Toutes les formules', href: '/formules' },
    { label: 'Guides PDF', href: '/formules#guides' },
    { label: 'Accompagnement VIP', href: '/formules#vip' },
    { label: 'Stratégies digitales', href: '/#benefices' },
  ],
  company: [
    { label: 'À propos', href: '/#about' },
    { label: 'Témoignages', href: '/#temoignages' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'Contact', href: 'mailto:contact@mmiboost.com' },
  ],
  legal: [
    { label: 'Mentions légales', href: '/legal/mentions' },
    { label: 'Politique de confidentialité', href: '/legal/privacy' },
    { label: 'CGV', href: '/legal/cgv' },
  ],
}

export default function Footer() {
  return (
    <footer className="relative bg-[#050508] border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-900/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600" />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 opacity-40 blur-md" />
                <span className="relative z-10 flex items-center justify-center h-full text-white font-bold text-sm">M</span>
              </div>
              <span className="font-display font-bold text-xl text-white">
                MMI <span className="gradient-text">Boost</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm mb-6">
              Nous propulsons votre présence digitale avec des stratégies éprouvées,
              des guides premium et un accompagnement personnalisé pour atteindre vos objectifs.
            </p>

            {/* Contact */}
            <div className="space-y-2">
              <a href="mailto:contact@mmiboost.com" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                contact@mmiboost.com
              </a>
              <div className="flex items-start gap-2 text-sm text-gray-400">
                <svg className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Medinat Hayehoudim 60, Hertzlya, Israel
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Services</h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Entreprise</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Légal</h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Trust badge */}
            <div className="mt-6 p-3 rounded-xl bg-white/3 border border-white/6">
              <div className="flex items-center gap-2 mb-1">
                <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-xs font-semibold text-green-400">Paiement sécurisé</span>
              </div>
              <p className="text-xs text-gray-500">SSL • Stripe • 100% protégé</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-gradient mb-6" />

        {/* Bottom */}
        <div className="flex items-center justify-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} MMI Call — N° de société : 337921993. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
