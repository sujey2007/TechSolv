import Link from "next/link";
import { Icon, type IconKey } from "@/components/Icon";
import { RotatingWords, Tilt } from "@/components/site/Motion";
import { CtaBand, Cube, IconCube, Marquee, Pyramid, Ring3D, SectionHeading, ServiceCard, ServiceOrbit } from "@/components/site/Sections";
import { getIndustries, getServices, getSettings, getTestimonials } from "@/lib/data";
import { shortTitle, telHref } from "@/lib/format";

const rotating = ["safely secured.", "fully connected.", "installed right.", "built to last.", "cared for."];

const reasons: { icon: IconKey; title: string; text: string }[] = [
  {
    icon: "clipboard",
    title: "We visit before we quote",
    text: "We walk your site, listen to how you use it, and only then recommend what you actually need.",
  },
  {
    icon: "shield",
    title: "Branded, warranty-backed hardware",
    text: "Proven equipment from established manufacturers, installed to spec and backed by warranty.",
  },
  {
    icon: "users",
    title: "One team, every system",
    text: "Cabling, cameras, access, alarms and telephony — one accountable team instead of five vendors.",
  },
  {
    icon: "headset",
    title: "A real person picks up",
    text: "When something needs attention, you call someone who already knows your setup by name.",
  },
];

const steps: { icon: IconKey; title: string; text: string }[] = [
  { icon: "phone", title: "Say hello", text: "Call, WhatsApp or drop an enquiry. Tell us what's worrying you." },
  { icon: "clipboard", title: "Site survey", text: "We visit, measure and plan the right layout for your space." },
  { icon: "tools", title: "Clean install", text: "Neat, labelled installation, testing and hands-on training." },
  { icon: "headset", title: "We stay close", text: "Preventive visits and quick help whenever you need it." },
];

const faqs = [
  {
    q: "Do you charge for the site survey?",
    a: "No. We visit your premises, understand your requirement and share an itemised quote with no obligation.",
  },
  {
    q: "Can I watch my CCTV cameras on my phone?",
    a: "Yes. We configure remote viewing on your phone and computer and show you how to use it before we leave.",
  },
  {
    q: "Do you maintain systems installed by someone else?",
    a: "Yes. We can inspect, repair and take over maintenance of existing CCTV, network, biometric and EPABX setups.",
  },
  {
    q: "Do you work on government and institutional projects?",
    a: "Yes. We support government offices, departments and institutions with installation and maintenance work as per their requirements.",
  },
  {
    q: "What areas do you cover?",
    a: "We are based in Chennai and serve clients across the city and surrounding areas. Call us to check for your location.",
  },
];

export default async function HomePage() {
  const [settings, services, testimonials, industries] = await Promise.all([
    getSettings(),
    getServices(),
    getTestimonials(),
    getIndustries(),
  ]);
  const firstName = settings.contactPerson.split(" ")[0];
  const initials = settings.contactPerson
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-paper via-white to-white">
        <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_80%_70%_at_60%_30%,black,transparent)]" />
        <div className="blob pointer-events-none absolute -left-40 top-10 h-[28rem] w-[28rem] rounded-full bg-brand-200/45 blur-[110px]" />
        <div className="blob pointer-events-none absolute -right-40 bottom-0 h-[26rem] w-[26rem] rounded-full bg-signal-400/20 blur-[110px] [animation-delay:-8s]" />
        <Cube size={44} className="float absolute left-[3%] top-24 hidden 2xl:block" />
        <Cube size={28} className="float-slow absolute bottom-24 left-[6%] hidden 2xl:block" />
        <Cube size={36} className="float absolute right-[3%] top-40 hidden 2xl:block" />
        <Ring3D size={80} className="absolute bottom-16 right-[4%] hidden 2xl:block" />
        <Pyramid size={42} className="float-slow absolute left-[46%] top-10 hidden xl:block" />

        <div className="container-x relative grid items-center gap-12 pb-16 pt-10 sm:pt-14 lg:grid-cols-[1.08fr_1fr] lg:gap-16 lg:pb-24 lg:pt-20">
          <div>
            <span className="rise inline-flex max-w-full items-center gap-2 rounded-full border border-brand-100 bg-white px-3.5 py-1.5 text-[13px] font-medium text-ink-700 shadow-sm">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal-500" />
              </span>
              <span className="truncate">Chennai&apos;s friendly security &amp; IT team</span>
            </span>

            <h1 className="rise mt-6 font-display text-[2.15rem] font-extrabold leading-[1.08] tracking-tight text-ink-950 [animation-delay:80ms] min-[400px]:text-[2.5rem] sm:text-5xl lg:text-[3.5rem] xl:text-[3.9rem]">
              Your workplace,
              <br />
              <RotatingWords words={rotating} />
            </h1>

            <p className="rise mt-6 max-w-xl text-[17px] leading-relaxed text-ink-500 [animation-delay:160ms] sm:text-lg">
              We&apos;re Techsolv — a Chennai team that designs, installs and looks after CCTV, networks,
              biometrics, alarms, GPS tracking and EPABX systems. Real engineers, a real phone number, and
              support that doesn&apos;t disappear after installation.
            </p>

            <div className="rise mt-8 flex flex-col gap-3 [animation-delay:240ms] sm:flex-row sm:flex-wrap">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 font-semibold text-white shadow-[0_14px_30px_-12px_rgba(31,74,214,0.8)] transition hover:-translate-y-0.5 hover:bg-brand-700"
              >
                Get a free site survey <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-white px-6 py-3.5 font-semibold text-ink-900 transition hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand-700"
              >
                <Icon name="tools" className="h-4 w-4" /> Explore services
              </Link>
            </div>

            <a
              href={telHref(settings.primaryPhone)}
              className="rise group mt-8 flex max-w-md items-center gap-4 rounded-2xl border border-line bg-white/80 p-3 pr-5 shadow-sm backdrop-blur transition [animation-delay:320ms] hover:border-brand-200 hover:shadow-md"
            >
              <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-ink-900 font-display text-sm font-bold text-white">
                {initials}
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm text-ink-500">Talk directly to {firstName}</span>
                <span className="block font-display text-lg font-bold text-ink-950">{settings.primaryPhone}</span>
              </span>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white">
                <Icon name="phone" className="h-4 w-4" />
              </span>
            </a>
          </div>

          {/* 3D visual */}
          <div className="rise relative mx-auto w-full max-w-[600px] [animation-delay:150ms]">
            <div className="spin-slow pointer-events-none absolute -inset-6 rounded-full border-2 border-dashed border-brand-200/70 sm:-inset-10" />
            <Tilt max={6} className="relative">
              <div className="deck deck-2 hidden sm:block" />
              <div className="deck deck-1 hidden sm:block" />
              <div className="relative overflow-hidden rounded-[28px] border-4 border-white shadow-[0_50px_100px_-40px_rgba(10,28,69,0.6)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/hero.jpg"
                  alt="Engineers reviewing network infrastructure in a server room"
                  className="aspect-[4/3.4] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-ink-950/45 via-transparent to-transparent" />
              </div>

              <div className="depth-2 absolute bottom-3 left-3 sm:-left-8 sm:bottom-10">
                <div className="float flex items-center gap-3 rounded-2xl border border-line bg-white/95 p-3 pr-4 shadow-xl backdrop-blur sm:p-4">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon name="camera" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink-950">Live remote viewing</span>
                    <span className="block text-xs text-ink-500">Watch your site from your phone</span>
                  </span>
                </div>
              </div>

              <div className="depth-1 absolute right-3 top-3 sm:-right-6 sm:top-8">
                <div className="float-slow flex items-center gap-3 rounded-2xl border border-line bg-white/95 p-3 pr-4 shadow-xl backdrop-blur sm:p-4">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-signal-50 text-signal-500">
                    <Icon name="fingerprint" />
                  </span>
                  <span className="hidden min-[420px]:block">
                    <span className="block text-sm font-semibold text-ink-950">Access &amp; attendance</span>
                    <span className="block text-xs text-ink-500">Biometric &amp; card based</span>
                  </span>
                </div>
              </div>

              <div className="depth-2 absolute -bottom-6 right-6 hidden sm:block">
                <div className="float flex items-center gap-2 rounded-full bg-ink-950 px-4 py-2.5 text-sm font-semibold text-white shadow-xl [animation-delay:-3s]">
                  <Icon name="heart" className="h-4 w-4 text-signal-400" /> Support after install
                </div>
              </div>
            </Tilt>
          </div>
        </div>
      </section>

      {/* ================= MARQUEE ================= */}
      <section className="border-y border-line bg-paper/60 py-5">
        <Marquee
          items={[
            ...services.map((s) => ({ label: shortTitle(s.title), icon: s.icon })),
            { label: "Free site survey", icon: "clipboard" as const },
            { label: "Annual maintenance", icon: "wrench" as const },
            { label: "Government works", icon: "landmark" as const },
          ]}
        />
      </section>

      {/* ================= SERVICES ================= */}
      <section className="container-x relative py-20 sm:py-24">
        <Ring3D size={70} className="absolute -left-2 top-28 hidden opacity-70 2xl:block" />
        <Cube size={34} className="float absolute right-2 top-24 hidden 2xl:block" />
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="What we do"
            title={
              <>
                Everything your premises needs to stay <span className="text-brand-600">safe and connected</span>
              </>
            }
            intro="Six specialised services, one accountable team — from the first cable to the yearly maintenance visit."
          />
          <Link
            data-reveal
            href="/services"
            className="group inline-flex shrink-0 items-center gap-2 rounded-xl border border-line px-5 py-3 text-sm font-semibold text-ink-900 transition hover:border-brand-200 hover:text-brand-700"
          >
            All services <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="mt-12 grid gap-7 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </section>

      {/* ================= 3D ORBIT ================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-paper to-white py-20 sm:py-24">
        <div className="grid-bg absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="container-x relative grid items-center gap-10 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <SectionHeading
              eyebrow="One connected system"
              title="Six systems. One team that makes them work together."
              intro="Your cameras run on the network we cable. Your biometric doors talk to the same switches. Your EPABX shares the same racks. When one team designs it all, everything simply fits."
            />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {services.map((s, i) => (
                <li
                  key={s.id}
                  data-reveal
                  style={{ ["--d" as string]: `${i * 60}ms` }}
                  className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 text-sm font-semibold text-ink-800"
                >
                  <Icon name={s.icon} className="h-4 w-4 shrink-0 text-brand-600" />
                  {shortTitle(s.title)}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal="zoom">
            <ServiceOrbit services={services} />
          </div>
        </div>
      </section>

      {/* ================= WHY US ================= */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <Pyramid size={46} className="float absolute right-[4%] top-16 hidden xl:block" />
        <Cube size={28} className="float-slow absolute bottom-16 left-[3%] hidden xl:block" />
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <div data-reveal="left" className="relative">
            <div className="grid grid-cols-5 gap-3 sm:gap-4">
              <div className="col-span-3 overflow-hidden rounded-3xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/patch-panel.jpg"
                  alt="Structured network cabling in a patch panel"
                  className="aspect-[3/4] h-full w-full object-cover transition duration-700 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="col-span-2 flex flex-col gap-3 sm:gap-4">
                <div className="overflow-hidden rounded-3xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/repair.jpg"
                    alt="Technician servicing electronic equipment"
                    className="aspect-square w-full object-cover transition duration-700 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-end rounded-3xl bg-ink-950 p-4 text-white sm:p-5">
                  <Icon name="shield" className="h-7 w-7 text-signal-400" />
                  <p className="mt-3 font-display text-base font-bold leading-snug sm:text-lg">Built to be maintained</p>
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
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {reasons.map((r, i) => (
                <div
                  key={r.title}
                  data-reveal
                  style={{ ["--d" as string]: `${i * 80}ms` }}
                  className="group rounded-2xl border border-line bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_24px_48px_-28px_rgba(10,28,69,0.4)]"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white">
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

      {/* ================= HUMAN NOTE ================= */}
      <section className="container-x pb-20 sm:pb-24">
        <div
          data-reveal="zoom"
          className="relative overflow-hidden rounded-[32px] border border-line bg-gradient-to-br from-white via-paper to-brand-50 p-7 sm:p-12 lg:p-16"
        >
          <Icon name="quote" className="absolute right-6 top-6 hidden h-32 w-32 text-brand-100 sm:block" strokeWidth={1.2} />
          <div className="relative grid items-center gap-10 lg:grid-cols-[auto_1fr]">
            <div className="flex items-center gap-4 lg:flex-col lg:items-start">
              <span className="grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-brand-500 to-ink-950 font-display text-2xl font-bold text-white shadow-xl sm:h-24 sm:w-24">
                {initials}
              </span>
              <div>
                <p className="font-display text-lg font-bold text-ink-950">{settings.contactPerson}</p>
                <p className="text-sm text-ink-500">and the Techsolv team</p>
              </div>
            </div>
            <div>
              <span className="eyebrow">A note from us</span>
              <p className="mt-5 text-balance font-display text-xl font-semibold leading-relaxed text-ink-900 sm:text-2xl lg:text-[1.75rem] lg:leading-snug">
                We treat every site like it&apos;s our own office or home. That means turning up when we say
                we will, explaining things in plain language, keeping the wiring neat — and answering the
                phone long after the job is done.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={telHref(settings.primaryPhone)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-ink-800"
                >
                  <Icon name="phone" className="h-4 w-4" /> Call {firstName}
                </a>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-white px-5 py-3 text-sm font-semibold text-ink-900 transition hover:border-brand-200"
                >
                  More about us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="bg-paper py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading align="center" eyebrow="How we work" title="From your first call to years of support" />
          <ol className="relative mt-14 grid gap-10 sm:grid-cols-2 md:mt-16 lg:grid-cols-4 lg:gap-6">
            <div className="absolute left-[12%] right-[12%] top-8 hidden h-px bg-gradient-to-r from-brand-200 via-brand-500 to-signal-400 lg:block" />
            {steps.map((s, i) => (
              <li key={s.title} data-reveal style={{ ["--d" as string]: `${i * 110}ms` }} className="relative text-center">
                <span className="keycap relative mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-brand-100 bg-white text-brand-600">
                  <Icon name={s.icon} className="h-6 w-6" />
                  <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-ink-950 font-display text-[11px] font-bold text-white">
                    {i + 1}
                  </span>
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-ink-950">{s.title}</h3>
                <p className="mx-auto mt-2 max-w-[260px] text-sm leading-relaxed text-ink-500">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= INDUSTRIES (admin-managed) ================= */}
      <section className="relative overflow-hidden bg-ink-950 pb-28 pt-20 text-white sm:pb-32 sm:pt-24">
        <div className="grid-bg absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="blob pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-600/30 blur-[110px]" />
        <div className="blob pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-signal-500/15 blur-[110px] [animation-delay:-9s]" />
        <div className="floor3d" />
        <IconCube size={76} className="float absolute right-[1.5%] top-1/2 hidden -translate-y-1/2 opacity-90 min-[1700px]:block" />
        <div className="container-x relative">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
            <SectionHeading light eyebrow="Who we serve" title={settings.industriesTitle} />
            <p data-reveal className="text-white/65 lg:pb-2">
              {settings.industriesIntro}
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-4">
            {industries.map((ind, i) => (
              <div key={ind.id} data-reveal style={{ ["--d" as string]: `${(i % 4) * 80}ms` }}>
                <Tilt max={8} className="h-full">
                  <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:border-signal-400/50 hover:bg-white/[0.08] sm:p-6">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 text-signal-400 transition duration-300 group-hover:scale-110 group-hover:bg-signal-500 group-hover:text-ink-950">
                      <Icon name={ind.icon} className="h-6 w-6" />
                    </span>
                    <p className="mt-5 font-display text-base font-bold">{ind.label}</p>
                    {ind.description && <p className="mt-1 text-sm text-white/55">{ind.description}</p>}
                  </div>
                </Tilt>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS (only when added from admin) ================= */}
      {testimonials.length > 0 && (
        <section className="container-x py-20 sm:py-24">
          <SectionHeading align="center" eyebrow="Client voices" title="What our clients say" />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 6).map((t, i) => (
              <figure
                key={t.id}
                data-reveal
                style={{ ["--d" as string]: `${(i % 3) * 90}ms` }}
                className="flex flex-col rounded-2xl border border-line bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <Icon name="quote" className="h-7 w-7 text-brand-200" />
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-700">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-6 border-t border-line pt-4">
                  <p className="font-semibold text-ink-950">{t.name}</p>
                  {t.company && <p className="text-sm text-ink-500">{t.company}</p>}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* ================= FAQ ================= */}
      <section className="container-x grid gap-12 py-20 sm:py-24 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Questions"
            title="Things people usually ask us"
            intro="Can't find your answer? Just call or WhatsApp — we're happy to help, even if you're only exploring."
          />
          <a
            data-reveal
            href={telHref(settings.primaryPhone)}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-700"
          >
            <Icon name="phone" className="h-4 w-4" /> {settings.primaryPhone}
          </a>
          <IconCube size={130} className="mt-16 hidden w-fit pl-10 lg:block" />
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <details
              key={f.q}
              data-reveal
              style={{ ["--d" as string]: `${i * 70}ms` }}
              className="faq group rounded-2xl border border-line bg-white transition open:border-brand-200 open:shadow-[0_20px_40px_-28px_rgba(10,28,69,0.4)]"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-display font-semibold text-ink-950 sm:p-6">
                {f.q}
                <span className="faq-chevron grid h-8 w-8 shrink-0 place-items-center rounded-full bg-paper text-brand-600 transition duration-300">
                  <Icon name="chevron" className="h-4 w-4" />
                </span>
              </summary>
              <div className="faq-body">
                <p className="overflow-hidden px-5 text-[15px] leading-relaxed text-ink-500 sm:px-6">
                  <span className="block pb-5 sm:pb-6">{f.a}</span>
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <CtaBand phone={settings.primaryPhone} />
    </>
  );
}
