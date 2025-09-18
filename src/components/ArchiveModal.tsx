import { useKanban } from "../context/KanbanContext";
import DeleteIcon from "../icons/DeleteIcon";
import type { TaskType } from "../types/Types";
import modalStyles from "../styles/Modals.module.scss";
import "../styles/Global.scss";

type ArchiveModalProps = {
  onClose: () => void;
};

export default function ArchiveModal({ onClose }: ArchiveModalProps) {
  const { setTasks, archive, setArchive } = useKanban();

  function handleDelete(taskToDelete: TaskType) {
    setArchive((prev) =>
      prev ? prev.filter((t) => t.id !== taskToDelete.id) : null
    );
    setTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id));
  }

  return (
    <div className={modalStyles.modalBackdrop}>
      <div className={`${modalStyles.modal} ${modalStyles.archiveModal}`}>
        <h2>Arkiverade uppgifter</h2>
        <div className={modalStyles.taskContainer}>
          {archive?.map((task) => (
            <div key={task.id} className={modalStyles.archivedTask}>
              <p
                className={`${modalStyles.status} ${
                  task.status === "TODO"
                    ? modalStyles.todo
                    : task.status === "IN_PROGRESS"
                    ? modalStyles.inProgress
                    : task.status === "DONE"
                    ? modalStyles.done
                    : ""
                }`}
              >
                {task.status}
              </p>
              <DeleteIcon onClick={() => handleDelete(task)} />

              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </div>
          ))}
        </div>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
