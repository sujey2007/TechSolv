import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { telHref } from "@/lib/format";
import type { CompanySettings, Service } from "@/lib/types";

export function Footer({ settings, services }: { settings: CompanySettings; services: Service[] }) {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-white/70">
      <div className="pointer-events-none absolute -top-40 right-[-10%] h-[420px] w-[420px] rounded-full bg-brand-600/25 blur-[120px]" />
      <div className="container-x relative grid gap-10 py-14 sm:grid-cols-2 sm:py-16 lg:grid-cols-12 lg:gap-12">
        <div className="sm:col-span-2 lg:col-span-4">
          <Logo light />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">{settings.tagline}.</p>
          <p className="mt-6 text-sm">
            <span className="block text-xs uppercase tracking-[0.14em] text-white/40">Contact person</span>
            <span className="mt-1 block font-semibold text-white">{settings.contactPerson}</span>
          </p>
        </div>

        <div className="lg:col-span-4">
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-white">
            Services
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.id}>
                <Link href={`/services/${s.slug}`} className="inline-block transition hover:translate-x-1 hover:text-white">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-white">
            Reach us
          </h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-signal-400" />
              <span>
                {settings.address}
                <br />
                {settings.city}
              </span>
            </li>
            {[settings.primaryPhone, settings.secondaryPhone].filter(Boolean).map((p) => (
              <li key={p} className="flex gap-3">
                <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-signal-400" />
                <a href={telHref(p)} className="hover:text-white">
                  {p}
                </a>
              </li>
            ))}
            {settings.emails.map((e) => (
              <li key={e} className="flex gap-3">
                <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-signal-400" />
                <a href={`mailto:${e}`} className="break-all hover:text-white">
                  {e}
                </a>
              </li>
            ))}
            <li className="flex gap-3">
              <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-signal-400" />
              <span>{settings.hours}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 pb-24 pt-6 text-center text-xs text-white/45 sm:flex-row sm:pb-6 sm:pr-52 sm:text-left">
          <span>
            © {year} {settings.name}. All rights reserved.
          </span>
          <div className="flex gap-5">
            <Link href="/about" className="hover:text-white">
              About
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
