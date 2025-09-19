import { useState } from "react";
import { useKanban } from "../context/KanbanContext";
import ArchiveModal from "./ArchiveModal";
import ArchiveIcon from "../icons/ArchiveIcon";
import SmallDeviceMenu from "./SmallDeviceMenu";

function Layout({ children }: { children: React.ReactNode }) {
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const { isMobileView } = useKanban();

  return (
    <div className="Layout">
      {/* Navigation */}
      {isMobileView ? (
        <SmallDeviceMenu />
      ) : (
        <>
          <ArchiveIcon onClick={() => setShowArchiveModal(!showArchiveModal)} />
          {showArchiveModal && (
            <ArchiveModal onClose={() => setShowArchiveModal(false)} />
          )}
        </>
      )}

      {/* Sidinnehåll */}
      <main>{children}</main>
    </div>
  );
}

export default Layout;
