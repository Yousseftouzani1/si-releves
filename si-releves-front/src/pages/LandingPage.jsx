import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";
import EnergiFlowLogo from "../components/EnergiFlowLogo";
import {
    Droplets,
    Zap,
    Shield,
    Clock,
    CheckCircle,
    Phone,
    Mail,
    MapPin,
    ArrowRight,
    Loader2,
    Activity,
    Users,
    BarChart3,
    LogIn,
    ChevronDown,
    Award
} from "lucide-react";
import "../index.css";

// Images (using placeholders - you can replace with your generated images)
const heroImage = "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1920&q=80";
const waterImage = "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=800&q=80";
const electricityImage = "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80";

export default function LandingPage() {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        serviceInterest: "",
        address: "",
        message: "",
    });
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setFormSubmitted(true);
            setLoading(false);
        }, 1500);
    };

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>
            {/* Navigation */}
            <nav style={styles.nav}>
                <div style={styles.navInner}>
                    {/* Logo */}
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <EnergiFlowLogo size={40} textSize="1.35rem" />
                    </Link>

                    {/* Desktop Nav Links */}
                    <div style={styles.navLinks}>
                        <a href="#services" style={styles.navLink}>Services</a>
                        <a href="#benefits" style={styles.navLink}>Pourquoi Nous</a>
                        <a href="#contact" style={styles.navLink}>Contact</a>
                    </div>

                    {/* Right Actions */}
                    <div style={styles.navActions}>
                        <ThemeToggle />
                        <Link to="/login">
                            <button style={styles.loginBtn}>
                                <LogIn size={18} />
                                Connexion
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section style={styles.heroSection}>
                <div style={styles.heroBg}>
                    <img src={heroImage} alt="Hero" style={styles.heroImg} />
                    <div style={styles.heroOverlay}></div>
                </div>

                <div style={styles.heroContent}>
                    <div style={styles.heroBadge}>
                        <Shield size={16} />
                        <span>Certifié & Agréé - Rabat</span>
                    </div>

                    <h1 style={styles.heroTitle}>
                        Gestion Intelligente de<br />
                        <span style={styles.heroHighlight}>l'Eau & l'Électricité</span>
                    </h1>

                    <p style={styles.heroSubtitle}>
                        EnergiFlow simplifie la gestion des relevés de compteurs pour Rabat Énergie & Eau.
                        Solution moderne avec suivi en temps réel et analytics avancées.
                    </p>

                    <div style={styles.heroButtons}>
                        <button onClick={() => scrollToSection("lead-form")} style={styles.ctaBtn}>
                            Demander une Démo
                            <ArrowRight size={20} />
                        </button>
                        <Link to="/login">
                            <button style={styles.secondaryBtn}>
                                <LogIn size={20} />
                                Accès Plateforme
                            </button>
                        </Link>
                    </div>

                    <div style={styles.heroStats}>
                        <div style={styles.heroStat}>
                            <CheckCircle size={18} color="#10b981" />
                            <span>Depuis 2010</span>
                        </div>
                        <div style={styles.heroStat}>
                            <CheckCircle size={18} color="#10b981" />
                            <span>Support 24/7</span>
                        </div>
                        <div style={styles.heroStat}>
                            <CheckCircle size={18} color="#10b981" />
                            <span>+10,000 Compteurs</span>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div style={styles.scrollIndicator} onClick={() => scrollToSection("stats")}>
                    <ChevronDown size={24} />
                </div>
            </section>

            {/* Stats Section */}
            <section id="stats" style={styles.statsSection}>
                <div style={styles.statsGrid}>
                    <div style={styles.statItem}>
                        <div style={styles.statValue}>15+</div>
                        <div style={styles.statLabel}>Années d'Expérience</div>
                    </div>
                    <div style={styles.statItem}>
                        <div style={styles.statValue}>10,000+</div>
                        <div style={styles.statLabel}>Compteurs Gérés</div>
                    </div>
                    <div style={styles.statItem}>
                        <div style={styles.statValue}>50+</div>
                        <div style={styles.statLabel}>Agents Terrain</div>
                    </div>
                    <div style={styles.statItem}>
                        <div style={styles.statValue}>98%</div>
                        <div style={styles.statLabel}>Taux de Satisfaction</div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" style={styles.servicesSection}>
                <div style={styles.sectionInner}>
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>Nos Services</h2>
                        <p style={styles.sectionSubtitle}>
                            Solutions complètes de gestion des relevés d'eau et d'électricité
                        </p>
                    </div>

                    <div style={styles.servicesGrid}>
                        {/* Water Services */}
                        <div style={styles.serviceCard}>
                            <div style={styles.serviceImageWrapper}>
                                <img src={waterImage} alt="Services Eau" style={styles.serviceImage} />
                                <div style={styles.serviceIconBadge}>
                                    <Droplets size={24} color="#06b6d4" />
                                </div>
                            </div>
                            <div style={styles.serviceContent}>
                                <h3 style={{ ...styles.serviceTitle, color: "#06b6d4" }}>
                                    💧 Gestion Eau
                                </h3>
                                <p style={styles.serviceDesc}>
                                    Suivi complet des compteurs d'eau pour particuliers et entreprises à Rabat.
                                </p>
                                <ul style={styles.serviceList}>
                                    <li><CheckCircle size={16} color="#10b981" /> Relevés automatisés</li>
                                    <li><CheckCircle size={16} color="#10b981" /> Détection de fuites</li>
                                    <li><CheckCircle size={16} color="#10b981" /> Facturation intelligente</li>
                                    <li><CheckCircle size={16} color="#10b981" /> Alertes consommation</li>
                                </ul>
                            </div>
                        </div>

                        {/* Electricity Services */}
                        <div style={styles.serviceCard}>
                            <div style={styles.serviceImageWrapper}>
                                <img src={electricityImage} alt="Services Électricité" style={styles.serviceImage} />
                                <div style={styles.serviceIconBadge}>
                                    <Zap size={24} color="#f97316" />
                                </div>
                            </div>
                            <div style={styles.serviceContent}>
                                <h3 style={{ ...styles.serviceTitle, color: "#f97316" }}>
                                    ⚡ Gestion Électricité
                                </h3>
                                <p style={styles.serviceDesc}>
                                    Solutions de gestion électrique efficaces avec monitoring en temps réel.
                                </p>
                                <ul style={styles.serviceList}>
                                    <li><CheckCircle size={16} color="#10b981" /> Compteurs intelligents</li>
                                    <li><CheckCircle size={16} color="#10b981" /> Analyse consommation</li>
                                    <li><CheckCircle size={16} color="#10b981" /> Optimisation énergétique</li>
                                    <li><CheckCircle size={16} color="#10b981" /> Rapports détaillés</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section id="benefits" style={styles.benefitsSection}>
                <div style={styles.sectionInner}>
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>Pourquoi EnergiFlow ?</h2>
                        <p style={styles.sectionSubtitle}>
                            Une solution conçue pour l'excellence opérationnelle
                        </p>
                    </div>

                    <div style={styles.benefitsGrid}>
                        <div style={styles.benefitCard}>
                            <div style={styles.benefitIcon}>
                                <Clock size={32} />
                            </div>
                            <h3 style={styles.benefitTitle}>Temps Réel</h3>
                            <p style={styles.benefitDesc}>
                                Relevés instantanés et synchronisation automatique avec le système central.
                            </p>
                        </div>

                        <div style={styles.benefitCard}>
                            <div style={styles.benefitIcon}>
                                <Shield size={32} />
                            </div>
                            <h3 style={styles.benefitTitle}>Sécurisé</h3>
                            <p style={styles.benefitDesc}>
                                Données cryptées, accès contrôlés par rôles, audit complet des actions.
                            </p>
                        </div>

                        <div style={styles.benefitCard}>
                            <div style={styles.benefitIcon}>
                                <BarChart3 size={32} />
                            </div>
                            <h3 style={styles.benefitTitle}>Analytics</h3>
                            <p style={styles.benefitDesc}>
                                Dashboard intelligent avec prédictions IA et alertes automatiques.
                            </p>
                        </div>

                        <div style={styles.benefitCard}>
                            <div style={styles.benefitIcon}>
                                <Users size={32} />
                            </div>
                            <h3 style={styles.benefitTitle}>Multi-Rôles</h3>
                            <p style={styles.benefitDesc}>
                                Interfaces adaptées : Agents terrain, Superviseurs, Administrateurs.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Lead Form Section */}
            <section id="lead-form" style={styles.formSection}>
                <div style={styles.sectionInner}>
                    <div style={styles.formGrid}>
                        {/* Left - Contact Info */}
                        <div style={styles.formInfo}>
                            <h2 style={styles.formTitle}>Demandez une Démo</h2>
                            <p style={styles.formSubtitle}>
                                Remplissez le formulaire et notre équipe vous contactera sous 24h.
                            </p>

                            <div style={styles.contactList}>
                                <div style={styles.contactItem}>
                                    <div style={styles.contactIcon}>
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <div style={styles.contactLabel}>Téléphone</div>
                                        <a href="tel:+212537123456" style={styles.contactValue}>+212 537 12 34 56</a>
                                    </div>
                                </div>

                                <div style={styles.contactItem}>
                                    <div style={styles.contactIcon}>
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <div style={styles.contactLabel}>Email</div>
                                        <a href="mailto:contact@energiflow.ma" style={styles.contactValue}>contact@energiflow.ma</a>
                                    </div>
                                </div>

                                <div style={styles.contactItem}>
                                    <div style={styles.contactIcon}>
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <div style={styles.contactLabel}>Adresse</div>
                                        <span style={styles.contactValue}>123 Avenue Mohammed V, Rabat</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right - Form */}
                        <div style={styles.formCard}>
                            {formSubmitted ? (
                                <div style={styles.successMessage}>
                                    <div style={styles.successIcon}>
                                        <CheckCircle size={48} color="#10b981" />
                                    </div>
                                    <h3 style={styles.successTitle}>Merci !</h3>
                                    <p style={styles.successText}>
                                        Votre demande a été reçue. Notre équipe vous contactera dans les 24 heures.
                                    </p>
                                    <button onClick={() => setFormSubmitted(false)} style={styles.resetBtn}>
                                        Envoyer une autre demande
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} style={styles.form}>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Nom complet</label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Mohammed Alami"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            style={styles.input}
                                        />
                                    </div>

                                    <div style={styles.formRow}>
                                        <div style={styles.formGroup}>
                                            <label style={styles.label}>Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="votre@email.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                style={styles.input}
                                            />
                                        </div>
                                        <div style={styles.formGroup}>
                                            <label style={styles.label}>Téléphone</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                placeholder="+212 6XX XX XX XX"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                style={styles.input}
                                            />
                                        </div>
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Service souhaité</label>
                                        <div style={styles.radioGroup}>
                                            {["eau", "electricite", "les-deux"].map((option) => (
                                                <label
                                                    key={option}
                                                    style={{
                                                        ...styles.radioLabel,
                                                        borderColor: formData.serviceInterest === option ? "var(--primary-400)" : "var(--border-color)",
                                                        background: formData.serviceInterest === option ? "rgba(59, 130, 246, 0.1)" : "transparent",
                                                    }}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="serviceInterest"
                                                        value={option}
                                                        checked={formData.serviceInterest === option}
                                                        onChange={handleChange}
                                                        style={{ display: "none" }}
                                                    />
                                                    {option === "eau" && <Droplets size={18} color="#06b6d4" />}
                                                    {option === "electricite" && <Zap size={18} color="#f97316" />}
                                                    {option === "les-deux" && <Activity size={18} color="var(--primary-400)" />}
                                                    <span>
                                                        {option === "eau" ? "Eau" : option === "electricite" ? "Électricité" : "Les deux"}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Message (optionnel)</label>
                                        <textarea
                                            name="message"
                                            placeholder="Décrivez votre projet..."
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={3}
                                            style={{ ...styles.input, resize: "vertical" }}
                                        />
                                    </div>

                                    <button type="submit" disabled={loading} style={styles.submitBtn}>
                                        {loading ? (
                                            <>
                                                <Loader2 size={20} className="animate-spin" />
                                                Envoi...
                                            </>
                                        ) : (
                                            <>
                                                Envoyer la demande
                                                <ArrowRight size={20} />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer id="contact" style={styles.footer}>
                <div style={styles.sectionInner}>
                    <div style={styles.footerGrid}>
                        {/* Brand */}
                        <div style={styles.footerBrand}>
                            <EnergiFlowLogo size={38} textSize="1.2rem" />
                            <p style={styles.footerDesc}>
                                Solution de gestion des relevés d'eau et d'électricité pour Rabat Énergie & Eau.
                            </p>
                            <div style={styles.footerBadges}>
                                <span style={styles.footerBadge}>
                                    <Award size={14} />
                                    Certifié ISO
                                </span>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 style={styles.footerTitle}>Services</h4>
                            <ul style={styles.footerLinks}>
                                <li><a href="#services">Gestion Eau</a></li>
                                <li><a href="#services">Gestion Électricité</a></li>
                                <li><a href="#lead-form">Demander une Démo</a></li>
                            </ul>
                        </div>

                        {/* Platform */}
                        <div>
                            <h4 style={styles.footerTitle}>Plateforme</h4>
                            <ul style={styles.footerLinks}>
                                <li><Link to="/login">Connexion</Link></li>
                                <li><Link to="/signup">Inscription</Link></li>
                                <li><a href="#benefits">Fonctionnalités</a></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 style={styles.footerTitle}>Contact</h4>
                            <ul style={styles.footerLinks}>
                                <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <Phone size={14} color="var(--primary-400)" />
                                    <a href="tel:+212537123456">+212 537 12 34 56</a>
                                </li>
                                <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <Mail size={14} color="var(--primary-400)" />
                                    <a href="mailto:contact@energiflow.ma">contact@energiflow.ma</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div style={styles.footerBottom}>
                        <p>© {new Date().getFullYear()} EnergiFlow. Tous droits réservés.</p>
                        <p>Rabat Énergie & Eau - Maroc</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

const styles = {
    // Navigation
    nav: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "rgba(var(--bg-primary-rgb), 0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border-color)",
    },
    navInner: {
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "0 24px",
        height: "70px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    navLogo: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    logoIcon: {
        width: "42px",
        height: "42px",
        borderRadius: "12px",
        background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
    },
    logoText: {
        fontSize: "1.5rem",
        fontWeight: 700,
    },
    logoEnergy: {
        background: "linear-gradient(135deg, #60a5fa, #06b6d4)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
    },
    logoFlow: {
        background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
    },
    navLinks: {
        display: "flex",
        gap: "32px",
    },
    navLink: {
        color: "var(--text-muted)",
        textDecoration: "none",
        fontSize: "0.95rem",
        fontWeight: 500,
        transition: "color 0.2s",
    },
    navActions: {
        display: "flex",
        alignItems: "center",
        gap: "16px",
    },
    loginBtn: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 20px",
        background: "linear-gradient(135deg, #3b82f6, #2563eb)",
        border: "none",
        borderRadius: "10px",
        color: "white",
        fontSize: "0.9rem",
        fontWeight: 600,
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
    },

    // Hero
    heroSection: {
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "70px",
    },
    heroBg: {
        position: "absolute",
        inset: 0,
    },
    heroImg: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    heroOverlay: {
        position: "absolute",
        inset: 0,
        background: "linear-gradient(135deg, rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.6))",
    },
    heroContent: {
        position: "relative",
        zIndex: 10,
        maxWidth: "800px",
        padding: "0 24px",
        textAlign: "center",
    },
    heroBadge: {
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 16px",
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "30px",
        color: "white",
        fontSize: "0.85rem",
        marginBottom: "24px",
    },
    heroTitle: {
        fontSize: "clamp(2.5rem, 5vw, 4rem)",
        fontWeight: 700,
        color: "white",
        lineHeight: 1.2,
        marginBottom: "20px",
    },
    heroHighlight: {
        background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
    },
    heroSubtitle: {
        fontSize: "1.1rem",
        color: "rgba(255, 255, 255, 0.8)",
        lineHeight: 1.7,
        marginBottom: "32px",
        maxWidth: "600px",
        margin: "0 auto 32px",
    },
    heroButtons: {
        display: "flex",
        justifyContent: "center",
        gap: "16px",
        flexWrap: "wrap",
        marginBottom: "40px",
    },
    ctaBtn: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "16px 32px",
        background: "linear-gradient(135deg, #3b82f6, #2563eb)",
        border: "none",
        borderRadius: "12px",
        color: "white",
        fontSize: "1rem",
        fontWeight: 600,
        cursor: "pointer",
        boxShadow: "0 8px 24px rgba(59, 130, 246, 0.4)",
    },
    secondaryBtn: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "16px 32px",
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        borderRadius: "12px",
        color: "white",
        fontSize: "1rem",
        fontWeight: 600,
        cursor: "pointer",
    },
    heroStats: {
        display: "flex",
        justifyContent: "center",
        gap: "24px",
        flexWrap: "wrap",
    },
    heroStat: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        color: "rgba(255, 255, 255, 0.8)",
        fontSize: "0.9rem",
    },
    scrollIndicator: {
        position: "absolute",
        bottom: "32px",
        left: "50%",
        transform: "translateX(-50%)",
        color: "rgba(255, 255, 255, 0.6)",
        animation: "bounce 2s infinite",
        cursor: "pointer",
    },

    // Stats
    statsSection: {
        padding: "48px 24px",
        background: "var(--bg-secondary)",
        borderBottom: "1px solid var(--border-color)",
    },
    statsGrid: {
        maxWidth: "1280px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "32px",
    },
    statItem: {
        textAlign: "center",
    },
    statValue: {
        fontSize: "2.5rem",
        fontWeight: 700,
        color: "var(--primary-400)",
        marginBottom: "4px",
    },
    statLabel: {
        fontSize: "0.9rem",
        color: "var(--text-muted)",
    },

    // Sections common
    sectionInner: {
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "0 24px",
    },
    sectionHeader: {
        textAlign: "center",
        marginBottom: "48px",
    },
    sectionTitle: {
        fontSize: "2.5rem",
        fontWeight: 700,
        color: "var(--text-primary)",
        marginBottom: "12px",
    },
    sectionSubtitle: {
        fontSize: "1.1rem",
        color: "var(--text-muted)",
        maxWidth: "600px",
        margin: "0 auto",
    },

    // Services
    servicesSection: {
        padding: "80px 24px",
        background: "var(--bg-primary)",
    },
    servicesGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "32px",
    },
    serviceCard: {
        background: "var(--bg-secondary)",
        borderRadius: "20px",
        overflow: "hidden",
        border: "1px solid var(--border-color)",
        transition: "transform 0.3s, box-shadow 0.3s",
    },
    serviceImageWrapper: {
        position: "relative",
        aspectRatio: "16/9",
        overflow: "hidden",
    },
    serviceImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transition: "transform 0.5s",
    },
    serviceIconBadge: {
        position: "absolute",
        bottom: "-20px",
        left: "24px",
        width: "48px",
        height: "48px",
        background: "var(--bg-secondary)",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "var(--shadow-lg)",
        border: "1px solid var(--border-color)",
    },
    serviceContent: {
        padding: "32px 24px 24px",
    },
    serviceTitle: {
        fontSize: "1.5rem",
        fontWeight: 700,
        marginBottom: "12px",
    },
    serviceDesc: {
        color: "var(--text-muted)",
        marginBottom: "20px",
        lineHeight: 1.6,
    },
    serviceList: {
        listStyle: "none",
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: "12px",
    },

    // Benefits
    benefitsSection: {
        padding: "80px 24px",
        background: "var(--bg-secondary)",
    },
    benefitsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "24px",
    },
    benefitCard: {
        textAlign: "center",
        padding: "32px 24px",
        background: "var(--bg-primary)",
        borderRadius: "16px",
        border: "1px solid var(--border-color)",
    },
    benefitIcon: {
        width: "64px",
        height: "64px",
        margin: "0 auto 20px",
        borderRadius: "50%",
        background: "rgba(59, 130, 246, 0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--primary-400)",
    },
    benefitTitle: {
        fontSize: "1.2rem",
        fontWeight: 600,
        color: "var(--text-primary)",
        marginBottom: "12px",
    },
    benefitDesc: {
        color: "var(--text-muted)",
        fontSize: "0.9rem",
        lineHeight: 1.6,
    },

    // Form Section
    formSection: {
        padding: "80px 24px",
        background: "var(--bg-primary)",
    },
    formGrid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "48px",
        alignItems: "center",
    },
    formInfo: {},
    formTitle: {
        fontSize: "2.5rem",
        fontWeight: 700,
        color: "var(--text-primary)",
        marginBottom: "16px",
    },
    formSubtitle: {
        color: "var(--text-muted)",
        fontSize: "1.1rem",
        marginBottom: "32px",
        lineHeight: 1.6,
    },
    contactList: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    contactItem: {
        display: "flex",
        alignItems: "flex-start",
        gap: "16px",
    },
    contactIcon: {
        width: "44px",
        height: "44px",
        borderRadius: "12px",
        background: "rgba(59, 130, 246, 0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--primary-400)",
    },
    contactLabel: {
        fontSize: "0.8rem",
        color: "var(--text-muted)",
        marginBottom: "4px",
    },
    contactValue: {
        color: "var(--text-primary)",
        fontWeight: 500,
        textDecoration: "none",
    },
    formCard: {
        background: "var(--bg-secondary)",
        borderRadius: "20px",
        padding: "32px",
        border: "1px solid var(--border-color)",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    formGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
    },
    formRow: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "16px",
    },
    label: {
        fontSize: "0.85rem",
        fontWeight: 500,
        color: "var(--text-muted)",
    },
    input: {
        padding: "14px 16px",
        fontSize: "0.95rem",
        background: "var(--bg-tertiary)",
        border: "1px solid var(--border-color)",
        borderRadius: "10px",
        color: "var(--text-primary)",
        outline: "none",
    },
    radioGroup: {
        display: "flex",
        gap: "12px",
    },
    radioLabel: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "12px 16px",
        borderRadius: "10px",
        border: "1px solid",
        cursor: "pointer",
        transition: "all 0.2s",
        color: "var(--text-primary)",
        fontSize: "0.9rem",
    },
    submitBtn: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        padding: "16px 24px",
        background: "linear-gradient(135deg, #3b82f6, #2563eb)",
        border: "none",
        borderRadius: "12px",
        color: "white",
        fontSize: "1rem",
        fontWeight: 600,
        cursor: "pointer",
        boxShadow: "0 6px 20px rgba(59, 130, 246, 0.35)",
        marginTop: "8px",
    },
    successMessage: {
        textAlign: "center",
        padding: "40px 20px",
    },
    successIcon: {
        width: "80px",
        height: "80px",
        margin: "0 auto 20px",
        borderRadius: "50%",
        background: "rgba(16, 185, 129, 0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    successTitle: {
        fontSize: "1.75rem",
        fontWeight: 700,
        color: "var(--text-primary)",
        marginBottom: "12px",
    },
    successText: {
        color: "var(--text-muted)",
        marginBottom: "24px",
    },
    resetBtn: {
        padding: "12px 24px",
        background: "var(--bg-tertiary)",
        border: "1px solid var(--border-color)",
        borderRadius: "10px",
        color: "var(--text-primary)",
        cursor: "pointer",
    },

    // Footer
    footer: {
        padding: "64px 24px 32px",
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-color)",
    },
    footerGrid: {
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 1fr",
        gap: "48px",
        marginBottom: "48px",
    },
    footerBrand: {},
    footerDesc: {
        color: "var(--text-muted)",
        fontSize: "0.9rem",
        lineHeight: 1.6,
        margin: "16px 0",
    },
    footerBadges: {
        display: "flex",
        gap: "8px",
    },
    footerBadge: {
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "6px 12px",
        background: "rgba(59, 130, 246, 0.1)",
        color: "var(--primary-400)",
        borderRadius: "20px",
        fontSize: "0.8rem",
    },
    footerTitle: {
        fontSize: "1rem",
        fontWeight: 600,
        color: "var(--text-primary)",
        marginBottom: "16px",
    },
    footerLinks: {
        listStyle: "none",
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: "12px",
    },
    footerBottom: {
        borderTop: "1px solid var(--border-color)",
        paddingTop: "24px",
        display: "flex",
        justifyContent: "space-between",
        color: "var(--text-muted)",
        fontSize: "0.85rem",
    },
};

// Add CSS for footer links
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  footer ul li a {
    color: var(--text-muted);
    text-decoration: none;
    transition: color 0.2s;
  }
  footer ul li a:hover {
    color: var(--primary-400);
  }
  .service-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  }
  .service-card:hover img {
    transform: scale(1.05);
  }
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
    40% { transform: translateX(-50%) translateY(-10px); }
    60% { transform: translateX(-50%) translateY(-5px); }
  }
  @media (max-width: 1024px) {
    .services-grid, .benefits-grid, .form-grid, .footer-grid {
      grid-template-columns: 1fr !important;
    }
  }
  @media (max-width: 768px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
    .nav-links {
      display: none !important;
    }
  }
`;
document.head.appendChild(styleSheet);
