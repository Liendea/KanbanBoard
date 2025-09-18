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
import { useState } from "react";
import { useKanban } from "../context/KanbanContext";
import Column from "./Column";
import type { ColumnType } from "../types/Types";
import { useParams } from "react-router-dom";

import columnStyles from "../styles/Column.module.scss";
import "../styles/Global.scss";

const COLUMNS: ColumnType[] = [
  { id: "TODO", title: "To do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];

export default function KanbanBoard() {
  const { setTasks, isMobileView } = useKanban();
  const { columnId } = useParams();

  // Desktop: hantera detaljvy
  const [detailColumnId, setDetailColumnId] = useState<string | null>(null);

  // Mobilvy: URL styr kolumnen
  const activeColumn = columnId
    ? COLUMNS.find((c) => c.id === columnId)
    : isMobileView
    ? COLUMNS[0]
    : null;

  // DnD-kit sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 0 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

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
          const found = newColumnTasks.find((nt) => nt.id === t.id);
          return found ? found : t;
        });
      }

      return prev;
    });
  }

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      collisionDetection={rectIntersection}
    >
      <div className={columnStyles.columnWrapper}>
        {isMobileView ? (
          // Mobilvy: visa endast kolumn från URL
          <Column
            column={activeColumn!}
            columnIndex={COLUMNS.findIndex((c) => c.id === activeColumn!.id)}
          />
        ) : detailColumnId ? (
          // Desktop detaljvy: visa endast den valda kolumnen
          <div className={columnStyles.columnDetail}>
            <Column
              column={COLUMNS.find((c) => c.id === detailColumnId)!}
              columnIndex={COLUMNS.findIndex((c) => c.id === detailColumnId)!}
            />
            <button
              className="closeDetailViewBtn"
              onClick={() => setDetailColumnId(null)}
            >
              X
            </button>
          </div>
        ) : (
          // Desktop full board: visa alla kolumner
          COLUMNS.map((column, index) => (
            <Column
              key={column.id}
              column={column}
              columnIndex={index}
              onClick={() => setDetailColumnId(column.id)} // öppna detaljvy desktop
            />
          ))
        )}
      </div>
    </DndContext>
  );
}
