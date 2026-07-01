# Décisions & hypothèses

## 1. Champs client (entreprise vs particulier)

J'ai choisi un modèle unique `Client` avec un champ `type` (enum) plutôt que deux tables séparées, pour simplifier les requêtes et les relations avec les opportunités (une seule clé étrangère).

- **Particulier** : nom, prénom, email, téléphone, adresse
- **Entreprise** : raisonSociale, siret, secteurActivite, nomContact, email, téléphone, adresse

Les champs spécifiques sont optionnels au niveau du schéma (nullable), la cohérence est garantie par la validation applicative (DTO) plutôt que par la contrainte SQL, pour rester flexible.

**Alternative envisagée** : deux tables séparées `Entreprise` et `Particulier` avec une relation polymorphe vers `Client`. Rejetée pour ce périmètre car elle complexifie le CRUD sans bénéfice réel à cette échelle.

## 2. Opportunité "à problème"

Une opportunité est considérée à problème si elle n'est pas dans une étape finale (Gagné/Perdu) ET si l'une de ces conditions est vraie :

- **En retard** : la date de signature prévue est dépassée
- **Stagnante** : aucune mise à jour depuis plus de 21 jours

Le seuil de 21 jours a été choisi car un cycle de vente commercial classique dure environ un mois ; au-delà de 3 semaines sans mouvement sur une opportunité active, c'est un signal d'alerte raisonnable pour une équipe commerciale.

Le calcul est fait côté backend et exposé via un champ `estAProblem` dans la réponse API, pour que le frontend n'ait qu'à l'afficher (logique métier centralisée, pas dupliquée côté client).

## 3. Indicateur de pipeline

Le récap du pipeline expose :
- La **valeur totale** des opportunités (toutes étapes confondues)
- Le **nombre total** d'opportunités
- Le **nombre à risque** (stagnantes ou en retard)
- La **répartition par étape** (nombre + montant)

Ce choix donne une vue à la fois quantitative (combien) et qualitative (où sont les risques) du pipeline, utile pour un manager commercial en un coup d'œil. La visualisation frontend (barre segmentée proportionnelle par étape) rend cette répartition immédiatement lisible.

## Ce que je ferais avec plus de temps

- Tests unitaires (service de calcul `estAProblem`, endpoints critiques)
- Authentification (actuellement l'API est ouverte)
- Historique des changements d'étape (pour affiner la logique de stagnation avec un vrai suivi d'activité plutôt que `updatedAt`)
- Recherche texte libre sur les opportunités/clients