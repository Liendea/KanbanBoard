import { useKanban } from "../context/KanbanContext";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function ResponsiveNavigator() {
  const { setIsMobileView } = useKanban();
  const navigate = useNavigate();
  const prevIsMobile = useRef<boolean | null>(null);

  // hantera Resizing
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 900;
      setIsMobileView(isMobile);

      // navigera bara om vyn faktiskt ändrats
      if (prevIsMobile.current !== null && prevIsMobile.current !== isMobile) {
        if (isMobile) {
          navigate("/kanban/TODO");
        } else {
          navigate("/kanban");
        }
      }

      prevIsMobile.current = isMobile;
    };

    handleResize(); // kör vid mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [navigate, setIsMobileView]);

  return null;
}
