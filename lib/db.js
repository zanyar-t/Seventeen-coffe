import fs from "fs";
import path from "path";

// روی Railway یک Volume به مسیر /data وصل می‌کنیم (دقیقاً مثل CactusStore)
// روی لوکال از پوشه ./data استفاده می‌شود.
const DATA_DIR = process.env.DATA_DIR || (process.env.RAILWAY_ENVIRONMENT ? "/data" : path.join(process.cwd(), "data"));

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function filePath(name) {
  return path.join(DATA_DIR, `${name}.json`);
}

export function readAll(name) {
  ensureDir();
  const fp = filePath(name);
  if (!fs.existsSync(fp)) return [];
  try {
    const raw = fs.readFileSync(fp, "utf-8");
    return JSON.parse(raw || "[]");
  } catch (err) {
    console.error(`db read error (${name}):`, err);
    return [];
  }
}

export function appendItem(name, item) {
  ensureDir();
  const items = readAll(name);
  const record = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    createdAt: new Date().toISOString(),
    ...item,
  };
  items.push(record);
  fs.writeFileSync(filePath(name), JSON.stringify(items, null, 2), "utf-8");
  return record;
}

export function updateItem(name, id, patch) {
  ensureDir();
  const items = readAll(name);
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...patch };
  fs.writeFileSync(filePath(name), JSON.stringify(items, null, 2), "utf-8");
  return items[idx];
}
