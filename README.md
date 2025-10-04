🌍 NaBank – NeoBank Camerounaise

NaBank est une néobanque digitale pensée pour le Cameroun et l’Afrique, visant à rendre la banque accessible, simple et innovante.
Elle propose un écosystème financier complet : comptes digitaux, transactions rapides, épargne, transferts, paiements de factures, tontines, cashback et prêts en ligne.

🚀 Objectifs du projet

Offrir une banque 100% digitale simple et sécurisée.

Permettre une inclusion financière pour les populations non bancarisées.

Intégrer Mobile Money, banques locales et partenaires pour faciliter les transactions.

Créer un écosystème collaboratif avec épargne individuelle, projets, et tontines.

Récompenser les utilisateurs avec du cashback et des récompenses.

📱 Fonctionnalités principales
👤 Utilisateurs

Création de compte utilisateur.

Création automatique de comptes bancaires : compte courant + compte épargne.

Affichage en temps réel du solde disponible.

💳 Comptes & Cartes

Consultation des soldes et historiques.

Demande de carte (virtuelle/physique).

Dépôt, retrait et transfert depuis/vers les cartes.

🔄 Transactions

Dépôt et retrait via Mobile Money / banques.

Transfert : NaBank → NaBank, NaBank → externe, NaBank → Mobile Money.

Historique et suivi des transactions.

💰 Épargne & Tontines

Épargne individuelle (objectifs & projets).

Groupes d’épargne collaboratifs (tontines).

Suivi des contributions et distributions.

📑 Paiements

Paiement de factures (électricité, eau, internet, téléphonie).

Cashback et récompenses.

🏦 Prêts

Demande de prêt en ligne.

Suivi des échéances et remboursement.

Gestion par l’admin dashboard (validation & suivi).

⚙️ Plus (More Menu)

Profil utilisateur.

Historique & relevés bancaires.

Sécurité & paramétrage.

Support & assistance.

🛠️ Stack technique

Frontend : Next.js (React + TypeScript), TailwindCSS

Backend : Mansar (customer, accounts, cards, loans and more)

Base de données : Mansar

Authentification : SupaBase Auth (email + password)

Intégration paiement : Mansar

📊 Architecture du projet
/nabank
 ├── /public
 ├── /src
  ├── /app              # Pages Next.js
   ├── /admin           # Admin Dashboard
   ├── /personal        # Individual customer's dashboard
   ├── /business        # Business customer's dashboard
   ├── /api             # Api's routes
   ├── /auth            # Auth pages
  ├── /components       # Composants UI réutilisables
  ├── /hooks            # Context components
  ├── /lib              # API, utils et logique métier
  ├── /public           # Assets (favicon, logos, icônes)
  ├── /styles           # Fichiers TailwindCSS
 └── README.md         # Documentation

🧪 Fonctionnalités déjà implémentées

✅ Création de compte utilisateur
✅ Création automatique du compte bancaire (courant + épargne)
✅ Consultation du solde en temps réel

📝 Roadmap (à venir)

🔹 Gestion complète des transactions (dépôt, retrait, transfert)
🔹 Module cartes virtuelles/physiques
🔹 Module épargne avec projets et tontines
🔹 Module paiements et cashback
🔹 Module prêts en ligne
🔹 Admin dashboard (gestion KYC, transactions, partenaires, prêts)

👨‍💻 Auteur

Développé avec ❤️ par Nuadje Dilan
📧 Contact : nuadjedilan@gmail.com
