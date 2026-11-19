import type { Metadata } from "next";
import { Icon, type IconKey } from "@/components/Icon";
import { CtaBand, PageHero, SectionHeading } from "@/components/site/Sections";
import { getServices, getSettings } from "@/lib/data";
import { shortTitle } from "@/lib/format";

export const metadata: Metadata = {
  title: "About us",
  description: "Techsolv is a Chennai-based security and IT infrastructure company.",
};

const values: { icon: IconKey; title: string; text: string }[] = [
  { icon: "clipboard", title: "Plan properly", text: "Every project begins with understanding the site, the users and the risks." },
  { icon: "tools", title: "Install neatly", text: "Tidy cable runs, labelled endpoints and systems that are easy to service." },
  { icon: "eye", title: "Be transparent", text: "Itemised quotes, honest recommendations and no hidden charges." },
  { icon: "headset", title: "Stay reachable", text: "When something needs attention, you reach a real person who knows your setup." },
];

export default async function AboutPage() {
  const [settings, services] = await Promise.all([getSettings(), getServices()]);

  return (
    <>
      <PageHero
        eyebrow="About Techsolv"
        title="Practical technology that protects and connects your business"
        crumbs={[{ href: "/", label: "Home" }, { label: "About" }]}
      />

      <section className="container-x grid items-center gap-14 py-24 lg:grid-cols-2">
        <div className="relative">
          <div className="overflow-hidden rounded-3xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/about.jpg" alt="Techsolv team at work" className="aspect-[5/4] w-full object-cover" />
          </div>
          <div className="absolute -bottom-8 right-6 max-w-[260px] rounded-2xl border border-line bg-white p-5 shadow-xl">
            <p className="text-xs uppercase tracking-[0.14em] text-ink-400">Talk to</p>
            <p className="mt-1 font-display text-lg font-bold text-ink-950">{settings.contactPerson}</p>
            <p className="text-sm text-ink-500">Contact person, {settings.name}</p>
          </div>
        </div>
        <div>
          <SectionHeading eyebrow="Who we are" title="One team for your security and IT infrastructure" />
          <p className="mt-6 text-[17px] leading-relaxed text-ink-600">{settings.about}</p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {services.map((s) => (
              <div key={s.id} className="flex items-center gap-2.5 rounded-xl border border-line bg-paper px-3 py-3">
                <Icon name={s.icon} className="h-4 w-4 shrink-0 text-brand-600" />
                <span className="text-[13px] font-semibold leading-tight text-ink-800">
                  {shortTitle(s.title)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-24">
        <div className="container-x">
          <SectionHeading align="center" eyebrow="How we operate" title="The principles behind every project" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-line bg-white p-7">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-ink-950 text-signal-400">
                  <Icon name={v.icon} />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-ink-950">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand phone={settings.primaryPhone} />
    </>
  );
}
