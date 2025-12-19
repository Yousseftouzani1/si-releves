import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import ProtectedRoute from "./components/ProtectedRoute";
import SessionWarning from "./components/SessionWarning";
import AIChatbot from "./components/AIChatbot";

/* Pages */
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Releves from "./pages/Releves";
import ReleveDetail from "./pages/ReleveDetail";
import Agents from "./pages/Agents";
import AgentDetail from "./pages/AgentDetail";
import Compteurs from "./pages/Compteurs";
import CompteurDetail from "./pages/CompteurDetail";
import AddCompteur from "./pages/AddCompteur";
import Quartiers from "./pages/Quartiers";
import AddQuartier from "./pages/AddQuartier";
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import Logs from "./pages/Logs";
import ChangePassword from "./pages/ChangePassword";
import Rapports from "./pages/Rapports";

/* Error pages */
const Unauthorized = () => (
  <div className="app-container" style={{ justifyContent: "center", alignItems: "center", height: "100vh" }}>
    <div style={{ textAlign: "center" }}>
      <h2 style={{ fontSize: "2rem", marginBottom: "8px" }}>🚫 Accès non autorisé</h2>
      <p style={{ color: "var(--text-muted)" }}>Vous n'avez pas les permissions nécessaires.</p>
    </div>
  </div>
);

const NotFound = () => (
  <div className="app-container" style={{ justifyContent: "center", alignItems: "center", height: "100vh" }}>
    <div style={{ textAlign: "center" }}>
      <h2 style={{ fontSize: "2rem", marginBottom: "8px" }}>🔍 Page non trouvée</h2>
      <p style={{ color: "var(--text-muted)" }}>La page que vous cherchez n'existe pas.</p>
    </div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <Router>
            <Routes>

              {/* Public - Landing Page */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Dashboard redirect for logged users */}
              <Route
                path="/home"
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
                    <>
                      <Dashboard />
                      <SessionWarning />
                      <AIChatbot />
                    </>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/releves"
                element={
                  <ProtectedRoute>
                    <>
                      <Releves />
                      <SessionWarning />
                      <AIChatbot />
                    </>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/releves/:id"
                element={
                  <ProtectedRoute>
                    <>
                      <ReleveDetail />
                      <SessionWarning />
                      <AIChatbot />
                    </>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/agents"
                element={
                  <ProtectedRoute>
                    <>
                      <Agents />
                      <SessionWarning />
                      <AIChatbot />
                    </>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/agents/:id"
                element={
                  <ProtectedRoute>
                    <>
                      <AgentDetail />
                      <SessionWarning />
                      <AIChatbot />
                    </>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/compteurs"
                element={
                  <ProtectedRoute>
                    <>
                      <Compteurs />
                      <SessionWarning />
                      <AIChatbot />
                    </>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/compteurs/:id"
                element={
                  <ProtectedRoute>
                    <>
                      <CompteurDetail />
                      <SessionWarning />
                      <AIChatbot />
                    </>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/compteurs/nouveau"
                element={
                  <ProtectedRoute>
                    <>
                      <AddCompteur />
                      <SessionWarning />
                      <AIChatbot />
                    </>
                  </ProtectedRoute>
                }
              />

              {/* Quartiers */}
              <Route
                path="/quartiers"
                element={
                  <ProtectedRoute>
                    <>
                      <Quartiers />
                      <SessionWarning />
                      <AIChatbot />
                    </>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/quartiers/nouveau"
                element={
                  <ProtectedRoute>
                    <>
                      <AddQuartier />
                      <SessionWarning />
                      <AIChatbot />
                    </>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/change-password"
                element={
                  <ProtectedRoute>
                    <>
                      <ChangePassword />
                      <SessionWarning />
                      <AIChatbot />
                    </>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/rapports"
                element={
                  <ProtectedRoute>
                    <>
                      <Rapports />
                      <SessionWarning />
                      <AIChatbot />
                    </>
                  </ProtectedRoute>
                }
              />

              {/* SUPERADMIN */}
              <Route
                path="/admin/utilisateurs"
                element={
                  <ProtectedRoute allowedRoles={["SUPERADMIN"]}>
                    <>
                      <Users />
                      <SessionWarning />
                      <AIChatbot />
                    </>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/utilisateurs/nouveau"
                element={
                  <ProtectedRoute allowedRoles={["SUPERADMIN"]}>
                    <>
                      <AddUser />
                      <SessionWarning />
                      <AIChatbot />
                    </>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/logs"
                element={
                  <ProtectedRoute allowedRoles={["SUPERADMIN"]}>
                    <>
                      <Logs />
                      <SessionWarning />
                      <AIChatbot />
                    </>
                  </ProtectedRoute>
                }
              />

              {/* Errors */}
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="*" element={<NotFound />} />

            </Routes>
          </Router>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
