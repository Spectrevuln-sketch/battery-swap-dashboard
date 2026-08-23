export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-end justify-between">
        <div>
          <div className="h-7 w-32 rounded bg-[var(--color-bg)]" />
          <div className="mt-2 h-4 w-64 rounded bg-[var(--color-bg)]" />
        </div>
        <div className="h-4 w-24 rounded bg-[var(--color-bg)]" />
      </div>
      <div className="h-28 rounded-xl border-[var(--color-border)] bg-[var(--color-card)]" />
      <div className="h-80 rounded-xl border-[var(--color-border)] bg-[var(--color-card)]" />
    </div>
  );
}