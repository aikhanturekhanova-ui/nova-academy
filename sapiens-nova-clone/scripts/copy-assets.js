/**
 * Copies source images/PDFs from the repo root into sapiens-nova-clone/assets.
 * Run from repo root: node sapiens-nova-clone/scripts/copy-assets.js
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..", "..");
const img = path.join(__dirname, "..", "assets", "images");
const evt = path.join(__dirname, "..", "assets", "events");
const leaf = path.join(__dirname, "..", "assets", "leaflets");

function copy(srcName, destDir, destName) {
  const src = path.join(root, srcName);
  const dest = path.join(destDir, destName || srcName);
  if (!fs.existsSync(src)) {
    console.warn("SKIP (missing):", srcName);
    return;
  }
  fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(src, dest);
  console.log("OK:", path.relative(root, dest));
}

const heroSources = [
  "1 (1).jpg", "2 (1).jpg", "3 (1).jpg", "4 (1).jpg", "5.jpg",
  "6 (1).jpg", "7.jpg", "8.JPG", "9.JPG"
];
heroSources.forEach((name, i) => {
  copy(name, img, `${i + 1}.jpg`);
});

[
  ["Japan gf.jpg", "japan-gf.jpg"],
  ["hkusi change.jpg", "hkusi-change.jpg"],
  ["SA.jpg", "sa.jpg"],
  ["Team 9.jpg", "team-9.jpg"],
  ["pic to change.jpeg", "art-culture.jpg"]
].forEach(([src, dest]) => copy(src, img, dest));

for (let i = 1; i <= 5; i++) copy(`SNA photo${i}.jpg`, img, `SNA photo${i}.jpg`);

[
  ["PXL_20260227_020909245.jpg", "ev-imperial-2026-01.jpg"],
  ["PXL_20260714_062231789.jpg", "ev-imperial-2026-02.jpg"],
  ["PXL_20260717_010351859.jpg", "ev-imperial-2026-03.jpg"],
  ["4 (1).jpg", "ev-imperial-2026-04.jpg"],
  ["5.jpg", "ev-imperial-2026-05.jpg"],
  ["6 (1).jpg", "ev-imperial-2026-06.jpg"],
  ["1 (1).jpg", "ev-admission-2026-01.jpg"],
  ["2 (1).jpg", "ev-admission-2026-02.jpg"],
  ["3 (1).jpg", "ev-admission-2026-03.jpg"]
].forEach(([src, dest]) => copy(src, evt, dest));

[
  ["Imperial Engineering Summer School 2027 Leaflet.pdf", "imperial-engineering-2027-leaflet.pdf"],
  ["SZ Tech Catalyst Leaflet (Appa) .pdf", "sz-tech-catalyst-leaflet.pdf"]
].forEach(([src, dest]) => copy(src, leaf, dest));

console.log("Asset copy complete.");
