import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ArchiveModal from "./components/ArchiveModal";
import KanbanBoard from "./components/KanbanBoard";
import ArchiveIcon from "./icons/ArchiveIcon";
import SmallDeviceMenu from "./components/SmallDeviceMenu";
import "./styles/Global.scss";
import { useKanban } from "./context/KanbanContext";

function App() {
  const [showArchiveModal, setShowArchiveModal] = useState<boolean>(false);
  const { isMobileView, setIsMobileView } = useKanban();

  // hantera Resizing
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 900);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        {/* Mobilvy */}
        {isMobileView ? (
          <>
            <SmallDeviceMenu />
          </>
        ) : (
          <>
            <ArchiveIcon
              onClick={() => setShowArchiveModal(!showArchiveModal)}
            />
            {showArchiveModal && (
              <ArchiveModal onClose={() => setShowArchiveModal(false)} />
            )}
          </>
        )}

        {/* Routes */}

        <Routes>
          <Route path="/kanban" element={<KanbanBoard />} />
          <Route path="/kanban/:columnId" element={<KanbanBoard />} />
          {/* Redirect */}
          <Route path="*" element={<Navigate to="/kanban" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
