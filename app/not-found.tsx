import Link from "next/link";

export default function NotFound() {
  return (
    <div className="rounded-xl border bg-white p-10 text-center shadow-sm">
      <h1 className="text-xl font-semibold">Cabinet tidak ditemukan</h1>
      <p className="mt-2 text-sm text-slate-500">
        Cabinet yang kamu cari tidak tersedia.
      </p>
      <Link
        href="/cabinets"
        className="mt-5 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
      >
        Kembali ke cabinet list
      </Link>
    </div>
  );
}
