/**
 * Smoke test: starts the production build, checks every route and admin access control.
 * Requires `npm run build` first. Usage: npm run test:smoke
 */
import { spawn } from "node:child_process";
import { SignJWT } from "jose";

const PORT = 3210;
const BASE = `http://localhost:${PORT}`;
let failures = 0;

function check(name, ok, detail = "") {
  console.log(`${ok ? "  ✓" : "  ✗"} ${name}${detail ? `  (${detail})` : ""}`);
  if (!ok) failures++;
}

const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", String(PORT)], {
  stdio: ["ignore", "pipe", "pipe"],
  env: process.env,
});
server.stderr.on("data", (d) => process.stderr.write(d));

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      await fetch(BASE);
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  throw new Error("Server did not start");
}

try {
  await waitForServer();
  console.log("Public pages");
  const pages = {
    "/": ["Techsolv", "What we do", "Who we serve", "Government works"],
    "/services": ["Networking", "CCTV Camera", "EPABX"],
    "/services/cctv": ["CCTV Camera", "What&#x27;s included"],
    "/services/biometrics": ["Biometrics"],
    "/about": ["Who we are"],
    "/contact": ["Send us an enquiry", "Full name"],
    "/sitemap.xml": ["/services/networking"],
    "/robots.txt": ["Disallow: /admin"],
  };
  for (const [path, needles] of Object.entries(pages)) {
    const res = await fetch(BASE + path);
    const html = await res.text();
    const missing = needles.filter((n) => !html.includes(n));
    check(`${path} → ${res.status}`, res.status === 200 && missing.length === 0, missing.length ? `missing: ${missing.join(", ")}` : "");
  }

  const nf = await fetch(BASE + "/services/does-not-exist");
  check("unknown service → 404", nf.status === 404, String(nf.status));

  console.log("Admin access control");
  const adminPaths = ["/admin", "/admin/enquiries", "/admin/services", "/admin/industries", "/admin/testimonials", "/admin/settings"];
  for (const p of adminPaths) {
    const res = await fetch(BASE + p, { redirect: "manual" });
    const loc = res.headers.get("location") || "";
    check(`${p} without session → redirect to login`, res.status === 307 && loc.includes("/admin/login"), `${res.status} ${loc}`);
  }
  const forged = await fetch(BASE + "/admin", { redirect: "manual", headers: { cookie: "techsolv_admin=not-a-valid-token" } });
  check("invalid session cookie is rejected", forged.status === 307, String(forged.status));

  if (process.env.ADMIN_SESSION_SECRET) {
    const token = await new SignJWT({ sub: process.env.ADMIN_USERNAME || "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("5m")
      .sign(new TextEncoder().encode(process.env.ADMIN_SESSION_SECRET));
    for (const p of [...adminPaths, "/admin/services/new"]) {
      const res = await fetch(BASE + p, { redirect: "manual", headers: { cookie: `techsolv_admin=${token}` } });
      check(`${p} with valid session → 200`, res.status === 200, String(res.status));
    }
  } else {
    console.log("  - skipped signed-in checks (ADMIN_SESSION_SECRET not set)");
  }

  const login = await fetch(BASE + "/admin/login");
  check("/admin/login → 200", login.status === 200, String(login.status));
} catch (e) {
  console.error(e);
  failures++;
} finally {
  server.kill();
}

console.log(failures ? `\n${failures} check(s) failed` : "\nAll smoke checks passed");
process.exit(failures ? 1 : 0);
