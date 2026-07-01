import Link from "next/link";
import { notFound } from "next/navigation";
import { api, ApiError } from "@/lib/api";
import { Opportunite } from "@/lib/types";
import { EtapeBadge, ProblemeBadge } from "@/components/Badge";
import { LABELS_ETAPE, COULEURS_ETAPE, formatMontant, formatDate, nomClient } from "@/lib/format";

export default async function OpportuniteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let opportunite: Opportunite;
  try {
    opportunite = await api.get<Opportunite>(`/opportunites/${id}`);
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) notFound();
    throw e;
  }

  const client = opportunite.client;

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <Link href="/opportunites" className="text-sm text-muted hover:text-ink">
        ← Retour à la liste
      </Link>

      <div className="mt-4 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink">{opportunite.titre}</h1>
          <div className="mt-2 flex items-center gap-2">
            <EtapeBadge
              etape={opportunite.etape}
              label={LABELS_ETAPE[opportunite.etape]}
              couleur={COULEURS_ETAPE[opportunite.etape]}
            />
            {opportunite.estAProblem && <ProblemeBadge />}
          </div>
        </div>
        <Link
          href={`/opportunites/${id}/modifier`}
          className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-ink hover:bg-bg"
        >
          Modifier
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="text-sm text-muted">Montant</p>
          <p className="mt-1 font-mono text-2xl font-semibold text-ink">
            {formatMontant(opportunite.montant)}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="text-sm text-muted">Signature prévue</p>
          <p className="mt-1 font-mono text-2xl font-semibold text-ink">
            {formatDate(opportunite.dateSignaturePrevue)}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-border bg-surface p-5">
        <p className="mb-3 text-sm font-medium text-muted">Client</p>
        {client ? (
          <div className="space-y-2 text-sm">
            <p className="text-lg font-medium text-ink">{nomClient(client)}</p>
            <p className="text-muted">
              {client.type === "ENTREPRISE" ? "Entreprise" : "Particulier"}
            </p>
            {client.email && <p className="text-ink">{client.email}</p>}
            {client.telephone && <p className="text-ink">{client.telephone}</p>}
            {client.type === "ENTREPRISE" && client.secteurActivite && (
              <p className="text-muted">Secteur : {client.secteurActivite}</p>
            )}
          </div>
        ) : (
          <p className="text-muted">Aucun client associé</p>
        )}
      </div>
    </main>
  );
}