import Link from "next/link";
import { Icon, type IconKey } from "@/components/Icon";
import { CtaBand, SectionHeading, ServiceCard } from "@/components/site/Sections";
import { getServices, getSettings, getTestimonials } from "@/lib/data";
import { shortTitle, telHref } from "@/lib/format";

const reasons: { icon: IconKey; title: string; text: string }[] = [
  {
    icon: "clipboard",
    title: "Site survey before every quote",
    text: "We visit, measure and understand how your premises work before recommending a single device.",
  },
  {
    icon: "shield",
    title: "Branded, warranty-backed hardware",
    text: "Proven equipment from established manufacturers, installed to spec and backed by warranty.",
  },
  {
    icon: "users",
    title: "One partner, every system",
    text: "Cabling, cameras, access, alarms and telephony from a single accountable team.",
  },
  {
    icon: "headset",
    title: "Support after installation",
    text: "Annual maintenance contracts, quick breakdown response and a person you can actually call.",
  },
];

const steps: { icon: IconKey; title: string; text: string }[] = [
  { icon: "clipboard", title: "Survey", text: "On-site assessment of layout, risks, cabling routes and existing equipment." },
  { icon: "ruler", title: "Design & quote", text: "A clear system design with an itemised, no-surprise quotation." },
  { icon: "tools", title: "Install & configure", text: "Neat, labelled installation, testing, configuration and handover training." },
  { icon: "headset", title: "Maintain", text: "Preventive maintenance visits and fast support under AMC." },
];

const industries: { icon: IconKey; label: string }[] = [
  { icon: "building", label: "Corporate offices" },
  { icon: "school", label: "Schools & colleges" },
  { icon: "hospital", label: "Hospitals & clinics" },
  { icon: "store", label: "Retail & showrooms" },
  { icon: "warehouse", label: "Warehouses & factories" },
  { icon: "home", label: "Apartments & villas" },
];

export default async function HomePage() {
  const [settings, services, testimonials] = await Promise.all([
    getSettings(),
    getServices(),
    getTestimonials(),
  ]);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-paper to-white">
        <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_30%,black,transparent)]" />
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-brand-200/40 blur-[110px]" />
        <div className="container-x relative grid items-center gap-14 pb-20 pt-14 lg:grid-cols-[1.05fr_1fr] lg:pb-28 lg:pt-20">
          <div className="rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-3.5 py-1.5 text-[13px] font-medium text-ink-700 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal-500" />
              </span>
              Security & IT infrastructure · Chennai
            </span>
            <h1 className="mt-6 font-display text-[2.6rem] font-extrabold leading-[1.06] tracking-tight text-ink-950 sm:text-5xl lg:text-[3.6rem]">
              Secure, connected workplaces —{" "}
              <span className="bg-gradient-to-r from-brand-600 to-signal-500 bg-clip-text text-transparent">
                installed right
              </span>{" "}
              and maintained for good.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-500">
              CCTV surveillance, Cat 6 & fibre networking, biometric access, burglar alarms, GPS tracking
              and EPABX systems — designed, installed and serviced by one dependable team.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 font-semibold text-white shadow-[0_14px_30px_-12px_rgba(31,74,214,0.8)] transition hover:bg-brand-700"
              >
                Get a free site survey <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <a
                href={telHref(settings.primaryPhone)}
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-6 py-3.5 font-semibold text-ink-900 transition hover:border-brand-200 hover:text-brand-700"
              >
                <Icon name="phone" className="h-4 w-4" /> {settings.primaryPhone}
              </a>
            </div>
            <ul className="mt-10 grid max-w-lg grid-cols-1 gap-3 text-sm text-ink-700 sm:grid-cols-2">
              {["Free on-site assessment", "Annual maintenance contracts", "Neat, labelled installations", "Single point of contact"].map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-signal-50 text-signal-500">
                    <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.6} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="rise relative [animation-delay:120ms]">
            <div className="relative overflow-hidden rounded-[28px] border border-white shadow-[0_40px_80px_-40px_rgba(10,28,69,0.55)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero.jpg"
                alt="Engineers reviewing network infrastructure in a server room"
                className="aspect-[4/4.2] w-full object-cover sm:aspect-[4/3.6]"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-ink-950/40 via-transparent to-transparent" />
            </div>

            <div className="absolute -left-4 bottom-8 w-[230px] rounded-2xl border border-line bg-white/95 p-4 shadow-xl backdrop-blur sm:-left-10">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon name="camera" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink-950">Live remote viewing</p>
                  <p className="text-xs text-ink-500">Watch your site from your phone</p>
                </div>
              </div>
            </div>

            <div className="absolute -right-3 top-8 hidden rounded-2xl border border-line bg-white/95 p-4 shadow-xl backdrop-blur sm:block lg:-right-6">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-signal-50 text-signal-500">
                  <Icon name="fingerprint" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink-950">Access & attendance</p>
                  <p className="text-xs text-ink-500">Biometric & card based</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITY STRIP */}
      <section className="border-y border-line bg-white">
        <div className="container-x grid grid-cols-2 divide-line sm:grid-cols-3 lg:grid-cols-6 lg:divide-x">
          {services.map((s) => (
            <Link
              key={s.id}
              href={`/services/${s.slug}`}
              className="group flex items-center gap-3 px-3 py-5 transition hover:bg-paper lg:justify-center"
            >
              <Icon name={s.icon} className="h-5 w-5 shrink-0 text-brand-600" />
              <span className="text-sm font-semibold leading-tight text-ink-800 group-hover:text-brand-700">
                {shortTitle(s.title)}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="container-x py-24">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="What we do"
            title={
              <>
                Everything your premises needs to stay{" "}
                <span className="text-brand-600">safe and connected</span>
              </>
            }
            intro="Six specialised services, one accountable team — from the first cable to the yearly maintenance visit."
          />
          <Link
            href="/services"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-line px-5 py-3 text-sm font-semibold text-ink-900 transition hover:border-brand-200 hover:text-brand-700"
          >
            All services <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-paper py-24">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <div className="relative">
            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-3 overflow-hidden rounded-3xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/patch-panel.jpg" alt="Structured network cabling in a patch panel" className="aspect-[3/4] h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="col-span-2 flex flex-col gap-4">
                <div className="overflow-hidden rounded-3xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/repair.jpg" alt="Technician servicing electronic equipment" className="aspect-square w-full object-cover" loading="lazy" />
                </div>
                <div className="flex flex-1 flex-col justify-end rounded-3xl bg-ink-950 p-5 text-white">
                  <Icon name="shield" className="h-7 w-7 text-signal-400" />
                  <p className="mt-3 font-display text-lg font-bold leading-snug">Built to be maintained</p>
                  <p className="mt-1 text-xs text-white/60">Documented, labelled and easy to service.</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Why Techsolv"
              title="A technology partner that stays after the install"
              intro="Many vendors install and disappear. We plan for the long run — systems that are easy to expand, simple to use and properly maintained."
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {reasons.map((r) => (
                <div key={r.title} className="rounded-2xl border border-line bg-white p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon name={r.icon} />
                  </span>
                  <h3 className="mt-4 font-display text-[17px] font-bold text-ink-950">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="container-x py-24">
        <SectionHeading
          align="center"
          eyebrow="How we work"
          title="From survey to support in four clear steps"
        />
        <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          <div className="absolute left-[12%] right-[12%] top-7 hidden h-px bg-gradient-to-r from-brand-200 via-brand-500 to-signal-400 md:block" />
          {steps.map((s, i) => (
            <li key={s.title} className="relative text-center">
              <span className="relative mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-brand-100 bg-white text-brand-600 shadow-[0_10px_24px_-12px_rgba(31,74,214,0.5)]">
                <Icon name={s.icon} className="h-6 w-6" />
                <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-ink-950 font-display text-[11px] font-bold text-white">
                  {i + 1}
                </span>
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-ink-950">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-[240px] text-sm leading-relaxed text-ink-500">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* INDUSTRIES */}
      <section className="relative overflow-hidden bg-ink-950 py-24 text-white">
        <div className="grid-bg absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="container-x relative grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <span className="eyebrow !text-signal-400">Who we serve</span>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-[2.6rem]">
              Trusted across every kind of premises
            </h2>
            <p className="mt-4 text-white/65">
              Every site is different. We size and configure each solution for the way your space is used,
              the people in it and what needs protecting.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {industries.map((ind) => (
              <div
                key={ind.label}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-signal-400/40 hover:bg-white/[0.07]"
              >
                <Icon name={ind.icon} className="h-6 w-6 text-signal-400" />
                <p className="mt-4 text-sm font-semibold">{ind.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS (only when added from admin) */}
      {testimonials.length > 0 && (
        <section className="container-x py-24">
          <SectionHeading align="center" eyebrow="Client voices" title="What our clients say" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.slice(0, 6).map((t) => (
              <figure key={t.id} className="flex flex-col rounded-2xl border border-line bg-white p-7">
                <Icon name="quote" className="h-7 w-7 text-brand-200" />
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-700">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-line pt-4">
                  <p className="font-semibold text-ink-950">{t.name}</p>
                  {t.company && <p className="text-sm text-ink-500">{t.company}</p>}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <CtaBand phone={settings.primaryPhone} />
    </>
  );
}
