import api from "./axios";

/**
 * 📋 Liste tous les logs de connexion (Admin)
 */
export const getLogs = () => {
    return api.get("/admin/logs");
};
