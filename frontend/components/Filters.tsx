"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { LABELS_ETAPE } from "@/lib/format";

export function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    router.push(`/opportunites?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-3">
      <select
        className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink"
        value={searchParams.get("etape") || ""}
        onChange={(e) => updateFilter("etape", e.target.value)}
      >
        <option value="">Toutes les étapes</option>
        {Object.entries(LABELS_ETAPE).map(([key, label]) => (
          <option key={key} value={key}>{label}</option>
        ))}
      </select>

      <select
        className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink"
        value={searchParams.get("typeClient") || ""}
        onChange={(e) => updateFilter("typeClient", e.target.value)}
      >
        <option value="">Tous les types de client</option>
        <option value="ENTREPRISE">Entreprise</option>
        <option value="PARTICULIER">Particulier</option>
      </select>
    </div>
  );
}