import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
      <h2 className="text-xl font-semibold text-ink">Opportunité introuvable</h2>
      <p className="mt-2 text-sm text-muted">Elle a peut-être été supprimée.</p>
      <Link
        href="/opportunites"
        className="mt-6 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
      >
        Retour à la liste
      </Link>
    </main>
  );
}