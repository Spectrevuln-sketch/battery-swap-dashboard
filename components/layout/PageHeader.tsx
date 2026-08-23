import type { ReactNode } from "react";

export function PageHeader({
  title,
  description,
  trailing,
}: {
  title: string;
  description?: string;
  trailing?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-text">{title}</h1>
        {description ? (
          <p className="mt-1 text-sm text-muted">{description}</p>
        ) : null}
      </div>

      {trailing ? <div className="text-sm text-muted">{trailing}</div> : null}
    </div>
  );
}