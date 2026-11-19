import Link from "next/link";
import { Card, DbWarning, PageHeader, StatusPill, btn } from "@/components/admin/ui";
import { Icon } from "@/components/Icon";
import { requireAdmin } from "@/lib/auth";
import { getEnquiries } from "@/lib/data";
import { isFirestoreConfigured } from "@/lib/firebase-admin";
import { formatDate, telHref } from "@/lib/format";
import type { EnquiryStatus } from "@/lib/types";
import { deleteEnquiry, setEnquiryStatus } from "../../actions";

export const metadata = { title: "Enquiries" };

const FILTERS: ("all" | EnquiryStatus)[] = ["all", "new", "contacted", "closed"];

export default async function EnquiriesPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  await requireAdmin();
  const [{ status = "all" }, all] = await Promise.all([searchParams, getEnquiries()]);
  const list = status === "all" ? all : all.filter((e) => e.status === status);

  return (
    <div className="space-y-6">
      <PageHeader title="Enquiries" description="Messages submitted through the website contact form." />
      {!isFirestoreConfigured() && <DbWarning />}

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const count = f === "all" ? all.length : all.filter((e) => e.status === f).length;
          return (
            <Link
              key={f}
              href={f === "all" ? "/admin/enquiries" : `/admin/enquiries?status=${f}`}
              className={`rounded-full border px-4 py-1.5 text-sm font-semibold capitalize transition ${
                status === f ? "border-brand-600 bg-brand-600 text-white" : "border-line bg-white text-ink-700 hover:border-brand-200"
              }`}
            >
              {f} <span className="opacity-70">({count})</span>
            </Link>
          );
        })}
      </div>

      {list.length === 0 ? (
        <Card className="px-5 py-16 text-center text-sm text-ink-500">No enquiries to show.</Card>
      ) : (
        <div className="space-y-4">
          {list.map((e) => (
            <Card key={e.id} className="p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-display text-lg font-bold text-ink-950">{e.name}</p>
                    <StatusPill status={e.status} />
                  </div>
                  <p className="mt-1 text-sm text-ink-500">
                    {e.service || "General enquiry"} · {formatDate(e.createdAt)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a href={telHref(e.phone)} className={btn.secondary}>
                    <Icon name="phone" className="h-4 w-4" /> {e.phone}
                  </a>
                  {e.email && (
                    <a href={`mailto:${e.email}`} className={btn.secondary}>
                      <Icon name="mail" className="h-4 w-4" /> Email
                    </a>
                  )}
                </div>
              </div>
              {e.message && (
                <p className="mt-4 whitespace-pre-line rounded-xl bg-paper p-4 text-sm leading-relaxed text-ink-700">{e.message}</p>
              )}
              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-4">
                <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-ink-400">Mark as</span>
                {(["new", "contacted", "closed"] as const).map((s) => (
                  <form key={s} action={setEnquiryStatus}>
                    <input type="hidden" name="id" value={e.id} />
                    <input type="hidden" name="status" value={s} />
                    <button
                      disabled={e.status === s}
                      className="rounded-lg border border-line px-3 py-1.5 text-xs font-semibold capitalize text-ink-700 transition hover:border-brand-200 disabled:border-brand-600 disabled:bg-brand-50 disabled:text-brand-700"
                    >
                      {s}
                    </button>
                  </form>
                ))}
                <form action={deleteEnquiry} className="ml-auto">
                  <input type="hidden" name="id" value={e.id} />
                  <button className={btn.danger}>
                    <Icon name="trash" className="h-4 w-4" /> Delete
                  </button>
                </form>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
