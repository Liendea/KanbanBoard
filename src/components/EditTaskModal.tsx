import { useState } from "react";
import { useKanban } from "./context/KanbanContext";
import type { TaskType } from "../types/Types";
import "../App.css";
import DeleteIcon from "../icons/DeleteIcon";

type EditTaskModalProps = {
  task: TaskType;
  onClose: () => void;
};

export default function TaskModal({ task, onClose }: EditTaskModalProps) {
  const { setTasks } = useKanban();

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

  return (
    <div className="modalBackdrop">
      <div className="editModal">
        <h2>Edit Task</h2>
        <DeleteIcon handleClick={() => handleDelete(task)} />
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
