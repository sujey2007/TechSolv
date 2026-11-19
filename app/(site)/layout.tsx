import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { RevealObserver } from "@/components/site/Motion";
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
        services={services.map(({ slug, title, tagline, icon }) => ({ slug, title, tagline, icon }))}
      />
      <main>{children}</main>
      <Footer settings={settings} services={services} />
      <RevealObserver />

      {settings.whatsapp && (
        <a
          href={waHref(settings.whatsapp, "Hi Techsolv, I'd like to enquire about your services.")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="group fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full bg-[#1fa855] p-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_-10px_rgba(31,168,85,0.8)] transition hover:-translate-y-0.5 sm:bottom-6 sm:right-6 sm:py-3 sm:pl-3.5 sm:pr-5"
        >
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#1fa855]/40 [animation-duration:2.5s]" />
          <Icon name="chat" className="h-5 w-5" />
          <span className="hidden sm:inline">Chat with us</span>
        </a>
      )}
    </>
  );
}
