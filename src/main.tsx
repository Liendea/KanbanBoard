import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { KanbanProvider } from "./context/KanbanProvider.tsx";
import App from "./App.tsx";
import "./styles/Global.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <KanbanProvider>
      <App />
    </KanbanProvider>
  </StrictMode>
);
