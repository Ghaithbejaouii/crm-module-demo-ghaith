-- CreateEnum
CREATE TYPE "TypeClient" AS ENUM ('ENTREPRISE', 'PARTICULIER');

-- CreateEnum
CREATE TYPE "EtapePipeline" AS ENUM ('PROSPECTION', 'QUALIFICATION', 'PROPOSITION', 'NEGOCIATION', 'GAGNE', 'PERDU');

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "type" "TypeClient" NOT NULL,
    "email" TEXT,
    "telephone" TEXT,
    "adresse" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nom" TEXT,
    "prenom" TEXT,
    "raisonSociale" TEXT,
    "siret" TEXT,
    "secteurActivite" TEXT,
    "nomContact" TEXT,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "opportunites" (
    "id" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "montant" DECIMAL(12,2) NOT NULL,
    "dateSignaturePrevue" TIMESTAMP(3) NOT NULL,
    "etape" "EtapePipeline" NOT NULL DEFAULT 'PROSPECTION',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "opportunites_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "opportunites" ADD CONSTRAINT "opportunites_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
