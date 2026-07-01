import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.opportunite.deleteMany();
  await prisma.client.deleteMany();

  const client1 = await prisma.client.create({
    data: {
      type: 'ENTREPRISE',
      raisonSociale: 'Ferme Ben Ali SARL',
      siret: '123456789',
      secteurActivite: 'Agriculture',
      nomContact: 'Ahmed Ben Ali',
      email: 'contact@fermebenali.tn',
      telephone: '20123456',
    },
  });

  const client2 = await prisma.client.create({
    data: {
      type: 'PARTICULIER',
      nom: 'Trabelsi',
      prenom: 'Sami',
      email: 'sami.trabelsi@email.com',
      telephone: '25987654',
    },
  });

  await prisma.opportunite.create({
    data: {
      titre: 'Installation capteurs irrigation',
      montant: 15000,
      dateSignaturePrevue: new Date('2026-06-01'), // date passée -> en retard
      etape: 'NEGOCIATION',
      clientId: client1.id,
      updatedAt: new Date('2026-05-01'), // ancien -> stagnante aussi
    },
  });

  await prisma.opportunite.create({
    data: {
      titre: 'Abonnement suivi satellite',
      montant: 3000,
      dateSignaturePrevue: new Date('2026-08-01'), // future -> pas en retard
      etape: 'PROSPECTION',
      clientId: client2.id,
    },
  });

  await prisma.opportunite.create({
    data: {
      titre: 'Vente drone agricole',
      montant: 25000,
      dateSignaturePrevue: new Date('2026-07-15'),
      etape: 'GAGNE',
      clientId: client1.id,
    },
  });

  console.log('Seed terminé ✅');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());