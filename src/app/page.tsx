import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Benefits from '@/components/sections/Benefits'
import Testimonials from '@/components/sections/Testimonials'
import FAQ from '@/components/sections/FAQ'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MMI Boost – Stratégies Digitales Premium & Croissance Réseaux Sociaux',
  description:
    'Propulsez votre présence digitale avec MMI Boost. Guides premium, stratégies éprouvées et accompagnement VIP pour dominer vos réseaux sociaux.',
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Benefits />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
