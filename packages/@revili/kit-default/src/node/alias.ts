import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

export const USER_PROJECT_ROOT = resolve(".");
export const PKG_ROOT = resolve(fileURLToPath(import.meta.url), "../..");

export const DIST_CLIENT_PATH = resolve(PKG_ROOT, "client");
export const APP_PATH = join(DIST_CLIENT_PATH, "app");
