import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DndContext, rectIntersection } from "@dnd-kit/core";
import { useDnd } from "../hooks/useDnd";
import Column from "./Column";
import type { ColumnId } from "../types/Types";
import columnStyles from "../styles/Column.module.scss";
import "../styles/Global.scss";
import { useKanban } from "../context/KanbanContext";
import AddTaskModal from "./AddTaskModal";
import EditTaskModal from "./EditTaskModal";
import { useKanbanModals } from "../hooks/useKanbanModals";
import { COLUMNS } from "../constants/columns";

export default function KanbanBoard() {
  const { isMobileView } = useKanban();
  const { columnId } = useParams();
  const navigate = useNavigate();
  const { sensors, handleDragEnd } = useDnd(COLUMNS); //DND hook

  // custom KanbanModal hook
  const {
    showAddModal,
    showEditModal,
    selectedTask,
    activeColumnId,
    openAddModal,
    openEditModal,
    closeModals,
  } = useKanbanModals();

  // Desktop: hantera detaljvy
  const [detailColumnId, setDetailColumnId] = useState<string | null>(null);

  // Mobilvy: URL styr kolumnen
  const activeColumn = columnId
    ? COLUMNS.find((c) => c.id === columnId)
    : isMobileView
    ? COLUMNS[0]
    : null;

  function closeDetailView() {
    setDetailColumnId(null);
    navigate("/kanban");
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
            key={activeColumn!.id} // tvingar React att mounta om vid kolumnbyte
            column={activeColumn!}
            columnIndex={COLUMNS.findIndex((c) => c.id === activeColumn!.id)}
            onClickTask={openEditModal}
            onAddTask={openAddModal}
          />
        ) : detailColumnId ? (
          // Desktop detaljvy: visa endast den valda kolumnen
          <div className={columnStyles.columnDetail}>
            <Column
              column={COLUMNS.find((c) => c.id === detailColumnId)!}
              columnIndex={COLUMNS.findIndex((c) => c.id === detailColumnId)!}
              onClickTask={openEditModal}
              onAddTask={openAddModal}
            />
            <button className="closeDetailViewBtn" onClick={closeDetailView}>
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
              onClickTask={openEditModal}
              onAddTask={openAddModal}
            />
          ))
        )}
      </div>

      {/* Modals renderas på root-nivå */}
      {showAddModal && activeColumnId && (
        <AddTaskModal
          columnId={activeColumnId as ColumnId}
          onClose={closeModals}
        />
      )}
      {showEditModal && selectedTask && (
        <EditTaskModal task={selectedTask} onClose={closeModals} />
      )}
    </DndContext>
  );
}
