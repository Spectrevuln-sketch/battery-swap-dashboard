export function ErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-sm text-red-300">
      {message}
    </div>
  );
}