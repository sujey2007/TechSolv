import type { Metadata } from "next";
import { Sidebar } from "@/components/admin/Sidebar";
import { requireAdmin } from "@/lib/auth";
import { getEnquiries } from "@/lib/data";
import { logout } from "../actions";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · Techsolv Admin" },
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();
  const newCount = (await getEnquiries()).filter((e) => e.status === "new").length;

  return (
    <div className="min-h-dvh bg-paper">
      <Sidebar username={session.username} newCount={newCount} logoutAction={logout} />
      <div className="lg:pl-64">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-10">{children}</div>
      </div>
    </div>
  );
}
