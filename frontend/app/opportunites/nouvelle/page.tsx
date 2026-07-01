import Link from "next/link";
import { api } from "@/lib/api";
import { Client } from "@/lib/types";
import { OpportuniteForm } from "@/components/OpportuniteForm";

export default async function NouvelleOpportunitePage() {
  const clients = await api.get<Client[]>("/clients");

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <Link href="/opportunites" className="text-sm text-muted hover:text-ink">
        ← Retour à la liste
      </Link>
      <h1 className="mt-4 mb-8 text-2xl font-semibold text-ink">Nouvelle opportunité</h1>
      <OpportuniteForm clients={clients} />
    </main>
  );
}