const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 8080;
const ROOT = path.join(__dirname, "pages");
const WORKSPACE_ROOT = path.join(__dirname, "..");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".ttf": "font/ttf",
  ".mov": "video/quicktime",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".pdf": "application/pdf"
};

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split("?")[0]);
  if (urlPath === "/") urlPath = "/index.html";

  let filePath = path.join(ROOT, urlPath);
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      const tryPaths = [path.join(__dirname, urlPath)];
      if (urlPath.startsWith("/workspace-media/")) {
        const rel = decodeURIComponent(urlPath.slice("/workspace-media/".length));
        tryPaths.push(path.join(WORKSPACE_ROOT, rel));
      }
      const inside = (p, root) => p === root || p.startsWith(root + path.sep);
      let served = false;
      const attempt = (paths, idx) => {
        if (idx >= paths.length) {
          if (!served) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("404 Not Found: " + urlPath);
          }
          return;
        }
        const altPath = paths[idx];
        if (!inside(altPath, __dirname) && !inside(altPath, WORKSPACE_ROOT)) {
          attempt(paths, idx + 1);
          return;
        }
        fs.stat(altPath, (altErr, altStat) => {
          if (altErr || !altStat.isFile()) {
            attempt(paths, idx + 1);
            return;
          }
          served = true;
          const ext = path.extname(altPath).toLowerCase();
          res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
          fs.createReadStream(altPath).pipe(res);
        });
      };
      attempt(tryPaths, 0);
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`Sapiens Nova clone running at http://localhost:${PORT}`);
});
