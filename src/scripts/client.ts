import {
  upcoming,
  madridToday,
  daysBetween,
  formatDate,
  progress,
  milestoneState,
} from "../lib/domain";
import type { Milestone, Task } from "../lib/schemas";
const set = (selector: string, value: string, root: ParentNode = document) => {
  const el = root.querySelector(selector);
  if (el) el.textContent = value;
};
function updateDates() {
  const today = madridToday();
  const data = document.querySelector("#milestone-data");
  if (data) {
    const all: Milestone[] = JSON.parse(data.textContent || "[]");
    const next = upcoming(all, today)[0];
    set("[data-next-title]", next?.title || "Properes dates pendents");
    set(
      "[data-next-description]",
      next?.description ||
        "Consulta el calendari per veure les fites amb data pendent o condicionades a classificació.",
    );
    set(
      "[data-next-date]",
      next ? formatDate(next.date) : "Sense cap objectiu futur confirmat",
    );
    set(
      "[data-next-days]",
      next?.date ? String(Math.max(0, daysBetween(today, next.date))) : "—",
    );
    set(
      "[data-next-state]",
      next ? milestoneState(next, today) : "Pendent de data",
    );
    const list = document.querySelector("[data-upcoming-list]");
    if (list) {
      list.replaceChildren();
      const ol = document.createElement("ol");
      ol.className = "timeline compact";
      upcoming(all, today)
        .slice(0, 3)
        .forEach((m) => {
          const li = document.createElement("li");
          const dot = document.createElement("div");
          dot.className = "timeline-marker";
          dot.setAttribute("aria-hidden", "true");
          const date = document.createElement("div");
          date.className = "timeline-date";
          date.textContent = formatDate(m.date);
          const body = document.createElement("div");
          body.className = "timeline-body";
          const h = document.createElement("h3");
          h.textContent = m.title;
          body.append(h);
          li.append(dot, date, body);
          ol.append(li);
        });
      list.append(ol);
      if (!ol.children.length) {
        const p = document.createElement("p");
        p.className = "helper";
        p.textContent = "Sense fites futures confirmades.";
        list.append(p);
      }
    }
  }
  document
    .querySelectorAll<HTMLElement>("[data-timeline-status]")
    .forEach((el) => {
      set(
        "[data-milestone-state]",
        milestoneState(
          {
            date: el.dataset.timelineDate || undefined,
            endDate: el.dataset.timelineEnd || undefined,
            status: el.dataset.timelineStatus,
          } as Milestone,
          today,
        ),
        el,
      );
    });
  document
    .querySelectorAll<HTMLElement>("[data-due]")
    .forEach(
      (el) =>
        (el.hidden =
          el.dataset.done === "true" ||
          !el.dataset.due ||
          el.dataset.due >= today),
    );
  const taskData = document.querySelector("[data-tasks-data]");
  if (taskData) {
    const stats = progress(
      JSON.parse(taskData.textContent || "[]") as Task[],
      today,
    );
    set('[data-stat="overdue"]', String(stats.overdue));
  }
}
updateDates();
setInterval(updateDates, 60000);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) updateDates();
});
document
  .querySelectorAll<HTMLElement>("[data-enhance]")
  .forEach((el) => (el.hidden = false));
document.querySelectorAll<HTMLElement>("[data-task-board]").forEach((board) => {
  const category = board.querySelector<HTMLSelectElement>("[data-category]"),
    owner = board.querySelector<HTMLSelectElement>("[data-owner]");
  const apply = () => {
    let visible = 0;
    board
      .querySelectorAll<HTMLElement>("[data-filter-item]")
      .forEach((item) => {
        item.hidden = !!(
          (category &&
            category.value !== "all" &&
            item.dataset.category !== category.value) ||
          (owner && owner.value !== "all" && item.dataset.owner !== owner.value)
        );
        if (!item.hidden) visible++;
      });
    board.querySelectorAll(".kanban-column").forEach((column) => {
      const count = Array.from(
        column.querySelectorAll<HTMLElement>("[data-filter-item]"),
      ).filter((el) => !el.hidden).length;
      set("[data-column-count]", String(count), column);
      const empty = column.querySelector<HTMLElement>("[data-column-empty]");
      if (empty) empty.hidden = count > 0;
    });
    set("[data-filter-count]", `${visible} tasques visibles`, board);
  };
  category?.addEventListener("change", apply);
  owner?.addEventListener("change", apply);
});
document.querySelectorAll<HTMLElement>("[data-log-filter]").forEach((root) =>
  root
    .querySelectorAll<HTMLButtonElement>("[data-team-filter]")
    .forEach((button) =>
      button.addEventListener("click", () => {
        root
          .querySelectorAll("button")
          .forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
        let visible = 0;
        root
          .querySelectorAll<HTMLElement>("[data-filter-item]")
          .forEach((el) => {
            el.hidden =
              button.dataset.teamFilter !== "all" &&
              el.dataset.team !== button.dataset.teamFilter;
            if (!el.hidden) visible++;
          });
        set("[data-log-count]", `${visible} entrades`, root);
        const empty = root.querySelector<HTMLElement>("[data-log-empty]");
        if (empty) empty.hidden = visible > 0;
      }),
    ),
);
