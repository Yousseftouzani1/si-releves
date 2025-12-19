import api from "./axios";

/**
 * 📊 Récupérer tous les compteurs
 */
export const getCompteurs = () => {
  return api.get("/compteurs");
};

/**
 * 📊 Récupérer un compteur par ID
 */
export const getCompteurById = (id) => {
  return api.get(`/compteurs/${id}`);
};

/**
 * ➕ Créer un nouveau compteur
 */
export const createCompteur = (compteurData) => {
  return api.post("/compteurs", compteurData);
};

/**
 * ✏️ Modifier un compteur
 */
export const updateCompteur = (id, compteurData) => {
  return api.put(`/compteurs/${id}`, compteurData);
};

/**
 * 🗑️ Supprimer un compteur
 */
export const deleteCompteur = (id) => {
  return api.delete(`/compteurs/${id}`);
};

/**
 * 📈 Historique des relevés d'un compteur
 */
export const getCompteurReleves = (id) => {
  return api.get(`/compteurs/${id}/releves`);
};

/**
 * 🔍 Rechercher un compteur par numéro
 */
export const searchCompteurByNumero = (numero) => {
  return api.get(`/compteurs/search?numero=${numero}`);
};
