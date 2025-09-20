import { useState } from "react";
import { useKanban } from "../context/KanbanContext";

export function useEditTitle(columnIndex: number, columnTitleFallback: string) {
  const { columnTitles, setColumnTitles } = useKanban();
  const storedColumnTitle = columnTitles?.[columnIndex] ?? columnTitleFallback;

  const [editTitleMode, setEditTitleMode] = useState(false);
  const [columnTitle, setColumnTitle] = useState(storedColumnTitle);

  // Spar ny titel
  function saveTitle() {
    setEditTitleMode(false);
    if (!setColumnTitles) return;

    setColumnTitles((prev) =>
      prev.map((title, idx) => (idx === columnIndex ? columnTitle : title))
    );
  }

  return {
    editTitleMode,
    setEditTitleMode,
    columnTitle,
    setColumnTitle,
    saveTitle,
  };
}
