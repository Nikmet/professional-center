/* Простой локальный HTTP-сервер без сторонних зависимостей: node tools/server.cjs */
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".txt": "text/plain; charset=utf-8",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".json": "application/json",
};
http
  .createServer((request, response) => {
    try {
      const pathname = decodeURIComponent(
        new URL(request.url, "http://localhost").pathname,
      );
      const filename = path.resolve(
        root,
        "." + (pathname.endsWith("/") ? pathname + "index.html" : pathname),
      );
      if (!filename.startsWith(root + path.sep)) {
        response.writeHead(403).end();
        return;
      }
      fs.readFile(filename, (error, data) => {
        if (error) {
          response.writeHead(404).end("Not found");
          return;
        }
        response.writeHead(200, {
          "Content-Type":
            mime[path.extname(filename)] || "application/octet-stream",
        });
        response.end(data);
      });
    } catch {
      response.writeHead(400).end("Bad request");
    }
  })
  .listen(4173, "127.0.0.1", () => console.log("Сайт: http://127.0.0.1:4173"));
