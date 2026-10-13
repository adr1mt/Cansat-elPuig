import type { APIRoute } from "astro";
import { loadData } from "../lib/data";
import { path } from "../lib/paths";
export const GET: APIRoute = async ({ site }) => {
  const d = await loadData();
  const routes = [
    "",
    "equips/",
    "calendari/",
    "diari/",
    ...d.teams.map((t) => `equips/${t.id}/`),
  ];
  const xml =
    '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    routes
      .map((r) => `<url><loc>${new URL(path(r), site).href}</loc></url>`)
      .join("") +
    "</urlset>";
  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
};
