import { Card, DbWarning, PageHeader, btn } from "@/components/admin/ui";
import { Icon } from "@/components/Icon";
import { requireAdmin } from "@/lib/auth";
import { getTestimonials } from "@/lib/data";
import { isFirestoreConfigured } from "@/lib/firebase-admin";
import { deleteTestimonial } from "../../actions";
import { TestimonialForm } from "./TestimonialForm";

export const metadata = { title: "Testimonials" };

export default async function TestimonialsAdmin() {
  await requireAdmin();
  const items = await getTestimonials();
  const configured = isFirestoreConfigured();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Testimonials"
        description="Real client feedback. The testimonials section appears on the home page once at least one is added."
      />
      {!configured && <DbWarning />}
      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        {configured && (
          <Card className="h-fit p-6">
            <h2 className="font-display font-bold text-ink-950">Add testimonial</h2>
            <div className="mt-5">
              <TestimonialForm />
            </div>
          </Card>
        )}
        <div className="space-y-3">
          {items.length === 0 ? (
            <Card className="px-5 py-14 text-center text-sm text-ink-500">No testimonials yet.</Card>
          ) : (
            items.map((t) => (
              <Card key={t.id} className="p-5">
                <p className="text-sm leading-relaxed text-ink-700">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-ink-950">{t.name}</p>
                    <p className="text-xs text-ink-500">
                      {t.company || "—"} · order {t.order}
                    </p>
                  </div>
                  <form action={deleteTestimonial}>
                    <input type="hidden" name="id" value={t.id} />
                    <button className={btn.danger} aria-label={`Delete testimonial from ${t.name}`}>
                      <Icon name="trash" className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
