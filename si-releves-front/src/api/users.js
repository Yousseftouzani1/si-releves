import api from "./axios";

/**
 * 👤 Lister tous les utilisateurs (SUPERADMIN)
 */
export const getUsers = () => {
  return api.get("/admin/utilisateurs");
};

/**
 * ➕ Créer un nouvel utilisateur (SUPERADMIN)
 * @param {Object} user
 * user = { nom, prenom, email, role }
 */
export const createUser = (user) => {
  return api.post("/admin/utilisateurs", user);
};

/**
 * 🔍 Récupérer les détails d’un utilisateur
 * @param {number} id
 */
export const getUserById = (id) => {
  return api.get(`/admin/utilisateurs/${id}`);
};

/**
 * ✏️ Modifier un utilisateur
 * @param {number} id
 * @param {Object} user
 */
export const updateUser = (id, user) => {
  return api.put(`/admin/utilisateurs/${id}`, user);
};

/**
 * 🔁 Réinitialiser le mot de passe d’un utilisateur
 * @param {number} id
 */
export const resetUserPassword = (id) => {
  return api.post(`/admin/utilisateurs/${id}/reset-password`);
};
