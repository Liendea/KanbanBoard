import { useState } from "react";
import { useKanban } from "../context/KanbanContext";
import type { TaskType } from "../types/Types";
import DeleteIcon from "../icons/DeleteIcon";
import ArchiveIcon from "../icons/ArchiveIcon";
import modalStyles from "../styles/Modals.module.scss";
import "../styles/Global.scss";

type EditTaskModalProps = {
  task: TaskType;
  onClose: () => void;
};

export default function TaskModal({ task, onClose }: EditTaskModalProps) {
  const { setTasks, setArchive, isMobileView } = useKanban();

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  function handleSave() {
    if (!title.trim()) return;

    // Uppdatera befintlig task
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, title, description } : t))
    );

    onClose();
  }

  function handleDelete(taskToDelete: TaskType) {
    setTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id));
    onClose();
  }

  function handleArchive(taskToArchive: TaskType) {
    setArchive((prev) => (prev ? [...prev, taskToArchive] : [taskToArchive]));
    setTasks((prev) => prev.filter((t) => t.id !== taskToArchive.id));
    onClose();
  }

  return (
    <div className={modalStyles.modalBackdrop}>
      <div className={modalStyles.editModal}>
        <ArchiveIcon onClick={() => handleArchive(task)} />
        <h2>Edit Task</h2>
        {isMobileView && (
          <div className={modalStyles.moveTask}>
            <p>Flytta till: </p>
            <select>
              <option value="TODO">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DONE">Done</option>
            </select>
          </div>
        )}
        <DeleteIcon onClick={() => handleDelete(task)} />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
