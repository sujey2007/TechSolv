import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Icon } from "@/components/Icon";
import { getServices, getSettings } from "@/lib/data";
import { telHref, waHref } from "@/lib/format";

export const revalidate = 300;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, services] = await Promise.all([getSettings(), getServices()]);

  return (
    <>
      <Header
        phone={settings.primaryPhone}
        phoneHref={telHref(settings.primaryPhone)}
        email={settings.emails[0] ?? ""}
        hours={settings.hours}
      />
      <main>{children}</main>
      <Footer settings={settings} services={services} />

      {settings.whatsapp && (
        <a
          href={waHref(settings.whatsapp, "Hi Techsolv, I'd like to enquire about your services.")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#1fa855] py-3 pl-3.5 pr-4 text-sm font-semibold text-white shadow-[0_12px_30px_-10px_rgba(31,168,85,0.8)] transition hover:-translate-y-0.5"
        >
          <Icon name="chat" className="h-5 w-5" />
          <span className="hidden sm:inline">WhatsApp us</span>
        </a>
      )}
    </>
  );
}
