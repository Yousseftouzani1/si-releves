import { useState, useEffect } from "react";
import { getLogs } from "../api/logs";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { Search, Clock, User, Globe, Calendar } from "lucide-react";
import "../styles/layout.css";

const Logs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const res = await getLogs();
                setLogs(res.data);
            } catch (err) {
                console.error("Erreur chargement logs", err);
                // Mock data
                setLogs([
                    { id: 1, utilisateur: { nom: "ADMIN", prenom: "Super" }, dateConnexion: "2024-12-18T14:30:00", ipAddress: "192.168.1.100" },
                    { id: 2, utilisateur: { nom: "TOUZANI", prenom: "Youssef" }, dateConnexion: "2024-12-18T10:15:00", ipAddress: "192.168.1.101" },
                    { id: 3, utilisateur: { nom: "ALAMI", prenom: "Mohammed" }, dateConnexion: "2024-12-17T16:45:00", ipAddress: "192.168.1.102" },
                    { id: 4, utilisateur: { nom: "BENALI", prenom: "Sara" }, dateConnexion: "2024-12-17T09:00:00", ipAddress: "192.168.1.103" },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);

    const filteredLogs = logs.filter(
        (log) =>
            log.utilisateur?.nom?.toLowerCase().includes(search.toLowerCase()) ||
            log.utilisateur?.prenom?.toLowerCase().includes(search.toLowerCase()) ||
            log.ipAddress?.includes(search)
    );

    const formatDate = (dateStr) => {
        if (!dateStr) return "-";
        const date = new Date(dateStr);
        return date.toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="app-container">
            <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

            <main className={`main-content ${sidebarCollapsed ? "main-content-expanded" : ""}`}>
                <Navbar title="Logs de Connexion" subtitle="Historique des accès au système" />

                <div className="page">
                    <div className="page-header">
                        <div>
                            <h1 className="page-title">Historique des Connexions</h1>
                            <p className="page-subtitle">{logs.length} connexions enregistrées</p>
                        </div>
                    </div>

                    {loading ? (
                        <Loader />
                    ) : (
                        <div className="data-table-container">
                            <div className="data-table-header">
                                <div className="data-table-search">
                                    <Search size={18} color="#64748b" />
                                    <input
                                        type="text"
                                        placeholder="Rechercher par nom ou IP..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>
                            </div>

                            {filteredLogs.length === 0 ? (
                                <div className="empty-state">
                                    <div className="empty-state-icon">
                                        <Clock size={32} />
                                    </div>
                                    <h3 className="empty-state-title">Aucun log trouvé</h3>
                                    <p className="empty-state-text">
                                        Aucune connexion ne correspond à votre recherche.
                                    </p>
                                </div>
                            ) : (
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Utilisateur</th>
                                            <th>Date de Connexion</th>
                                            <th>Adresse IP</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredLogs.map((log, index) => (
                                            <tr
                                                key={log.id}
                                                className="animate-slide-up"
                                                style={{ animationDelay: `${index * 0.05}s` }}
                                            >
                                                <td>
                                                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                                        <div
                                                            style={{
                                                                width: 40,
                                                                height: 40,
                                                                borderRadius: "50%",
                                                                background: "linear-gradient(135deg, var(--primary-500), var(--accent-cyan))",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                color: "white",
                                                                fontWeight: 600,
                                                                fontSize: "0.9rem",
                                                            }}
                                                        >
                                                            {log.utilisateur?.prenom?.[0]}{log.utilisateur?.nom?.[0]}
                                                        </div>
                                                        <div>
                                                            <div style={{ fontWeight: 600 }}>
                                                                {log.utilisateur?.prenom} {log.utilisateur?.nom}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                        <Calendar size={14} color="#64748b" />
                                                        {formatDate(log.dateConnexion)}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div
                                                        style={{
                                                            display: "inline-flex",
                                                            alignItems: "center",
                                                            gap: "6px",
                                                            padding: "6px 12px",
                                                            borderRadius: "20px",
                                                            background: "var(--bg-tertiary)",
                                                            fontFamily: "monospace",
                                                            fontSize: "0.85rem",
                                                        }}
                                                    >
                                                        <Globe size={14} color="#64748b" />
                                                        {log.ipAddress}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Logs;
