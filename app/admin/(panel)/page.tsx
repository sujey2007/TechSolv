import Link from "next/link";
import { Card, DbWarning, Notice, PageHeader, StatusPill, btn } from "@/components/admin/ui";
import { Icon, type IconKey } from "@/components/Icon";
import { requireAdmin } from "@/lib/auth";
import { getAllServices, getEnquiries, getTestimonials, hasStoredServices } from "@/lib/data";
import { isFirestoreConfigured } from "@/lib/firebase-admin";
import { formatDate } from "@/lib/format";
import { seedDefaults } from "../actions";

export const metadata = { title: "Dashboard" };

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ seeded?: string }> }) {
  const session = await requireAdmin();
  const [{ seeded }, enquiries, services, testimonials, stored] = await Promise.all([
    searchParams,
    getEnquiries(),
    getAllServices(),
    getTestimonials(),
    hasStoredServices(),
  ]);
  const configured = isFirestoreConfigured();
  const newOnes = enquiries.filter((e) => e.status === "new").length;

  const stats: { label: string; value: number; icon: IconKey; href: string }[] = [
    { label: "New enquiries", value: newOnes, icon: "inbox", href: "/admin/enquiries" },
    { label: "Total enquiries", value: enquiries.length, icon: "users", href: "/admin/enquiries" },
    { label: "Published services", value: services.filter((s) => s.published).length, icon: "tools", href: "/admin/services" },
    { label: "Testimonials", value: testimonials.length, icon: "quote", href: "/admin/testimonials" },
  ];

  return (
    <div className="space-y-8">
      <PageHeader title={`Welcome back, ${session.username}`} description="Here's what's happening on your website." />

      {!configured && <DbWarning />}
      {seeded && <Notice>Default services and company details were saved to Firestore.</Notice>}

      {configured && !stored && (
        <Card className="flex flex-col items-start justify-between gap-4 p-5 sm:flex-row sm:items-center">
          <div>
            <p className="font-semibold text-ink-950">Your Firestore database is empty</p>
            <p className="text-sm text-ink-500">
              Import the six default services and company details so you can start editing them.
            </p>
          </div>
          <form action={seedDefaults}>
            <button className={btn.primary}>
              <Icon name="database" className="h-4 w-4" /> Import default content
            </button>
          </form>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href}>
            <Card className="p-5 transition hover:border-brand-200 hover:shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-ink-500">{s.label}</span>
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-600">
                  <Icon name={s.icon} className="h-[18px] w-[18px]" />
                </span>
              </div>
              <p className="mt-3 font-display text-3xl font-bold text-ink-950">{s.value}</p>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-display font-bold text-ink-950">Latest enquiries</h2>
          <Link href="/admin/enquiries" className="text-sm font-semibold text-brand-600 hover:underline">
            View all
          </Link>
        </div>
        {enquiries.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-ink-500">No enquiries yet.</p>
        ) : (
          <ul className="divide-y divide-line">
            {enquiries.slice(0, 6).map((e) => (
              <li key={e.id} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:gap-4">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-ink-950">{e.name}</p>
                  <p className="truncate text-sm text-ink-500">
                    {e.service || "General enquiry"} · {e.phone}
                  </p>
                </div>
                <StatusPill status={e.status} />
                <span className="text-xs text-ink-400">{formatDate(e.createdAt)}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
