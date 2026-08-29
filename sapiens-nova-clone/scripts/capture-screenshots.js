/**
 * Capture desktop + mobile screenshots of main pages.
 * Requires: npm install playwright && npx playwright install chromium
 * Run: npm run dev (separate terminal) then npm run screenshots
 */
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 8080;
const BASE = `http://localhost:${PORT}`;
const OUT = path.join(__dirname, "..", "screenshots-review");
const PAGES = [
  "index.html",
  "events.html",
  "upcoming.html",
  "global-footprint.html",
  "alumni.html",
  "success-stories.html"
];

async function main() {
  let playwright;
  try {
    playwright = require("playwright");
  } catch (e) {
    console.error("Install Playwright first: npm install playwright && npx playwright install chromium");
    process.exit(1);
  }
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await playwright.chromium.launch();
  for (const page of PAGES) {
    const name = page.replace(".html", "");
    for (const [label, viewport] of [["desktop", { width: 1440, height: 900 }], ["mobile", { width: 390, height: 844 }]]) {
      const ctx = await browser.newContext({ viewport });
      const tab = await ctx.newPage();
      await tab.goto(`${BASE}/${page}`, { waitUntil: "networkidle" });
      await tab.screenshot({ path: path.join(OUT, `${name}-${label}.png`), fullPage: true });
      await ctx.close();
      console.log("Saved", `${name}-${label}.png`);
    }
  }
  await browser.close();
  console.log("Screenshots saved to", OUT);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
