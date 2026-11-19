"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkCredentials, createSession, destroySession, requireAdmin } from "@/lib/auth";
import { defaultServices, defaultSettings } from "@/lib/defaults";
import { getDb } from "@/lib/firebase-admin";
import { slugify } from "@/lib/format";
import type { CompanySettings, EnquiryStatus, IconName } from "@/lib/types";

export type FormState = { ok: boolean; message: string } | null;

const str = (fd: FormData, key: string, max = 500) => String(fd.get(key) ?? "").trim().slice(0, max);
const lines = (fd: FormData, key: string) =>
  str(fd, key, 5000)
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

const ICONS: IconName[] = ["network", "wrench", "camera", "alarm", "fingerprint", "phone"];

function requireDb() {
  const db = getDb();
  if (!db) throw new Error("Firestore is not configured. Add the FIREBASE_* environment variables.");
  return db;
}

function refreshSite() {
  revalidatePath("/", "layout");
}

/* ---------------- Auth ---------------- */

export async function login(_prev: FormState, fd: FormData): Promise<FormState> {
  const username = str(fd, "username", 100);
  const password = String(fd.get("password") ?? "").slice(0, 200);
  if (!checkCredentials(username, password)) {
    await new Promise((r) => setTimeout(r, 700)); // slow down guessing
    return { ok: false, message: "Invalid username or password." };
  }
  await createSession(username);
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

/* ---------------- Services ---------------- */

export async function saveService(_prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  try {
    const db = requireDb();
    const id = str(fd, "id", 100);
    const title = str(fd, "title", 140);
    if (!title) return { ok: false, message: "Title is required." };
    const slug = slugify(str(fd, "slug", 100) || title);
    const icon = str(fd, "icon", 20) as IconName;

    const data = {
      title,
      slug,
      tagline: str(fd, "tagline", 160),
      summary: str(fd, "summary", 400),
      description: str(fd, "description", 4000),
      features: lines(fd, "features").slice(0, 20),
      image: str(fd, "image", 1000) || "/images/server-room.jpg",
      icon: ICONS.includes(icon) ? icon : "network",
      order: Number(str(fd, "order", 6)) || 0,
      published: fd.get("published") === "on",
    };

    const clash = await db.collection("services").where("slug", "==", slug).limit(2).get();
    if (clash.docs.some((d) => d.id !== id)) return { ok: false, message: `Slug "${slug}" is already used.` };

    if (id) await db.collection("services").doc(id).set(data, { merge: true });
    else await db.collection("services").add(data);
  } catch (e) {
    return { ok: false, message: (e as Error).message };
  }
  refreshSite();
  redirect("/admin/services?saved=1");
}

export async function deleteService(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id", 100);
  if (id) await requireDb().collection("services").doc(id).delete();
  refreshSite();
  redirect("/admin/services");
}

export async function toggleService(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id", 100);
  const published = fd.get("published") === "true";
  if (id) await requireDb().collection("services").doc(id).update({ published: !published });
  refreshSite();
}

export async function seedDefaults() {
  await requireAdmin();
  const db = requireDb();
  const existing = await db.collection("services").limit(1).get();
  const batch = db.batch();
  if (existing.empty) {
    for (const s of defaultServices) batch.set(db.collection("services").doc(s.slug), s);
  }
  const settingsRef = db.collection("settings").doc("company");
  if (!(await settingsRef.get()).exists) batch.set(settingsRef, defaultSettings);
  await batch.commit();
  refreshSite();
  redirect("/admin?seeded=1");
}

/* ---------------- Enquiries ---------------- */

export async function setEnquiryStatus(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id", 100);
  const status = str(fd, "status", 20) as EnquiryStatus;
  if (!id || !["new", "contacted", "closed"].includes(status)) return;
  await requireDb().collection("enquiries").doc(id).update({ status });
  revalidatePath("/admin", "layout");
}

export async function deleteEnquiry(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id", 100);
  if (id) await requireDb().collection("enquiries").doc(id).delete();
  revalidatePath("/admin", "layout");
}

/* ---------------- Testimonials ---------------- */

export async function addTestimonial(_prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  try {
    const name = str(fd, "name", 120);
    const quote = str(fd, "quote", 1000);
    if (!name || !quote) return { ok: false, message: "Name and quote are required." };
    await requireDb()
      .collection("testimonials")
      .add({ name, quote, company: str(fd, "company", 160), order: Number(str(fd, "order", 6)) || 0 });
  } catch (e) {
    return { ok: false, message: (e as Error).message };
  }
  refreshSite();
  return { ok: true, message: "Testimonial added." };
}

export async function deleteTestimonial(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id", 100);
  if (id) await requireDb().collection("testimonials").doc(id).delete();
  refreshSite();
}

/* ---------------- Settings ---------------- */

export async function saveSettings(_prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  try {
    const data: CompanySettings = {
      name: str(fd, "name", 100) || defaultSettings.name,
      tagline: str(fd, "tagline", 200),
      contactPerson: str(fd, "contactPerson", 120),
      primaryPhone: str(fd, "primaryPhone", 30),
      secondaryPhone: str(fd, "secondaryPhone", 30),
      emails: lines(fd, "emails").slice(0, 5),
      address: str(fd, "address", 200),
      city: str(fd, "city", 120),
      hours: str(fd, "hours", 120),
      whatsapp: str(fd, "whatsapp", 20).replace(/\D/g, ""),
      about: str(fd, "about", 3000),
    };
    await requireDb().collection("settings").doc("company").set(data);
  } catch (e) {
    return { ok: false, message: (e as Error).message };
  }
  refreshSite();
  return { ok: true, message: "Settings saved. The website has been updated." };
}
