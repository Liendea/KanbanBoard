import { useState } from "react";
import { KanbanContext } from "./KanbanContext";
import type { TaskType } from "../types/Types";

type KanbanProviderProps = {
  children: React.ReactNode;
};

export function KanbanProvider({ children }: KanbanProviderProps) {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [archive, setArchive] = useState<TaskType[] | null>(null);

  return (
    <KanbanContext.Provider value={{ tasks, setTasks, archive, setArchive }}>
      {children}
    </KanbanContext.Provider>
  );
}
