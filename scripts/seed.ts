/**
 * Seeds Firestore with the default services and company settings.
 * Existing documents are left untouched.
 *
 *   npm run seed
 */
import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { defaultServices, defaultSettings } from "../lib/defaults.ts";

const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;
if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
  console.error("Missing FIREBASE_* variables in .env.local");
  process.exit(1);
}

const db = getFirestore(
  initializeApp({
    credential: cert({
      projectId: FIREBASE_PROJECT_ID,
      clientEmail: FIREBASE_CLIENT_EMAIL,
      privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  }),
);

const batch = db.batch();
let created = 0;

for (const s of defaultServices) {
  const ref = db.collection("services").doc(s.slug);
  if (!(await ref.get()).exists) {
    batch.set(ref, s);
    created++;
    console.log("  + services/" + s.slug);
  }
}

const settingsRef = db.collection("settings").doc("company");
if (!(await settingsRef.get()).exists) {
  batch.set(settingsRef, defaultSettings);
  created++;
  console.log("  + settings/company");
}

await batch.commit();
console.log(created ? `Seeded ${created} document(s).` : "Nothing to seed — data already exists.");
