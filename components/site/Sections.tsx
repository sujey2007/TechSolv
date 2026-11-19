import Link from "next/link";
import { Icon, type IconKey } from "@/components/Icon";
import { Tilt } from "@/components/site/Motion";
import { shortTitle, telHref } from "@/lib/format";
import type { Service } from "@/lib/types";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  light = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div data-reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span className={`eyebrow ${align === "center" ? "justify-center" : ""} ${light ? "!text-signal-400" : ""}`}>
        {eyebrow}
      </span>
      <h2
        className={`mt-4 text-balance font-display text-[1.85rem] font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-[2.6rem] ${
          light ? "text-white" : "text-ink-950"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-4 text-[16px] leading-relaxed sm:text-[17px] ${light ? "text-white/65" : "text-ink-500"}`}>{intro}</p>
      )}
    </div>
  );
}

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <div data-reveal style={{ ["--d" as string]: `${(index % 3) * 90}ms` }} className="h-full">
      <Tilt className="h-full" max={5}>
        <Link
          href={`/services/${service.slug}`}
          className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition duration-300 hover:border-brand-200 hover:shadow-[0_30px_60px_-28px_rgba(10,28,69,0.45)]"
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-paper">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={service.image}
              alt={service.title}
              loading="lazy"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/55 via-ink-950/5 to-transparent transition duration-500 group-hover:from-brand-700/60" />
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 font-display text-[11px] font-bold tracking-wider text-ink-800 backdrop-blur">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="relative flex flex-1 flex-col p-6 pt-8">
            <span className="absolute -top-6 right-5 grid h-12 w-12 place-items-center rounded-xl bg-brand-600 text-white shadow-lg ring-4 ring-white transition duration-500 group-hover:-translate-y-1 group-hover:rotate-[8deg] group-hover:bg-signal-500">
              <Icon name={service.icon} className="h-5 w-5" />
            </span>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-signal-500">{service.tagline}</p>
            <h3 className="mt-2 font-display text-xl font-bold leading-snug text-ink-950">{service.title}</h3>
            <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-500">{service.summary}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
              Explore service
              <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1.5" />
            </span>
          </div>
        </Link>
      </Tilt>
    </div>
  );
}

/** A slowly rotating 3D ring of service tiles around a glowing core. */
export function ServiceOrbit({ services }: { services: Service[] }) {
  const n = services.length;
  return (
    <div className="orbit-scene" aria-hidden="true">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="orbit-stage">
        <div className="orbit-path" />
          <div className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[28px] bg-gradient-to-br from-brand-500 via-brand-700 to-ink-950 text-white shadow-[0_30px_60px_-20px_rgba(31,74,214,0.8)] ring-8 ring-white/70 sm:h-28 sm:w-28">
            <Icon name="shield" className="h-11 w-11 text-signal-400 sm:h-12 sm:w-12" strokeWidth={1.6} />
          </div>
        <div className="orbit-ring">
          {services.map((s, i) => (
            <div key={s.id} className="orbit-item" style={{ ["--i" as string]: i, ["--n" as string]: n }}>
              <div className="orbit-face flex h-full w-full flex-col items-center justify-center gap-2 rounded-2xl border border-white bg-white px-2 text-center shadow-[0_20px_40px_-18px_rgba(10,28,69,0.45)]">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white sm:h-11 sm:w-11">
                  <Icon name={s.icon} className="h-5 w-5" />
                </span>
                <span className="text-[11px] font-bold leading-tight text-ink-900 sm:text-xs">{shortTitle(s.title)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Cube({ size = 56, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`[perspective:600px] ${className}`} aria-hidden="true">
      <div className="cube" style={{ ["--s" as string]: `${size}px` }}>
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

export function Marquee({ items }: { items: { label: string; icon: IconKey }[] }) {
  const row = [...items, ...items];
  return (
    <div className="marquee py-1">
      <div className="marquee-track gap-3">
        {row.map((it, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length}
            className="flex shrink-0 items-center gap-2.5 rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink-800 shadow-sm"
          >
            <Icon name={it.icon} className="h-4 w-4 text-brand-600" />
            {it.label}
            <span className="ml-3 h-1.5 w-1.5 rounded-full bg-signal-400" />
          </span>
        ))}
      </div>
    </div>
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
      <div className="blob pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-200/50 blur-[90px]" />
      <div className="blob pointer-events-none absolute -bottom-32 left-[-8%] h-72 w-72 rounded-full bg-signal-400/20 blur-[90px] [animation-delay:-6s]" />
      <Cube size={46} className="float absolute right-[8%] top-16 hidden lg:block" />
      <Cube size={30} className="float-slow absolute bottom-14 right-[22%] hidden lg:block" />
      <div className="container-x relative py-14 md:py-20">
        <nav aria-label="Breadcrumb" className="rise mb-6 flex flex-wrap items-center gap-2 text-sm text-ink-500">
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
        <span className="eyebrow rise">{eyebrow}</span>
        <h1 className="rise mt-4 max-w-3xl text-balance font-display text-[2.1rem] font-extrabold leading-[1.1] tracking-tight text-ink-950 [animation-delay:80ms] sm:text-5xl">
          {title}
        </h1>
        {intro && (
          <p className="rise mt-5 max-w-2xl text-[17px] leading-relaxed text-ink-500 [animation-delay:160ms] sm:text-lg">{intro}</p>
        )}
      </div>
    </section>
  );
}

export function CtaBand({ phone }: { phone: string }) {
  return (
    <section className="container-x py-16 sm:py-20">
      <div
        data-reveal="zoom"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-ink-900 px-6 py-12 text-white sm:px-10 md:px-14 md:py-14"
      >
        <div className="grid-bg absolute inset-0 opacity-30 [mask-image:linear-gradient(to_left,black,transparent)]" />
        <div className="blob pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-signal-400/30 blur-3xl" />
        <Cube size={44} className="float absolute right-10 top-8 hidden opacity-70 xl:block" />
        <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="text-balance font-display text-[1.75rem] font-bold leading-tight sm:text-3xl md:text-4xl">
              Got a site in mind? Let&apos;s walk it together.
            </h2>
            <p className="mt-3 text-white/75">
              Tell us a little about your space. We&apos;ll come over, take a look and send you a clear,
              itemised quote — no pressure, no obligation.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-ink-950 transition hover:-translate-y-0.5 hover:bg-brand-50"
            >
              Book a site survey <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <a
              href={telHref(phone)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
            >
              <Icon name="phone" className="h-4 w-4" /> {phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
