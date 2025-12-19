import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../api/auth";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Lock, KeyRound, CheckCircle, AlertCircle } from "lucide-react";
import "../styles/layout.css";

const ChangePassword = () => {
  const [ancienMotDePasse, setAncienMotDePasse] = useState("");
  const [nouveauMotDePasse, setNouveauMotDePasse] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (nouveauMotDePasse !== confirmation) {
      setMessage({ type: "error", text: "Les mots de passe ne correspondent pas." });
      return;
    }

    if (nouveauMotDePasse.length < 6) {
      setMessage({ type: "error", text: "Le mot de passe doit contenir au moins 6 caractères." });
      return;
    }

    setLoading(true);
    try {
      await changePassword(ancienMotDePasse, nouveauMotDePasse);
      setMessage({ type: "success", text: "Mot de passe modifié avec succès !" });
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      setMessage({ type: "error", text: "Erreur lors du changement de mot de passe." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      <main className={`main-content ${sidebarCollapsed ? "main-content-expanded" : ""}`}>
        <Navbar title="Mot de passe" subtitle="Modifier votre mot de passe" />

        <div className="page">
          <div style={{ maxWidth: "500px" }}>
            <div className="card animate-slide-up">
              <div style={{ textAlign: "center", marginBottom: "32px" }}>
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    background: "linear-gradient(135deg, var(--primary-500), var(--accent-cyan))",
                    borderRadius: "16px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16px",
                    boxShadow: "0 8px 20px rgba(59, 130, 246, 0.3)",
                  }}
                >
                  <KeyRound size={28} color="white" />
                </div>
                <h2 style={{ fontSize: "1.25rem", marginBottom: "4px" }}>
                  Changer le mot de passe
                </h2>
                <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
                  Entrez votre ancien mot de passe et choisissez un nouveau
                </p>
              </div>

              {message.text && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "14px 16px",
                    borderRadius: "10px",
                    marginBottom: "24px",
                    background: message.type === "success" ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
                    border: `1px solid ${message.type === "success" ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.3)"}`,
                    color: message.type === "success" ? "#10b981" : "#ef4444",
                  }}
                >
                  {message.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                  <span style={{ fontSize: "0.9rem" }}>{message.text}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                  <label>Ancien mot de passe</label>
                  <div style={{ position: "relative" }}>
                    <Lock
                      size={18}
                      style={{
                        position: "absolute",
                        left: "14px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#64748b",
                      }}
                    />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={ancienMotDePasse}
                      onChange={(e) => setAncienMotDePasse(e.target.value)}
                      required
                      style={{ paddingLeft: "44px" }}
                    />
                  </div>
                </div>

                <div>
                  <label>Nouveau mot de passe</label>
                  <div style={{ position: "relative" }}>
                    <Lock
                      size={18}
                      style={{
                        position: "absolute",
                        left: "14px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#64748b",
                      }}
                    />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={nouveauMotDePasse}
                      onChange={(e) => setNouveauMotDePasse(e.target.value)}
                      required
                      style={{ paddingLeft: "44px" }}
                    />
                  </div>
                </div>

                <div>
                  <label>Confirmer le nouveau mot de passe</label>
                  <div style={{ position: "relative" }}>
                    <Lock
                      size={18}
                      style={{
                        position: "absolute",
                        left: "14px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#64748b",
                      }}
                    />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={confirmation}
                      onChange={(e) => setConfirmation(e.target.value)}
                      required
                      style={{ paddingLeft: "44px" }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{ marginTop: "8px" }}
                >
                  {loading ? "Modification..." : "Modifier le mot de passe"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChangePassword;
