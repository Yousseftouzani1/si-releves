import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { getAgentById, assignAgentToQuartier } from "../api/agents";
import { getQuartiers } from "../api/quartiers";
import {
  ArrowLeft,
  User,
  Phone,
  MapPin,
  Save,
  Mail,
  Calendar,
  CheckCircle,
  Edit,
  Trash2
} from "lucide-react";
import "../styles/layout.css";

const AgentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [agent, setAgent] = useState(null);
  const [quartiers, setQuartiers] = useState([]);
  const [quartierId, setQuartierId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const agentRes = await getAgentById(id);
        setAgent(agentRes.data);
        setQuartierId(agentRes.data.quartier?.id || "");

        const quartiersRes = await getQuartiers();
        setQuartiers(quartiersRes.data);
      } catch (error) {
        console.error("Erreur chargement agent", error);
        // Mock data for demo
        setAgent({
          id: id,
          nom: "ALAMI",
          prenom: "Mohammed",
          telephonePersonnel: "0661234567",
          telephoneProfessionnel: "0522123456",
          quartier: { id: 1, nom: "Agdal" },
          dateCreation: "2024-01-15"
        });
        setQuartiers([
          { id: 1, nom: "Agdal" },
          { id: 2, nom: "Hay Riad" },
          { id: 3, nom: "Hassan" },
          { id: 4, nom: "Océan" },
        ]);
        setQuartierId(1);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAssignQuartier = async () => {
    if (!quartierId) return;

    setSaving(true);
    try {
      await assignAgentToQuartier(id, quartierId);
      setSuccessMessage("Quartier mis à jour avec succès !");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Erreur affectation quartier", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="app-container">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      <main className={`main-content ${sidebarCollapsed ? "main-content-expanded" : ""}`}>
        <Navbar title="Détail Agent" subtitle={agent ? `${agent.prenom} ${agent.nom}` : "Chargement..."} />

        <div className="page">
          {/* Back Button */}
          <div style={{ marginBottom: "24px" }}>
            <Link
              to="/agents"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "#94a3b8",
                textDecoration: "none",
                fontSize: "0.9rem",
                transition: "color 0.2s"
              }}
            >
              <ArrowLeft size={18} />
              Retour à la liste des agents
            </Link>
          </div>

          {loading ? (
            <Loader />
          ) : agent ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              {/* Agent Info Card */}
              <div className="card animate-slide-up">
                <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "32px" }}>
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: "20px",
                      background: "linear-gradient(135deg, var(--accent-purple), var(--accent-pink))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "1.75rem",
                      fontWeight: 700,
                    }}
                  >
                    {agent.prenom?.[0]}{agent.nom?.[0]}
                  </div>
                  <div>
                    <h2 style={{ fontSize: "1.5rem", marginBottom: "4px" }}>
                      {agent.prenom} {agent.nom}
                    </h2>
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      background: "rgba(16, 185, 129, 0.1)",
                      color: "#10b981",
                      fontSize: "0.8rem"
                    }}>
                      <User size={14} />
                      Agent Releveur
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px", background: "var(--bg-tertiary)", borderRadius: "10px" }}>
                    <Phone size={20} color="#3b82f6" />
                    <div>
                      <div style={{ fontSize: "0.8rem", color: "#64748b" }}>Téléphone Personnel</div>
                      <div style={{ fontWeight: 600, fontFamily: "monospace" }}>{agent.telephonePersonnel || "Non renseigné"}</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px", background: "var(--bg-tertiary)", borderRadius: "10px" }}>
                    <Phone size={20} color="#8b5cf6" />
                    <div>
                      <div style={{ fontSize: "0.8rem", color: "#64748b" }}>Téléphone Professionnel</div>
                      <div style={{ fontWeight: 600, fontFamily: "monospace" }}>{agent.telephoneProfessionnel || "Non renseigné"}</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px", background: "var(--bg-tertiary)", borderRadius: "10px" }}>
                    <MapPin size={20} color="#10b981" />
                    <div>
                      <div style={{ fontSize: "0.8rem", color: "#64748b" }}>Quartier Affecté</div>
                      <div style={{ fontWeight: 600 }}>{agent.quartier?.nom || "Non affecté"}</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px", background: "var(--bg-tertiary)", borderRadius: "10px" }}>
                    <Calendar size={20} color="#f97316" />
                    <div>
                      <div style={{ fontSize: "0.8rem", color: "#64748b" }}>ID Agent</div>
                      <div style={{ fontWeight: 600 }}>#{agent.id}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Card */}
              <div className="card animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <h3 style={{ marginBottom: "24px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <MapPin size={20} color="var(--primary-400)" />
                  Affectation Quartier
                </h3>

                {successMessage && (
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "14px 16px",
                    borderRadius: "10px",
                    marginBottom: "20px",
                    background: "rgba(16, 185, 129, 0.1)",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    color: "#10b981",
                  }}>
                    <CheckCircle size={18} />
                    {successMessage}
                  </div>
                )}

                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "8px", color: "#94a3b8", fontSize: "0.9rem" }}>
                    Sélectionner un quartier
                  </label>
                  <select
                    value={quartierId}
                    onChange={(e) => setQuartierId(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      borderRadius: "10px",
                      background: "var(--bg-tertiary)",
                      border: "1px solid var(--border-color)",
                      color: "var(--text-primary)",
                      fontSize: "0.95rem"
                    }}
                  >
                    <option value="">-- Sélectionner un quartier --</option>
                    {quartiers.map((q) => (
                      <option key={q.id} value={q.id}>
                        {q.nom}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleAssignQuartier}
                  disabled={saving || !quartierId}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    opacity: saving || !quartierId ? 0.6 : 1,
                  }}
                >
                  <Save size={18} />
                  {saving ? "Enregistrement..." : "Enregistrer l'affectation"}
                </button>

                <hr style={{ margin: "24px 0", borderColor: "var(--border-color)" }} />

                <h3 style={{ marginBottom: "16px" }}>Actions rapides</h3>
                <div style={{ display: "flex", gap: "12px" }}>
                  <button
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      background: "var(--bg-tertiary)",
                      boxShadow: "none"
                    }}
                  >
                    <Edit size={16} />
                    Modifier
                  </button>
                  <button
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      background: "rgba(239, 68, 68, 0.1)",
                      color: "#ef4444",
                      boxShadow: "none"
                    }}
                  >
                    <Trash2 size={16} />
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">
                <User size={32} />
              </div>
              <h3 className="empty-state-title">Agent introuvable</h3>
              <p className="empty-state-text">
                L'agent demandé n'existe pas ou a été supprimé.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AgentDetail;
