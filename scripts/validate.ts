import { readContent, validateRelations, validatePhotos } from "./content.ts";
import { readFile } from "node:fs/promises";
import { parse } from "yaml";
import { schemas } from "../src/lib/schemas.ts";
const data = await readContent();
validateRelations(data);
await validatePhotos(data);
const config = parse(await readFile(".pages.yml", "utf8"));
if (config.media.input !== "public/media" || config.media.output !== "/media")
  throw new Error("Rutes de fotografies incompatibles");
for (const [key, schema] of Object.entries(schemas)) {
  const entry = config.content.find((e: { name: string }) => e.name === key);
  if (!entry || entry.format !== "json")
    throw new Error(`Falta editor JSON: ${key}`);
  // Refined Zod objects retain their object shape in Zod 4.
  const names = new Set(entry.fields.map((f: { name: string }) => f.name));
  for (const name of Object.keys(schema.shape))
    if (!names.has(name)) throw new Error(`Camp sense editor: ${key}.${name}`);
  for (const f of entry.fields) {
    if (
      ![
        "string",
        "text",
        "uuid",
        "reference",
        "select",
        "date",
        "boolean",
        "image",
      ].includes(f.type)
    )
      throw new Error(`Tipus CMS desconegut: ${f.type}`);
    if (
      f.type === "reference" &&
      (!config.content.some(
        (e: { name: string }) => e.name === f.options.collection,
      ) ||
        f.options.value !== "{fields.id}")
    )
      throw new Error("Referència CMS invàlida");
    if (
      f.type === "date" &&
      (f.options.format !== "yyyy-MM-dd" || f.options.time !== false)
    )
      throw new Error("Format de data incorrecte");
    if (f.type === "select") {
      const field = schema.shape[
        f.name as keyof typeof schema.shape
      ] as unknown as {
        options?: string[];
        unwrap?: () => { options?: string[] };
      };
      const values = field.options || field.unwrap?.().options;
      if (values) {
        const configured = f.options.values.map(
          (v: { name: string }) => v.name,
        );
        if (
          JSON.stringify([...values].sort()) !==
          JSON.stringify(configured.sort())
        )
          throw new Error(`Selector desalineat: ${key}.${f.name}`);
      }
    }
  }
}
console.log(
  `Contingut vàlid: ${Object.values(data).reduce((n, v) => n + v.length, 0)} registres. CMS: ${config.content.length} editors, tots els camps coberts.`,
);
