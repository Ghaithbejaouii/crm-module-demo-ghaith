export function formatMontant(montant: string | number): string {
  const n = typeof montant === "string" ? parseFloat(montant) : montant;
  return new Intl.NumberFormat("fr-TN", {
    style: "currency",
    currency: "TND",
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export const LABELS_ETAPE: Record<string, string> = {
  PROSPECTION: "Prospection",
  QUALIFICATION: "Qualification",
  PROPOSITION: "Proposition",
  NEGOCIATION: "Négociation",
  GAGNE: "Gagné",
  PERDU: "Perdu",
};

export const COULEURS_ETAPE: Record<string, string> = {
  PROSPECTION: "#94A3B8",
  QUALIFICATION: "#60A5FA",
  PROPOSITION: "#A78BFA",
  NEGOCIATION: "#F59E0B",
  GAGNE: "#2F6F4E",
  PERDU: "#94A3B8",
};

export function nomClient(client?: { type: string; nom?: string | null; prenom?: string | null; raisonSociale?: string | null }): string {
  if (!client) return "—";
  if (client.type === "ENTREPRISE") return client.raisonSociale || "—";
  return `${client.prenom || ""} ${client.nom || ""}`.trim() || "—";
}