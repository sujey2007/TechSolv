"use client";

import { useActionState } from "react";
import { Icon } from "@/components/Icon";
import { submitEnquiry, type ContactState } from "./actions";

export function ContactForm({
  services,
  defaultService,
}: {
  services: { slug: string; title: string }[];
  defaultService?: string;
}) {
  const [state, action, pending] = useActionState<ContactState, FormData>(submitEnquiry, null);

  if (state?.ok) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-signal-400/40 bg-signal-50 px-6 py-14 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-signal-500 text-white">
          <Icon name="check" className="h-7 w-7" strokeWidth={2.6} />
        </span>
        <p className="mt-5 font-display text-xl font-bold text-ink-950">Enquiry sent</p>
        <p className="mt-2 max-w-sm text-ink-600">{state.message}</p>
      </div>
    );
  }

  const selected = services.find((s) => s.slug === defaultService)?.title ?? "";

  return (
    <form action={action} className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-1">
        <label htmlFor="name" className="label">Full name *</label>
        <input id="name" name="name" required minLength={2} maxLength={120} className="input" autoComplete="name" />
      </div>
      <div className="sm:col-span-1">
        <label htmlFor="phone" className="label">Phone *</label>
        <input id="phone" name="phone" required type="tel" maxLength={30} className="input" autoComplete="tel" />
      </div>
      <div className="sm:col-span-1">
        <label htmlFor="email" className="label">Email</label>
        <input id="email" name="email" type="email" maxLength={160} className="input" autoComplete="email" />
      </div>
      <div className="sm:col-span-1">
        <label htmlFor="service" className="label">Service needed</label>
        <select id="service" name="service" defaultValue={selected} className="input">
          <option value="">Select a service</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value="Other">Other / not sure</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className="label">Tell us about your requirement</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={3000}
          className="input resize-y"
          placeholder="Location, size of premises, number of cameras / users, timelines…"
        />
      </div>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company_website">Website</label>
        <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      {state && !state.ok && (
        <p className="sm:col-span-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {state.message}
        </p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60 sm:w-auto"
        >
          {pending ? "Sending…" : "Send enquiry"}
          {!pending && <Icon name="arrow" className="h-4 w-4" />}
        </button>
      </div>
    </form>
  );
}
