import Link from "next/link";
import { api } from "@/lib/api";
import { Opportunite, PaginatedOpportunites, PipelineRecap } from "@/lib/types";
import { PipelineBar } from "@/components/PipelineBar";
import { Filters } from "@/components/Filters";
import { EtapeBadge, ProblemeBadge } from "@/components/Badge";
import { LABELS_ETAPE, COULEURS_ETAPE, formatMontant, formatDate, nomClient } from "@/lib/format";

export default async function OpportunitesPage({
  searchParams,
}: {
  searchParams: Promise<{ etape?: string; typeClient?: string; page?: string }>;
}) {
  const params = await searchParams;
  const query = new URLSearchParams();
  if (params.etape) query.set("etape", params.etape);
  if (params.typeClient) query.set("typeClient", params.typeClient);
  if (params.page) query.set("page", params.page);

  const [recap, result] = await Promise.all([
    api.get<PipelineRecap>("/opportunites/pipeline/recap"),
    api.get<PaginatedOpportunites>(`/opportunites?${query.toString()}`),
  ]);

  const { data: opportunites, meta } = result;

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Opportunités</h1>
          <p className="text-sm text-muted">Suivi du pipeline commercial</p>
        </div>
        <Link
          href="/opportunites/nouvelle"
          className="rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
        >
          + Nouvelle opportunité
        </Link>
      </div>

      <div className="mb-6">
        <PipelineBar recap={recap} etapeActive={params.etape} />
      </div>

      <div className="mb-4">
        <Filters />
      </div>

      {opportunites.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-surface p-12 text-center">
          <p className="text-ink font-medium">Aucune opportunité trouvée</p>
          <p className="mt-1 text-sm text-muted">Ajuste tes filtres ou crée une nouvelle opportunité.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-bg text-left text-xs uppercase tracking-wide text-muted">
                <th className="px-5 py-3 font-medium">Opportunité</th>
                <th className="px-5 py-3 font-medium">Client</th>
                <th className="px-5 py-3 font-medium">Étape</th>
                <th className="px-5 py-3 font-medium">Montant</th>
                <th className="px-5 py-3 font-medium">Signature prévue</th>
                <th className="px-5 py-3 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody>
              {opportunites.map((op: Opportunite) => (
                <tr
                  key={op.id}
                  className="border-b border-border last:border-0 hover:bg-bg cursor-pointer"
                >
                  <td className="px-5 py-4">
                    <Link href={`/opportunites/${op.id}`} className="font-medium text-ink hover:text-accent">
                      {op.titre}
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-muted">{nomClient(op.client)}</td>
                  <td className="px-5 py-4">
                    <EtapeBadge etape={op.etape} label={LABELS_ETAPE[op.etape]} couleur={COULEURS_ETAPE[op.etape]} />
                  </td>
                  <td className="px-5 py-4 font-mono text-ink">{formatMontant(op.montant)}</td>
                  <td className="px-5 py-4 font-mono text-muted">{formatDate(op.dateSignaturePrevue)}</td>
                  <td className="px-5 py-4">{op.estAProblem && <ProblemeBadge />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {meta.totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/opportunites?${new URLSearchParams({ ...params, page: String(p) }).toString()}`}
              className={`h-9 w-9 flex items-center justify-center rounded-lg text-sm font-mono ${
                p === meta.page ? "bg-accent text-white" : "border border-border text-ink hover:bg-bg"
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}