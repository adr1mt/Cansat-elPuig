import { test } from "node:test";
import assert from "node:assert/strict";
import {
  activeTasks,
  progress,
  madridToday,
  daysBetween,
  upcoming,
  milestoneState,
  latestLogs,
} from "../src/lib/domain.ts";
import { schemas, calendarDate } from "../src/lib/schemas.ts";
import { readContent, validateRelations } from "../scripts/content.ts";
const task = (id: string, status = "pending", extra = {}) =>
  schemas.tasks.parse({
    id,
    yearId: "2026-2027",
    teamId: "equip-a",
    title: "Prova",
    category: "testing",
    status,
    ...extra,
  });
const milestone = (id: string, date = "", extra = {}) =>
  schemas.milestones.parse({
    id,
    yearId: "2026-2027",
    title: "Fita",
    date,
    dateKind: date ? "confirmed" : "unknown",
    type: "report",
    ...extra,
  });
test("zero tasks has no invented percentage", () => {
  assert.equal(progress([]).percent, null);
  assert.equal(progress([]).total, 0);
});
test("progress counts each of the four states independently", () => {
  assert.deepEqual(
    progress(
      ["pending", "active", "blocked", "done"].map((s, i) =>
        task(String(i), s),
      ),
      "2026-10-13",
    ),
    {
      total: 4,
      done: 1,
      pending: 1,
      active: 1,
      blocked: 1,
      overdue: 0,
      percent: 25,
    },
  );
});
test("archived tasks, other teams and other years do not affect active progress", () => {
  const tasks = [
    task("a", "done"),
    task("b", "done", { archived: true }),
    task("c", "blocked", { teamId: "equip-b" }),
    task("d", "done", { yearId: "2027-2028" }),
  ];
  assert.equal(progress(activeTasks(tasks, "equip-a", "2026-2027")).total, 1);
  assert.equal(activeTasks(tasks, "equip-b", "2026-2027")[0].id, "c");
});
test("past due excludes completed, today, future and missing dates", () => {
  assert.equal(
    progress(
      [
        task("a", "blocked", { dueDate: "2026-10-12" }),
        task("b", "done", { dueDate: "2026-10-01" }),
        task("c", "active", { dueDate: "2026-10-13" }),
        task("d"),
        task("e", "pending", { dueDate: "2026-10-14" }),
      ],
      "2026-10-13",
    ).overdue,
    1,
  );
});
test("calendar countdown survives DST and leap days", () => {
  assert.equal(daysBetween("2026-10-24", "2026-10-26"), 2);
  assert.equal(daysBetween("2027-03-27", "2027-03-29"), 2);
  assert.equal(daysBetween("2028-02-28", "2028-03-01"), 2);
  assert.equal(daysBetween("2026-10-13", "2026-11-30"), 48);
});
test("Madrid date handles midnight independently of host timezone", () => {
  assert.equal(madridToday(new Date("2026-10-12T22:30:00Z")), "2026-10-13");
  assert.equal(madridToday(new Date("2026-12-12T23:30:00Z")), "2026-12-13");
});
test("next milestone changes after deadline; includes today and ongoing intervals", () => {
  const all = [milestone("pdr", "2026-12-18"), milestone("reg", "2026-11-30")];
  assert.equal(upcoming(all, "2026-11-30")[0].id, "reg");
  assert.equal(upcoming(all, "2026-12-01")[0].id, "pdr");
  assert.equal(upcoming(all, "2026-12-19").length, 0);
  assert.equal(
    upcoming(
      [milestone("interval", "2027-05-12", { endDate: "2027-05-13" })],
      "2027-05-13",
    ).length,
    1,
  );
});
test("unknown, approximate, conditional, archived, completed and cancelled milestones excluded", () => {
  const all = [
    milestone("unknown"),
    milestone("approx", "2026-12-18", { dateKind: "approximate" }),
    milestone("conditional", "2026-12-18", { conditional: true }),
    milestone("archived", "2026-12-18", { archived: true }),
    milestone("done", "2026-12-18", { status: "done" }),
    milestone("cancel", "2026-12-18", { status: "cancelled" }),
  ];
  assert.deepEqual(upcoming(all, "2026-10-13"), []);
});
test("milestone status has future, today, overdue and completed labels", () => {
  const m = milestone("m", "2026-11-30");
  assert.equal(milestoneState(m, "2026-11-29"), "Proper");
  assert.equal(milestoneState(m, "2026-11-30"), "Avui");
  assert.equal(milestoneState(m, "2026-12-01"), "Vençut");
  assert.equal(
    milestoneState({ ...m, status: "done" }, "2026-12-01"),
    "Completat",
  );
});
test("logs and latest meeting isolated by team and year", () => {
  const log = (
    id: string,
    date: string,
    teamId = "equip-a",
    yearId = "2026-2027",
  ) =>
    schemas.logs.parse({
      id,
      date,
      teamId,
      yearId,
      title: "Reunió",
      summary: "Avenç",
    });
  assert.equal(
    latestLogs(
      [
        log("a", "2026-10-01"),
        log("b", "2026-10-12"),
        log("c", "2026-10-13", "equip-b"),
        log("d", "2027-10-13", "equip-a", "2027-2028"),
      ],
      "equip-a",
      "2026-2027",
    )[0].id,
    "b",
  );
});
test("invalid content rejected: impossible date, state, color, confirmed missing date, image alt and unsafe links", () => {
  assert.equal(calendarDate.safeParse("2026-02-30").success, false);
  assert.throws(() => task("a", "unknown"));
  assert.equal(
    schemas.teams.safeParse({ id: "a", yearId: "y", name: "A", color: "red" })
      .success,
    false,
  );
  assert.throws(() => milestone("m", "", { dateKind: "confirmed" }));
  assert.throws(() =>
    schemas.logs.parse({
      id: "a",
      yearId: "y",
      teamId: "a",
      title: "Prova",
      date: "2026-10-13",
      summary: "Resum",
      photo: "/media/photo.jpg",
    }),
  );
  assert.throws(() =>
    task("a", "pending", { evidence: "javascript:alert(1)" }),
  );
});
test("optional empty CMS dates normalize safely", () => {
  assert.equal(
    task("a", "pending", { dueDate: "", completedDate: null }).dueDate,
    undefined,
  );
});
test("published dataset has valid references; broken relation and duplicate ID rejected", async () => {
  const d = await readContent();
  validateRelations(d);
  assert.throws(() =>
    validateRelations({
      ...d,
      tasks: [task("a", "pending", { teamId: "missing" })],
    }),
  );
  assert.throws(() =>
    validateRelations({ ...d, teams: [...d.teams, d.teams[0]] }),
  );
  assert.throws(() =>
    validateRelations({
      ...d,
      tasks: [task("a", "pending", { yearId: "2027-2028" })],
    }),
  );
});
test("CMS JSON create/edit serialization round trip maintains stable team ID", () => {
  const created = task("task-uuid", "pending", {
    responsible: "Àlies",
    dueDate: "2026-11-30",
  });
  const edited = schemas.tasks.parse(
    JSON.parse(
      JSON.stringify({
        ...created,
        status: "done",
        completedDate: "2026-11-29",
      }),
    ),
  );
  assert.equal(edited.teamId, "equip-a");
  assert.equal(progress([edited]).percent, 100);
  const log = schemas.logs.parse({
    id: "log-uuid",
    yearId: "2026-2027",
    teamId: "equip-b",
    title: "Reunió",
    summary: "Resum",
    date: "2026-10-13",
    photo: "/media/prova.webp",
    photoAlt: "Sensor sobre la taula",
  });
  assert.equal(
    schemas.logs.parse(JSON.parse(JSON.stringify(log))).photo,
    "/media/prova.webp",
  );
});

test("undated periods sort by explicit month without fabricating a day", async () => {
  const { orderMilestones } = await import("../src/lib/domain.ts");
  const items = [
    milestone("national", "2027-05-12"),
    milestone("regional", "", {
      sortMonth: "2027-03",
      period: "Març–abril de 2027",
    }),
    milestone("pdr", "2026-12-18"),
    milestone("unknown"),
  ];
  assert.deepEqual(
    orderMilestones(items).map((m) => m.id),
    ["pdr", "regional", "national", "unknown"],
  );
});
