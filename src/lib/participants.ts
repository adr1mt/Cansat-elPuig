import type { Participant, Task } from "./schemas";

export function responsibleName(task: Task, participants: Participant[]): string {
  if (!task.responsibleId) return task.responsible;
  return participants.find(
    (p) => p.id === task.responsibleId && p.teamId === task.teamId && p.yearId === task.yearId,
  )?.name || "";
}
