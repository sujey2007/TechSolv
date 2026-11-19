import { DbWarning, PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { getSettings } from "@/lib/data";
import { isFirestoreConfigured } from "@/lib/firebase-admin";
import { SettingsForm } from "./SettingsForm";

export const metadata = { title: "Company settings" };

export default async function SettingsPage() {
  await requireAdmin();
  const settings = await getSettings();
  return (
    <div className="space-y-6">
      <PageHeader title="Company settings" description="Contact details and company information used across the website." />
      {!isFirestoreConfigured() && <DbWarning />}
      <SettingsForm settings={settings} />
    </div>
  );
}
