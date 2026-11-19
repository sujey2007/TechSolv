"use client";

import { useActionState } from "react";
import { Card, btn } from "@/components/admin/ui";
import type { CompanySettings } from "@/lib/types";
import { saveSettings, type FormState } from "../../actions";

export function SettingsForm({ settings }: { settings: CompanySettings }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveSettings, null);

  const field = (name: keyof CompanySettings, label: string, hint?: string) => (
    <div>
      <label className="label" htmlFor={name}>{label}</label>
      <input id={name} name={name} defaultValue={String(settings[name] ?? "")} className="input" />
      {hint && <p className="mt-1 text-xs text-ink-400">{hint}</p>}
    </div>
  );

  return (
    <form action={action} className="space-y-6">
      <Card className="grid gap-5 p-6 sm:grid-cols-2">
        <h2 className="font-display font-bold text-ink-950 sm:col-span-2">Company</h2>
        {field("name", "Company name")}
        {field("contactPerson", "Contact person")}
        <div className="sm:col-span-2">{field("tagline", "Tagline")}</div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="about">About the company</label>
          <textarea id="about" name="about" rows={5} defaultValue={settings.about} className="input" />
        </div>
      </Card>

      <Card className="grid gap-5 p-6">
        <h2 className="font-display font-bold text-ink-950">Home page — sectors section</h2>
        {field("industriesTitle", "Section heading", "e.g. Trusted across every kind of premises")}
        <div>
          <label className="label" htmlFor="industriesIntro">Section intro</label>
          <textarea id="industriesIntro" name="industriesIntro" rows={3} defaultValue={settings.industriesIntro} className="input" />
        </div>
      </Card>

      <Card className="grid gap-5 p-6 sm:grid-cols-2">
        <h2 className="font-display font-bold text-ink-950 sm:col-span-2">Contact details</h2>
        {field("primaryPhone", "Primary phone")}
        {field("secondaryPhone", "Secondary phone")}
        {field("whatsapp", "WhatsApp number", "With country code, digits only — e.g. 919094499449")}
        {field("hours", "Working hours")}
        <div className="sm:col-span-2">
          <label className="label" htmlFor="emails">Email addresses (one per line)</label>
          <textarea id="emails" name="emails" rows={3} defaultValue={settings.emails.join("\n")} className="input" />
        </div>
        {field("address", "Address line")}
        {field("city", "City & PIN")}
      </Card>

      <div className="flex items-center gap-4">
        <button type="submit" disabled={pending} className={`${btn.primary} px-6 py-3`}>
          {pending ? "Saving…" : "Save settings"}
        </button>
        {state && (
          <p className={`text-sm ${state.ok ? "text-emerald-700" : "text-red-600"}`} role="status">
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
