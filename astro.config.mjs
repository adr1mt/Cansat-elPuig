import { existsSync } from "node:fs";
if (existsSync(".env")) process.loadEnvFile(".env");
import { defineConfig } from "astro/config";
const repository = process.env.GITHUB_REPOSITORY;
const [owner, repo] = (repository || "").split("/");
const site =
  process.env.SITE_URL ||
  (owner ? `https://${owner}.github.io` : "http://localhost:4321");
const base =
  process.env.BASE_PATH ||
  (repo && repo !== `${owner}.github.io` ? `/${repo}` : "/");
export default defineConfig({
  site,
  base,
  output: "static",
  trailingSlash: "always",
  devToolbar: { enabled: false },
});
