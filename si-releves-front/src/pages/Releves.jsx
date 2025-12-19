import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getReleves } from "../api/releves";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { Search, FileText, Calendar, Eye, TrendingUp } from "lucide-react";
import "../styles/layout.css";

const Releves = () => {
  const [releves, setReleves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const fetchReleves = async () => {
      try {
        const res = await getReleves();
        setReleves(res.data);
      } catch (err) {
        console.error("Erreur chargement relevés", err);
        // Mock data
        setReleves([
          { id: 1, compteur: { numero: "000000001", type: "EAU" }, ancienIndex: 1200, nouvelIndex: 1234.5, consommation: 34.5, dateReleve: "2024-12-15" },
          { id: 2, compteur: { numero: "000000002", type: "ELECTRICITE" }, ancienIndex: 5600, nouvelIndex: 5678.9, consommation: 78.9, dateReleve: "2024-12-14" },
          { id: 3, compteur: { numero: "000000003", type: "EAU" }, ancienIndex: 950, nouvelIndex: 987.2, consommation: 37.2, dateReleve: "2024-12-13" },
          { id: 4, compteur: { numero: "000000004", type: "ELECTRICITE" }, ancienIndex: 2300, nouvelIndex: 2345.6, consommation: 45.6, dateReleve: "2024-12-12" },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchReleves();
  }, []);

  const filteredReleves = releves.filter((r) =>
    r.compteur?.numero?.includes(search)
  );

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="app-container">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      <main className={`main-content ${sidebarCollapsed ? "main-content-expanded" : ""}`}>
        <Navbar title="Relevés" subtitle="Historique des relevés de compteurs" />

        <div className="page">
          <div className="page-header">
            <div>
              <h1 className="page-title">Liste des Relevés</h1>
              <p className="page-subtitle">{releves.length} relevés au total</p>
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
                    placeholder="Rechercher par numéro de compteur..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              {filteredReleves.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">
                    <FileText size={32} />
                  </div>
                  <h3 className="empty-state-title">Aucun relevé trouvé</h3>
                  <p className="empty-state-text">
                    Aucun relevé ne correspond à votre recherche.
                  </p>
                </div>
              ) : (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Compteur</th>
                      <th>Ancien Index</th>
                      <th>Nouvel Index</th>
                      <th>Consommation</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReleves.map((releve, index) => (
                      <tr
                        key={releve.id}
                        className="animate-slide-up"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <div
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: "10px",
                                background: releve.compteur?.type === "EAU" ? "rgba(6, 182, 212, 0.1)" : "rgba(249, 115, 22, 0.1)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <FileText size={18} color={releve.compteur?.type === "EAU" ? "#06b6d4" : "#f97316"} />
                            </div>
                            <div>
                              <div style={{ fontWeight: 600, fontFamily: "monospace" }}>
                                {releve.compteur?.numero || "-"}
                              </div>
                              <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                                {releve.compteur?.type || "N/A"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span style={{ fontFamily: "monospace" }}>
                            {releve.ancienIndex?.toLocaleString()}
                          </span>
                        </td>
                        <td>
                          <span style={{ fontFamily: "monospace", fontWeight: 600 }}>
                            {releve.nouvelIndex?.toLocaleString()}
                          </span>
                        </td>
                        <td>
                          <div
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              padding: "6px 12px",
                              borderRadius: "20px",
                              background: "rgba(16, 185, 129, 0.1)",
                              color: "#10b981",
                              fontWeight: 600,
                            }}
                          >
                            <TrendingUp size={14} />
                            {releve.consommation?.toFixed(1)}
                          </div>
                        </td>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <Calendar size={14} color="#64748b" />
                            {formatDate(releve.dateReleve)}
                          </div>
                        </td>
                        <td>
                          <Link to={`/releves/${releve.id}`}>
                            <button
                              style={{
                                padding: "8px 12px",
                                fontSize: "0.8rem",
                                background: "var(--bg-tertiary)",
                                boxShadow: "none",
                              }}
                            >
                              <Eye size={14} />
                              Voir
                            </button>
                          </Link>
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

export default Releves;
