import { useState } from "react";
import Column from "./Column";
import type { ColumnId, ColumnType } from "../types/Types";
import { useNavigate, useParams } from "react-router-dom";
import columnStyles from "../styles/Column.module.scss";
import "../styles/Global.scss";
import { DndContext, rectIntersection } from "@dnd-kit/core";
import { useDnd } from "../hooks/useDnd";
import { useKanban } from "../context/KanbanContext";
import AddTaskModal from "./AddTaskModal";
import EditTaskModal from "./EditTaskModal";
import type { TaskType } from "../types/Types";

const COLUMNS: ColumnType[] = [
  { id: "TODO", title: "To do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];

export default function KanbanBoard() {
  const { isMobileView } = useKanban();
  const { columnId } = useParams();
  const navigate = useNavigate();
  //DND hook
  const { sensors, handleDragEnd } = useDnd(COLUMNS);

  // Desktop: hantera detaljvy
  const [detailColumnId, setDetailColumnId] = useState<string | null>(null);

  // Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);

  // Mobilvy: URL styr kolumnen
  const activeColumn = columnId
    ? COLUMNS.find((c) => c.id === columnId)
    : isMobileView
    ? COLUMNS[0]
    : null;

  function openAddModal(columnId: string) {
    setActiveColumnId(columnId);
    setShowAddModal(true);
  }

  function openEditModal(task: TaskType) {
    setSelectedTask(task);
    setShowEditModal(true);
  }

  function closeModals() {
    setShowAddModal(false);
    setShowEditModal(false);
    setSelectedTask(null);
  }
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
