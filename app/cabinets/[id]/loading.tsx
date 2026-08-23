export default function CabinetDetailLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-4 w-28 rounded bg-slate-200" />
      <div className="rounded-xl border bg-white p-6">
        <div className="h-7 w-40 rounded bg-slate-200" />
        <div className="mt-2 h-4 w-56 rounded bg-slate-200" />
      </div>
      <div className="rounded-xl border bg-white p-6">
        <div className="h-5 w-24 rounded bg-slate-200" />
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="h-28 rounded-xl bg-slate-100" />
          ))}
        </div>
      </div>
    </div>
  );
}
