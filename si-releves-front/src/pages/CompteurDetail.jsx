import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { getCompteurById } from "../api/compteurs";
import {
  ArrowLeft,
  Gauge,
  Droplets,
  Zap,
  MapPin,
  Calendar,
  Edit,
  Trash2,
  FileText,
  TrendingUp,
  Activity
} from "lucide-react";
import "../styles/layout.css";

const CompteurDetail = () => {
  const { id } = useParams();

  const [compteur, setCompteur] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCompteurById(id);
        setCompteur(res.data);
      } catch (error) {
        console.error("Erreur chargement compteur", error);
        // Mock data for demo
        setCompteur({
          id: id,
          numero: "000000001",
          type: "EAU",
          indexActuel: 1234.5,
          adresse: {
            rue: "123 Av. Mohammed V",
            ville: "Rabat",
            codePostal: "10000"
          },
          dateCreation: "2024-01-10",
          dernierReleve: "2024-12-15",
          consommationMoyenne: 45.2
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const isEau = compteur?.type === "EAU";
  const typeColor = isEau ? "#06b6d4" : "#f97316";
  const TypeIcon = isEau ? Droplets : Zap;

  return (
    <div className="app-container">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      <main className={`main-content ${sidebarCollapsed ? "main-content-expanded" : ""}`}>
        <Navbar title="Détail Compteur" subtitle={compteur ? `#${compteur.numero}` : "Chargement..."} />

        <div className="page">
          {/* Back Button */}
          <div style={{ marginBottom: "24px" }}>
            <Link
              to="/compteurs"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "#94a3b8",
                textDecoration: "none",
                fontSize: "0.9rem"
              }}
            >
              <ArrowLeft size={18} />
              Retour à la liste des compteurs
            </Link>
          </div>

          {loading ? (
            <Loader />
          ) : compteur ? (
            <>
              {/* Header Card */}
              <div
                className="card animate-slide-up"
                style={{
                  marginBottom: "24px",
                  background: `linear-gradient(135deg, ${typeColor}10, ${typeColor}05)`,
                  borderColor: `${typeColor}30`
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <div
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: "20px",
                        background: `${typeColor}20`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <TypeIcon size={40} color={typeColor} />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.9rem", color: "#64748b", marginBottom: "4px" }}>Compteur</div>
                      <h2 style={{ fontSize: "1.75rem", fontFamily: "monospace", marginBottom: "8px" }}>
                        {compteur.numero}
                      </h2>
                      <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "6px 14px",
                        borderRadius: "20px",
                        background: `${typeColor}20`,
                        color: typeColor,
                        fontSize: "0.85rem",
                        fontWeight: 500
                      }}>
                        <TypeIcon size={16} />
                        {compteur.type}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "12px" }}>
                    <button style={{ background: "var(--bg-tertiary)", boxShadow: "none" }}>
                      <Edit size={18} />
                      Modifier
                    </button>
                    <button style={{ background: "rgba(239, 68, 68, 0.1)", color: "#ef4444", boxShadow: "none" }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
                <div className="card animate-slide-up" style={{ animationDelay: "0.05s", textAlign: "center" }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: "12px",
                    background: `${typeColor}15`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 12px"
                  }}>
                    <Gauge size={24} color={typeColor} />
                  </div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700 }}>{compteur.indexActuel?.toLocaleString()}</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b" }}>Index Actuel ({isEau ? "m³" : "kWh"})</div>
                </div>

                <div className="card animate-slide-up" style={{ animationDelay: "0.1s", textAlign: "center" }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: "12px",
                    background: "rgba(16, 185, 129, 0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 12px"
                  }}>
                    <TrendingUp size={24} color="#10b981" />
                  </div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700 }}>{compteur.consommationMoyenne || 0}</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b" }}>Conso. Moyenne</div>
                </div>

                <div className="card animate-slide-up" style={{ animationDelay: "0.15s", textAlign: "center" }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: "12px",
                    background: "rgba(139, 92, 246, 0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 12px"
                  }}>
                    <FileText size={24} color="#8b5cf6" />
                  </div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700 }}>24</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b" }}>Relevés Totaux</div>
                </div>

                <div className="card animate-slide-up" style={{ animationDelay: "0.2s", textAlign: "center" }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: "12px",
                    background: "rgba(59, 130, 246, 0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 12px"
                  }}>
                    <Activity size={24} color="#3b82f6" />
                  </div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700 }}>Actif</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b" }}>Statut</div>
                </div>
              </div>

              {/* Details Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                <div className="card animate-slide-up" style={{ animationDelay: "0.25s" }}>
                  <h3 style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                    <MapPin size={20} color="var(--primary-400)" />
                    Adresse
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ padding: "14px", background: "var(--bg-tertiary)", borderRadius: "10px" }}>
                      <div style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "4px" }}>Rue</div>
                      <div style={{ fontWeight: 600 }}>{compteur.adresse?.rue || "Non renseigné"}</div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <div style={{ padding: "14px", background: "var(--bg-tertiary)", borderRadius: "10px" }}>
                        <div style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "4px" }}>Ville</div>
                        <div style={{ fontWeight: 600 }}>{compteur.adresse?.ville || "Rabat"}</div>
                      </div>
                      <div style={{ padding: "14px", background: "var(--bg-tertiary)", borderRadius: "10px" }}>
                        <div style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "4px" }}>Code Postal</div>
                        <div style={{ fontWeight: 600 }}>{compteur.adresse?.codePostal || "10000"}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card animate-slide-up" style={{ animationDelay: "0.3s" }}>
                  <h3 style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                    <Calendar size={20} color="var(--primary-400)" />
                    Informations
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ padding: "14px", background: "var(--bg-tertiary)", borderRadius: "10px" }}>
                      <div style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "4px" }}>ID Compteur</div>
                      <div style={{ fontWeight: 600 }}>#{compteur.id}</div>
                    </div>
                    <div style={{ padding: "14px", background: "var(--bg-tertiary)", borderRadius: "10px" }}>
                      <div style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "4px" }}>Dernier Relevé</div>
                      <div style={{ fontWeight: 600 }}>{compteur.dernierReleve || "15 Déc 2024"}</div>
                    </div>
                    <div style={{ padding: "14px", background: "var(--bg-tertiary)", borderRadius: "10px" }}>
                      <div style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "4px" }}>Date Création</div>
                      <div style={{ fontWeight: 600 }}>{compteur.dateCreation || "10 Jan 2024"}</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">
                <Gauge size={32} />
              </div>
              <h3 className="empty-state-title">Compteur introuvable</h3>
              <p className="empty-state-text">
                Le compteur demandé n'existe pas ou a été supprimé.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CompteurDetail;
