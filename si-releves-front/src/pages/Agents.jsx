import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAgents } from "../api/agents";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { Plus, Search, User, Phone, MapPin, Eye } from "lucide-react";
import "../styles/layout.css";

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await getAgents();
        setAgents(res.data);
      } catch (err) {
        console.error("Erreur chargement agents", err);
        // Mock data
        setAgents([
          { id: 1, nom: "ALAMI", prenom: "Mohammed", telephonePersonnel: "0661234567", telephoneProfessionnel: "0522123456", quartier: { nom: "Agdal" } },
          { id: 2, nom: "BENNANI", prenom: "Fatima", telephonePersonnel: "0662345678", telephoneProfessionnel: "0522234567", quartier: { nom: "Hay Riad" } },
          { id: 3, nom: "CHRAIBI", prenom: "Ahmed", telephonePersonnel: "0663456789", telephoneProfessionnel: "0522345678", quartier: { nom: "Hassan" } },
          { id: 4, nom: "DOUIRI", prenom: "Sara", telephonePersonnel: "0664567890", telephoneProfessionnel: "0522456789", quartier: { nom: "Souissi" } },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchAgents();
  }, []);

  const filteredAgents = agents.filter(
    (agent) =>
      agent.nom?.toLowerCase().includes(search.toLowerCase()) ||
      agent.prenom?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-container">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      <main className={`main-content ${sidebarCollapsed ? "main-content-expanded" : ""}`}>
        <Navbar title="Agents" subtitle="Gestion des agents releveurs" />

        <div className="page">
          <div className="page-header">
            <div>
              <h1 className="page-title">Liste des Agents</h1>
              <p className="page-subtitle">{agents.length} agents au total</p>
            </div>
            <Link to="/agents/nouveau">
              <button className="btn-primary">
                <Plus size={18} />
                Nouvel Agent
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
                    placeholder="Rechercher un agent..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              {filteredAgents.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">
                    <User size={32} />
                  </div>
                  <h3 className="empty-state-title">Aucun agent trouvé</h3>
                  <p className="empty-state-text">
                    Aucun agent ne correspond à votre recherche.
                  </p>
                </div>
              ) : (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Agent</th>
                      <th>Quartier</th>
                      <th>Tél. Personnel</th>
                      <th>Tél. Professionnel</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAgents.map((agent, index) => (
                      <tr
                        key={agent.id}
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
                                background: "linear-gradient(135deg, var(--accent-purple), var(--accent-pink))",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "white",
                                fontWeight: 600,
                                fontSize: "0.9rem",
                              }}
                            >
                              {agent.prenom?.[0]}{agent.nom?.[0]}
                            </div>
                            <div>
                              <div style={{ fontWeight: 600 }}>
                                {agent.prenom} {agent.nom}
                              </div>
                              <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                                ID: {agent.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          {agent.quartier ? (
                            <div style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              padding: "6px 12px",
                              background: "rgba(16, 185, 129, 0.1)",
                              borderRadius: "20px",
                              color: "#10b981",
                              fontSize: "0.85rem"
                            }}>
                              <MapPin size={14} />
                              {agent.quartier.nom}
                            </div>
                          ) : (
                            <span style={{ color: "#64748b" }}>Non affecté</span>
                          )}
                        </td>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <Phone size={14} color="#64748b" />
                            {agent.telephonePersonnel || "-"}
                          </div>
                        </td>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <Phone size={14} color="#64748b" />
                            {agent.telephoneProfessionnel || "-"}
                          </div>
                        </td>
                        <td>
                          <Link to={`/agents/${agent.id}`}>
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

export default Agents;
