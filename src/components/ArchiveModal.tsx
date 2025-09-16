import { useKanban } from "../context/KanbanContext";
import "../App.css";

type ArchiveModalProps = {
  onClose: () => void;
};

export default function ArchiveModal({ onClose }: ArchiveModalProps) {
  const { archive } = useKanban();
  return (
    <div className="modalBackdrop">
      <div className="modal archiveModal">
        <h2>Arkiverade uppgifter</h2>
        <div className="taskContainer">
          {archive?.map((task) => (
            <div
              key={task.id}
              className="archivedTask"
              onClick={() => console.log(task)}
            >
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
            </div>
          ))}
        </div>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
