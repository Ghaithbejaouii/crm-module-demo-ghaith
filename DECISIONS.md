# Décisions & hypothèses

## 1. Champs client (entreprise vs particulier)
- Particulier : nom, prénom, email, téléphone
- Entreprise : raisonSociale, siret, secteurActivite, nomContact
- Communs : adresse, dateCreation

## 2. Opportunité "à problème"
- En retard : dateSignaturePrevue < aujourd'hui ET étape non finale
- Stagnante : pas de mise à jour (updatedAt) depuis plus de 21 jours ET étape non finale

## 3. Indicateur de pipeline
- Valeur totale des opportunités en cours
- Répartition (nombre + montant) par étape
- Nombre d'opportunités à risque (stagnantes ou en retard)