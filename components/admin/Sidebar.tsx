"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon, type IconKey } from "@/components/Icon";
import { Logo } from "@/components/Logo";

const items: { href: string; label: string; icon: IconKey }[] = [
  { href: "/admin", label: "Dashboard", icon: "grid" },
  { href: "/admin/enquiries", label: "Enquiries", icon: "inbox" },
  { href: "/admin/services", label: "Services", icon: "tools" },
  { href: "/admin/testimonials", label: "Testimonials", icon: "quote" },
  { href: "/admin/settings", label: "Company settings", icon: "sliders" },
];

export function Sidebar({
  username,
  newCount,
  logoutAction,
}: {
  username: string;
  newCount: number;
  logoutAction: () => Promise<void>;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);

  const active = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

  const nav = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b border-line px-5">
        <Link href="/admin">
          <Logo />
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-3" aria-label="Admin">
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
              active(it.href) ? "bg-brand-50 text-brand-700" : "text-ink-600 hover:bg-paper hover:text-ink-950"
            }`}
          >
            <Icon name={it.icon} className="h-[18px] w-[18px]" />
            <span className="flex-1">{it.label}</span>
            {it.href === "/admin/enquiries" && newCount > 0 && (
              <span className="rounded-full bg-brand-600 px-2 py-0.5 text-[11px] font-bold text-white">{newCount}</span>
            )}
          </Link>
        ))}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-600 transition hover:bg-paper hover:text-ink-950"
        >
          <Icon name="external" className="h-[18px] w-[18px]" />
          View website
        </a>
      </nav>
      <div className="border-t border-line p-3">
        <div className="flex items-center gap-3 rounded-xl px-3 py-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ink-950 font-display text-sm font-bold text-white">
            {username.slice(0, 1).toUpperCase()}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-ink-950">{username}</p>
            <p className="text-xs text-ink-400">Administrator</p>
          </div>
          <form action={logoutAction}>
            <button type="submit" title="Sign out" className="grid h-9 w-9 place-items-center rounded-lg text-ink-500 hover:bg-paper hover:text-red-600">
              <Icon name="logout" className="h-[18px] w-[18px]" />
              <span className="sr-only">Sign out</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-line bg-white lg:block">{nav}</aside>

      <div className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-line bg-white px-4 lg:hidden">
        <Logo />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-line"
          aria-label="Open menu"
        >
          <Icon name="menu" />
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-ink-950/40" aria-label="Close menu" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 bg-white shadow-2xl">{nav}</aside>
        </div>
      )}
    </>
  );
}
