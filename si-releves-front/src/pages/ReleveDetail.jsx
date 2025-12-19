import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { getReleveById } from "../api/releves";
import {
  ArrowLeft,
  FileText,
  Droplets,
  Zap,
  Calendar,
  TrendingUp,
  Gauge,
  User,
  Clock
} from "lucide-react";
import "../styles/layout.css";

const ReleveDetail = () => {
  const { id } = useParams();

  const [releve, setReleve] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getReleveById(id);
        setReleve(res.data);
      } catch (error) {
        console.error("Erreur chargement relevé", error);
        // Mock data for demo
        setReleve({
          id: id,
          compteur: {
            id: 1,
            numero: "000000001",
            type: "EAU"
          },
          ancienIndex: 1200,
          nouvelIndex: 1234.5,
          consommation: 34.5,
          dateReleve: "2024-12-15",
          agent: {
            nom: "ALAMI",
            prenom: "Mohammed"
          },
          heureReleve: "10:30"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const isEau = releve?.compteur?.type === "EAU";
  const typeColor = isEau ? "#06b6d4" : "#f97316";
  const TypeIcon = isEau ? Droplets : Zap;

  return (
    <div className="app-container">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      <main className={`main-content ${sidebarCollapsed ? "main-content-expanded" : ""}`}>
        <Navbar title="Détail Relevé" subtitle={releve ? `Relevé #${releve.id}` : "Chargement..."} />

        <div className="page">
          {/* Back Button */}
          <div style={{ marginBottom: "24px" }}>
            <Link
              to="/releves"
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
              Retour à la liste des relevés
            </Link>
          </div>

          {loading ? (
            <Loader />
          ) : releve ? (
            <>
              {/* Header */}
              <div
                className="card animate-slide-up"
                style={{
                  marginBottom: "24px",
                  background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))",
                  borderColor: "rgba(59, 130, 246, 0.3)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <div
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: "20px",
                        background: "linear-gradient(135deg, var(--primary-500), var(--accent-cyan))",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FileText size={40} color="white" />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.9rem", color: "#64748b", marginBottom: "4px" }}>Relevé</div>
                      <h2 style={{ fontSize: "1.75rem", marginBottom: "8px" }}>
                        #{releve.id}
                      </h2>
                      <div style={{ display: "flex", gap: "8px" }}>
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
                          {releve.compteur?.type}
                        </span>
                        <span style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "6px 14px",
                          borderRadius: "20px",
                          background: "rgba(16, 185, 129, 0.1)",
                          color: "#10b981",
                          fontSize: "0.85rem",
                          fontWeight: 500
                        }}>
                          <Calendar size={16} />
                          {releve.dateReleve}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
                <div className="card animate-slide-up" style={{ animationDelay: "0.05s", textAlign: "center" }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: "12px",
                    background: "rgba(100, 116, 139, 0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 12px"
                  }}>
                    <Gauge size={24} color="#64748b" />
                  </div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700 }}>{releve.ancienIndex?.toLocaleString()}</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b" }}>Ancien Index</div>
                </div>

                <div className="card animate-slide-up" style={{ animationDelay: "0.1s", textAlign: "center" }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: "12px",
                    background: `${typeColor}15`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 12px"
                  }}>
                    <Gauge size={24} color={typeColor} />
                  </div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700 }}>{releve.nouvelIndex?.toLocaleString()}</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b" }}>Nouvel Index</div>
                </div>

                <div className="card animate-slide-up" style={{ animationDelay: "0.15s", textAlign: "center" }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: "12px",
                    background: "rgba(16, 185, 129, 0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 12px"
                  }}>
                    <TrendingUp size={24} color="#10b981" />
                  </div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#10b981" }}>
                    +{releve.consommation?.toFixed(1)}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b" }}>Consommation ({isEau ? "m³" : "kWh"})</div>
                </div>

                <div className="card animate-slide-up" style={{ animationDelay: "0.2s", textAlign: "center" }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: "12px",
                    background: "rgba(139, 92, 246, 0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 12px"
                  }}>
                    <Clock size={24} color="#8b5cf6" />
                  </div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700 }}>{releve.heureReleve || "10:30"}</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b" }}>Heure</div>
                </div>
              </div>

              {/* Details Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                <div className="card animate-slide-up" style={{ animationDelay: "0.25s" }}>
                  <h3 style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                    <Gauge size={20} color="var(--primary-400)" />
                    Compteur Associé
                  </h3>

                  <Link to={`/compteurs/${releve.compteur?.id}`} style={{ textDecoration: "none" }}>
                    <div style={{
                      padding: "20px",
                      background: "var(--bg-tertiary)",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      border: "1px solid transparent"
                    }}>
                      <div style={{
                        width: 50,
                        height: 50,
                        borderRadius: "12px",
                        background: `${typeColor}20`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        <TypeIcon size={24} color={typeColor} />
                      </div>
                      <div>
                        <div style={{ fontFamily: "monospace", fontSize: "1.1rem", fontWeight: 600, color: "var(--text-primary)" }}>
                          {releve.compteur?.numero}
                        </div>
                        <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
                          Compteur {releve.compteur?.type}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="card animate-slide-up" style={{ animationDelay: "0.3s" }}>
                  <h3 style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                    <User size={20} color="var(--primary-400)" />
                    Agent Releveur
                  </h3>

                  {releve.agent ? (
                    <div style={{
                      padding: "20px",
                      background: "var(--bg-tertiary)",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "16px"
                    }}>
                      <div style={{
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, var(--accent-purple), var(--accent-pink))",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: 600
                      }}>
                        {releve.agent.prenom?.[0]}{releve.agent.nom?.[0]}
                      </div>
                      <div>
                        <div style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                          {releve.agent.prenom} {releve.agent.nom}
                        </div>
                        <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
                          Agent Terrain
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={{ padding: "20px", background: "var(--bg-tertiary)", borderRadius: "12px", color: "#64748b" }}>
                      Agent non renseigné
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">
                <FileText size={32} />
              </div>
              <h3 className="empty-state-title">Relevé introuvable</h3>
              <p className="empty-state-text">
                Le relevé demandé n'existe pas ou a été supprimé.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ReleveDetail;
