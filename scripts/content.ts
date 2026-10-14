import { readdir, readFile, access } from "node:fs/promises";
import { schemas } from "../src/lib/schemas.ts";
import type { z } from "zod";
export type Dataset = {
  [K in keyof typeof schemas]: z.infer<(typeof schemas)[K]>[];
};
export async function readContent(): Promise<Dataset> {
  const result = {} as Dataset;
  for (const key of Object.keys(schemas) as (keyof typeof schemas)[]) {
    const files = (await readdir(`content/${key}`)).filter((f) =>
      f.endsWith(".json"),
    );
    const values = await Promise.all(
      files.map(async (file) =>
        schemas[key].parse(
          JSON.parse(await readFile(`content/${key}/${file}`, "utf8")),
        ),
      ),
    );
    (result[key] as unknown[]) = values;
  }
  return result;
}
export function validateRelations(data: Dataset) {
  for (const [key, values] of Object.entries(data)) {
    const ids = values.map((v) => v.id);
    if (new Set(ids).size !== ids.length)
      throw new Error(`Identificadors duplicats: ${key}`);
  }
  if (data.settings.length !== 1)
    throw new Error("Cal una configuració del web");
  const years = new Set(data.years.map((y) => y.id)),
    teams = new Map(data.teams.map((t) => [t.id, t]));
  if (!years.has(data.settings[0].activeYearId))
    throw new Error("El curs actiu no existeix");
  for (const [key, values] of Object.entries(data))
    for (const item of values) {
      if ("yearId" in item && !years.has(item.yearId))
        throw new Error(`Curs inexistent: ${key}/${item.id}`);
      if ("teamId" in item && item.teamId) {
        const team = teams.get(item.teamId);
        if (!team || ("yearId" in item && team.yearId !== item.yearId))
          throw new Error(`Equip o curs incorrecte: ${key}/${item.id}`);
      }
    }
  const participants = new Map(data.participants.map((p) => [p.id, p]));
  for (const task of data.tasks) {
    if (!task.responsibleId) continue;
    const participant = participants.get(task.responsibleId);
    if (
      !participant ||
      participant.teamId !== task.teamId ||
      participant.yearId !== task.yearId
    )
      throw new Error(`Responsable inexistent o d’un altre equip: tasks/${task.id}`);
    if (participant.archived && !task.archived && task.status !== "done")
      throw new Error(`Responsable arxivat: tasks/${task.id}. Reassigna la tasca.`);
  }
}
export async function validatePhotos(data: Dataset) {
  for (const log of data.logs)
    if (log.photo) await access(`public${log.photo}`);
}
