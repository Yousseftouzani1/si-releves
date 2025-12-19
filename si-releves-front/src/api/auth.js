import api from "./axios";

/**
 * 🔐 Inscription d'un nouvel utilisateur (en attente d'approbation)
 */
export const signup = (userData) => {
  return api.post("/auth/signup", userData);
};

/**
 * 🔐 Connexion utilisateur
 */
export const login = (email, motDePasse) => {
  return api.post("/auth/login", { email, motDePasse });
};

/**
 * 🔐 Changer le mot de passe
 */
export const changePassword = (ancienMotDePasse, nouveauMotDePasse) => {
  return api.post("/auth/change-password", { ancienMotDePasse, nouveauMotDePasse });
};

/**
 * 👥 Récupérer les utilisateurs en attente d'approbation (SUPERADMIN)
 */
export const getPendingUsers = () => {
  return api.get("/admin/pending-users");
};

/**
 * ✅ Approuver un utilisateur (SUPERADMIN)
 */
export const approveUser = (userId) => {
  return api.post(`/admin/approve-user/${userId}`);
};

/**
 * ❌ Rejeter un utilisateur (SUPERADMIN)
 */
export const rejectUser = (userId) => {
  return api.delete(`/admin/reject-user/${userId}`);
};
