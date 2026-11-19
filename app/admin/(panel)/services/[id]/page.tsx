import Link from "next/link";
import { notFound } from "next/navigation";
import { DbWarning, PageHeader, btn } from "@/components/admin/ui";
import { Icon } from "@/components/Icon";
import { requireAdmin } from "@/lib/auth";
import { getAllServices } from "@/lib/data";
import { isFirestoreConfigured } from "@/lib/firebase-admin";
import { deleteService } from "../../../actions";
import { ServiceForm } from "./ServiceForm";

export default async function EditService({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const isNew = id === "new";
  const service = isNew ? null : (await getAllServices()).find((s) => s.id === id);
  if (!isNew && !service) notFound();

  return (
    <div className="space-y-6">
      <Link href="/admin/services" className="inline-flex items-center gap-1 text-sm text-ink-500 hover:text-brand-600">
        ← All services
      </Link>
      <PageHeader
        title={isNew ? "Add service" : `Edit: ${service!.title}`}
        actions={
          !isNew && (
            <form action={deleteService}>
              <input type="hidden" name="id" value={id} />
              <button className={btn.danger}>
                <Icon name="trash" className="h-4 w-4" /> Delete
              </button>
            </form>
          )
        }
      />
      {!isFirestoreConfigured() && <DbWarning />}
      <ServiceForm service={service ?? null} />
    </div>
  );
}
