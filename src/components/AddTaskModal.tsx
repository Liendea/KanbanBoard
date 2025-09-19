import { useState } from "react";
import { useKanban } from "../context/KanbanContext";
import type { ColumnId } from "../types/Types";

import modalStyles from "../styles/Modals.module.scss";
import "../styles/Global.scss";

type TaskModalProps = {
  columnId: ColumnId;
  onClose: () => void;
};

export default function AddTaskModal({ columnId, onClose }: TaskModalProps) {
  const { setTasks } = useKanban();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSave() {
    if (!title.trim()) return;

    setTasks((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title,
        description,
        status: columnId,
      },
    ]);

    onClose();
  }

  return (
    <div className={modalStyles.modalBackdrop}>
      <div className={modalStyles.modal}>
        <h2>New Task</h2>

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
