"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon, type IconKey } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import type { IconName } from "@/lib/types";

type NavService = { slug: string; title: string; tagline: string; icon: IconName };

const nav: { href: string; label: string; icon: IconKey }[] = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/services", label: "Services", icon: "tools" },
  { href: "/about", label: "About", icon: "users" },
  { href: "/contact", label: "Contact", icon: "mail" },
];

export function Header({
  phone,
  phoneHref,
  email,
  hours,
  services,
}: {
  phone: string;
  phoneHref: string;
  email: string;
  hours: string;
  services: NavService[];
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-ink-950 text-[13px] text-white/75 md:block">
        <div className="container-x flex h-9 items-center justify-between">
          <span className="flex items-center gap-2">
            <Icon name="clock" className="h-3.5 w-3.5 text-signal-400" />
            {hours}
          </span>
          <div className="flex items-center gap-6">
            <a href={`mailto:${email}`} className="flex items-center gap-2 transition hover:text-white">
              <Icon name="mail" className="h-3.5 w-3.5 text-signal-400" />
              {email}
            </a>
            <a href={phoneHref} className="flex items-center gap-2 transition hover:text-white">
              <Icon name="phone" className="h-3.5 w-3.5 text-signal-400" />
              {phone}
            </a>
          </div>
        </div>
      </div>

      <div
        className={`border-b transition-all duration-300 ${
          scrolled
            ? "border-line bg-white/85 shadow-[0_8px_30px_-14px_rgba(10,28,69,0.25)] backdrop-blur-xl"
            : "border-transparent bg-white"
        }`}
      >
        <div className={`container-x flex items-center justify-between transition-all duration-300 ${scrolled ? "h-16" : "h-[76px]"}`}>
          <Link href="/" aria-label="Techsolv home" className="transition hover:opacity-90">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {nav.map((item) =>
              item.href === "/services" ? (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-[15px] font-medium transition ${
                      isActive(item.href) ? "bg-brand-50 text-brand-700" : "text-ink-700 hover:bg-paper hover:text-ink-950"
                    }`}
                  >
                    <Icon name={item.icon} className="h-[18px] w-[18px]" />
                    {item.label}
                    <Icon name="chevron" className="h-3.5 w-3.5 transition group-hover:rotate-180 group-focus-within:rotate-180" />
                  </Link>
                  <div className="invisible absolute left-1/2 top-full w-[560px] -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <div className="grid grid-cols-2 gap-1 rounded-2xl border border-line bg-white p-2 shadow-[0_30px_60px_-20px_rgba(10,28,69,0.35)]">
                      {services.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/services/${s.slug}`}
                          className="group/item flex gap-3 rounded-xl p-3 transition hover:bg-paper"
                        >
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600 transition group-hover/item:bg-brand-600 group-hover/item:text-white">
                            <Icon name={s.icon} className="h-5 w-5" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-semibold leading-snug text-ink-950">{s.title}</span>
                            <span className="block truncate text-xs text-ink-500">{s.tagline}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-[15px] font-medium transition ${
                    isActive(item.href) ? "bg-brand-50 text-brand-700" : "text-ink-700 hover:bg-paper hover:text-ink-950"
                  }`}
                >
                  <Icon name={item.icon} className="h-[18px] w-[18px]" />
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={phoneHref}
              className="grid h-11 w-11 place-items-center rounded-xl border border-line text-ink-800 transition hover:border-brand-200 hover:text-brand-600"
              aria-label={`Call ${phone}`}
            >
              <Icon name="phone" className="h-[18px] w-[18px]" />
            </a>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(31,74,214,0.8)] transition hover:-translate-y-0.5 hover:bg-brand-700"
            >
              Get a free quote
              <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={phoneHref}
              className="grid h-11 w-11 place-items-center rounded-xl border border-line text-ink-800"
              aria-label={`Call ${phone}`}
            >
              <Icon name="phone" className="h-[18px] w-[18px]" />
            </a>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-xl bg-ink-950 text-white"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <Icon name={open ? "x" : "menu"} />
            </button>
          </div>
        </div>

        {open && (
          <div className="drop max-h-[calc(100dvh-64px)] overflow-y-auto border-t border-line bg-white lg:hidden">
            <nav className="container-x flex flex-col gap-1 py-4" aria-label="Mobile">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-base font-semibold ${
                    isActive(item.href) ? "bg-brand-50 text-brand-700" : "text-ink-800"
                  }`}
                >
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-paper text-brand-600">
                    <Icon name={item.icon} className="h-[18px] w-[18px]" />
                  </span>
                  {item.label}
                </Link>
              ))}
              <p className="mt-3 px-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">Our services</p>
              <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-paper"
                  >
                    <Icon name={s.icon} className="h-4 w-4 shrink-0 text-brand-600" />
                    {s.title}
                  </Link>
                ))}
              </div>
              <Link
                href="/contact"
                className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3.5 font-semibold text-white"
              >
                Get a free quote <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
