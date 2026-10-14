import { getCollection } from "astro:content";
import { responsibleName } from "./participants";
export async function loadData() {
  const [s, y, t, ta, m, l, r, p] = await Promise.all([
    getCollection("settings"),
    getCollection("years"),
    getCollection("teams"),
    getCollection("tasks"),
    getCollection("milestones"),
    getCollection("logs"),
    getCollection("requirements"),
    getCollection("participants"),
  ]);
  const participants = p.map((e) => e.data);
  const settings = s[0].data,
    year = y.find((e) => e.data.id === settings.activeYearId)!.data;
  const teams = t
    .map((e) => e.data)
    .filter((e) => e.yearId === year.id && !e.archived)
    .map((team) => ({
      ...team,
      participants: [...new Set([
        ...team.participants,
        ...participants.filter((p) =>
          p.teamId === team.id && p.yearId === team.yearId && !p.archived
        ).map((p) => p.name),
      ])],
    }));
  const ids = new Set(teams.map((t) => t.id));
  return {
    settings,
    year,
    teams,
    tasks: ta
      .map((e) => e.data)
      .filter((e) => e.yearId === year.id && ids.has(e.teamId) && !e.archived)
      .map((task) => ({ ...task, responsible: responsibleName(task, participants) })),
    milestones: m
      .map((e) => e.data)
      .filter(
        (e) =>
          e.yearId === year.id &&
          !e.archived &&
          (!e.teamId || ids.has(e.teamId)),
      ),
    logs: l
      .map((e) => e.data)
      .filter((e) => e.yearId === year.id && ids.has(e.teamId) && !e.archived),
    requirements: r
      .map((e) => e.data)
      .filter((e) => e.yearId === year.id && ids.has(e.teamId) && !e.archived),
  };
}
