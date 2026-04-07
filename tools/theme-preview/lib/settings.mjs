import { readFileSync, existsSync } from "fs";
import { join } from "path";

export function loadSettings(themeRoot) {
  const settingsPath = join(themeRoot, "config", "settings_data.json");
  if (!existsSync(settingsPath)) return {};
  try {
    const raw = JSON.parse(readFileSync(settingsPath, "utf8"));
    return raw.current || raw || {};
  } catch {
    return {};
  }
}
