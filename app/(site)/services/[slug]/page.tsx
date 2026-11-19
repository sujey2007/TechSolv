import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { CtaBand, ServiceCard } from "@/components/site/Sections";
import { getServiceBySlug, getServices, getSettings } from "@/lib/data";
import { shortTitle, telHref } from "@/lib/format";

export async function generateStaticParams() {
  return (await getServices()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const service = await getServiceBySlug((await params).slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
    openGraph: { images: [service.image] },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [service, services, settings] = await Promise.all([
    getServiceBySlug(slug),
    getServices(),
    getSettings(),
  ]);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-ink-950 text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={service.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/30" />
        <div className="container-x relative py-16 md:py-28">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/60">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white">Services</Link>
            <span>/</span>
            <span className="text-white">{service.title}</span>
          </nav>
          <span className="float grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-signal-400 ring-1 ring-white/20 backdrop-blur">
            <Icon name={service.icon} className="h-7 w-7" />
          </span>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-signal-400">{service.tagline}</p>
          <h1 className="rise mt-3 max-w-3xl text-balance font-display text-[2.1rem] font-extrabold [animation-delay:80ms] sm:text-4xl leading-[1.1] tracking-tight md:text-5xl">
            {service.title}
          </h1>
          <p className="rise mt-5 max-w-2xl text-lg leading-relaxed text-white/75 [animation-delay:160ms]">{service.summary}</p>
        </div>
      </section>

      <section className="container-x grid gap-14 py-16 sm:py-20 lg:grid-cols-[1.6fr_1fr]">
        <div data-reveal>
          <span className="eyebrow">Overview</span>
          <p className="mt-5 text-lg leading-relaxed text-ink-700">{service.description}</p>

          <h2 className="mt-14 font-display text-2xl font-bold text-ink-950">What&apos;s included</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {service.features.map((f) => (
              <li key={f} className="flex gap-3 rounded-2xl border border-line bg-paper p-5 text-[15px] text-ink-800 transition duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white hover:shadow-md">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-600 text-white">
                  <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.8} />
                </span>
                {f}
              </li>
            ))}
          </ul>

          <h2 className="mt-14 font-display text-2xl font-bold text-ink-950">How we deliver</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              ["Survey", "We inspect your site and understand requirements."],
              ["Install", "Clean, tested installation and configuration."],
              ["Support", "Training, AMC and fast breakdown support."],
            ].map(([t, d], i) => (
              <div key={t} className="rounded-2xl border border-line p-5">
                <span className="font-display text-sm font-bold text-brand-600">0{i + 1}</span>
                <p className="mt-2 font-display font-bold text-ink-950">{t}</p>
                <p className="mt-1 text-sm text-ink-500">{d}</p>
              </div>
            ))}
          </div>
        </div>

        <aside data-reveal="right" className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl border border-line bg-white p-7 shadow-[0_30px_60px_-40px_rgba(10,28,69,0.5)]">
            <h3 className="font-display text-xl font-bold text-ink-950">Get a quote for {shortTitle(service.title)}</h3>
            <p className="mt-2 text-sm text-ink-500">
              Share your requirement and we&apos;ll get back with a site visit and a clear estimate.
            </p>
            <Link
              href={`/contact?service=${service.slug}`}
              className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3.5 font-semibold text-white transition hover:bg-brand-700"
            >
              Request a quote <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <a
              href={telHref(settings.primaryPhone)}
              className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-line px-5 py-3.5 font-semibold text-ink-900 transition hover:border-brand-200"
            >
              <Icon name="phone" className="h-4 w-4" /> {settings.primaryPhone}
            </a>
            <div className="mt-6 border-t border-line pt-5 text-sm text-ink-500">
              <p className="font-semibold text-ink-800">{settings.contactPerson}</p>
              <p>{settings.hours}</p>
            </div>
          </div>
        </aside>
      </section>

      {others.length > 0 && (
        <section className="bg-paper py-20">
          <div className="container-x">
            <h2 className="font-display text-2xl font-bold text-ink-950">Other services</h2>
            <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((s) => (
                <ServiceCard key={s.id} service={s} index={services.indexOf(s)} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand phone={settings.primaryPhone} />
    </>
  );
}
