import type { ColumnType, TaskType } from "../types/Types";
import TaskCard from "./TaskCard";
import "../App.css";
import { useState } from "react";
import EditIcon from "../icons/EditIcon";
import SaveIcon from "../icons/SaveIcon";
import AddTaskModal from "./AddTaskModal";
import PlusIcon from "../icons/PlusIcon";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { useKanban } from "../context/KanbanContext";
import EditTaskModal from "./EditTaskModal";

type ColumnProps = {
  column: ColumnType;
};

export default function Column({ column }: ColumnProps) {
  const { tasks } = useKanban();

  // Filtera tasks för just denna kolumn
  const columnTasks = tasks?.filter((task) => task.status === column.id) ?? [];

  const [editTitleMode, setEditTitleMode] = useState(false);
  const [columnTitle, setColumnTitle] = useState(column.title);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);

  function handleTaskClick(task: TaskType) {
    setSelectedTask(task);
    setShowEditModal(true);
  }

  function handleClick() {
    setEditTitleMode((prev) => !prev);
  }

  // gör hela kolumnen till en droppable
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div ref={setNodeRef} className="column">
      {/* Column title edit */}
      <div className="columnTitle">
        {editTitleMode ? (
          <input
            type="text"
            value={columnTitle}
            onChange={(e) => setColumnTitle(e.target.value)}
            onBlur={() => setEditTitleMode(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setEditTitleMode(false);
            }}
            autoFocus
            maxLength={30}
          />
        ) : (
          <h2>{columnTitle}</h2>
        )}
        {editTitleMode ? (
          <SaveIcon onClick={handleClick} />
        ) : (
          <EditIcon onClick={handleClick} />
        )}
      </div>

      {/* Task area med SortableContext */}
      <div
        className="taskArea"
        style={{
          maxHeight: column.id === "TODO" ? "70vh" : "80vh",
          overflowY: "auto",
        }}
      >
        <SortableContext
          items={columnTasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {columnTasks.length > 0 ? (
            columnTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onClick={() => handleTaskClick(task)}
              />
            ))
          ) : (
            <div className="drop-placeholder">Drop tasks here</div>
          )}
        </SortableContext>
      </div>

      {/* Add task button */}
      {column.id === "TODO" && (
        <button className="addTaskButton" onClick={() => setShowAddModal(true)}>
          <PlusIcon />
          Add task
        </button>
      )}

      {/* Modals */}
      {showAddModal && (
        <AddTaskModal
          columnId={column.id}
          onClose={() => setShowAddModal(false)}
        />
      )}
      {showEditModal && selectedTask && (
        <EditTaskModal
          task={selectedTask}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
}
