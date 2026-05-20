import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'

export const metadata = {
  title: 'Mentions légales — MMI Boost',
  description: 'Mentions légales de MMI Boost',
}

export default function MentionsLegales() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0A0A0F] pt-28 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl font-bold text-white mb-2">Mentions légales</h1>
          <p className="text-gray-500 text-sm mb-10">Dernière mise à jour : mai 2026</p>

          <div className="space-y-10 text-gray-400 text-sm leading-relaxed">

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">1. Éditeur du site</h2>
              <p>Le site <strong className="text-white">mmiboost.com</strong> est édité par :</p>
              <ul className="mt-3 space-y-1 pl-4 border-l border-white/10">
                <li><span className="text-white">Raison sociale :</span> MMI CALL</li>
                <li><span className="text-white">Numéro de société :</span> 337921993</li>
                <li><span className="text-white">Adresse :</span> Medinat Hayehoudim 60, Hertzlya, Israel</li>
                <li><span className="text-white">Email :</span>{' '}
                  <a href="mailto:contact@mmiboost.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                    contact@mmiboost.com
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">2. Directeur de la publication</h2>
              <p>Le directeur de la publication est le représentant légal de la société MMI CALL.</p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">3. Hébergement</h2>
              <p>Le site est hébergé par :</p>
              <ul className="mt-3 space-y-1 pl-4 border-l border-white/10">
                <li><span className="text-white">Hébergeur :</span> Vercel Inc.</li>
                <li><span className="text-white">Adresse :</span> 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis</li>
                <li><span className="text-white">Site :</span>{' '}
                  <span className="text-blue-400">vercel.com</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">4. Propriété intellectuelle</h2>
              <p>
                L&apos;ensemble des contenus présents sur le site mmiboost.com (textes, images, guides PDF, graphismes, logos, icônes) est la propriété exclusive de MMI CALL et est protégé par les lois en vigueur sur la propriété intellectuelle.
              </p>
              <p className="mt-2">
                Toute reproduction, distribution, modification ou utilisation de ces contenus sans autorisation écrite préalable est strictement interdite.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">5. Limitation de responsabilité</h2>
              <p>
                MMI CALL s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, MMI CALL ne peut garantir l&apos;exactitude, la précision ou l&apos;exhaustivité des informations mises à disposition.
              </p>
              <p className="mt-2">
                Les résultats obtenus par l&apos;application des stratégies contenues dans les guides peuvent varier en fonction de l&apos;investissement personnel et du contexte de chaque utilisateur. MMI CALL ne garantit pas de résultats spécifiques.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">6. Droit applicable</h2>
              <p>
                Le présent site et ses mentions légales sont soumis au droit israélien. En cas de litige, et à défaut de résolution amiable, les tribunaux compétents seront ceux du ressort du siège social de MMI CALL.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">7. Contact</h2>
              <p>
                Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter à l&apos;adresse suivante :{' '}
                <a href="mailto:contact@mmiboost.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                  contact@mmiboost.com
                </a>
              </p>
            </section>

          </div>

          <div className="mt-12 pt-8 border-t border-white/5">
            <Link href="/" className="text-sm text-gray-500 hover:text-white transition-colors">
              ← Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
