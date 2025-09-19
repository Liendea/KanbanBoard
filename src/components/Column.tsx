import type { ColumnType, TaskType } from "../types/Types";
import TaskCard from "./TaskCard";
import { useState } from "react";
import EditIcon from "../icons/EditIcon";
import SaveIcon from "../icons/SaveIcon";

import PlusIcon from "../icons/PlusIcon";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { useKanban } from "../context/KanbanContext";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Column.module.scss";
import taskStyles from "../styles/Task.module.scss";
import "../styles/Global.scss";

type ColumnProps = {
  column: ColumnType;
  columnIndex: number;
  onClick?: () => void;
  onClickTask?: (task: TaskType) => void;
  onAddTask?: (columnId: string) => void;
};

export default function Column({
  column,
  columnIndex,
  onClick,
  onAddTask,
  onClickTask,
}: ColumnProps) {
  const { tasks, columnTitles, setColumnTitles } = useKanban();
  const storedColumnTitle = columnTitles?.[columnIndex] ?? column.title;

  const navigate = useNavigate();

  // Filtera tasks för just denna kolumn
  const columnTasks = tasks?.filter((task) => task.status === column.id) ?? [];

  const [editTitleMode, setEditTitleMode] = useState(false);
  const [columnTitle, setColumnTitle] = useState(storedColumnTitle);

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
                onClick={() => onClickTask?.(task)}
              />
            ))
          ) : (
            <div className={styles.dropPlaceholder}>Drop tasks here</div>
          )}
        </SortableContext>
      </div>

      {/* Add task button */}
      {column.id === "TODO" && (
        <button
          className="addTaskButton"
          onClick={() => onAddTask?.(column.id)}
        >
          <PlusIcon />
          Add task
        </button>
      )}
    </div>
  );
}
