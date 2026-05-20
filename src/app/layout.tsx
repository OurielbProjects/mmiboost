import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Providers from '@/components/layout/Providers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mmiboost.com'),
  title: {
    default: 'MMI Boost – Stratégies Digitales Premium & Croissance Réseaux Sociaux',
    template: '%s | MMI Boost',
  },
  description:
    'MMI Boost propulse votre présence digitale avec des stratégies sur mesure, des guides premium et un accompagnement personnalisé. Transformez votre business en ligne dès aujourd\'hui.',
  keywords: [
    'stratégie digitale',
    'réseaux sociaux',
    'croissance instagram',
    'marketing digital',
    'guides premium',
    'accompagnement personnalisé',
    'MMI Boost',
    'présence en ligne',
    'consultant réseaux sociaux',
  ],
  authors: [{ name: 'MMI Boost' }],
  creator: 'MMI Boost',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://mmiboost.com',
    siteName: 'MMI Boost',
    title: 'MMI Boost – Stratégies Digitales Premium',
    description:
      'Propulsez votre présence digitale avec MMI Boost. Stratégies sur mesure, guides premium et accompagnement VIP.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MMI Boost – Stratégies Digitales Premium',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MMI Boost – Stratégies Digitales Premium',
    description: 'Propulsez votre présence digitale avec MMI Boost.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-[#0A0A0F] text-white antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
