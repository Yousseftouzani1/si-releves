import api from "./axios";

/**
 * 🧭 Lister tous les agents de terrain
 */
export const getAgents = () => {
  return api.get("/agents");
};

/**
 * 🔍 Récupérer les détails d’un agent
 * @param {number} id
 */
export const getAgentById = (id) => {
  return api.get(`/agents/${id}`);
};

/**
 * 🔄 Affecter un agent à un quartier
 * @param {number} agentId
 * @param {number} quartierId
 */
export const assignAgentToQuartier = (agentId, quartierId) => {
  return api.put(`/agents/${agentId}/quartier`, {
    quartierId,
  });
};
