import { createContext, useContext, useState } from "react";
import { login as loginApi } from "../api/auth";

// Création du contexte
const AuthContext = createContext();

/**
 * 🔐 Provider d'authentification
 */
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  /**
   * 🔐 Login
   */
  const login = async (email, motDePasse) => {
    const response = await loginApi(email, motDePasse);

    const { token, role } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    setToken(token);
    setRole(role);
  };

  /**
   * 🔓 Logout
   */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * 🔁 Hook pour utiliser l'auth facilement
 */
export const useAuth = () => {
  return useContext(AuthContext);
};
