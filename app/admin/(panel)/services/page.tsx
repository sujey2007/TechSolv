import Link from "next/link";
import { Card, DbWarning, Notice, PageHeader, btn } from "@/components/admin/ui";
import { Icon } from "@/components/Icon";
import { requireAdmin } from "@/lib/auth";
import { getAllServices, hasStoredServices } from "@/lib/data";
import { isFirestoreConfigured } from "@/lib/firebase-admin";
import { seedDefaults, toggleService } from "../../actions";

export const metadata = { title: "Services" };

export default async function ServicesAdmin({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  await requireAdmin();
  const [{ saved }, services, stored] = await Promise.all([searchParams, getAllServices(), hasStoredServices()]);
  const configured = isFirestoreConfigured();
  const editable = configured && stored;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Services"
        description="Services shown on the home page, services page and footer."
        actions={
          editable && (
            <Link href="/admin/services/new" className={btn.primary}>
              <Icon name="plus" className="h-4 w-4" /> Add service
            </Link>
          )
        }
      />
      {!configured && <DbWarning />}
      {saved && <Notice>Service saved.</Notice>}
      {configured && !stored && (
        <Card className="flex flex-col items-start justify-between gap-4 p-5 sm:flex-row sm:items-center">
          <p className="text-sm text-ink-600">
            These are built-in defaults. Import them into Firestore to edit, reorder or add services.
          </p>
          <form action={seedDefaults}>
            <button className={btn.primary}>Import default content</button>
          </form>
        </Card>
      )}

      <Card className="overflow-hidden">
        <ul className="divide-y divide-line">
          {services.map((s) => (
            <li key={s.id} className="flex items-center gap-4 p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.image} alt="" className="h-14 w-20 shrink-0 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-ink-950">{s.title}</p>
                <p className="truncate text-sm text-ink-500">
                  /{s.slug} · order {s.order}
                </p>
              </div>
              <span
                className={`hidden rounded-full px-2.5 py-1 text-xs font-semibold sm:inline ${
                  s.published ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-ink-500"
                }`}
              >
                {s.published ? "Published" : "Hidden"}
              </span>
              {editable && (
                <div className="flex gap-2">
                  <form action={toggleService}>
                    <input type="hidden" name="id" value={s.id} />
                    <input type="hidden" name="published" value={String(s.published)} />
                    <button className={btn.secondary} title={s.published ? "Hide" : "Publish"}>
                      <Icon name="eye" className="h-4 w-4" />
                      <span className="hidden md:inline">{s.published ? "Hide" : "Publish"}</span>
                    </button>
                  </form>
                  <Link href={`/admin/services/${s.id}`} className={btn.secondary}>
                    <Icon name="edit" className="h-4 w-4" />
                    <span className="hidden md:inline">Edit</span>
                  </Link>
                </div>
              )}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
