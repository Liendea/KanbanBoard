export type ColumnId = "TODO" | "IN_PROGRESS" | "DONE";

export type ColumnType = {
  id: ColumnId;
  title: string;
};

export type TaskType = {
  id: string;
  title: string;
  description: string;
  status: ColumnId;
};
