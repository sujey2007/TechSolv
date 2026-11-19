"use client";

import { useActionState, useEffect, useRef } from "react";
import { btn } from "@/components/admin/ui";
import { INDUSTRY_ICON_OPTIONS } from "@/lib/options";
import { addIndustry, type FormState } from "../../actions";


export function IndustryForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(addIndustry, null);
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state?.ok) ref.current?.reset();
  }, [state]);

  return (
    <form ref={ref} action={action} className="space-y-4">
      <div>
        <label className="label" htmlFor="ind-label">Name *</label>
        <input id="ind-label" name="label" required maxLength={80} className="input" placeholder="e.g. Banks & ATMs" />
      </div>
      <div>
        <label className="label" htmlFor="ind-desc">Short description</label>
        <input id="ind-desc" name="description" maxLength={160} className="input" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label" htmlFor="ind-icon">Icon</label>
          <select id="ind-icon" name="icon" className="input" defaultValue="building">
            {INDUSTRY_ICON_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="ind-order">Order</label>
          <input id="ind-order" name="order" type="number" defaultValue={10} className="input" />
        </div>
      </div>
      {state && (
        <p className={`text-sm ${state.ok ? "text-emerald-700" : "text-red-600"}`} role="status">
          {state.message}
        </p>
      )}
      <button disabled={pending} className={`${btn.primary} w-full`}>
        {pending ? "Adding…" : "Add sector"}
      </button>
    </form>
  );
}
