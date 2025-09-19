import {
  KeyboardSensor,
  PointerSensor,
  useSensors,
  useSensor,
  type DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useKanban } from "../context/KanbanContext";
import type { ColumnType } from "../types/Types";

export function useDnd(COLUMNS: ColumnType[]) {
  const { setTasks } = useKanban();

  // Sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 0 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // Hantera drag end
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;

    setTasks((prev) => {
      const activeTask = prev.find((t) => t.id === activeId);
      if (!activeTask) return prev;

      const overColumn = COLUMNS.find((col) => col.id === overId);
      if (overColumn) {
        return prev.map((t) =>
          t.id === activeId ? { ...t, status: overColumn.id } : t
        );
      }

      const overTask = prev.find((t) => t.id === overId);
      if (overTask) {
        if (overTask.status !== activeTask.status) {
          return prev.map((t) =>
            t.id === activeId ? { ...t, status: overTask.status } : t
          );
        }

        const columnTasks = prev.filter((t) => t.status === activeTask.status);
        const activeIndex = columnTasks.findIndex((t) => t.id === activeId);
        const overIndex = columnTasks.findIndex((t) => t.id === overId);
        const newColumnTasks = arrayMove(columnTasks, activeIndex, overIndex);

        return prev.map((t) => {
          if (t.status === activeTask.status) {
            const index = columnTasks.findIndex((ct) => ct.id === t.id);
            return newColumnTasks[index];
          }
          return t;
        });
      }

      return prev;
    });
  }

  return { sensors, handleDragEnd };
}
