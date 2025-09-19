import ArchiveIcon from "../icons/ArchiveIcon";
import { useState, useEffect } from "react";
import "../styles/Global.scss";
import styles from "../styles/SmallDeviceMenu.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import ArchiveModal from "./ArchiveModal";

export default function SmallDeviceMenu() {
  const [showArchiveModal, setShowArchiveModal] = useState<boolean>(false);
  const [selectedColumn, setSelectedColumn] = useState<string>("TODO");

  const navigate = useNavigate();
  const { columnId } = useParams();

  // Synka state med URL
  useEffect(() => {
    if (columnId) {
      setSelectedColumn(columnId);
    }
  }, [columnId]);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setSelectedColumn(value); // uppdatera state
    navigate(`/kanban/${value}`);
  }

  return (
    <div className={styles.smallDeviceMenu}>
      <ArchiveIcon onClick={() => setShowArchiveModal(!showArchiveModal)} />
      {showArchiveModal && (
        <ArchiveModal onClose={() => setShowArchiveModal(false)} />
      )}
      <select value={selectedColumn} onChange={handleChange}>
        <option value="TODO">To Do</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="DONE">Done</option>
      </select>
    </div>
  );
}
