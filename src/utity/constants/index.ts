export const TODO_STATUS_OPTIONS = [
  "New Task",
  "In-Progress",
  "Completed",
  "Backlog",
] as const;
export type TodoStatus = (typeof TODO_STATUS_OPTIONS)[number];
