import { Routes, Route, Navigate } from "react-router-dom";
import KanbanPage from "./KanbanPage";
import Layout from "../components/Layout";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/kanban"
        element={
          <Layout>
            <KanbanPage />
          </Layout>
        }
      />
      <Route
        path="/kanban/:columnId"
        element={
          <Layout>
            <KanbanPage />
          </Layout>
        }
      />
      {/* Redirect */}
      <Route path="*" element={<Navigate to="/kanban" replace />} />
    </Routes>
  );
}

export default AppRoutes;
