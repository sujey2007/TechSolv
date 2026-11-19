"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";

const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header({
  phone,
  phoneHref,
  email,
  hours,
}: {
  phone: string;
  phoneHref: string;
  email: string;
  hours: string;
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
            <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-white">
              <Icon name="mail" className="h-3.5 w-3.5 text-signal-400" />
              {email}
            </a>
            <a href={phoneHref} className="flex items-center gap-2 hover:text-white">
              <Icon name="phone" className="h-3.5 w-3.5 text-signal-400" />
              {phone}
            </a>
          </div>
        </div>
      </div>

      <div
        className={`border-b transition-all duration-300 ${
          scrolled
            ? "border-line bg-white/90 shadow-[0_6px_24px_-12px_rgba(10,28,69,0.18)] backdrop-blur-lg"
            : "border-transparent bg-white"
        }`}
      >
        <div className="container-x flex h-[72px] items-center justify-between">
          <Link href="/" aria-label="Techsolv home">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-lg px-4 py-2 text-[15px] font-medium transition-colors ${
                  isActive(item.href) ? "text-brand-600" : "text-ink-700 hover:text-ink-950"
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute inset-x-4 -bottom-[1px] h-0.5 rounded-full bg-brand-600" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(31,74,214,0.7)] transition hover:bg-brand-700"
            >
              Get a free quote
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-xl border border-line text-ink-900 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <Icon name={open ? "x" : "menu"} />
          </button>
        </div>

        {open && (
          <div className="border-t border-line bg-white md:hidden">
            <nav className="container-x flex flex-col py-3" aria-label="Mobile">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3 py-3 text-base font-medium ${
                    isActive(item.href) ? "bg-brand-50 text-brand-700" : "text-ink-800"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={phoneHref}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-line px-4 py-3 font-semibold text-ink-900"
              >
                <Icon name="phone" className="h-4 w-4" /> Call {phone}
              </a>
              <Link
                href="/contact"
                className="mt-2 rounded-xl bg-brand-600 px-4 py-3 text-center font-semibold text-white"
              >
                Get a free quote
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
