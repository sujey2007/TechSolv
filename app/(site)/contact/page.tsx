import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/site/Sections";
import { getServices, getSettings } from "@/lib/data";
import { telHref, waHref } from "@/lib/format";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Request a free site survey or quotation from Techsolv, Chennai.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const [{ service }, settings, services] = await Promise.all([searchParams, getSettings(), getServices()]);
  const mapQuery = encodeURIComponent(`${settings.address}, ${settings.city}`);

  const cards = [
    ...[settings.primaryPhone, settings.secondaryPhone].filter(Boolean).map((p, i) => ({
      icon: "phone" as const,
      label: i === 0 ? `Call ${settings.contactPerson.split(" ")[0]}` : "Mobile",
      value: p,
      href: telHref(p),
    })),
    ...settings.emails.map((e) => ({ icon: "mail" as const, label: "Email", value: e, href: `mailto:${e}` })),
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your site"
        intro="Request a free site survey, a quotation or support for an existing installation. We usually respond within one working day."
        crumbs={[{ href: "/", label: "Home" }, { label: "Contact" }]}
      />

      <section className="container-x grid gap-10 py-20 lg:grid-cols-[1fr_1.5fr]">
        <div className="space-y-4">
          {cards.map((c) => (
            <a
              key={c.value}
              href={c.href}
              className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5 transition hover:border-brand-200 hover:shadow-md"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <Icon name={c.icon} />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-ink-400">{c.label}</span>
                <span className="block break-all font-semibold text-ink-950">{c.value}</span>
              </span>
            </a>
          ))}
          <div className="flex items-start gap-4 rounded-2xl border border-line bg-white p-5">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <Icon name="pin" />
            </span>
            <span>
              <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-ink-400">Office</span>
              <span className="block font-semibold text-ink-950">{settings.address}</span>
              <span className="block text-ink-600">{settings.city}</span>
              <span className="mt-2 block text-sm text-ink-500">{settings.hours}</span>
            </span>
          </div>
          {settings.whatsapp && (
            <a
              href={waHref(settings.whatsapp, "Hi Techsolv, I'd like to enquire about your services.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#1fa855] p-4 font-semibold text-white transition hover:brightness-105"
            >
              <Icon name="chat" /> Chat on WhatsApp
            </a>
          )}
        </div>

        <div className="rounded-3xl border border-line bg-white p-7 shadow-[0_30px_60px_-40px_rgba(10,28,69,0.45)] md:p-10">
          <h2 className="font-display text-2xl font-bold text-ink-950">Send us an enquiry</h2>
          <p className="mt-2 text-ink-500">Fields marked * are required.</p>
          <div className="mt-8">
            <ContactForm
              services={services.map((s) => ({ slug: s.slug, title: s.title }))}
              defaultService={service}
            />
          </div>
        </div>
      </section>

      <section className="container-x pb-24">
        <div className="overflow-hidden rounded-3xl border border-line">
          <iframe
            title="Techsolv location map"
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            className="h-[380px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
