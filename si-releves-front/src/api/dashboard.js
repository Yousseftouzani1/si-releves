import api from "./axios";

/**
 * 📈 Récupérer les KPIs du dashboard
 */
export const getDashboardKpis = () => {
  return api.get("/dashboard/kpis");
};

/**
 * 📉 Évolution de la consommation (eau / électricité)
 * Paramètres optionnels :
 * - type : EAU | ELECTRICITE
 * - annee
 */
export const getConsommationStats = (params = {}) => {
  return api.get("/statistiques/consommation", { params });
};

/**
 * 📊 Statistiques d’un agent
 * @param {number} agentId
 */
export const getAgentStats = (agentId) => {
  return api.get(`/statistiques/agents/${agentId}`);
};
