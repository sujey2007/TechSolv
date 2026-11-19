import { getDb } from "./firebase-admin";
import { defaultServices, defaultSettings } from "./defaults";
import type { CompanySettings, Enquiry, Service, Testimonial } from "./types";

const defaultsWithIds = (): Service[] => defaultServices.map((s) => ({ ...s, id: s.slug }));

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    console.error("[firestore]", err);
    return fallback;
  }
}

export async function getSettings(): Promise<CompanySettings> {
  const db = getDb();
  if (!db) return defaultSettings;
  return safe(async () => {
    const snap = await db.collection("settings").doc("company").get();
    return snap.exists
      ? { ...defaultSettings, ...(snap.data() as Partial<CompanySettings>) }
      : defaultSettings;
  }, defaultSettings);
}

/** All services incl. hidden ones. Falls back to built-in defaults when Firestore is empty or not configured. */
export async function getAllServices(): Promise<Service[]> {
  const db = getDb();
  if (!db) return defaultsWithIds();
  return safe(async () => {
    const snap = await db.collection("services").orderBy("order").get();
    if (snap.empty) return defaultsWithIds();
    return snap.docs.map((d) => ({ ...(d.data() as Omit<Service, "id">), id: d.id }));
  }, defaultsWithIds());
}

export async function getServices(): Promise<Service[]> {
  return (await getAllServices()).filter((s) => s.published);
}

export async function getServiceBySlug(slug: string) {
  return (await getServices()).find((s) => s.slug === slug) ?? null;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const db = getDb();
  if (!db) return [];
  return safe(async () => {
    const snap = await db.collection("testimonials").orderBy("order").get();
    return snap.docs.map((d) => ({ ...(d.data() as Omit<Testimonial, "id">), id: d.id }));
  }, []);
}

export async function getEnquiries(limit = 300): Promise<Enquiry[]> {
  const db = getDb();
  if (!db) return [];
  return safe(async () => {
    const snap = await db.collection("enquiries").orderBy("createdAt", "desc").limit(limit).get();
    return snap.docs.map((d) => ({ ...(d.data() as Omit<Enquiry, "id">), id: d.id }));
  }, []);
}

export async function hasStoredServices() {
  const db = getDb();
  if (!db) return false;
  return safe(async () => !(await db.collection("services").limit(1).get()).empty, false);
}
