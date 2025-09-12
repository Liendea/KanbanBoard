import { createContext, useContext } from "react";
import type { TaskType } from "../../types/Types";

type KanbanContextType = {
  tasks: TaskType[] | null;
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
};

export const KanbanContext = createContext<KanbanContextType | null>(null);

// Custom hook för enkel åtkomst
export function useKanban() {
  const ctx = useContext(KanbanContext);
  if (!ctx) throw new Error("useKanban must be used inside KanbanProvider");
  return ctx;
}
