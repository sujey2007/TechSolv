"use server";

import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/firebase-admin";

export type ContactState = { ok: boolean; message: string } | null;

const clip = (v: FormDataEntryValue | null, max: number) => String(v ?? "").trim().slice(0, max);

export async function submitEnquiry(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real users never fill this hidden field.
  if (clip(formData.get("company_website"), 200)) return { ok: true, message: "Thank you!" };

  const name = clip(formData.get("name"), 120);
  const phone = clip(formData.get("phone"), 30);
  const email = clip(formData.get("email"), 160);
  const service = clip(formData.get("service"), 120);
  const message = clip(formData.get("message"), 3000);

  if (name.length < 2) return { ok: false, message: "Please enter your name." };
  if (phone.replace(/\D/g, "").length < 10) return { ok: false, message: "Please enter a valid phone number." };
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { ok: false, message: "Please enter a valid email address." };

  const db = getDb();
  if (!db) {
    return {
      ok: false,
      message: "Online enquiries are temporarily unavailable. Please call or WhatsApp us directly.",
    };
  }

  try {
    await db.collection("enquiries").add({
      name,
      phone,
      email,
      service,
      message,
      status: "new",
      createdAt: Date.now(),
    });
  } catch (err) {
    console.error("[enquiry]", err);
    return { ok: false, message: "Something went wrong. Please try again or call us." };
  }

  revalidatePath("/admin", "layout");
  return { ok: true, message: "Thank you! Your enquiry has been received — we'll get back to you shortly." };
}
