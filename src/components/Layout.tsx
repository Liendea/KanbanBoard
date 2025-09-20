import { useState } from "react";
import { useKanban } from "../context/KanbanContext";
import ArchiveModal from "./ArchiveModal";
import ArchiveIcon from "../icons/ArchiveIcon";
import SmallDeviceMenu from "./SmallDeviceMenu";
import "../styles/Global.scss";

function Layout({ children }: { children: React.ReactNode }) {
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const { isMobileView } = useKanban();

  return (
    <>
      {/* Navigation */}
      {isMobileView ? (
        <SmallDeviceMenu />
      ) : (
        <>
          <div className="appArchiveIcon">
            <ArchiveIcon
              onClick={() => setShowArchiveModal(!showArchiveModal)}
            />
          </div>
          {showArchiveModal && (
            <ArchiveModal onClose={() => setShowArchiveModal(false)} />
          )}
        </>
      )}

      {/* Sidinnehåll */}
      <main>{children}</main>
    </>
  );
}

export default Layout;
