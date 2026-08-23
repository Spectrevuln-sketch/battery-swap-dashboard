"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-6">
      <h2 className="font-semibold text-red-800">Something went wrong</h2>
      <p className="mt-2 text-sm text-red-700">Gagal mengambil data dashboard.</p>
      <button onClick={() => reset()} className="mt-4 rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white">Coba lagi</button>
    </div>
  );
}
