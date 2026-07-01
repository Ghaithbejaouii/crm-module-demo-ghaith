export function EtapeBadge({ etape, label, couleur }: { etape: string; label: string; couleur: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
      style={{ backgroundColor: `${couleur}1A`, color: couleur }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: couleur }} />
      {label}
    </span>
  );
}

export function ProblemeBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-risk-soft px-2.5 py-1 text-xs font-medium text-risk">
      ⚠ À traiter
    </span>
  );
}