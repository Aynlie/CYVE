<<<<<<< Updated upstream
#!/usr/bin/env node
/**
 * Figma Design Export Script
 * Fetches the CYVE wireframe from Figma and exports structure, colors, typography, and layout specs.
 *
 * Prerequisites:
 * - FIGMA_ACCESS_TOKEN in .env (copy from .env.example)
 * - Token scope: file_content:read
 *
 * Usage: npm run figma:export
 */

import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.join(ROOT, "design-specs");

const FIGMA_FILE_KEY = "8ky6MAbD5F8TpcRhhxN6ul";
const FIGMA_NODE_ID = "48-12"; // URL format; API uses 48:12

function env(name) {
  const v = process.env[name];
  if (!v) {
    console.error(`Missing env: ${name}. Add it to .env (see .env.example)`);
    process.exit(1);
  }
  return v;
}

function rgbaToHex({ r = 0, g = 0, b = 0, a = 1 }) {
  const toByte = (v) => Math.round(Math.min(1, Math.max(0, v)) * 255);
  const hex = [r, g, b].map(toByte).map((n) => n.toString(16).padStart(2, "0")).join("");
  return a < 1 ? `#${hex}${toByte(a).toString(16).padStart(2, "0")}` : `#${hex}`;
}

function extractColors(node, colors = new Map()) {
  if (!node || node.visible === false) return colors;
  const { fills, strokes } = node;

  const addFromPaints = (paints) => {
    if (!Array.isArray(paints)) return;
    for (const p of paints) {
      if (p.type === "SOLID" && p.color) {
        const hex = rgbaToHex(p.color);
        const name = node.name || "unknown";
        if (!colors.has(hex)) colors.set(hex, []);
        colors.get(hex).push(name);
      }
      if (p.gradientStops) {
        for (const stop of p.gradientStops) {
          if (stop.color) {
            const hex = rgbaToHex(stop.color);
            if (!colors.has(hex)) colors.set(hex, []);
            colors.get(hex).push(`${node.name || "gradient"} (stop)`);
          }
        }
      }
    }
  };

  addFromPaints(fills);
  addFromPaints(strokes);

  if (node.style && node.style.fills) addFromPaints(node.style.fills);
  if (node.children) {
    for (const c of node.children) extractColors(c, colors);
  }
  return colors;
}

function extractTypography(node, typography = []) {
  if (!node || node.visible === false) return typography;
  if (node.type === "TEXT" && node.style) {
    const s = node.style;
    typography.push({
      name: node.name || "Text",
      fontFamily: s.fontFamily,
      fontWeight: s.fontWeight,
      fontSize: s.fontSize,
      lineHeightPx: s.lineHeightPx,
      letterSpacing: s.letterSpacing,
      textAlignHorizontal: s.textAlignHorizontal,
    });
  }
  if (node.children) {
    for (const c of node.children) extractTypography(c, typography);
  }
  return typography;
}

function extractLayout(node, layouts = [], depth = 0) {
  if (!node || node.visible === false) return layouts;
  const { type, name, absoluteBoundingBox, layoutMode, itemSpacing, paddingLeft, paddingRight, paddingTop, paddingBottom } = node;
  const rect = absoluteBoundingBox;
  if (rect && (type === "FRAME" || type === "RECTANGLE" || type === "COMPONENT" || type === "INSTANCE" || type === "TEXT")) {
    layouts.push({
      name: name || type,
      type,
      depth,
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
      layoutMode: layoutMode || null,
      itemSpacing: itemSpacing ?? null,
      padding: [paddingLeft, paddingRight, paddingTop, paddingBottom].every((v) => v != null)
        ? { left: paddingLeft, right: paddingRight, top: paddingTop, bottom: paddingBottom }
        : null,
    });
  }
  if (node.children) {
    for (const c of node.children) extractLayout(c, layouts, depth + 1);
  }
  return layouts;
}

function flattenTree(node, list = [], depth = 0) {
  if (!node) return list;
  list.push({
    id: node.id,
    name: node.name,
    type: node.type,
    depth,
  });
  if (node.children) {
    for (const c of node.children) flattenTree(c, list, depth + 1);
  }
  return list;
}

async function fetchFigma(options = {}) {
  const token = env("FIGMA_ACCESS_TOKEN");
  const nodeIdApi = FIGMA_NODE_ID.replace(/-/g, ":");
  const params = new URLSearchParams();
  if (options.specificNode) params.set("ids", nodeIdApi);
  const qs = params.toString();
  const url = `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}${qs ? `?${qs}` : ""}`;
  const res = await fetch(url, {
    headers: { "X-Figma-Token": token },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Figma API error ${res.status}: ${text}`);
  }
  return res.json();
}

async function main() {
  console.log("Fetching Figma file...");
  const data = await fetchFigma({ specificNode: true });

  const doc = data.document;
  if (!doc) {
    console.error("No document in response.");
    process.exit(1);
  }

  const getTargetNode = (node, targetId) => {
    if (!node) return null;
    const apiId = targetId.replace(/-/g, ":");
    if (node.id === apiId) return node;
    if (node.children) {
      for (const c of node.children) {
        const found = getTargetNode(c, targetId);
        if (found) return found;
      }
    }
    return null;
  };

  const target = getTargetNode(doc, FIGMA_NODE_ID) || doc;
  const tree = flattenTree(target);
  const colors = extractColors(target);
  const typography = extractTypography(target);
  const layouts = extractLayout(target);

  const spec = {
    meta: {
      fileKey: FIGMA_FILE_KEY,
      nodeId: FIGMA_NODE_ID,
      fileName: data.name,
      lastModified: data.lastModified,
    },
    structure: tree,
    colors: Object.fromEntries(
      [...colors.entries()].map(([hex, names]) => [hex, { usedIn: [...new Set(names)] }])
    ),
    typography: [...new Map(typography.map((t) => [`${t.fontFamily}-${t.fontSize}-${t.fontWeight}`, t])).values()],
    layouts: layouts.filter((l) => l.depth <= 2),
  };

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const outPath = path.join(OUTPUT_DIR, "cyve-design-spec.json");
  fs.writeFileSync(outPath, JSON.stringify(spec, null, 2), "utf-8");
  console.log(`Exported design spec to ${outPath}`);

  const cssVars = [
    "/* Generated from Figma - CYVE Wireframe */",
    ":root {",
    ...[...colors.keys()].map((hex, i) => `  --color-${i + 1}: ${hex};`),
    "",
    ...typography.slice(0, 10).map((t, i) => [
      `  --font-family-${i + 1}: '${t.fontFamily}', sans-serif;`,
      `  --font-size-${i + 1}: ${t.fontSize}px;`,
      `  --font-weight-${i + 1}: ${t.fontWeight};`,
    ].join("\n")),
    "}",
  ].flat().filter(Boolean);
  const cssPath = path.join(OUTPUT_DIR, "design-tokens.css");
  fs.writeFileSync(cssPath, cssVars.join("\n"), "utf-8");
  console.log(`Exported design tokens to ${cssPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
=======
#!/usr/bin/env node
/**
 * Figma Design Export Script
 * Fetches the CYVE wireframe from Figma and exports structure, colors, typography, and layout specs.
 *
 * Prerequisites:
 * - FIGMA_ACCESS_TOKEN in .env (copy from .env.example)
 * - Token scope: file_content:read
 *
 * Usage: npm run figma:export
 */

import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.join(ROOT, "design-specs");

const FIGMA_FILE_KEY = "8ky6MAbD5F8TpcRhhxN6ul";
const FIGMA_NODE_ID = "48-12"; // URL format; API uses 48:12

function env(name) {
  const v = process.env[name];
  if (!v) {
    console.error(`Missing env: ${name}. Add it to .env (see .env.example)`);
    process.exit(1);
  }
  return v;
}

function rgbaToHex({ r = 0, g = 0, b = 0, a = 1 }) {
  const toByte = (v) => Math.round(Math.min(1, Math.max(0, v)) * 255);
  const hex = [r, g, b].map(toByte).map((n) => n.toString(16).padStart(2, "0")).join("");
  return a < 1 ? `#${hex}${toByte(a).toString(16).padStart(2, "0")}` : `#${hex}`;
}

function extractColors(node, colors = new Map()) {
  if (!node || node.visible === false) return colors;
  const { fills, strokes } = node;

  const addFromPaints = (paints) => {
    if (!Array.isArray(paints)) return;
    for (const p of paints) {
      if (p.type === "SOLID" && p.color) {
        const hex = rgbaToHex(p.color);
        const name = node.name || "unknown";
        if (!colors.has(hex)) colors.set(hex, []);
        colors.get(hex).push(name);
      }
      if (p.gradientStops) {
        for (const stop of p.gradientStops) {
          if (stop.color) {
            const hex = rgbaToHex(stop.color);
            if (!colors.has(hex)) colors.set(hex, []);
            colors.get(hex).push(`${node.name || "gradient"} (stop)`);
          }
        }
      }
    }
  };

  addFromPaints(fills);
  addFromPaints(strokes);

  if (node.style && node.style.fills) addFromPaints(node.style.fills);
  if (node.children) {
    for (const c of node.children) extractColors(c, colors);
  }
  return colors;
}

function extractTypography(node, typography = []) {
  if (!node || node.visible === false) return typography;
  if (node.type === "TEXT" && node.style) {
    const s = node.style;
    typography.push({
      name: node.name || "Text",
      fontFamily: s.fontFamily,
      fontWeight: s.fontWeight,
      fontSize: s.fontSize,
      lineHeightPx: s.lineHeightPx,
      letterSpacing: s.letterSpacing,
      textAlignHorizontal: s.textAlignHorizontal,
    });
  }
  if (node.children) {
    for (const c of node.children) extractTypography(c, typography);
  }
  return typography;
}

function extractLayout(node, layouts = [], depth = 0) {
  if (!node || node.visible === false) return layouts;
  const { type, name, absoluteBoundingBox, layoutMode, itemSpacing, paddingLeft, paddingRight, paddingTop, paddingBottom } = node;
  const rect = absoluteBoundingBox;
  if (rect && (type === "FRAME" || type === "RECTANGLE" || type === "COMPONENT" || type === "INSTANCE" || type === "TEXT")) {
    layouts.push({
      name: name || type,
      type,
      depth,
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
      layoutMode: layoutMode || null,
      itemSpacing: itemSpacing ?? null,
      padding: [paddingLeft, paddingRight, paddingTop, paddingBottom].every((v) => v != null)
        ? { left: paddingLeft, right: paddingRight, top: paddingTop, bottom: paddingBottom }
        : null,
    });
  }
  if (node.children) {
    for (const c of node.children) extractLayout(c, layouts, depth + 1);
  }
  return layouts;
}

function flattenTree(node, list = [], depth = 0) {
  if (!node) return list;
  list.push({
    id: node.id,
    name: node.name,
    type: node.type,
    depth,
  });
  if (node.children) {
    for (const c of node.children) flattenTree(c, list, depth + 1);
  }
  return list;
}

async function fetchFigma(options = {}) {
  const token = env("FIGMA_ACCESS_TOKEN");
  const nodeIdApi = FIGMA_NODE_ID.replace(/-/g, ":");
  const params = new URLSearchParams();
  if (options.specificNode) params.set("ids", nodeIdApi);
  const qs = params.toString();
  const url = `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}${qs ? `?${qs}` : ""}`;
  const res = await fetch(url, {
    headers: { "X-Figma-Token": token },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Figma API error ${res.status}: ${text}`);
  }
  return res.json();
}

async function main() {
  console.log("Fetching Figma file...");
  const data = await fetchFigma({ specificNode: true });

  const doc = data.document;
  if (!doc) {
    console.error("No document in response.");
    process.exit(1);
  }

  const getTargetNode = (node, targetId) => {
    if (!node) return null;
    const apiId = targetId.replace(/-/g, ":");
    if (node.id === apiId) return node;
    if (node.children) {
      for (const c of node.children) {
        const found = getTargetNode(c, targetId);
        if (found) return found;
      }
    }
    return null;
  };

  const target = getTargetNode(doc, FIGMA_NODE_ID) || doc;
  const tree = flattenTree(target);
  const colors = extractColors(target);
  const typography = extractTypography(target);
  const layouts = extractLayout(target);

  const spec = {
    meta: {
      fileKey: FIGMA_FILE_KEY,
      nodeId: FIGMA_NODE_ID,
      fileName: data.name,
      lastModified: data.lastModified,
    },
    structure: tree,
    colors: Object.fromEntries(
      [...colors.entries()].map(([hex, names]) => [hex, { usedIn: [...new Set(names)] }])
    ),
    typography: [...new Map(typography.map((t) => [`${t.fontFamily}-${t.fontSize}-${t.fontWeight}`, t])).values()],
    layouts: layouts.filter((l) => l.depth <= 2),
  };

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const outPath = path.join(OUTPUT_DIR, "cyve-design-spec.json");
  fs.writeFileSync(outPath, JSON.stringify(spec, null, 2), "utf-8");
  console.log(`Exported design spec to ${outPath}`);

  const cssVars = [
    "/* Generated from Figma - CYVE Wireframe */",
    ":root {",
    ...[...colors.keys()].map((hex, i) => `  --color-${i + 1}: ${hex};`),
    "",
    ...typography.slice(0, 10).map((t, i) => [
      `  --font-family-${i + 1}: '${t.fontFamily}', sans-serif;`,
      `  --font-size-${i + 1}: ${t.fontSize}px;`,
      `  --font-weight-${i + 1}: ${t.fontWeight};`,
    ].join("\n")),
    "}",
  ].flat().filter(Boolean);
  const cssPath = path.join(OUTPUT_DIR, "design-tokens.css");
  fs.writeFileSync(cssPath, cssVars.join("\n"), "utf-8");
  console.log(`Exported design tokens to ${cssPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
>>>>>>> Stashed changes
