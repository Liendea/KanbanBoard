import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/Global.scss";
import { KanbanProvider } from "./context/KanbanProvider.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <KanbanProvider>
      <App />
    </KanbanProvider>
  </StrictMode>
);
