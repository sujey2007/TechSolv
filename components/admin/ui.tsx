import { Icon } from "@/components/Icon";

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink-950">{title}</h1>
        {description && <p className="mt-1 text-sm text-ink-500">{description}</p>}
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-line bg-white ${className}`}>{children}</div>;
}

export function DbWarning() {
  return (
    <div className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
      <Icon name="database" className="mt-0.5 h-5 w-5 shrink-0" />
      <div>
        <p className="font-semibold">Firestore is not connected yet</p>
        <p className="mt-1 text-amber-800">
          The website is showing built-in default content. Add <code className="font-mono">FIREBASE_PROJECT_ID</code>,{" "}
          <code className="font-mono">FIREBASE_CLIENT_EMAIL</code> and <code className="font-mono">FIREBASE_PRIVATE_KEY</code>{" "}
          to your environment variables to enable editing and to receive enquiries.
        </p>
      </div>
    </div>
  );
}

export function Notice({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-signal-400/40 bg-signal-50 px-4 py-3 text-sm font-medium text-ink-800">
      <Icon name="check" className="h-4 w-4 text-signal-500" strokeWidth={2.6} />
      {children}
    </div>
  );
}

export const btn = {
  primary:
    "inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60",
  secondary:
    "inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink-800 transition hover:border-brand-200 hover:text-brand-700",
  danger:
    "inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50",
};

export function StatusPill({ status }: { status: string }) {
  const cls =
    status === "new"
      ? "bg-brand-50 text-brand-700"
      : status === "contacted"
        ? "bg-amber-50 text-amber-700"
        : "bg-emerald-50 text-emerald-700";
  return <span className={`inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${cls}`}>{status}</span>;
}
