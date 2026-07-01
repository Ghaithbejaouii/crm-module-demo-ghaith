import Link from "next/link";
import { PipelineRecap } from "@/lib/types";
import { LABELS_ETAPE, COULEURS_ETAPE, formatMontant } from "@/lib/format";

export function PipelineBar({ recap, etapeActive }: { recap: PipelineRecap; etapeActive?: string }) {
  const segments = recap.parEtape.filter((s) => s.montant > 0);
  const total = recap.valeurTotale || 1;

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted">Valeur totale du pipeline</p>
          <p className="font-mono text-3xl font-semibold text-ink">
            {formatMontant(recap.valeurTotale)}
          </p>
        </div>
        <div className="flex gap-6 text-sm">
          <div>
            <p className="text-muted">Opportunités</p>
            <p className="font-mono font-semibold text-ink">{recap.nombreTotal}</p>
          </div>
          <div>
            <p className="text-muted">À traiter</p>
            <p className="font-mono font-semibold text-risk">{recap.aRisque}</p>
          </div>
        </div>
      </div>

      <div className="flex h-3 w-full overflow-hidden rounded-full bg-bg">
        {segments.map((s) => (
          <div
            key={s.etape}
            style={{
              width: `${(s.montant / total) * 100}%`,
              backgroundColor: COULEURS_ETAPE[s.etape],
            }}
            title={`${LABELS_ETAPE[s.etape]} — ${formatMontant(s.montant)}`}
          />
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {recap.parEtape.map((s) => {
          const isActive = etapeActive === s.etape;
          return (
            <Link
              key={s.etape}
              href={isActive ? "/opportunites" : `/opportunites?etape=${s.etape}`}
              className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs transition-colors ${
                isActive ? "border-accent bg-accent-soft" : "border-border hover:bg-bg"
              }`}
            >
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: COULEURS_ETAPE[s.etape] }} />
              <span className="font-medium text-ink">{LABELS_ETAPE[s.etape]}</span>
              <span className="font-mono text-muted">{s.nombre}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}