import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCompteurs } from "../api/compteurs";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { Plus, Search, Gauge, Droplets, Zap, Eye, MapPin } from "lucide-react";
import "../styles/layout.css";

const Compteurs = () => {
  const [compteurs, setCompteurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const fetchCompteurs = async () => {
      try {
        const res = await getCompteurs();
        setCompteurs(res.data);
      } catch (err) {
        console.error("Erreur chargement compteurs", err);
        // Mock data
        setCompteurs([
          { id: 1, numero: "000000001", type: "EAU", indexActuel: 1234.5, adresse: { rue: "123 Av. Mohammed V", ville: "Rabat" } },
          { id: 2, numero: "000000002", type: "ELECTRICITE", indexActuel: 5678.9, adresse: { rue: "45 Rue Hassan II", ville: "Rabat" } },
          { id: 3, numero: "000000003", type: "EAU", indexActuel: 987.2, adresse: { rue: "78 Bd Zerktouni", ville: "Rabat" } },
          { id: 4, numero: "000000004", type: "ELECTRICITE", indexActuel: 2345.6, adresse: { rue: "12 Av. Fal Ould Oumeir", ville: "Rabat" } },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchCompteurs();
  }, []);

  const filteredCompteurs = compteurs.filter(
    (c) =>
      c.numero?.includes(search) ||
      c.type?.toLowerCase().includes(search.toLowerCase())
  );

  const getTypeIcon = (type) => {
    return type === "EAU" ? Droplets : Zap;
  };

  const getTypeColor = (type) => {
    return type === "EAU" ? "#06b6d4" : "#f97316";
  };

  return (
    <div className="app-container">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      <main className={`main-content ${sidebarCollapsed ? "main-content-expanded" : ""}`}>
        <Navbar title="Compteurs" subtitle="Gestion des compteurs eau et électricité" />

        <div className="page">
          <div className="page-header">
            <div>
              <h1 className="page-title">Liste des Compteurs</h1>
              <p className="page-subtitle">{compteurs.length} compteurs au total</p>
            </div>
            <Link to="/compteurs/nouveau">
              <button className="btn-primary">
                <Plus size={18} />
                Nouveau Compteur
              </button>
            </Link>
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
                    placeholder="Rechercher par numéro ou type..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              {filteredCompteurs.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">
                    <Gauge size={32} />
                  </div>
                  <h3 className="empty-state-title">Aucun compteur trouvé</h3>
                  <p className="empty-state-text">
                    Aucun compteur ne correspond à votre recherche.
                  </p>
                </div>
              ) : (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Numéro</th>
                      <th>Type</th>
                      <th>Index Actuel</th>
                      <th>Adresse</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCompteurs.map((compteur, index) => {
                      const TypeIcon = getTypeIcon(compteur.type);
                      const typeColor = getTypeColor(compteur.type);

                      return (
                        <tr
                          key={compteur.id}
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
                                  background: `${typeColor}20`,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <TypeIcon size={20} color={typeColor} />
                              </div>
                              <div>
                                <div style={{ fontWeight: 600, fontFamily: "monospace" }}>
                                  {compteur.numero}
                                </div>
                                <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                                  ID: {compteur.id}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                padding: "6px 12px",
                                borderRadius: "20px",
                                fontSize: "0.8rem",
                                fontWeight: 500,
                                background: `${typeColor}20`,
                                color: typeColor,
                              }}
                            >
                              <TypeIcon size={14} />
                              {compteur.type}
                            </span>
                          </td>
                          <td>
                            <span style={{ fontWeight: 600 }}>
                              {compteur.indexActuel?.toLocaleString()}
                            </span>
                            <span style={{ color: "#64748b", marginLeft: "4px" }}>
                              {compteur.type === "EAU" ? "m³" : "kWh"}
                            </span>
                          </td>
                          <td>
                            {compteur.adresse ? (
                              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <MapPin size={14} color="#64748b" />
                                <span>{compteur.adresse.rue}, {compteur.adresse.ville}</span>
                              </div>
                            ) : (
                              <span style={{ color: "#64748b" }}>-</span>
                            )}
                          </td>
                          <td>
                            <Link to={`/compteurs/${compteur.id}`}>
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
                      );
                    })}
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

export default Compteurs;
