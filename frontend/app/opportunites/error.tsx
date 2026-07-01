"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto flex max-w-6xl flex-col items-center justify-center px-6 py-24 text-center">
      <h2 className="text-xl font-semibold text-ink">Impossible de charger les opportunités</h2>
      <p className="mt-2 text-sm text-muted">
        Le serveur ne répond pas. Vérifie que l&apos;API tourne bien sur le port 3001.
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
      >
        Réessayer
      </button>
    </main>
  );
}