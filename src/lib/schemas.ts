import { z } from "zod";
export const states = {
  pending: "Pendent",
  active: "En curs",
  blocked: "Bloquejada",
  done: "Completada",
} as const;
export const categories = {
  science: "Missió científica",
  electronics: "Electrònica i sensors",
  programming: "Programació",
  telecom: "Telecomunicacions",
  structure: "Estructura i recuperació",
  testing: "Proves i validació",
  documentation: "Documentació i difusió",
} as const;
const id = z.string().regex(/^[a-zA-Z0-9_-]+$/, "Identificador sense espais");
export const calendarDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine((v) => {
    const d = new Date(v + "T12:00:00Z");
    return !isNaN(+d) && d.toISOString().slice(0, 10) === v;
  }, "Data de calendari invàlida");
const optionalDate = z.preprocess(
  (v) => (v === "" || v === null ? undefined : v),
  calendarDate.optional(),
);
const text = z.preprocess(
  (v) => (v === null ? undefined : v),
  z.string().default(""),
);
const url = z.preprocess(
  (v) => (v === null ? undefined : v),
  z
    .string()
    .refine(
      (v) => !v || (/^https?:\/\//.test(v) && URL.canParse(v)),
      "Cal una URL pública http o https",
    )
    .default(""),
);
const common = { id, yearId: id, archived: z.boolean().default(false) };
export const schemas = {
  settings: z.object({
    id,
    title: z.string().min(1),
    description: z.string().min(1),
    school: z.string().min(1),
    location: text,
    activeYearId: id,
    officialUrl: url,
    primaryMission: z.string().min(1),
    heroTitle: z.string().min(1),
    basesUrl: url,
    pdrUrl: url,
    cdrUrl: url,
  }),
  years: z.object({
    id,
    name: z.string().min(1),
    archived: z.boolean().default(false),
  }),
  teams: z.object({
    ...common,
    name: z.string().min(1),
    description: text,
    secondaryMission: text,
    color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
    participants: z.preprocess(
      (v) => (v === null ? undefined : v),
      z.array(z.string()).default([]),
    ),
  }),
  tasks: z.object({
    ...common,
    teamId: id,
    title: z.string().min(1),
    status: z.enum(["pending", "active", "blocked", "done"]).default("pending"),
    category: z.enum([
      "science",
      "electronics",
      "programming",
      "telecom",
      "structure",
      "testing",
      "documentation",
    ]),
    responsible: text,
    responsibleId: text,
    dueDate: optionalDate,
    completedDate: optionalDate,
    description: text,
    notes: text,
    evidence: url,
  }),
  participants: z.object({
    ...common,
    teamId: id,
    name: z.string().trim().min(1),
  }),
  milestones: z
    .object({
      ...common,
      title: z.string().min(1),
      description: text,
      date: optionalDate,
      endDate: optionalDate,
      period: text,
      sortMonth: z
        .string()
        .regex(/^(\d{4}-(0[1-9]|1[0-2]))?$/)
        .default(""),
      dateKind: z.enum(["confirmed", "approximate", "unknown"]),
      type: z.enum(["registration", "report", "launch", "event", "internal"]),
      status: z.enum(["planned", "done", "cancelled"]).default("planned"),
      conditional: z.boolean().default(false),
      teamId: text,
      source: url,
    })
    .refine(
      (v) => v.dateKind !== "confirmed" || !!v.date,
      "Una data confirmada necessita data",
    )
    .refine(
      (v) => !v.endDate || (!!v.date && v.endDate >= v.date),
      "Interval de dates invàlid",
    ),
  logs: z
    .object({
      ...common,
      teamId: id,
      title: z.string().min(1),
      date: calendarDate,
      summary: z.string().min(1),
      blockers: text,
      nextSteps: text,
      meeting: z.boolean().default(true),
      photo: z.preprocess(
        (v) => (v === null ? undefined : v),
        z
          .string()
          .refine(
            (v) =>
              !v ||
              (/^\/media\/[a-zA-Z0-9_./-]+\.(jpg|jpeg|png|webp)$/.test(v) &&
                !v.includes("..")),
            "Imatge local de la biblioteca",
          )
          .default(""),
      ),
      caption: text,
      photoAlt: text,
    })
    .refine(
      (v) => !v.photo || !!v.photoAlt.trim(),
      "Cal descriure la fotografia",
    ),
  requirements: z.object({
    ...common,
    teamId: id,
    title: z.string().min(1),
    description: text,
    recommendation: z.boolean().default(false),
    status: z.enum(["pending", "checking", "verified"]).default("pending"),
    evidence: url,
    notes: text,
    source: url,
  }),
};
export type Team = z.infer<typeof schemas.teams>;
export type Task = z.infer<typeof schemas.tasks>;
export type Participant = z.infer<typeof schemas.participants>;
export type Milestone = z.infer<typeof schemas.milestones>;
export type MissionLog = z.infer<typeof schemas.logs>;
