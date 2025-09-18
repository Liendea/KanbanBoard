import type { ColumnType, TaskType } from "../types/Types";
import TaskCard from "./TaskCard";

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
import { useNavigate } from "react-router-dom";

import styles from "../styles/Column.module.scss";
import taskStyles from "../styles/Task.module.scss";
import "../styles/Global.scss";

type ColumnProps = {
  column: ColumnType;
  columnIndex: number;
  onClick?: () => void; // valfri prop för click
};

export default function Column({ column, columnIndex, onClick }: ColumnProps) {
  const { tasks, columnTitles, setColumnTitles } = useKanban();
  const storedColumnTitle = columnTitles?.[columnIndex] ?? column.title;

  const navigate = useNavigate();

  // Filtera tasks för just denna kolumn
  const columnTasks = tasks?.filter((task) => task.status === column.id) ?? [];

  const [editTitleMode, setEditTitleMode] = useState(false);
  const [columnTitle, setColumnTitle] = useState(storedColumnTitle);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);

  // gör hela kolumnen till en droppable
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  // Spar ny titel
  function saveTitle() {
    setEditTitleMode(false);
    if (!setColumnTitles) return;

    setColumnTitles((prev) =>
      prev.map((title, idx) => (idx === columnIndex ? columnTitle : title))
    );
  }

  // Välj task och visa editmodal
  function handleTaskClick(task: TaskType) {
    setSelectedTask(task);
    setShowEditModal(true);
  }

  return (
    <div ref={setNodeRef} className={styles.column}>
      {/* Column title edit */}
      <div className={styles.columnTitle}>
        {editTitleMode ? (
          <input
            type="text"
            value={columnTitle}
            onChange={(e) => setColumnTitle(e.target.value)}
            onBlur={saveTitle}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveTitle();
            }}
            autoFocus
            maxLength={30}
          />
        ) : (
          <h2
            onClick={() => {
              if (onClick) onClick(); // desktop detaljvy
              navigate(`/kanban/${column.id}`); // uppdatera URL för mobilvy
              console.log(column.title);
            }}
          >
            {columnTitle}
          </h2>
        )}
        {editTitleMode ? (
          <SaveIcon onClick={saveTitle} />
        ) : (
          <EditIcon onClick={() => setEditTitleMode(true)} />
        )}
      </div>

      {/* Task area med SortableContext */}
      <div
        className={taskStyles.taskArea}
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
            <div className={styles.dropPlaceholder}>Drop tasks here</div>
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
