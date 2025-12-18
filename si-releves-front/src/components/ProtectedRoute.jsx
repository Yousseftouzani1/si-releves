import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * 🔐 Protège une route selon l'authentification
 * Optionnellement selon le rôle
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, role } = useAuth();

  // Pas connecté → login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Rôle non autorisé
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
