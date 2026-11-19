import { Card, DbWarning, PageHeader, btn } from "@/components/admin/ui";
import { Icon } from "@/components/Icon";
import { requireAdmin } from "@/lib/auth";
import { getIndustries, getSettings, hasStoredIndustries } from "@/lib/data";
import { isFirestoreConfigured } from "@/lib/firebase-admin";
import { deleteIndustry, seedDefaults, updateIndustry } from "../../actions";
import { INDUSTRY_ICON_OPTIONS } from "@/lib/options";
import { IndustryForm } from "./IndustryForm";

export const metadata = { title: "Sectors we serve" };

export default async function IndustriesAdmin() {
  await requireAdmin();
  const [items, stored, settings] = await Promise.all([getIndustries(), hasStoredIndustries(), getSettings()]);
  const configured = isFirestoreConfigured();
  const editable = configured && stored;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sectors we serve"
        description={`Shown on the home page in the “${settings.industriesTitle}” section. Change the heading in Company settings.`}
      />
      {!configured && <DbWarning />}
      {configured && !stored && (
        <Card className="flex flex-col items-start justify-between gap-4 p-5 sm:flex-row sm:items-center">
          <p className="text-sm text-ink-600">
            These are built-in defaults (including Government works). Import them into Firestore to edit them.
          </p>
          <form action={seedDefaults}>
            <button className={btn.primary}>
              <Icon name="database" className="h-4 w-4" /> Import default content
            </button>
          </form>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_1.6fr]">
        {editable && (
          <Card className="h-fit p-6">
            <h2 className="font-display font-bold text-ink-950">Add a sector</h2>
            <div className="mt-5">
              <IndustryForm />
            </div>
          </Card>
        )}

        <div className="space-y-3">
          {items.map((ind) => (
            <Card key={ind.id} className="p-4">
              {editable ? (
                <form action={updateIndustry} className="grid items-end gap-3 sm:grid-cols-[auto_1fr_1fr] lg:grid-cols-[auto_1fr_1.3fr_auto_auto]">
                  <input type="hidden" name="id" value={ind.id} />
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon name={ind.icon} />
                  </span>
                  <div>
                    <label className="label" htmlFor={`l-${ind.id}`}>Name</label>
                    <input id={`l-${ind.id}`} name="label" required defaultValue={ind.label} className="input" />
                  </div>
                  <div>
                    <label className="label" htmlFor={`d-${ind.id}`}>Short description</label>
                    <input id={`d-${ind.id}`} name="description" defaultValue={ind.description} className="input" />
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:col-span-3 lg:col-span-1 lg:grid-cols-[130px_80px]">
                    <div>
                      <label className="label" htmlFor={`i-${ind.id}`}>Icon</label>
                      <select id={`i-${ind.id}`} name="icon" defaultValue={ind.icon} className="input">
                        {INDUSTRY_ICON_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="label" htmlFor={`o-${ind.id}`}>Order</label>
                      <input id={`o-${ind.id}`} name="order" type="number" defaultValue={ind.order} className="input" />
                    </div>
                  </div>
                  <div className="flex gap-2 sm:col-span-3 lg:col-span-1">
                    <button className={`${btn.primary} flex-1`}>Save</button>
                    <button formAction={deleteIndustry} className={btn.danger} aria-label={`Delete ${ind.label}`}>
                      <Icon name="trash" className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex items-center gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon name={ind.icon} />
                  </span>
                  <div>
                    <p className="font-semibold text-ink-950">{ind.label}</p>
                    <p className="text-sm text-ink-500">{ind.description}</p>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
