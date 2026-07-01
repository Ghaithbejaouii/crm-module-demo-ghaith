"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Opportunite, Client } from "@/lib/types";
import { LABELS_ETAPE } from "@/lib/format";

interface Props {
  clients: Client[];
  opportunite?: Opportunite;
}

type FormErrors = Record<string, string>;

export function OpportuniteForm({ clients, opportunite }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [values, setValues] = useState({
    titre: opportunite?.titre || "",
    montant: opportunite?.montant?.toString() || "",
    dateSignaturePrevue: opportunite?.dateSignaturePrevue?.slice(0, 10) || "",
    etape: opportunite?.etape || "PROSPECTION",
    clientId: opportunite?.clientId || "",
  });

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!values.titre.trim()) errs.titre = "Le titre est obligatoire";
    if (!values.montant || Number(values.montant) <= 0) errs.montant = "Le montant doit être positif";
    if (!values.dateSignaturePrevue) errs.dateSignaturePrevue = "La date est obligatoire";
    if (!values.clientId) errs.clientId = "Sélectionne un client";
    return errs;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      const payload = {
        titre: values.titre,
        montant: Number(values.montant),
        dateSignaturePrevue: new Date(values.dateSignaturePrevue).toISOString(),
        etape: values.etape,
        clientId: values.clientId,
      };

      if (opportunite) {
        await api.patch(`/opportunites/${opportunite.id}`, payload);
        router.push(`/opportunites/${opportunite.id}`);
      } else {
        const created = await api.post<Opportunite>("/opportunites", payload);
        router.push(`/opportunites/${created.id}`);
      }
      router.refresh();
    } catch {
      setErrors({ global: "Impossible d'enregistrer. Vérifie les champs et réessaie." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errors.global && (
        <div className="rounded-lg bg-risk-soft px-4 py-3 text-sm text-risk">{errors.global}</div>
      )}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">Titre</label>
        <input
          type="text"
          value={values.titre}
          onChange={(e) => setValues({ ...values, titre: e.target.value })}
          className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-ink"
          placeholder="Ex: Installation capteurs irrigation"
        />
        {errors.titre && <p className="mt-1 text-xs text-risk">{errors.titre}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Montant (DT)</label>
          <input
            type="number"
            value={values.montant}
            onChange={(e) => setValues({ ...values, montant: e.target.value })}
            className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm font-mono text-ink"
            placeholder="0"
          />
          {errors.montant && <p className="mt-1 text-xs text-risk">{errors.montant}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Date de signature prévue</label>
          <input
            type="date"
            value={values.dateSignaturePrevue}
            onChange={(e) => setValues({ ...values, dateSignaturePrevue: e.target.value })}
            className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm font-mono text-ink"
          />
          {errors.dateSignaturePrevue && <p className="mt-1 text-xs text-risk">{errors.dateSignaturePrevue}</p>}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">Étape du pipeline</label>
        <select
          value={values.etape}
          onChange={(e) => setValues({ ...values, etape: e.target.value as Opportunite["etape"] })}
          className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-ink"
        >
          {Object.entries(LABELS_ETAPE).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">Client</label>
        <select
          value={values.clientId}
          onChange={(e) => setValues({ ...values, clientId: e.target.value })}
          className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-ink"
        >
          <option value="">Sélectionner un client</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.type === "ENTREPRISE" ? c.raisonSociale : `${c.prenom} ${c.nom}`}
            </option>
          ))}
        </select>
        {errors.clientId && <p className="mt-1 text-xs text-risk">{errors.clientId}</p>}
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Enregistrement..." : opportunite ? "Enregistrer les modifications" : "Créer l'opportunité"}
        </button>
      </div>
    </form>
  );
}