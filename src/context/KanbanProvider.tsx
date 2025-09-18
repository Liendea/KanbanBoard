import { useState } from "react";
import { KanbanContext } from "./KanbanContext";
import type { TaskType } from "../types/Types";

type KanbanProviderProps = {
  children: React.ReactNode;
};

export function KanbanProvider({ children }: KanbanProviderProps) {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [archive, setArchive] = useState<TaskType[] | null>(null);
  const [columnTitles, setColumnTitles] = useState<string[]>([
    "To Do",
    "In Progress",
    "Done",
  ]);
  const [isMobileView, setIsMobileView] = useState<boolean>(false);

  return (
    <KanbanContext.Provider
      value={{
        tasks,
        setTasks,
        archive,
        setArchive,
        columnTitles,
        setColumnTitles,
        isMobileView,
        setIsMobileView,
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
}
