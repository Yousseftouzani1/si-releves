import api from "./axios";

/**
 * 🚰 Lister tous les compteurs
 */
export const getCompteurs = () => {
  return api.get("/compteurs");
};

/**
 * 🔍 Détails d’un compteur
 * @param {number} id
 */
export const getCompteurById = (id) => {
  return api.get(`/compteurs/${id}`);
};

/**
 * ➕ Créer un nouveau compteur
 * @param {Object} data
 * data = { adresseId, type }
 */
export const createCompteur = (data) => {
  return api.post("/compteurs", data);
};

/**
 * 📊 Historique des relevés d’un compteur
 * @param {number} compteurId
 */
export const getRelevesByCompteur = (compteurId) => {
  return api.get(`/compteurs/${compteurId}/releves`);
};
