import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { schemas } from "./lib/schemas";
export const collections = {
  participants: defineCollection({
    loader: glob({
      pattern: "**/*.json",
      base: "./content/participants",
      generateId: ({ data }) => String(data.id),
    }),
    schema: schemas.participants,
  }),
  settings: defineCollection({
    loader: glob({
      pattern: "**/*.json",
      base: "./content/settings",
      generateId: ({ data }) => String(data.id),
    }),
    schema: schemas.settings,
  }),
  years: defineCollection({
    loader: glob({
      pattern: "**/*.json",
      base: "./content/years",
      generateId: ({ data }) => String(data.id),
    }),
    schema: schemas.years,
  }),
  teams: defineCollection({
    loader: glob({
      pattern: "**/*.json",
      base: "./content/teams",
      generateId: ({ data }) => String(data.id),
    }),
    schema: schemas.teams,
  }),
  tasks: defineCollection({
    loader: glob({
      pattern: "**/*.json",
      base: "./content/tasks",
      generateId: ({ data }) => String(data.id),
    }),
    schema: schemas.tasks,
  }),
  milestones: defineCollection({
    loader: glob({
      pattern: "**/*.json",
      base: "./content/milestones",
      generateId: ({ data }) => String(data.id),
    }),
    schema: schemas.milestones,
  }),
  logs: defineCollection({
    loader: glob({
      pattern: "**/*.json",
      base: "./content/logs",
      generateId: ({ data }) => String(data.id),
    }),
    schema: schemas.logs,
  }),
  requirements: defineCollection({
    loader: glob({
      pattern: "**/*.json",
      base: "./content/requirements",
      generateId: ({ data }) => String(data.id),
    }),
    schema: schemas.requirements,
  }),
};
