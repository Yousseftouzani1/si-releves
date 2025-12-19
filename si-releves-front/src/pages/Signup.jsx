import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api/auth";
import { Mail, Lock, User, ArrowRight, Loader2, Activity, Droplets, Zap, CheckCircle, UserPlus } from "lucide-react";
import "../index.css";

const Signup = () => {
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        email: "",
        motDePasse: "",
        confirmMotDePasse: "",
        role: "UTILISATEUR",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.motDePasse !== formData.confirmMotDePasse) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }

        if (formData.motDePasse.length < 6) {
            setError("Le mot de passe doit contenir au moins 6 caractères");
            return;
        }

        setLoading(true);
        try {
            await signup({
                nom: formData.nom.toUpperCase(),
                prenom: formData.prenom,
                email: formData.email,
                motDePasse: formData.motDePasse,
                role: formData.role,
            });
            setSuccess(true);
        } catch (err) {
            setError(err.response?.data?.message || "Erreur lors de l'inscription");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div style={styles.container}>
                <div style={styles.bgPattern}></div>
                <div style={styles.successCard} className="animate-slide-up">
                    <div style={styles.successIcon}>
                        <CheckCircle size={48} color="#10b981" />
                    </div>
                    <h2 style={{ marginBottom: "12px" }}>Inscription réussie ! 🎉</h2>
                    <p style={{ color: "var(--text-muted)", marginBottom: "24px", textAlign: "center" }}>
                        Votre compte est en attente d'approbation par un administrateur.<br />
                        Vous recevrez un email une fois votre compte activé.
                    </p>
                    <Link to="/login">
                        <button style={{ width: "100%" }}>
                            Retour à la connexion
                            <ArrowRight size={18} />
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.bgPattern}></div>
            <div style={styles.bgGlow1}></div>
            <div style={styles.bgGlow2}></div>

            <div style={styles.card} className="animate-slide-up">
                {/* Logo */}
                <div style={styles.logoSection}>
                    <div style={styles.logoContainer}>
                        <div style={styles.logoIconOuter}>
                            <div style={styles.logoIconInner}>
                                <Activity size={32} color="white" strokeWidth={2.5} />
                            </div>
                            <div style={styles.orbit}>
                                <div style={styles.orbitDot1}><Droplets size={12} /></div>
                                <div style={styles.orbitDot2}><Zap size={12} /></div>
                            </div>
                        </div>
                    </div>

                    <h1 style={styles.logoTitle}>
                        <span style={styles.logoEnergy}>Energi</span>
                        <span style={styles.logoFlow}>Flow</span>
                    </h1>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                        Créer un nouveau compte
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div style={styles.error}>
                        <span>{error}</span>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Nom</label>
                            <input
                                type="text"
                                name="nom"
                                placeholder="TOUZANI"
                                value={formData.nom}
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Prénom</label>
                            <input
                                type="text"
                                name="prenom"
                                placeholder="Youssef"
                                value={formData.prenom}
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                        </div>
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email</label>
                        <div style={styles.inputWrapper}>
                            <Mail size={18} style={styles.inputIcon} />
                            <input
                                type="email"
                                name="email"
                                placeholder="votre@email.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                style={{ ...styles.input, paddingLeft: "44px" }}
                            />
                        </div>
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Rôle demandé</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            style={styles.input}
                        >
                            <option value="UTILISATEUR">Utilisateur (lecture seule)</option>
                            <option value="AGENT">Agent (saisie terrain)</option>
                        </select>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Mot de passe</label>
                            <div style={styles.inputWrapper}>
                                <Lock size={18} style={styles.inputIcon} />
                                <input
                                    type="password"
                                    name="motDePasse"
                                    placeholder="••••••••"
                                    value={formData.motDePasse}
                                    onChange={handleChange}
                                    required
                                    style={{ ...styles.input, paddingLeft: "44px" }}
                                />
                            </div>
                        </div>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Confirmer</label>
                            <div style={styles.inputWrapper}>
                                <Lock size={18} style={styles.inputIcon} />
                                <input
                                    type="password"
                                    name="confirmMotDePasse"
                                    placeholder="••••••••"
                                    value={formData.confirmMotDePasse}
                                    onChange={handleChange}
                                    required
                                    style={{ ...styles.input, paddingLeft: "44px" }}
                                />
                            </div>
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
                                Inscription...
                            </>
                        ) : (
                            <>
                                <UserPlus size={18} />
                                S'inscrire
                            </>
                        )}
                    </button>
                </form>

                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                        Déjà un compte ?{" "}
                        <Link to="/login" style={{ color: "var(--primary-400)", fontWeight: 500 }}>
                            Se connecter
                        </Link>
                    </span>
                </div>

                {/* Info box */}
                <div style={styles.infoBox}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                        <CheckCircle size={16} color="#10b981" />
                        <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>Processus d'approbation</span>
                    </div>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>
                        Après inscription, un administrateur validera votre compte.<br />
                        Vous serez notifié par email une fois approuvé.
                    </p>
                </div>
            </div>

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
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
        top: "-100px",
        right: "-100px",
        pointerEvents: "none",
    },
    bgGlow2: {
        position: "absolute",
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)",
        bottom: "-80px",
        left: "-80px",
        pointerEvents: "none",
    },
    card: {
        width: "100%",
        maxWidth: "480px",
        background: "var(--bg-secondary)",
        border: "1px solid var(--border-color)",
        borderRadius: "24px",
        padding: "36px",
        boxShadow: "var(--shadow-xl)",
        zIndex: 10,
    },
    successCard: {
        width: "100%",
        maxWidth: "400px",
        background: "var(--bg-secondary)",
        border: "1px solid rgba(16, 185, 129, 0.3)",
        borderRadius: "24px",
        padding: "40px",
        boxShadow: "var(--shadow-xl)",
        zIndex: 10,
    },
    successIcon: {
        width: 80,
        height: 80,
        borderRadius: "50%",
        background: "rgba(16, 185, 129, 0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 20px",
    },
    logoSection: {
        textAlign: "center",
        marginBottom: "28px",
    },
    logoContainer: {
        position: "relative",
        display: "inline-block",
        marginBottom: "12px",
    },
    logoIconOuter: {
        width: "80px",
        height: "80px",
        background: "linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(6, 182, 212, 0.15))",
        borderRadius: "22px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    logoIconInner: {
        width: "56px",
        height: "56px",
        background: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #8b5cf6 100%)",
        borderRadius: "14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 8px 24px rgba(59, 130, 246, 0.4)",
    },
    orbit: {
        position: "absolute",
        top: "-8px",
        left: "-8px",
        right: "-8px",
        bottom: "-8px",
    },
    orbitDot1: {
        position: "absolute",
        top: 0,
        right: "5px",
        width: "24px",
        height: "24px",
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
        width: "24px",
        height: "24px",
        background: "rgba(249, 115, 22, 0.15)",
        border: "2px solid rgba(249, 115, 22, 0.5)",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#f97316",
    },
    logoTitle: {
        fontSize: "1.75rem",
        fontWeight: "700",
        marginBottom: "4px",
        letterSpacing: "-0.5px",
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
    error: {
        background: "rgba(239, 68, 68, 0.1)",
        border: "1px solid rgba(239, 68, 68, 0.3)",
        color: "#f87171",
        padding: "12px 16px",
        borderRadius: "10px",
        marginBottom: "20px",
        fontSize: "0.875rem",
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
        padding: "12px 14px",
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
        background: "linear-gradient(135deg, #10b981, #059669)",
        border: "none",
        borderRadius: "12px",
        cursor: "pointer",
        marginTop: "8px",
        boxShadow: "0 6px 20px rgba(16, 185, 129, 0.35)",
    },
    infoBox: {
        marginTop: "20px",
        padding: "16px",
        background: "rgba(16, 185, 129, 0.05)",
        border: "1px solid rgba(16, 185, 129, 0.2)",
        borderRadius: "12px",
    },
    footer: {
        position: "absolute",
        bottom: "16px",
        fontSize: "0.7rem",
        color: "var(--text-muted)",
        zIndex: 10,
    },
};

export default Signup;
