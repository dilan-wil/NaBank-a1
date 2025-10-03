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

Backend : Firebase (Auth, Firestore, Storage, Functions)

Base de données : Firestore (NoSQL)

Authentification : Firebase Auth (email/phone + password, OTP)

Intégration paiement : Mobile Money API, Banking API (mock pour démo)

📊 Architecture du projet
/nabank
 ├── /app              # Pages Next.js
 ├── /components       # Composants UI réutilisables
 ├── /lib              # API, utils et logique métier
 ├── /public           # Assets (favicon, logos, icônes)
 ├── /styles           # Fichiers TailwindCSS
 ├── firebase.json     # Config Firebase
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
