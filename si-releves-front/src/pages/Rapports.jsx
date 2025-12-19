import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
    FileText,
    Download,
    Calendar,
    Users,
    Gauge,
    BarChart3,
    TrendingUp,
    Loader2,
    FileDown,
    Droplets,
    Zap,
    MapPin,
    ArrowRight,
} from "lucide-react";

export default function Rapports() {
    const navigate = useNavigate();
    const { role } = useAuth();
    const { success, error } = useToast();
    const [collapsed, setCollapsed] = useState(false);
    const [generating, setGenerating] = useState(null);
    const [selectedPeriod, setSelectedPeriod] = useState("month");

    // Mock data for PDF generation
    const mockData = {
        agents: [
            { nom: "BENALI Mohammed", quartier: "Agdal", relevesJour: 48, total: 1200 },
            { nom: "ALAOUI Fatima", quartier: "Hassan", relevesJour: 52, total: 1300 },
            { nom: "TAZI Ahmed", quartier: "Hay Riad", relevesJour: 45, total: 1125 },
        ],
        quartiers: [
            { nom: "Agdal", agents: 3, compteurs: 450, releves: 420 },
            { nom: "Hassan", agents: 2, compteurs: 380, releves: 365 },
            { nom: "Hay Riad", agents: 4, compteurs: 520, releves: 495 },
        ],
        consommation: {
            eau: { actuel: 12500, precedent: 11800, evolution: 5.9 },
            electricite: { actuel: 45600, precedent: 43200, evolution: 5.6 },
        },
        mois: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"],
        eauMensuel: [11200, 10800, 11500, 12000, 12500, 13200, 14000, 13500, 12800, 12200, 11800, 12500],
        elecMensuel: [42000, 41500, 43000, 44500, 45600, 48000, 52000, 51000, 47000, 45000, 43500, 45600],
    };

    const generatePDF = async (type) => {
        setGenerating(type);

        try {
            // Dynamic import of jspdf
            const jsPDF = (await import("jspdf")).default;
            const doc = new jsPDF();

            // Header
            doc.setFillColor(15, 23, 42); // Dark blue
            doc.rect(0, 0, 210, 40, "F");

            doc.setTextColor(255, 255, 255);
            doc.setFontSize(22);
            doc.setFont("helvetica", "bold");
            doc.text("EnergiFlow - SI Relevés", 20, 20);

            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
            doc.text("Rabat Énergie & Eau", 20, 30);

            // Date
            doc.setTextColor(148, 163, 184);
            doc.text(`Généré le ${new Date().toLocaleDateString("fr-FR")}`, 140, 30);

            doc.setTextColor(0, 0, 0);

            if (type === "mensuel") {
                // Report title
                doc.setFontSize(18);
                doc.setFont("helvetica", "bold");
                doc.text("Rapport Mensuel des Relevés", 20, 55);

                // Agents section
                doc.setFontSize(14);
                doc.setFont("helvetica", "bold");
                doc.text("Répartition des Agents par Quartier", 20, 70);

                doc.setFontSize(10);
                doc.setFont("helvetica", "normal");

                // Table header
                doc.setFillColor(241, 245, 249);
                doc.rect(20, 75, 170, 10, "F");
                doc.setFont("helvetica", "bold");
                doc.text("Agent", 25, 82);
                doc.text("Quartier", 80, 82);
                doc.text("Relevés/Jour", 120, 82);
                doc.text("Total", 160, 82);

                // Table rows
                doc.setFont("helvetica", "normal");
                let y = 92;
                mockData.agents.forEach((agent) => {
                    doc.text(agent.nom, 25, y);
                    doc.text(agent.quartier, 80, y);
                    doc.text(String(agent.relevesJour), 125, y);
                    doc.text(String(agent.total), 162, y);
                    y += 10;
                });

                // Quartiers section
                y += 15;
                doc.setFontSize(14);
                doc.setFont("helvetica", "bold");
                doc.text("Statistiques par Quartier", 20, y);

                y += 15;
                doc.setFillColor(241, 245, 249);
                doc.rect(20, y - 5, 170, 10, "F");
                doc.setFontSize(10);
                doc.text("Quartier", 25, y + 2);
                doc.text("Agents", 70, y + 2);
                doc.text("Compteurs", 100, y + 2);
                doc.text("Relevés", 140, y + 2);
                doc.text("Taux", 170, y + 2);

                y += 12;
                doc.setFont("helvetica", "normal");
                mockData.quartiers.forEach((q) => {
                    const taux = ((q.releves / q.compteurs) * 100).toFixed(0);
                    doc.text(q.nom, 25, y);
                    doc.text(String(q.agents), 75, y);
                    doc.text(String(q.compteurs), 108, y);
                    doc.text(String(q.releves), 145, y);
                    doc.text(`${taux}%`, 172, y);
                    y += 10;
                });

            } else if (type === "consommation") {
                // Report title
                doc.setFontSize(18);
                doc.setFont("helvetica", "bold");
                doc.text("Évolution de la Consommation", 20, 55);

                // Summary boxes
                doc.setFontSize(12);
                doc.setFont("helvetica", "bold");

                // Water box
                doc.setFillColor(6, 182, 212); // Cyan
                doc.roundedRect(20, 65, 80, 35, 3, 3, "F");
                doc.setTextColor(255, 255, 255);
                doc.text("Eau (m³)", 35, 78);
                doc.setFontSize(20);
                doc.text(mockData.consommation.eau.actuel.toLocaleString(), 35, 92);
                doc.setFontSize(10);
                doc.text(`+${mockData.consommation.eau.evolution}%`, 70, 92);

                // Electricity box
                doc.setFillColor(249, 115, 22); // Orange
                doc.roundedRect(110, 65, 80, 35, 3, 3, "F");
                doc.text("Électricité (kWh)", 120, 78);
                doc.setFontSize(20);
                doc.text(mockData.consommation.electricite.actuel.toLocaleString(), 120, 92);
                doc.setFontSize(10);
                doc.text(`+${mockData.consommation.electricite.evolution}%`, 160, 92);

                // Monthly evolution
                doc.setTextColor(0, 0, 0);
                doc.setFontSize(14);
                doc.setFont("helvetica", "bold");
                doc.text("Évolution Mensuelle", 20, 120);

                // Monthly table
                doc.setFontSize(10);
                doc.setFillColor(241, 245, 249);
                doc.rect(20, 125, 170, 10, "F");
                doc.setFont("helvetica", "bold");
                doc.text("Mois", 25, 132);
                doc.text("Eau (m³)", 80, 132);
                doc.text("Électricité (kWh)", 130, 132);

                doc.setFont("helvetica", "normal");
                let y = 142;
                mockData.mois.forEach((mois, i) => {
                    doc.text(mois, 25, y);
                    doc.text(mockData.eauMensuel[i].toLocaleString(), 80, y);
                    doc.text(mockData.elecMensuel[i].toLocaleString(), 130, y);
                    y += 8;
                });

                // Year comparison
                y += 10;
                doc.setFontSize(14);
                doc.setFont("helvetica", "bold");
                doc.text("Comparaison N / N-1", 20, y);

                y += 10;
                doc.setFontSize(10);
                doc.setFont("helvetica", "normal");
                doc.text("Année N: Total Eau = 148,000 m³ | Total Élec = 549,100 kWh", 20, y);
                y += 7;
                doc.text("Année N-1: Total Eau = 142,500 m³ | Total Élec = 521,000 kWh", 20, y);
                y += 7;
                doc.text("Évolution: Eau +3.9% | Électricité +5.4%", 20, y);
            }

            // Footer
            doc.setFillColor(241, 245, 249);
            doc.rect(0, 280, 210, 17, "F");
            doc.setTextColor(100, 116, 139);
            doc.setFontSize(9);
            doc.text("© 2024 EnergiFlow - Rabat Énergie & Eau - Document généré automatiquement", 20, 290);

            // Save PDF
            const fileName = type === "mensuel"
                ? `rapport_mensuel_${new Date().toISOString().slice(0, 10)}.pdf`
                : `evolution_consommation_${new Date().toISOString().slice(0, 10)}.pdf`;

            doc.save(fileName);
            success(`Rapport ${type === "mensuel" ? "mensuel" : "consommation"} téléchargé !`);

        } catch (err) {
            console.error("PDF generation error:", err);
            error("Erreur lors de la génération du PDF");
        } finally {
            setGenerating(null);
        }
    };

    const reports = [
        {
            id: "mensuel",
            title: "Rapport Mensuel des Relevés",
            description: "Répartition des agents par quartier, nombre moyen de relevés par agent par jour, statistiques par quartier.",
            icon: Users,
            color: "#3b82f6",
            features: [
                "Répartition agents par quartier",
                "Moyenne relevés/agent/jour",
                "Nombre relevés par quartier",
                "Taux de couverture",
            ],
        },
        {
            id: "consommation",
            title: "Évolution de la Consommation",
            description: "Analyse des tendances de consommation d'eau et d'électricité avec graphiques et comparaisons N/N-1.",
            icon: TrendingUp,
            color: "#10b981",
            features: [
                "Par type (Eau m³, Élec kWh)",
                "Évolution mensuelle",
                "Graphique tendanciel",
                "Comparaison N vs N-1",
            ],
        },
    ];

    return (
        <div className="app-container">
            <Sidebar />
            <main className={`main-content ${collapsed ? "main-content-expanded" : ""}`}>
                <Navbar title="Rapports" subtitle="Export PDF des statistiques et analyses" />

                <div className="page-content" style={{ padding: "24px" }}>
                    {/* Period selector */}
                    <div style={styles.periodSelector}>
                        <span style={styles.periodLabel}>Période :</span>
                        <div style={styles.periodButtons}>
                            {[
                                { id: "month", label: "Ce mois" },
                                { id: "quarter", label: "Ce trimestre" },
                                { id: "year", label: "Cette année" },
                            ].map((p) => (
                                <button
                                    key={p.id}
                                    onClick={() => setSelectedPeriod(p.id)}
                                    style={{
                                        ...styles.periodBtn,
                                        background: selectedPeriod === p.id ? "var(--primary-500)" : "var(--bg-tertiary)",
                                        color: selectedPeriod === p.id ? "white" : "var(--text-primary)",
                                    }}
                                >
                                    {p.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Report cards */}
                    <div style={styles.reportsGrid}>
                        {reports.map((report) => (
                            <div key={report.id} style={styles.reportCard}>
                                <div style={styles.reportHeader}>
                                    <div style={{ ...styles.reportIcon, background: `${report.color}20`, color: report.color }}>
                                        <report.icon size={28} />
                                    </div>
                                    <div>
                                        <h3 style={styles.reportTitle}>{report.title}</h3>
                                        <p style={styles.reportDesc}>{report.description}</p>
                                    </div>
                                </div>

                                <div style={styles.featuresList}>
                                    {report.features.map((feature, i) => (
                                        <div key={i} style={styles.featureItem}>
                                            <ArrowRight size={14} color={report.color} />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => generatePDF(report.id)}
                                    disabled={generating !== null}
                                    style={{
                                        ...styles.downloadBtn,
                                        background: generating === report.id ? "var(--bg-tertiary)" : `linear-gradient(135deg, ${report.color}, ${report.color}dd)`,
                                        cursor: generating !== null ? "not-allowed" : "pointer",
                                    }}
                                >
                                    {generating === report.id ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            Génération...
                                        </>
                                    ) : (
                                        <>
                                            <FileDown size={18} />
                                            Télécharger PDF
                                        </>
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Quick stats */}
                    <div style={styles.quickStats}>
                        <h3 style={styles.sectionTitle}>Aperçu Rapide</h3>
                        <div style={styles.statsGrid}>
                            <div style={styles.statCard}>
                                <Droplets size={24} color="#06b6d4" />
                                <div>
                                    <div style={styles.statValue}>12,500 m³</div>
                                    <div style={styles.statLabel}>Consommation Eau</div>
                                </div>
                            </div>
                            <div style={styles.statCard}>
                                <Zap size={24} color="#f97316" />
                                <div>
                                    <div style={styles.statValue}>45,600 kWh</div>
                                    <div style={styles.statLabel}>Consommation Élec</div>
                                </div>
                            </div>
                            <div style={styles.statCard}>
                                <Users size={24} color="#8b5cf6" />
                                <div>
                                    <div style={styles.statValue}>48</div>
                                    <div style={styles.statLabel}>Relevés/Jour/Agent</div>
                                </div>
                            </div>
                            <div style={styles.statCard}>
                                <MapPin size={24} color="#10b981" />
                                <div>
                                    <div style={styles.statValue}>93%</div>
                                    <div style={styles.statLabel}>Taux Couverture</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

const styles = {
    periodSelector: {
        display: "flex",
        alignItems: "center",
        gap: "16px",
        marginBottom: "24px",
    },
    periodLabel: {
        color: "var(--text-muted)",
        fontSize: "0.9rem",
    },
    periodButtons: {
        display: "flex",
        gap: "8px",
    },
    periodBtn: {
        padding: "8px 16px",
        borderRadius: "8px",
        border: "none",
        fontSize: "0.85rem",
        fontWeight: 500,
        cursor: "pointer",
        transition: "all 0.2s",
    },
    reportsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        gap: "24px",
        marginBottom: "32px",
    },
    reportCard: {
        background: "var(--bg-secondary)",
        borderRadius: "16px",
        padding: "24px",
        border: "1px solid var(--border-color)",
    },
    reportHeader: {
        display: "flex",
        gap: "16px",
        marginBottom: "20px",
    },
    reportIcon: {
        width: "56px",
        height: "56px",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },
    reportTitle: {
        fontSize: "1.2rem",
        fontWeight: 600,
        color: "var(--text-primary)",
        marginBottom: "4px",
    },
    reportDesc: {
        color: "var(--text-muted)",
        fontSize: "0.9rem",
        lineHeight: 1.5,
    },
    featuresList: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginBottom: "20px",
        paddingLeft: "72px",
    },
    featureItem: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        color: "var(--text-secondary)",
        fontSize: "0.9rem",
    },
    downloadBtn: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        padding: "14px 20px",
        border: "none",
        borderRadius: "10px",
        color: "white",
        fontSize: "0.95rem",
        fontWeight: 600,
        transition: "all 0.2s",
    },
    quickStats: {
        background: "var(--bg-secondary)",
        borderRadius: "16px",
        padding: "24px",
        border: "1px solid var(--border-color)",
    },
    sectionTitle: {
        fontSize: "1.1rem",
        fontWeight: 600,
        color: "var(--text-primary)",
        marginBottom: "20px",
    },
    statsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "16px",
    },
    statCard: {
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "16px",
        background: "var(--bg-tertiary)",
        borderRadius: "12px",
    },
    statValue: {
        fontSize: "1.4rem",
        fontWeight: 700,
        color: "var(--text-primary)",
    },
    statLabel: {
        fontSize: "0.8rem",
        color: "var(--text-muted)",
    },
};
