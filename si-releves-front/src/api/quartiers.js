import api from "./axios";

/**
 * 📊 Récupérer tous les quartiers
 */
export const getQuartiers = () => {
    return api.get("/quartiers");
};

/**
 * 📊 Récupérer un quartier par ID
 */
export const getQuartierById = (id) => {
    return api.get(`/quartiers/${id}`);
};

/**
 * ➕ Créer un nouveau quartier
 */
export const createQuartier = (quartierData) => {
    return api.post("/quartiers", quartierData);
};

/**
 * ✏️ Modifier un quartier
 */
export const updateQuartier = (id, quartierData) => {
    return api.put(`/quartiers/${id}`, quartierData);
};

/**
 * 🗑️ Supprimer un quartier
 */
export const deleteQuartier = (id) => {
    return api.delete(`/quartiers/${id}`);
};

/**
 * 📈 Statistiques d'un quartier
 */
export const getQuartierStats = (id) => {
    return api.get(`/quartiers/${id}/stats`);
};
