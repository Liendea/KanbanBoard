import { useState } from "react";
import type { TaskType, ColumnId } from "../types/Types";

export function useKanbanModals() {
  // Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);

  function openAddModal(columnId: ColumnId) {
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

  return {
    showAddModal,
    showEditModal,
    selectedTask,
    activeColumnId,
    openAddModal,
    openEditModal,
    closeModals,
  };
}
