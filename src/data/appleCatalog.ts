export type AppleColor = {
  key: string; // ex: "azul_nevoa"
  label: string; // ex: "Azul Nevoa"
  imageUrl: string;
  isDefault: boolean;
};

export type AppleModel = {
  key: string; // ex: "iphone17pro"
  label: string; // ex: "iPhone 17 Pro"
  colors: AppleColor[];
};

export type AppleFamily = {
  family: string; // ex: "17"
  models: AppleModel[];
};

function titleCaseWords(input: string) {
  return input
    .split(/\s+/g)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function modelLabelFromFolder(folderName: string) {
  // folderName ex: "iphone17promax", "iphone17air", "iphone14plus"
  const raw = folderName.replace(/^iphone/i, ""); // "17promax"
  const m = raw.match(/^(\d+)(.*)$/);
  const family = m?.[1] ?? raw;
  const suffix = (m?.[2] ?? "").toLowerCase();

  const words: string[] = [];
  if (suffix) {
    if (suffix === "promax") words.push("Pro", "Max");
    else if (suffix === "pro") words.push("Pro");
    else if (suffix === "plus") words.push("Plus");
    else if (suffix === "air") words.push("Air");
    else words.push(titleCaseWords(suffix));
  }

  return `iPhone ${family}${words.length ? " " + words.join(" ") : ""}`;
}

function colorLabelFromKey(colorKey: string) {
  // "azul_nevoa" => "Azul Nevoa" | "meia_noite" => "Meia Noite"
  const normalized = colorKey.replace(/[-_]+/g, " ").trim();
  return titleCaseWords(normalized);
}

function buildFilenamePrefixes(family: string, modelFolder: string) {
  // Based on folder "iphone17promax" => prefixes ["17promax", "17-promax"]
  const raw = modelFolder.replace(/^iphone/i, "");
  const m = raw.match(/^(\d+)(.*)$/);
  const fam = m?.[1] ?? family;
  const suffix = (m?.[2] ?? "").toLowerCase();
  const out = new Set<string>();
  if (suffix) {
    out.add(`${fam}${suffix}`);
    out.add(`${fam}-${suffix}`);
  } else {
    out.add(`${fam}`);
  }
  // Some folders may omit family in the filename; keep a fallback.
  if (suffix) out.add(suffix);
  return Array.from(out);
}

function parseColorFromFilename(
  fileBaseNoExt: string,
  family: string,
  modelFolder: string
): { key: string; isDefault: boolean } {
  // fileBaseNoExt ex: "iphone-17pro-azul_intenso" | "iphone-17-inicio"
  let name = fileBaseNoExt;
  if (name.startsWith("iphone-")) name = name.slice("iphone-".length);

  const prefixes = buildFilenamePrefixes(family, modelFolder);

  // Try match "<prefix>-<color>"
  for (const p of prefixes) {
    const needle = `${p}-`;
    if (name.startsWith(needle)) {
      const color = name.slice(needle.length);
      const isDefault = color === "inicio";
      return { key: color, isDefault };
    }
  }

  // Fallback: if ends with "-inicio" or "inicio"
  if (name.endsWith("-inicio")) return { key: "inicio", isDefault: true };
  if (name.endsWith("inicio")) return { key: "inicio", isDefault: true };

  // Last-resort: treat whole remainder as key
  return { key: name, isDefault: name === "inicio" };
}

function sortColors(colors: AppleColor[]) {
  // Default first, then alphabetical label
  return [...colors].sort((a, b) => {
    if (a.isDefault && !b.isDefault) return -1;
    if (!a.isDefault && b.isDefault) return 1;
    return a.label.localeCompare(b.label, "pt-BR");
  });
}

function sortModels(models: AppleModel[]) {
  // Try to sort: base -> plus/air -> pro -> pro max (Apple-like)
  const rank = (key: string) => {
    const k = key.toLowerCase();
    if (k.endsWith("promax")) return 4;
    if (k.endsWith("pro")) return 3;
    if (k.endsWith("plus")) return 2;
    if (k.endsWith("air")) return 2;
    return 1;
  };
  return [...models].sort((a, b) => {
    const ra = rank(a.key);
    const rb = rank(b.key);
    if (ra !== rb) return ra - rb;
    return a.label.localeCompare(b.label, "pt-BR");
  });
}

// Build-time import of all Apple assets.
// Vite will convert each file to a URL string.
const appleImages = import.meta.glob("../assets/apple/**/**/*.png", {
  eager: true,
  as: "url",
}) as Record<string, string>;

let cached: AppleFamily[] | null = null;

export function getAppleCatalog(): AppleFamily[] {
  if (cached) return cached;

  // Group by family -> modelFolder
  const familyMap = new Map<string, Map<string, AppleColor[]>>();

  for (const [path, url] of Object.entries(appleImages)) {
    // path ex: "../assets/apple/17/iphone17pro/iphone-17pro-azul_intenso.png"
    const parts = path.split("/");
    const iApple = parts.lastIndexOf("apple");
    if (iApple < 0) continue;
    const family = parts[iApple + 1];
    const modelFolder = parts[iApple + 2];
    const filename = parts[iApple + 3] ?? "";
    if (!family || !modelFolder || !filename) continue;

    const base = filename.replace(/\.png$/i, "");
    const { key, isDefault } = parseColorFromFilename(base, family, modelFolder);
    const label = key === "inicio" ? "Padrão" : colorLabelFromKey(key);

    const famEntry = familyMap.get(family) ?? new Map<string, AppleColor[]>();
    const list = famEntry.get(modelFolder) ?? [];
    list.push({ key, label, imageUrl: url, isDefault });
    famEntry.set(modelFolder, list);
    familyMap.set(family, famEntry);
  }

  const families: AppleFamily[] = [];
  for (const [family, modelsMap] of familyMap.entries()) {
    const models: AppleModel[] = [];
    for (const [modelFolder, colors] of modelsMap.entries()) {
      const model: AppleModel = {
        key: modelFolder,
        label: modelLabelFromFolder(modelFolder),
        colors: sortColors(colors),
      };
      models.push(model);
    }
    families.push({ family, models: sortModels(models) });
  }

  // Sort family number descending (17 -> 16 -> 15 ...)
  families.sort((a, b) => Number(b.family) - Number(a.family));
  cached = families;
  return families;
}

export function getFamily(family: string): AppleFamily | null {
  const catalog = getAppleCatalog();
  return catalog.find((f) => f.family === family) ?? null;
}
