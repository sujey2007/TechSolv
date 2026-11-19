"use client";

import { useActionState, useEffect, useRef } from "react";
import { btn } from "@/components/admin/ui";
import { addTestimonial, type FormState } from "../../actions";

export function TestimonialForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(addTestimonial, null);
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state?.ok) ref.current?.reset();
  }, [state]);

  return (
    <form ref={ref} action={action} className="space-y-4">
      <div>
        <label className="label" htmlFor="t-name">Client name *</label>
        <input id="t-name" name="name" required className="input" />
      </div>
      <div>
        <label className="label" htmlFor="t-company">Company / designation</label>
        <input id="t-company" name="company" className="input" />
      </div>
      <div>
        <label className="label" htmlFor="t-quote">Quote *</label>
        <textarea id="t-quote" name="quote" rows={4} required className="input" />
      </div>
      <div>
        <label className="label" htmlFor="t-order">Display order</label>
        <input id="t-order" name="order" type="number" defaultValue={0} className="input" />
      </div>
      {state && (
        <p className={`text-sm ${state.ok ? "text-emerald-700" : "text-red-600"}`} role="status">
          {state.message}
        </p>
      )}
      <button disabled={pending} className={`${btn.primary} w-full`}>
        {pending ? "Adding…" : "Add testimonial"}
      </button>
    </form>
  );
}
