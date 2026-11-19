import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="grid min-h-dvh place-items-center bg-paper px-5 text-center">
      <div>
        <Logo />
        <p className="mt-10 font-display text-7xl font-extrabold text-brand-600">404</p>
        <h1 className="mt-3 font-display text-2xl font-bold text-ink-950">Page not found</h1>
        <p className="mt-2 text-ink-500">The page you are looking for doesn&apos;t exist or has moved.</p>
        <Link href="/" className="mt-8 inline-flex rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700">
          Back to home
        </Link>
      </div>
    </div>
  );
}
