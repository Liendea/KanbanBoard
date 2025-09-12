import { useState } from "react";
import {
  DndContext,
  rectIntersection,
  KeyboardSensor,
  PointerSensor,
  useSensors,
  useSensor,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import type { DragEndEvent } from "@dnd-kit/core";
import { KanbanContext } from "./context/KanbanContext";
import Column from "./Column";
import type { ColumnType, TaskType } from "../types/Types";
import "../App.css";
// import { INITIAL_TASKS } from "../assets/initial_tasks/InitialTasks";

const COLUMNS: ColumnType[] = [
  { id: "TODO", title: "To do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];

function KanbanBoard() {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    setTasks((prev) => {
      const activeTask = prev.find((t) => t.id === activeId);
      if (!activeTask) return prev;

      // 1. Kolla om man släpper på en kolumn
      const overColumn = COLUMNS.find((col) => col.id === overId);
      if (overColumn) {
        return prev.map((t) =>
          t.id === activeId ? { ...t, status: overColumn.id } : t
        );
      }

      // 2. Kolla om man släpper på en task
      const overTask = prev.find((t) => t.id === overId);
      if (overTask) {
        // Om tasken ligger i en annan kolumn -> byt kolumn
        if (overTask.status !== activeTask.status) {
          return prev.map((t) =>
            t.id === activeId ? { ...t, status: overTask.status } : t
          );
        }

        // Annars flytta ordning inom samma kolumn
        const activeIndex = prev.findIndex((t) => t.id === activeId);
        const overIndex = prev.findIndex((t) => t.id === overId);
        return arrayMove(prev, activeIndex, overIndex);
      }

      return prev;
    });
  }

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 0 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      collisionDetection={rectIntersection}
    >
      <KanbanContext.Provider value={{ tasks, setTasks }}>
        <div className="columnWrapper">
          {COLUMNS.map((column) => {
            return <Column key={column.id} column={column} />;
          })}
        </div>
      </KanbanContext.Provider>
    </DndContext>
  );
}

export default KanbanBoard;
