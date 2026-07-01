"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setLoading(true);
    setError("");
    try {
      await api.delete(`/opportunites/${id}`);
      router.push("/opportunites");
      router.refresh();
    } catch {
      setError("Impossible de supprimer cette opportunité.");
      setLoading(false);
    }
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted">Confirmer ?</span>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="rounded-lg bg-risk px-3 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Suppression..." : "Oui, supprimer"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="rounded-lg border border-border px-3 py-2 text-sm text-ink hover:bg-bg"
        >
          Annuler
        </button>
        {error && <span className="text-xs text-risk">{error}</span>}
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-risk hover:bg-risk-soft"
    >
      Supprimer
    </button>
  );
}