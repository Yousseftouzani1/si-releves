import api from "./axios";

/**
 * 🔐 Login utilisateur
 * @param {string} email
 * @param {string} motDePasse
 */
export const login = (email, motDePasse) => {
  return api.post("/auth/login", {
    email,
    motDePasse,
  });
};

/**
 * 🔑 Changement de mot de passe (utilisateur connecté)
 * @param {string} ancienMotDePasse
 * @param {string} nouveauMotDePasse
 */
export const changePassword = (ancienMotDePasse, nouveauMotDePasse) => {
  return api.put("/utilisateurs/me/password", {
    ancienMotDePasse,
    nouveauMotDePasse,
  });
};
