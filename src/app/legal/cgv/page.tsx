import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'

export const metadata = {
  title: 'Conditions Générales de Vente — MMI Boost',
  description: 'Conditions générales de vente des guides et accompagnements MMI Boost',
}

export default function CGV() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0A0A0F] pt-28 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl font-bold text-white mb-2">Conditions Générales de Vente</h1>
          <p className="text-gray-500 text-sm mb-10">Dernière mise à jour : mai 2026</p>

          <div className="space-y-10 text-gray-400 text-sm leading-relaxed">

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">1. Identification du vendeur</h2>
              <ul className="space-y-1 pl-4 border-l border-white/10">
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
              <h2 className="text-white font-semibold text-lg mb-3">2. Objet</h2>
              <p>
                Les présentes Conditions Générales de Vente (CGV) régissent les ventes de produits et services proposés par MMI CALL via le site mmiboost.com, notamment :
              </p>
              <ul className="mt-3 space-y-2 list-disc list-inside pl-2">
                <li>Les guides PDF numériques sur la croissance digitale et les réseaux sociaux</li>
                <li>Les formules d&apos;accompagnement personnalisé</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">3. Produits et services</h2>
              <p>
                Les guides PDF sont des produits numériques téléchargeables. Ils sont accessibles immédiatement après confirmation de paiement, via un lien de téléchargement sécurisé envoyé à l&apos;adresse email fournie lors de la commande.
              </p>
              <p className="mt-2">
                Les formules avec accompagnement incluent un suivi personnalisé par email ou visioconférence dont les modalités sont précisées dans la description de chaque formule.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">4. Prix</h2>
              <p>
                Les prix sont indiqués en livres sterling (£) et sont valables au moment de la commande. MMI CALL se réserve le droit de modifier ses prix à tout moment, sans préavis, les prix applicables étant ceux en vigueur au moment du paiement.
              </p>
              <p className="mt-2">
                Les prix affichés sont des prix nets. En fonction de votre pays de résidence, des taxes locales peuvent s&apos;appliquer.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">5. Commande et paiement</h2>
              <p>
                La commande est finalisée après saisie des informations de paiement et validation. Le paiement est effectué en ligne de manière sécurisée. En passant commande, le client accepte les présentes CGV.
              </p>
              <p className="mt-2">
                Une confirmation de commande est envoyée par email à l&apos;adresse fournie dans les minutes suivant le paiement.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">6. Droit de rétractation</h2>
              <p>
                Conformément à la réglementation applicable sur les biens numériques, <strong className="text-white">le droit de rétractation ne s&apos;applique pas</strong> aux guides PDF dès lors que le téléchargement a commencé, le client ayant expressément renoncé à son droit de rétractation en procédant au téléchargement.
              </p>
              <p className="mt-2">
                Pour les formules avec accompagnement, un délai de rétractation de <strong className="text-white">14 jours</strong> à compter de la date de commande s&apos;applique, à condition qu&apos;aucune prestation n&apos;ait débuté.
              </p>
              <p className="mt-2">
                Pour exercer votre droit de rétractation, contactez-nous à :{' '}
                <a href="mailto:contact@mmiboost.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                  contact@mmiboost.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">7. Livraison des produits numériques</h2>
              <p>
                Les guides PDF sont livrés par email immédiatement après confirmation du paiement. Un lien de téléchargement valable 24 heures est également accessible depuis la page de confirmation.
              </p>
              <p className="mt-2">
                En cas de non-réception de l&apos;email dans les 30 minutes suivant votre achat, vérifiez votre dossier spam ou contactez-nous à contact@mmiboost.com.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">8. Propriété intellectuelle</h2>
              <p>
                L&apos;ensemble des contenus vendus (guides PDF, méthodes, textes) reste la propriété exclusive de MMI CALL. L&apos;achat d&apos;un guide vous confère un droit d&apos;usage personnel et non commercial. Toute reproduction, revente, redistribution ou partage non autorisé est interdit et constitue une violation des droits d&apos;auteur.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">9. Responsabilité</h2>
              <p>
                Les informations et stratégies contenues dans les guides sont fournies à titre éducatif. Les résultats obtenus dépendent de l&apos;investissement personnel de chaque client et ne peuvent être garantis. MMI CALL ne saurait être tenu responsable des résultats obtenus ou non obtenus par l&apos;application des conseils prodigués.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">10. Protection des données</h2>
              <p>
                Les données personnelles collectées lors de la commande sont traitées conformément à notre{' '}
                <Link href="/legal/privacy" className="text-blue-400 hover:text-blue-300 transition-colors">
                  politique de confidentialité
                </Link>.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">11. Droit applicable et litiges</h2>
              <p>
                Les présentes CGV sont soumises au droit israélien. En cas de litige, les parties s&apos;engagent à rechercher une solution amiable avant tout recours judiciaire. À défaut, le litige sera soumis aux juridictions compétentes du ressort du siège social de MMI CALL.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-3">12. Contact</h2>
              <p>
                Pour toute question relative à votre commande ou aux présentes CGV :{' '}
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
