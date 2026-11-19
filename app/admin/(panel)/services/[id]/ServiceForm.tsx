"use client";

import { useActionState, useState } from "react";
import { Card, btn } from "@/components/admin/ui";
import { Icon } from "@/components/Icon";
import type { IconName, Service } from "@/lib/types";
import { saveService, type FormState } from "../../../actions";

const ICONS: { value: IconName; label: string }[] = [
  { value: "network", label: "Network" },
  { value: "wrench", label: "Maintenance" },
  { value: "camera", label: "CCTV" },
  { value: "alarm", label: "Alarm" },
  { value: "fingerprint", label: "Biometric" },
  { value: "phone", label: "Telephone" },
];

const LIBRARY = [
  "/images/networking.jpg",
  "/images/fibre.jpg",
  "/images/patch-panel.jpg",
  "/images/server-room.jpg",
  "/images/router.jpg",
  "/images/printer.jpg",
  "/images/repair.jpg",
  "/images/cctv.jpg",
  "/images/tracking.jpg",
  "/images/biometric.jpg",
  "/images/epabx.jpg",
];

export function ServiceForm({ service }: { service: Service | null }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveService, null);
  const [image, setImage] = useState(service?.image ?? LIBRARY[0]);
  const [icon, setIcon] = useState<IconName>(service?.icon ?? "network");

  return (
    <form action={action} className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      <input type="hidden" name="id" value={service?.id ?? ""} />
      <Card className="space-y-5 p-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="label" htmlFor="title">Title *</label>
            <input id="title" name="title" required defaultValue={service?.title} className="input" />
          </div>
          <div>
            <label className="label" htmlFor="tagline">Tagline</label>
            <input id="tagline" name="tagline" defaultValue={service?.tagline} className="input" placeholder="Installation & maintenance" />
          </div>
          <div>
            <label className="label" htmlFor="slug">URL slug</label>
            <input id="slug" name="slug" defaultValue={service?.slug} className="input" placeholder="auto from title" />
          </div>
        </div>
        <div>
          <label className="label" htmlFor="summary">Short summary (cards)</label>
          <textarea id="summary" name="summary" rows={2} defaultValue={service?.summary} className="input" />
        </div>
        <div>
          <label className="label" htmlFor="description">Full description</label>
          <textarea id="description" name="description" rows={6} defaultValue={service?.description} className="input" />
        </div>
        <div>
          <label className="label" htmlFor="features">Features (one per line)</label>
          <textarea id="features" name="features" rows={6} defaultValue={service?.features.join("\n")} className="input font-mono text-sm" />
        </div>
      </Card>

      <div className="space-y-6">
        <Card className="space-y-5 p-6">
          <div>
            <span className="label">Icon</span>
            <input type="hidden" name="icon" value={icon} />
            <div className="grid grid-cols-3 gap-2">
              {ICONS.map((i) => (
                <button
                  type="button"
                  key={i.value}
                  onClick={() => setIcon(i.value)}
                  className={`flex flex-col items-center gap-1 rounded-xl border p-3 text-xs font-medium transition ${
                    icon === i.value ? "border-brand-600 bg-brand-50 text-brand-700" : "border-line text-ink-600 hover:border-brand-200"
                  }`}
                >
                  <Icon name={i.value} />
                  {i.label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label" htmlFor="order">Display order</label>
              <input id="order" name="order" type="number" defaultValue={service?.order ?? 10} className="input" />
            </div>
            <label className="mt-6 flex items-center gap-2 text-sm font-semibold text-ink-700">
              <input type="checkbox" name="published" defaultChecked={service?.published ?? true} className="h-4 w-4 accent-brand-600" />
              Published
            </label>
          </div>
        </Card>

        <Card className="space-y-4 p-6">
          <div>
            <label className="label" htmlFor="image">Image URL</label>
            <input id="image" name="image" value={image} onChange={(e) => setImage(e.target.value)} className="input text-sm" />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="Preview" className="aspect-[16/10] w-full rounded-xl border border-line object-cover" />
          <div>
            <span className="label">Or pick from library</span>
            <div className="grid grid-cols-4 gap-2">
              {LIBRARY.map((src) => (
                <button
                  type="button"
                  key={src}
                  onClick={() => setImage(src)}
                  className={`overflow-hidden rounded-lg border-2 ${image === src ? "border-brand-600" : "border-transparent"}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </Card>

        {state && !state.ok && (
          <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {state.message}
          </p>
        )}
        <button type="submit" disabled={pending} className={`${btn.primary} w-full py-3`}>
          {pending ? "Saving…" : "Save service"}
        </button>
      </div>
    </form>
  );
}
