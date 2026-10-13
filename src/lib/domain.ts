import type { Task, Milestone, MissionLog } from "./schemas.ts";
export function madridToday(now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Madrid",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)!.value;
  return `${get("year")}-${get("month")}-${get("day")}`;
}
export const daysBetween = (from: string, to: string) =>
  Math.round(
    (Date.parse(to + "T12:00:00Z") - Date.parse(from + "T12:00:00Z")) /
      86400000,
  );
export const formatDate = (date?: string) =>
  date
    ? new Intl.DateTimeFormat("ca-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }).format(new Date(date + "T12:00:00Z"))
    : "Data pendent de confirmar";
export function activeTasks(tasks: Task[], teamId: string, yearId: string) {
  return tasks.filter(
    (t) => t.teamId === teamId && t.yearId === yearId && !t.archived,
  );
}
export function progress(tasks: Task[], today = madridToday()) {
  tasks = tasks.filter((task) => !task.archived);
  const total = tasks.length,
    done = tasks.filter((t) => t.status === "done").length;
  return {
    total,
    done,
    pending: tasks.filter((t) => t.status === "pending").length,
    active: tasks.filter((t) => t.status === "active").length,
    blocked: tasks.filter((t) => t.status === "blocked").length,
    overdue: tasks.filter(
      (t) => t.status !== "done" && t.dueDate && t.dueDate < today,
    ).length,
    percent: total ? Math.round((done / total) * 100) : null,
  };
}
export function upcoming(milestones: Milestone[], today = madridToday()) {
  return milestones
    .filter(
      (m) =>
        !m.archived &&
        !m.conditional &&
        m.status === "planned" &&
        m.dateKind === "confirmed" &&
        m.date &&
        (m.endDate || m.date) >= today,
    )
    .sort((a, b) => a.date!.localeCompare(b.date!) || a.id.localeCompare(b.id));
}
export function milestoneState(m: Milestone, today = madridToday()) {
  return m.status === "done"
    ? "Completat"
    : m.status === "cancelled"
      ? "Cancel·lat"
      : !m.date
        ? "Pendent de data"
        : (m.endDate || m.date) < today
          ? "Vençut"
          : m.date <= today
            ? "Avui"
            : "Proper";
}
export function latestLogs(
  logs: MissionLog[],
  teamId?: string,
  yearId?: string,
) {
  return logs
    .filter(
      (l) =>
        !l.archived &&
        (!teamId || l.teamId === teamId) &&
        (!yearId || l.yearId === yearId),
    )
    .sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
}

export function orderMilestones(milestones: Milestone[]) {
  return [...milestones].sort(
    (a, b) =>
      (a.date || a.sortMonth || "9999").localeCompare(
        b.date || b.sortMonth || "9999",
      ) || a.title.localeCompare(b.title, "ca"),
  );
}
