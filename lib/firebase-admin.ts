import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

let db: Firestore | null | undefined;

/** Returns a Firestore instance, or null when Firebase credentials are not configured. */
export function getDb(): Firestore | null {
  if (db !== undefined) return db;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    db = null;
    return db;
  }

  const app: App =
    getApps()[0] ?? initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
  db = getFirestore(app);
  return db;
}

export const isFirestoreConfigured = () => getDb() !== null;
