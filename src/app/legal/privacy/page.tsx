import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'

export const metadata = {
  title: 'Politique de confidentialité — MMI Boost',
  description: 'Politique de confidentialité et gestion des données personnelles de MMI Boost',
}

export default function PolitiqueConfidentialite() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0A0A0F] pt-28 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl font-bold text-white mb-2">Politique de confidentialité</h1>
          <p className="text-gray-500 text-sm mb-10">Dernière mise à jour : mai 2026</p>

          <div className="space-y-10 text-gray-400 text-sm leading-relaxed">

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">1. Responsable du traitement</h2>
              <p>
                Les données personnelles collectées sur le site mmiboost.com sont traitées par :
              </p>
              <ul className="mt-3 space-y-1 pl-4 border-l border-white/10">
                <li><span className="text-white">Société :</span> MMI CALL</li>
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
              <h2 className="text-white font-semibold text-lg mb-3">2. Données collectées</h2>
              <p>Lors de votre achat ou de votre navigation sur le site, nous collectons les données suivantes :</p>
              <ul className="mt-3 space-y-2 list-disc list-inside pl-2">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Données de paiement (traitées directement par notre prestataire de paiement sécurisé — nous ne stockons pas vos données bancaires)</li>
                <li>Données de navigation (adresse IP, pages visitées, durée de session) via des outils d&apos;analyse anonymisés</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">3. Finalités du traitement</h2>
              <p>Vos données sont utilisées pour :</p>
              <ul className="mt-3 space-y-2 list-disc list-inside pl-2">
                <li>Traiter et confirmer vos commandes</li>
                <li>Vous envoyer votre guide PDF par email</li>
                <li>Vous contacter dans le cadre de votre accompagnement (formules avec suivi)</li>
                <li>Améliorer notre service et notre site</li>
                <li>Vous envoyer des communications commerciales si vous y avez consenti</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">4. Base légale</h2>
              <p>Le traitement de vos données repose sur :</p>
              <ul className="mt-3 space-y-2 list-disc list-inside pl-2">
                <li>L&apos;exécution du contrat (traitement de votre commande)</li>
                <li>Votre consentement (communications marketing)</li>
                <li>Notre intérêt légitime (amélioration du service)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">5. Conservation des données</h2>
              <p>
                Vos données sont conservées pendant la durée nécessaire à l&apos;exécution de nos obligations contractuelles et légales, et au maximum :
              </p>
              <ul className="mt-3 space-y-2 list-disc list-inside pl-2">
                <li>3 ans à compter de votre dernier achat pour les données clients</li>
                <li>13 mois pour les données de navigation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">6. Partage des données</h2>
              <p>
                Vos données ne sont jamais vendues à des tiers. Elles peuvent être partagées avec :
              </p>
              <ul className="mt-3 space-y-2 list-disc list-inside pl-2">
                <li>Notre prestataire de paiement sécurisé</li>
                <li>Notre service d&apos;envoi d&apos;emails transactionnels</li>
                <li>Notre hébergeur (Vercel), dans le cadre du fonctionnement du site</li>
              </ul>
              <p className="mt-2">Ces prestataires s&apos;engagent à traiter vos données conformément à la réglementation applicable.</p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">7. Vos droits</h2>
              <p>Conformément à la réglementation en matière de protection des données, vous disposez des droits suivants :</p>
              <ul className="mt-3 space-y-2 list-disc list-inside pl-2">
                <li><span className="text-white">Droit d&apos;accès</span> : obtenir une copie de vos données</li>
                <li><span className="text-white">Droit de rectification</span> : corriger des données inexactes</li>
                <li><span className="text-white">Droit à l&apos;effacement</span> : demander la suppression de vos données</li>
                <li><span className="text-white">Droit d&apos;opposition</span> : vous opposer à certains traitements</li>
                <li><span className="text-white">Droit à la portabilité</span> : recevoir vos données dans un format lisible</li>
              </ul>
              <p className="mt-3">
                Pour exercer ces droits, contactez-nous à :{' '}
                <a href="mailto:contact@mmiboost.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                  contact@mmiboost.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">8. Cookies</h2>
              <p>
                Le site mmiboost.com peut utiliser des cookies techniques nécessaires au bon fonctionnement du site. Aucun cookie publicitaire ou de tracking tiers n&apos;est déposé sans votre consentement.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">9. Sécurité</h2>
              <p>
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte ou divulgation. Les paiements sont traités via un prestataire certifié PCI-DSS.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">10. Modifications</h2>
              <p>
                Cette politique de confidentialité peut être mise à jour à tout moment. La date de la dernière modification est indiquée en haut de cette page. Nous vous invitons à la consulter régulièrement.
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
