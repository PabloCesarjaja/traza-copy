import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MockupIndex from "@/pages/MockupIndex";

import AuthLayout from "@/layouts/AuthLayout";
import AppLayout from "@/layouts/AppLayout";
import ClientLayout from "@/layouts/ClientLayout";

import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Logout from "@/pages/auth/Logout";
import Profile from "@/pages/auth/Profile";

import CasesList from "@/pages/cases/CasesList";
import CaseCreate from "@/pages/cases/CaseCreate";
import CaseDetail from "@/pages/cases/CaseDetail";
import CaseEdit from "@/pages/cases/CaseEdit";
import CaseDelete from "@/pages/cases/CaseDelete";

import TasksList from "@/pages/tasks/TasksList";
import TaskCreate from "@/pages/tasks/TaskCreate";
import TaskEdit from "@/pages/tasks/TaskEdit";

import DocumentsList from "@/pages/documents/DocumentsList";
import DocumentUpload from "@/pages/documents/DocumentUpload";

import MessagesList from "@/pages/messages/MessagesList";
import SendMessage from "@/pages/messages/SendMessage";

import ClientCases from "@/pages/client/ClientCases";
import ClientCaseDetail from "@/pages/client/ClientCaseDetail";

import AuditLog from "@/pages/audit/AuditLog";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MockupIndex />} />

        {/* Auth layout */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
        </Route>

        {/* App layout (abogado/paralegal/admin) */}
        <Route element={<AppLayout />}>
          <Route path="/perfil" element={<Profile />} />

          <Route path="/casos" element={<CasesList />} />
          <Route path="/casos/nuevo" element={<CaseCreate />} />
          <Route path="/casos/:id" element={<CaseDetail />} />
          <Route path="/casos/:id/editar" element={<CaseEdit />} />
          <Route path="/casos/:id/eliminar" element={<CaseDelete />} />

          <Route path="/casos/:id/tareas" element={<TasksList />} />
          <Route path="/casos/:id/tareas/nueva" element={<TaskCreate />} />
          <Route path="/casos/:id/tareas/:taskId" element={<TaskEdit />} />

          <Route path="/casos/:id/documentos" element={<DocumentsList />} />
          <Route path="/casos/:id/documentos/subir" element={<DocumentUpload />} />

          <Route path="/casos/:id/mensajes" element={<MessagesList />} />
          <Route path="/casos/:id/mensajes/nuevo" element={<SendMessage />} />

          <Route path="/casos/:id/auditoria" element={<AuditLog />} />
        </Route>

        {/* Client portal */}
        <Route element={<ClientLayout />}>
          <Route path="/portal/casos" element={<ClientCases />} />
          <Route path="/portal/casos/:id" element={<ClientCaseDetail />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
