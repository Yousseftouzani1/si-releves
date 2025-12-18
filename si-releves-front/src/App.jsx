import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

/* Pages */
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Releves from "./pages/Releves";
import ReleveDetail from "./pages/ReleveDetail";
import Agents from "./pages/Agents";
import AgentDetail from "./pages/AgentDetail";
import Compteurs from "./pages/Compteurs";
import CompteurDetail from "./pages/CompteurDetail";
import AddCompteur from "./pages/AddCompteur";
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import ChangePassword from "./pages/ChangePassword";

/* Error pages */
const Unauthorized = () => <h2>Accès non autorisé</h2>;
const NotFound = () => <h2>Page non trouvée</h2>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* Public */}
          <Route path="/login" element={<Login />} />

          {/* Utilisateur */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Navigate to="/dashboard" />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/releves"
            element={
              <ProtectedRoute>
                <Releves />
              </ProtectedRoute>
            }
          />

          <Route
            path="/releves/:id"
            element={
              <ProtectedRoute>
                <ReleveDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/agents"
            element={
              <ProtectedRoute>
                <Agents />
              </ProtectedRoute>
            }
          />

          <Route
            path="/agents/:id"
            element={
              <ProtectedRoute>
                <AgentDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/compteurs"
            element={
              <ProtectedRoute>
                <Compteurs />
              </ProtectedRoute>
            }
          />

          <Route
            path="/compteurs/:id"
            element={
              <ProtectedRoute>
                <CompteurDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/compteurs/nouveau"
            element={
              <ProtectedRoute>
                <AddCompteur />
              </ProtectedRoute>
            }
          />

          <Route
            path="/change-password"
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />

          {/* SUPERADMIN */}
          <Route
            path="/admin/utilisateurs"
            element={
              <ProtectedRoute allowedRoles={["SUPERADMIN"]}>
                <Users />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/utilisateurs/nouveau"
            element={
              <ProtectedRoute allowedRoles={["SUPERADMIN"]}>
                <AddUser />
              </ProtectedRoute>
            }
          />

          {/* Errors */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
