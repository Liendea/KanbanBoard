import { useKanban } from "../context/KanbanContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ResponsiveNavigator() {
  const { setIsMobileView } = useKanban();
  const navigate = useNavigate();
  // hantera Resizing
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 900;
      setIsMobileView(isMobile);

      if (!isMobile) {
        navigate("/kanban");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [navigate, setIsMobileView]);

  return null;
}
