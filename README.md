# Techsolv Website

Public website + admin panel for **Techsolv**, built with Next.js 16 (App Router), Tailwind CSS v4 and Firestore. Deploys to Vercel.

```
app/
  (site)/            Public website: home, services, services/[slug], about, contact
  admin/login        Admin sign-in
  admin/(panel)/     Admin panel: dashboard, enquiries, services, testimonials, settings
  admin/actions.ts   Server actions (all protected by requireAdmin)
lib/                 Firestore (Admin SDK), auth, data loaders, default content
public/images/       Service photography (Unsplash licence)
```

## How data works

- All Firestore access happens **on the server** via the Firebase Admin SDK, so `firestore.rules` denies all direct client access.
- Until Firestore is configured, the site shows built-in default content from `lib/defaults.ts`.
- After connecting Firestore, sign in to `/admin` and click **Import default content** to copy the services and company details into the database, then edit them there.
- Collections: `services`, `industries` (sectors we serve, e.g. Government works), `settings/company`, `testimonials`, `enquiries`.
- `npm run seed` imports the default content from the command line (never overwrites existing data).

## Local development

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev
```

## Tests

```bash
npm run typecheck    # TypeScript
npm test             # unit tests (helpers + default content)
npm run test:smoke   # starts the production build, checks every route and admin access control
npm run test:all     # all of the above, including a production build
```

## Firebase setup

1. Create a project at https://console.firebase.google.com and enable **Firestore Database** (production mode).
2. Project settings → Service accounts → **Generate new private key**. Copy `project_id`, `client_email` and `private_key` into the env vars.
3. Optional, to deploy rules: update `.firebaserc` with your project id, then `npx firebase-tools deploy --only firestore`.

## Deploy to Vercel

1. Import the GitHub repo in Vercel (framework is detected automatically).
2. Add these environment variables (Production + Preview):
   `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`, `NEXT_PUBLIC_SITE_URL`.
3. Deploy.
