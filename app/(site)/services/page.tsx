import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Tilt } from "@/components/site/Motion";
import { CtaBand, PageHero } from "@/components/site/Sections";
import { getServices, getSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Networking, AMC & printing consumables, CCTV, burglar alarms & GPS tracking, biometrics and EPABX — installation and maintenance by Techsolv, Chennai.",
};

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([getServices(), getSettings()]);

  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Security, networking and communication — end to end"
        intro="Every service includes a site survey, professional installation, configuration, user training and ongoing maintenance support."
        crumbs={[{ href: "/", label: "Home" }, { label: "Services" }]}
      />

      <section className="container-x space-y-20 py-16 sm:space-y-24 sm:py-24">
        {services.map((s, i) => (
          <article
            key={s.id}
            id={s.slug}
            className={`grid scroll-mt-32 items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
              i % 2 ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div data-reveal={i % 2 ? "right" : "left"} className="relative">
              <Tilt max={5}>
                <div className="deck deck-1 hidden !rounded-3xl sm:block" />
                <div className="group relative overflow-hidden rounded-3xl border border-line shadow-[0_30px_60px_-40px_rgba(10,28,69,0.6)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.image} alt={s.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
              </Tilt>
              <span className="absolute -top-5 left-6 grid h-14 w-14 place-items-center rounded-2xl bg-brand-600 text-white shadow-lg ring-4 ring-white">
                <Icon name={s.icon} className="h-6 w-6" />
              </span>
            </div>
            <div data-reveal>
              <p className="font-display text-sm font-bold text-ink-400">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-signal-500">{s.tagline}</p>
              <h2 className="mt-2 text-balance font-display text-[1.75rem] font-bold leading-tight text-ink-950 sm:text-3xl">{s.title}</h2>
              <p className="mt-4 text-[17px] leading-relaxed text-ink-500">{s.summary}</p>
              <ul className="mt-6 grid gap-3">
                {s.features.slice(0, 4).map((f) => (
                  <li key={f} className="flex gap-3 text-[15px] text-ink-700">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-signal-50 text-signal-500">
                      <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.6} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={`/services/${s.slug}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink-800"
                >
                  View details <Icon name="arrow" className="h-4 w-4" />
                </Link>
                <Link
                  href={`/contact?service=${s.slug}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-line px-5 py-3 text-sm font-semibold text-ink-900 transition hover:border-brand-200 hover:text-brand-700"
                >
                  Request a quote
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      <CtaBand phone={settings.primaryPhone} />
    </>
  );
}
