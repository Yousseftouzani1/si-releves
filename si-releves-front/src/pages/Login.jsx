import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, ArrowRight, Loader2, Shield, User, Users, Activity, Droplets, Zap, Sparkles, UserPlus } from "lucide-react";
import "../index.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const testCredentials = [
    {
      role: "SUPERADMIN",
      label: "Super Admin",
      icon: Shield,
      color: "#8b5cf6",
      email: "superadmin@ree.ma",
      password: "Admin123!",
      description: "Accès complet + Gestion",
    },
    {
      role: "UTILISATEUR",
      label: "Utilisateur",
      icon: User,
      color: "#3b82f6",
      email: "youssef@ree.ma",
      password: "User123!",
      description: "Lecture des données",
    },
    {
      role: "AGENT",
      label: "Agent",
      icon: Users,
      color: "#10b981",
      email: "agent@ree.ma",
      password: "Agent123!",
      description: "Saisie terrain",
    },
  ];

  const handleQuickLogin = (cred) => {
    setEmail(cred.email);
    setMotDePasse(cred.password);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, motDePasse);
      navigate("/dashboard");
    } catch (err) {
      if (err.response?.status === 403) {
        setError("Compte en attente d'approbation par un administrateur");
      } else {
        setError("Email ou mot de passe incorrect");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={styles.bgPattern}></div>
      <div style={styles.bgGlow1}></div>
      <div style={styles.bgGlow2}></div>

      {/* Main Content - Side by side layout */}
      <div style={styles.mainContent}>
        {/* Login Card */}
        <div style={styles.card} className="animate-slide-up">
          {/* EnergiFlow Logo */}
          <div style={styles.logoSection}>
            <div style={styles.logoContainer}>
              <div style={styles.logoIconOuter}>
                <div style={styles.logoIconInner}>
                  <Activity size={36} color="white" strokeWidth={2.5} />
                </div>
                <div style={styles.orbit}>
                  <div style={styles.orbitDot1}><Droplets size={14} /></div>
                  <div style={styles.orbitDot2}><Zap size={14} /></div>
                </div>
              </div>
            </div>

            <h1 style={styles.logoTitle}>
              <span style={styles.logoEnergy}>Energi</span>
              <span style={styles.logoFlow}>Flow</span>
            </h1>

            <p style={styles.logoSubtitle}>
              <Sparkles size={14} style={{ marginRight: "6px" }} />
              Système de Gestion des Relevés
            </p>

            <div style={styles.logoBadges}>
              <span style={styles.badgeWater}><Droplets size={12} /> Eau</span>
              <span style={styles.badgeElec}><Zap size={12} /> Électricité</span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div style={styles.error}>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email</label>
              <div style={styles.inputWrapper}>
                <Mail size={18} style={styles.inputIcon} />
                <input
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Mot de passe</label>
              <div style={styles.inputWrapper}>
                <Lock size={18} style={styles.inputIcon} />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={motDePasse}
                  onChange={(e) => setMotDePasse(e.target.value)}
                  required
                  style={styles.input}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1 }}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Connexion...
                </>
              ) : (
                <>
                  Se connecter
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Signup Link */}
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
              Pas encore de compte ?{" "}
              <Link to="/signup" style={{ color: "#10b981", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <UserPlus size={14} />
                S'inscrire
              </Link>
            </span>
          </div>
        </div>

        {/* Test Credentials - Side panel */}
        <div style={styles.credentialsSection}>
          <h3 style={styles.credentialsTitle}>🧪 Comptes de Test</h3>
          <p style={styles.credentialsSubtitle}>Cliquez pour auto-remplir</p>

          <div style={styles.credentialsGrid}>
            {testCredentials.map((cred, index) => (
              <div
                key={cred.role}
                onClick={() => handleQuickLogin(cred)}
                className="animate-slide-up"
                style={{
                  ...styles.credCard,
                  animationDelay: `${index * 0.1}s`,
                  borderColor: cred.color + "40",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = cred.color + "80";
                  e.currentTarget.style.boxShadow = `0 8px 24px ${cred.color}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = cred.color + "40";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={styles.credCardHeader}>
                  <div style={{ ...styles.credCardIcon, background: cred.color + "20" }}>
                    <cred.icon size={18} color={cred.color} />
                  </div>
                  <div>
                    <div style={{ ...styles.credCardRole, color: cred.color }}>{cred.label}</div>
                    <div style={styles.credCardDesc}>{cred.description}</div>
                  </div>
                </div>

                <div style={styles.credCardBody}>
                  <div style={styles.credLine}>
                    <Mail size={12} color="var(--text-muted)" />
                    <code style={styles.credCode}>{cred.email}</code>
                  </div>
                  <div style={styles.credLine}>
                    <Lock size={12} color="var(--text-muted)" />
                    <code style={styles.credCode}>{cred.password}</code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        © 2024 EnergiFlow • Rabat Énergie & Eau
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
    background: "var(--bg-primary)",
  },
  bgPattern: {
    position: "absolute",
    inset: 0,
    background: `
      radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)
    `,
    pointerEvents: "none",
  },
  bgGlow1: {
    position: "absolute",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
    top: "-150px",
    right: "-150px",
    pointerEvents: "none",
  },
  bgGlow2: {
    position: "absolute",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)",
    bottom: "-100px",
    left: "-100px",
    pointerEvents: "none",
  },
  mainContent: {
    display: "flex",
    flexDirection: "row",
    gap: "40px",
    alignItems: "stretch",
    justifyContent: "center",
    zIndex: 10,
  },
  card: {
    width: "380px",
    background: "var(--bg-secondary)",
    border: "1px solid var(--border-color)",
    borderRadius: "24px",
    padding: "36px",
    boxShadow: "var(--shadow-xl)",
  },
  logoSection: {
    textAlign: "center",
    marginBottom: "28px",
  },
  logoContainer: {
    position: "relative",
    display: "inline-block",
    marginBottom: "14px",
  },
  logoIconOuter: {
    width: "90px",
    height: "90px",
    background: "linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(6, 182, 212, 0.15))",
    borderRadius: "26px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  logoIconInner: {
    width: "64px",
    height: "64px",
    background: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #8b5cf6 100%)",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)",
  },
  orbit: {
    position: "absolute",
    top: "-10px",
    left: "-10px",
    right: "-10px",
    bottom: "-10px",
  },
  orbitDot1: {
    position: "absolute",
    top: 0,
    right: "5px",
    width: "28px",
    height: "28px",
    background: "rgba(6, 182, 212, 0.15)",
    border: "2px solid rgba(6, 182, 212, 0.5)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#06b6d4",
  },
  orbitDot2: {
    position: "absolute",
    bottom: 0,
    left: "5px",
    width: "28px",
    height: "28px",
    background: "rgba(249, 115, 22, 0.15)",
    border: "2px solid rgba(249, 115, 22, 0.5)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#f97316",
  },
  logoTitle: {
    fontSize: "2rem",
    fontWeight: "700",
    marginBottom: "6px",
    letterSpacing: "-1px",
  },
  logoEnergy: {
    background: "linear-gradient(135deg, #60a5fa, #06b6d4)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  logoFlow: {
    background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  logoSubtitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.85rem",
    color: "var(--text-muted)",
    marginBottom: "14px",
  },
  logoBadges: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
  },
  badgeWater: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    padding: "5px 10px",
    borderRadius: "20px",
    background: "rgba(6, 182, 212, 0.1)",
    color: "#06b6d4",
    fontSize: "0.7rem",
    fontWeight: 500,
  },
  badgeElec: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    padding: "5px 10px",
    borderRadius: "20px",
    background: "rgba(249, 115, 22, 0.1)",
    color: "#f97316",
    fontSize: "0.7rem",
    fontWeight: 500,
  },
  error: {
    background: "rgba(239, 68, 68, 0.1)",
    border: "1px solid rgba(239, 68, 68, 0.3)",
    color: "#f87171",
    padding: "12px 16px",
    borderRadius: "10px",
    marginBottom: "18px",
    fontSize: "0.85rem",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "0.8rem",
    fontWeight: "500",
    color: "var(--text-muted)",
  },
  inputWrapper: {
    position: "relative",
  },
  inputIcon: {
    position: "absolute",
    left: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "var(--text-muted)",
  },
  input: {
    width: "100%",
    padding: "13px 14px 13px 44px",
    fontSize: "0.9rem",
    color: "var(--text-primary)",
    background: "var(--bg-tertiary)",
    border: "1px solid var(--border-color)",
    borderRadius: "10px",
    outline: "none",
  },
  submitBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "14px 24px",
    fontSize: "1rem",
    fontWeight: "600",
    color: "white",
    background: "linear-gradient(135deg, #3b82f6, #2563eb)",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    marginTop: "6px",
    boxShadow: "0 6px 20px rgba(59, 130, 246, 0.35)",
  },
  credentialsSection: {
    width: "320px",
    padding: "24px",
    background: "var(--bg-secondary)",
    border: "1px solid var(--border-color)",
    borderRadius: "20px",
    boxShadow: "var(--shadow-lg)",
  },
  credentialsTitle: {
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "var(--text-primary)",
    marginBottom: "4px",
  },
  credentialsSubtitle: {
    fontSize: "0.8rem",
    color: "var(--text-muted)",
    marginBottom: "18px",
  },
  credentialsGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  credCard: {
    background: "var(--bg-tertiary)",
    border: "1px solid",
    borderRadius: "14px",
    padding: "14px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  credCardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
  },
  credCardIcon: {
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  credCardRole: {
    fontWeight: "600",
    fontSize: "0.9rem",
  },
  credCardDesc: {
    fontSize: "0.7rem",
    color: "var(--text-muted)",
  },
  credCardBody: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    paddingLeft: "46px",
  },
  credLine: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  credCode: {
    fontSize: "0.75rem",
    color: "var(--text-muted)",
    background: "var(--bg-primary)",
    padding: "2px 6px",
    borderRadius: "4px",
  },
  footer: {
    position: "absolute",
    bottom: "16px",
    fontSize: "0.7rem",
    color: "var(--text-muted)",
    zIndex: 10,
  },
};

export default Login;
