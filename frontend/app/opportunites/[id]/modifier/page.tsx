import Link from "next/link";
import { api } from "@/lib/api";
import { Client, Opportunite } from "@/lib/types";
import { OpportuniteForm } from "@/components/OpportuniteForm";

export default async function ModifierOpportunitePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [clients, opportunite] = await Promise.all([
    api.get<Client[]>("/clients"),
    api.get<Opportunite>(`/opportunites/${id}`),
  ]);

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <Link href={`/opportunites/${id}`} className="text-sm text-muted hover:text-ink">
        ← Retour au détail
      </Link>
      <h1 className="mt-4 mb-8 text-2xl font-semibold text-ink">Modifier l&apos;opportunité</h1>
      <OpportuniteForm clients={clients} opportunite={opportunite} />
    </main>
  );
}