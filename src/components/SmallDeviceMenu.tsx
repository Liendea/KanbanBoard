import ArchiveIcon from "../icons/ArchiveIcon";
import { useState } from "react";
import "../styles/Global.scss";
import styles from "../styles/SmallDeviceMenu.module.scss";
import { useNavigate, useParams } from "react-router-dom";

export default function SmallDeviceMenu() {
  const [showArchiveModal, setShowArchiveModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const { columnId } = useParams();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;

    navigate(`/kanban/${value}`);
  }

  return (
    <div className={styles.smallDeviceMenu}>
      <ArchiveIcon onClick={() => setShowArchiveModal(!showArchiveModal)} />
      <select value={columnId} onChange={handleChange}>
        <option value="TODO">To Do</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="DONE">Done</option>
      </select>
    </div>
  );
}
