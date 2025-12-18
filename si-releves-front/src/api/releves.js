import api from "./axios";

/**
 * 📊 Lister les relevés
 * Filtres possibles (optionnels) :
 * quartierId, agentId, type, date
 */
export const getReleves = (params = {}) => {
  return api.get("/releves", { params });
};

/**
 * 🔍 Détails d’un relevé
 * @param {number} id
 */
export const getReleveById = (id) => {
  return api.get(`/releves/${id}`);
};

/**
 * ➕ Enregistrer un nouveau relevé
 * @param {Object} data
 * data = { compteurId, nouvelIndex }
 */
export const createReleve = (data) => {
  return api.post("/releves", data);
};
