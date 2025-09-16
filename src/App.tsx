import "./App.css";
import ArchiveModal from "./components/ArchiveModal";
import KanbanBoard from "./components/KanbanBoard";
import ArchiveIcon from "./icons/ArchiveIcon";
import { useState } from "react";

function App() {
  const [showArchiveModal, setShowArchiveModal] = useState<boolean>(false);

  function handleShowArchive() {
    setShowArchiveModal(!showArchiveModal);
  }

  return (
    <div className="App">
      <ArchiveIcon onClick={handleShowArchive} />
      {showArchiveModal && (
        <ArchiveModal onClose={() => setShowArchiveModal(false)} />
      )}
      <KanbanBoard />
    </div>
  );
}

export default App;
