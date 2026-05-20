# MMI Boost – Site Web Premium

Site web complet pour MMI Boost, entreprise de conseils en stratégies digitales et réseaux sociaux.

## 🚀 Démarrage rapide

```bash
# 1. Se placer dans le répertoire du projet
cd mmiboost

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement
npm run dev
```

Le site est disponible sur : **http://localhost:3000**

---

## 📁 Architecture du projet

```
src/
├── app/
│   ├── layout.tsx              ← Layout global + SEO metadata
│   ├── page.tsx                ← Page d'accueil (Home)
│   ├── globals.css             ← Styles globaux + classes utilitaires
│   ├── sitemap.ts              ← Sitemap automatique
│   ├── robots.ts               ← Robots.txt
│   ├── not-found.tsx           ← Page 404
│   ├── formules/
│   │   └── page.tsx            ← Page Formules / Pricing (13 niveaux)
│   ├── checkout/
│   │   └── page.tsx            ← Tunnel d'achat (2 étapes)
│   ├── success/
│   │   └── page.tsx            ← Page de confirmation + téléchargement
│   └── admin/
│       └── page.tsx            ← Dashboard administrateur
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          ← Navigation responsive + animation
│   │   └── Footer.tsx          ← Footer complet avec liens
│   ├── sections/
│   │   ├── Hero.tsx            ← Section héros impactante
│   │   ├── Benefits.tsx        ← Bénéfices + processus en 4 étapes
│   │   ├── Testimonials.tsx    ← Témoignages clients (6)
│   │   ├── FAQ.tsx             ← Accordion FAQ (8 questions)
│   │   └── PricingCard.tsx     ← Carte de formule réutilisable
│   └── ui/
│       ├── AnimatedSection.tsx ← Composant d'animation scroll
│       └── SectionBadge.tsx    ← Badge de section
│
└── lib/
    └── data.ts                 ← Données centralisées (formules, témoignages, FAQ)
```

---

## 💎 Pages & fonctionnalités

### Home (`/`)
- Hero avec statistiques animées
- Section bénéfices (6 cards)
- Processus en 4 étapes
- 6 témoignages clients avec badges de croissance
- FAQ accordéon (8 questions)
- Footer complet

### Formules (`/formules`)
- 13 formules réparties en 4 catégories : Starter, Growth, Premium, VIP
- Cards premium avec effets hover
- Badges populaire / VIP
- Logique prix : ≤£100 = PDF uniquement · >£100 = PDF + suivi personnalisé

### Checkout (`/checkout?formula=ID`)
- Étape 1 : Informations personnelles
- Étape 2 : Paiement (mockup carte bancaire visuelle)
- Récapitulatif de commande sticky
- Validation des champs
- Animation de traitement (2.2s)

### Succès (`/success`)
- Animation de confirmation (confettis)
- Bouton de téléchargement PDF
- Instructions d'onboarding en 3 étapes
- Notification suivi VIP si applicable

### Admin (`/admin`)
- **Mot de passe demo : `mmiboost2024`**
- Tableau de bord avec KPIs et graphique
- Gestion des formules : modifier prix, nom, description, durée de suivi
- Liste des commandes avec statuts

---

## 🎨 Design System

### Palette
| Couleur | Hex |
|--------|-----|
| Fond principal | `#0A0A0F` |
| Fond secondaire | `#111118` |
| Bleu électrique | `#3B82F6` |
| Violet premium | `#7C3AED` |
| Texte | `#F9FAFB` |
| Texte secondaire | `#9CA3AF` |

### Classes utilitaires CSS
- `.gradient-text` — texte dégradé bleu→violet
- `.gradient-text-gold` — texte dégradé or (VIP)
- `.glass` — effet glassmorphism
- `.btn-primary` — bouton dégradé
- `.btn-secondary` — bouton glass
- `.card-glow` — carte avec bordure dégradée
- `.section` — section avec padding standard
- `.container-xl` — conteneur max-w-7xl centré

---

## ⚙️ Configuration

### Modifier les prix et contenus
Tous les contenus sont centralisés dans `src/lib/data.ts` :
- `formulas[]` — les 13 formules avec prix, bénéfices, descriptions
- `testimonials[]` — les 6 témoignages
- `faqs[]` — les 8 questions FAQ

### Mettre à jour les coordonnées
Chercher et remplacer les placeholders dans `Footer.tsx` :
- `contact@mmiboost.com`
- `+XX (XX) XX XX XX XX`
- `Londres, United Kingdom`
- Liens réseaux sociaux

### Activer le vrai paiement (Stripe)
1. Installer Stripe : `npm install @stripe/stripe-js stripe`
2. Créer `src/app/api/checkout/route.ts` avec Stripe Checkout Sessions
3. Remplacer la logique mock dans `checkout/page.tsx`

### Activer le vrai envoi d'email
1. Utiliser Resend, SendGrid, ou Mailgun
2. Créer `src/app/api/send-guide/route.ts`
3. Déclencher depuis la page success

---

## 🔧 Scripts disponibles

```bash
npm run dev      # Développement (http://localhost:3000)
npm run build    # Build de production
npm run start    # Démarrer en production
npm run lint     # Linter ESLint
```

---

## 📦 Stack technique

- **Next.js 14** — App Router, SSR/SSG
- **TypeScript** — typage strict
- **TailwindCSS** — styling utility-first
- **Framer Motion** — animations premium
- **Google Fonts** — Inter + Space Grotesk

---

## 🚢 Déploiement (Vercel recommandé)

```bash
# Via CLI Vercel
npx vercel

# Ou connecter le repo GitHub à vercel.com
```

Variables d'environnement à configurer en production :
```
NEXT_PUBLIC_SITE_URL=https://mmiboost.com
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
```

---

*Site développé pour MMI Boost · Design premium · © 2024*
