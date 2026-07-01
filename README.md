# CRM — Module de suivi commercial

Mini-CRM interne pour la gestion des clients (entreprises/particuliers) et le suivi des opportunités commerciales.

## Stack technique

- **Backend** : NestJS, Prisma, PostgreSQL, TypeScript
- **Frontend** : Next.js (App Router), React, TypeScript, Tailwind CSS v4

## Lancement local

### Prérequis
- Node.js 18+
- PostgreSQL en local (ou accessible via une URL de connexion)

### 1. Backend

\`\`\`bash
cd backend
npm install
cp .env .env
# Éditer .env avec vos identifiants PostgreSQL
npx prisma migrate dev
npx prisma db seed
npm run start:dev
\`\`\`

Le backend tourne sur **http://localhost:3001**.

### 2. Frontend

Dans un second terminal :

\`\`\`bash
cd frontend
npm install
cp .env .env
npm run dev
\`\`\`

Le frontend tourne sur **http://localhost:3000**.

## Fonctionnalités

- CRUD complet des opportunités (création, lecture, modification, suppression)
- Liste avec filtres (étape, type de client) et pagination serveur
- Détection automatique des opportunités "à traiter" (stagnantes ou en retard)
- Récap chiffré du pipeline (valeur totale, répartition par étape, nombre à risque)
- Formulaire de création/édition avec validation

Voir [DECISIONS.md](./DECISIONS.md) pour le détail des choix et hypothèses.