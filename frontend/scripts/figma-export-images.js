<<<<<<< Updated upstream
#!/usr/bin/env node
/**
 * Figma Image Export Script
 * Exports rendered images for specified nodes from the Figma file.
 *
 * Usage: npm run figma:images
 */

import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.join(ROOT, "design-specs", "images");

const FIGMA_FILE_KEY = "8ky6MAbD5F8TpcRhhxN6ul";
const FIGMA_NODE_ID = "48-12";

function env(name) {
  const v = process.env[name];
  if (!v) {
    console.error(`Missing env: ${name}. Add it to .env (see .env.example)`);
    process.exit(1);
  }
  return v;
}

function collectNodeIds(node, ids = []) {
  if (!node) return ids;
  ids.push(node.id);
  if (node.children) {
    for (const c of node.children) collectNodeIds(c, ids);
  }
  return ids;
}

async function fetchFile(token) {
  const res = await fetch(`https://api.figma.com/v1/files/${FIGMA_FILE_KEY}`, {
    headers: { "X-Figma-Token": token },
  });
  if (!res.ok) throw new Error(`Figma API error ${res.status}: ${await res.text()}`);
  return res.json();
}

async function fetchImages(token, ids, format = "png", scale = 2) {
  const params = new URLSearchParams({ ids: ids.join(","), format, scale: String(scale) });
  const res = await fetch(`https://api.figma.com/v1/images/${FIGMA_FILE_KEY}?${params}`, {
    headers: { "X-Figma-Token": token },
  });
  if (!res.ok) throw new Error(`Figma Images API error ${res.status}: ${await res.text()}`);
  return res.json();
}

async function main() {
  const token = env("FIGMA_ACCESS_TOKEN");
  const nodeIdApi = FIGMA_NODE_ID.replace(/-/g, ":");
  const data = await fetchFile(token);

  const findNode = (node, id) => {
    if (!node) return null;
    if (node.id === id) return node;
    if (node.children) {
      for (const c of node.children) {
        const found = findNode(c, id);
        if (found) return found;
      }
    }
    return null;
  };

  const target = findNode(data.document, nodeIdApi) || data.document;
  const ids = collectNodeIds(target).slice(0, 20);
  if (ids.length === 0) {
    console.log("No nodes to export.");
    return;
  }

  const imgData = await fetchImages(token, ids);
  if (imgData.err) {
    console.error("Figma API error:", imgData.err);
    process.exit(1);
  }

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const [nodeId, url] of Object.entries(imgData.images || {})) {
    if (!url) continue;
    const res = await fetch(url);
    const buf = Buffer.from(await res.arrayBuffer());
    const safeId = nodeId.replace(/[^a-zA-Z0-9-_]/g, "_");
    const filePath = path.join(OUTPUT_DIR, `${safeId}.png`);
    fs.writeFileSync(filePath, buf);
    console.log(`Saved: ${filePath}`);
  }
  console.log(`Done. Images saved to ${OUTPUT_DIR}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
=======
#!/usr/bin/env node
/**
 * Figma Image Export Script
 * Exports rendered images for specified nodes from the Figma file.
 *
 * Usage: npm run figma:images
 */

import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.join(ROOT, "design-specs", "images");

const FIGMA_FILE_KEY = "8ky6MAbD5F8TpcRhhxN6ul";
const FIGMA_NODE_ID = "48-12";

function env(name) {
  const v = process.env[name];
  if (!v) {
    console.error(`Missing env: ${name}. Add it to .env (see .env.example)`);
    process.exit(1);
  }
  return v;
}

function collectNodeIds(node, ids = []) {
  if (!node) return ids;
  ids.push(node.id);
  if (node.children) {
    for (const c of node.children) collectNodeIds(c, ids);
  }
  return ids;
}

async function fetchFile(token) {
  const res = await fetch(`https://api.figma.com/v1/files/${FIGMA_FILE_KEY}`, {
    headers: { "X-Figma-Token": token },
  });
  if (!res.ok) throw new Error(`Figma API error ${res.status}: ${await res.text()}`);
  return res.json();
}

async function fetchImages(token, ids, format = "png", scale = 2) {
  const params = new URLSearchParams({ ids: ids.join(","), format, scale: String(scale) });
  const res = await fetch(`https://api.figma.com/v1/images/${FIGMA_FILE_KEY}?${params}`, {
    headers: { "X-Figma-Token": token },
  });
  if (!res.ok) throw new Error(`Figma Images API error ${res.status}: ${await res.text()}`);
  return res.json();
}

async function main() {
  const token = env("FIGMA_ACCESS_TOKEN");
  const nodeIdApi = FIGMA_NODE_ID.replace(/-/g, ":");
  const data = await fetchFile(token);

  const findNode = (node, id) => {
    if (!node) return null;
    if (node.id === id) return node;
    if (node.children) {
      for (const c of node.children) {
        const found = findNode(c, id);
        if (found) return found;
      }
    }
    return null;
  };

  const target = findNode(data.document, nodeIdApi) || data.document;
  const ids = collectNodeIds(target).slice(0, 20);
  if (ids.length === 0) {
    console.log("No nodes to export.");
    return;
  }

  const imgData = await fetchImages(token, ids);
  if (imgData.err) {
    console.error("Figma API error:", imgData.err);
    process.exit(1);
  }

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const [nodeId, url] of Object.entries(imgData.images || {})) {
    if (!url) continue;
    const res = await fetch(url);
    const buf = Buffer.from(await res.arrayBuffer());
    const safeId = nodeId.replace(/[^a-zA-Z0-9-_]/g, "_");
    const filePath = path.join(OUTPUT_DIR, `${safeId}.png`);
    fs.writeFileSync(filePath, buf);
    console.log(`Saved: ${filePath}`);
  }
  console.log(`Done. Images saved to ${OUTPUT_DIR}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
>>>>>>> Stashed changes
