import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Logo } from "@/components/Logo";
import { getSession } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Admin login", robots: { index: false, follow: false } };

export default async function LoginPage() {
  if (await getSession()) redirect("/admin");

  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-ink-950 lg:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/server-room.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-700/60 via-ink-950/80 to-ink-950" />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <Logo light />
          <div>
            <p className="font-display text-4xl font-bold leading-tight">
              Manage your website,
              <br /> services and enquiries.
            </p>
            <p className="mt-4 max-w-md text-white/65">
              Everything you update here is reflected on the public website within moments.
            </p>
          </div>
          <p className="text-xs text-white/40">Techsolv Admin Console</p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-paper px-5 py-16">
        <div className="w-full max-w-sm">
          <div className="lg:hidden">
            <Logo />
          </div>
          <h1 className="mt-8 font-display text-3xl font-bold text-ink-950 lg:mt-0">Sign in</h1>
          <p className="mt-2 text-ink-500">Enter your admin credentials to continue.</p>
          <div className="mt-8 rounded-2xl border border-line bg-white p-7 shadow-sm">
            <LoginForm />
          </div>
          <Link href="/" className="mt-6 inline-block text-sm text-ink-500 hover:text-brand-600">
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}
