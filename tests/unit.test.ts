import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { formatDate, shortTitle, slugify, telHref, waHref } from "../lib/format.ts";
import { defaultIndustries, defaultServices, defaultSettings } from "../lib/defaults.ts";
import { INDUSTRY_ICON_OPTIONS } from "../lib/options.ts";

test("telHref adds +91 to 10-digit Indian numbers", () => {
  assert.equal(telHref("90944 99449"), "tel:+919094499449");
  assert.equal(telHref("+91 97109 09090"), "tel:+919710909090");
});

test("waHref builds a wa.me link with encoded text", () => {
  assert.equal(waHref("91 90944 99449"), "https://wa.me/919094499449");
  assert.equal(waHref("919094499449", "Hi there"), "https://wa.me/919094499449?text=Hi%20there");
});

test("slugify produces URL-safe slugs", () => {
  assert.equal(slugify("CCTV Camera (Installation & Maintenance)"), "cctv-camera-installation-and-maintenance");
  assert.equal(slugify("  --Hello World--  "), "hello-world");
});

test("shortTitle trims long service titles", () => {
  assert.equal(shortTitle("Burglar Alarm & Vehicle / Asset Tracking"), "Burglar Alarm");
  assert.equal(shortTitle("Maintenance Contract & Printing Consumables"), "Maintenance Contract");
  assert.equal(shortTitle("EPABX"), "EPABX");
});

test("formatDate renders in IST", () => {
  assert.match(formatDate(Date.UTC(2026, 0, 1, 0, 0)), /01 Jan 2026/);
});

test("default services are valid and unique", () => {
  const slugs = defaultServices.map((s) => s.slug);
  assert.equal(new Set(slugs).size, slugs.length, "slugs must be unique");
  for (const s of defaultServices) {
    assert.ok(s.title && s.summary && s.description, `${s.slug} has copy`);
    assert.ok(s.features.length >= 3, `${s.slug} has features`);
    assert.equal(slugify(s.slug), s.slug, `${s.slug} is a clean slug`);
    assert.ok(existsSync(join("public", s.image)), `${s.slug} image exists: ${s.image}`);
  }
});

test("default industries include Government works and use known icons", () => {
  const icons = new Set(INDUSTRY_ICON_OPTIONS.map((o) => o.value));
  assert.ok(defaultIndustries.some((i) => /government/i.test(i.label)));
  for (const i of defaultIndustries) assert.ok(icons.has(i.icon), `${i.label} icon ${i.icon}`);
});

test("default settings contain company contact details", () => {
  assert.equal(defaultSettings.name, "Techsolv");
  assert.ok(defaultSettings.primaryPhone.replace(/\D/g, "").length === 10);
  assert.ok(defaultSettings.emails.length >= 1);
  assert.ok(defaultSettings.industriesTitle.length > 0);
});
