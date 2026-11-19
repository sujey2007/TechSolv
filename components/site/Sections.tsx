import Link from "next/link";
import { Icon } from "@/components/Icon";
import { telHref } from "@/lib/format";
import type { Service } from "@/lib/types";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span className={`eyebrow ${align === "center" ? "justify-center" : ""}`}>{eyebrow}</span>
      <h2 className="mt-4 font-display text-3xl font-bold leading-[1.15] tracking-tight text-ink-950 md:text-[2.6rem]">
        {title}
      </h2>
      {intro && <p className="mt-4 text-[17px] leading-relaxed text-ink-500">{intro}</p>}
    </div>
  );
}

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_24px_48px_-24px_rgba(10,28,69,0.35)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-paper">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 font-display text-[11px] font-bold tracking-wider text-ink-800 backdrop-blur">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="absolute -bottom-5 right-5 grid h-12 w-12 place-items-center rounded-xl bg-brand-600 text-white shadow-lg ring-4 ring-white">
          <Icon name={service.icon} className="h-5 w-5" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 pt-7">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-signal-500">{service.tagline}</p>
        <h3 className="mt-2 font-display text-xl font-bold leading-snug text-ink-950">{service.title}</h3>
        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-500">{service.summary}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
          Explore service
          <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  crumbs: { href?: string; label: string }[];
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper">
      <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
      <div className="container-x relative py-16 md:py-20">
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-ink-500">
          {crumbs.map((c, i) => (
            <span key={c.label} className="flex items-center gap-2">
              {i > 0 && <span className="text-ink-400">/</span>}
              {c.href ? (
                <Link href={c.href} className="hover:text-brand-600">
                  {c.label}
                </Link>
              ) : (
                <span className="text-ink-800">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-ink-950 md:text-5xl">
          {title}
        </h1>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-500">{intro}</p>}
      </div>
    </section>
  );
}

export function CtaBand({ phone }: { phone: string }) {
  return (
    <section className="container-x py-20">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-ink-900 px-8 py-14 text-white md:px-14">
        <div className="grid-bg absolute inset-0 opacity-30 [mask-image:linear-gradient(to_left,black,transparent)]" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-signal-400/30 blur-3xl" />
        <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">
              Planning a new installation or an upgrade?
            </h2>
            <p className="mt-3 text-white/75">
              Tell us about your site. We&apos;ll visit, assess your requirements and send a clear,
              itemised quote — no obligation.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-ink-950 transition hover:bg-brand-50"
            >
              Book a site survey <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <a
              href={telHref(phone)}
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
            >
              <Icon name="phone" className="h-4 w-4" /> {phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
