import { useState } from "react";
import type { ColumnType, TaskType } from "../types/Types";
import Column from "./Column";
import { KanbanContext } from "./context/KanbanContext";
import { rectIntersection, KeyboardSensor, PointerSensor } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import type { DragEndEvent } from "@dnd-kit/core";
import { useSensors, useSensor } from "@dnd-kit/core";
import "../App.css";

const COLUMNS: ColumnType[] = [
  { id: "TODO", title: "To do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];

const INITIAL_TASKS: TaskType[] = [
  {
    id: "1",
    title: "Task One",
    description: "This task in doable",
    status: "TODO",
  },
  {
    id: "2",
    title: "Task Two",
    description: "This task in doable",
    status: "IN_PROGRESS",
  },
  {
    id: "3",
    title: "Task three",
    description: "This task in doable",
    status: "TODO",
  },
  {
    id: "4",
    title: "Task four",
    description: "This task in doable",
    status: "DONE",
  },
  {
    id: "5",
    title: "Task Five",
    description: "This task in doable",
    status: "IN_PROGRESS",
  },
];

function KanbanBoard() {
  const [tasks, setTasks] = useState<TaskType[]>(INITIAL_TASKS);

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
    //useSensor(TouchSensor),
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
            const columnTasks = tasks.filter((t) => t.status === column.id);
            return (
              <Column key={column.id} column={column} tasks={columnTasks} />
            );
          })}
        </div>
      </KanbanContext.Provider>
    </DndContext>
  );
}

export default KanbanBoard;
