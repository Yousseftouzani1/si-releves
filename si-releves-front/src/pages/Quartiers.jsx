import { useState, useEffect } from "react";
import { getQuartiers, deleteQuartier, createQuartier } from "../api/quartiers";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import InteractiveMap from "../components/InteractiveMap";
import { Plus, Search, MapPin, Trash2, Edit, X, Map } from "lucide-react";
import "../styles/layout.css";

const Quartiers = () => {
    const [quartiers, setQuartiers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [newQuartier, setNewQuartier] = useState({ nom: "" });
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [selectedQuartier, setSelectedQuartier] = useState(null);

    const fetchQuartiers = async () => {
        try {
            const res = await getQuartiers();
            setQuartiers(res.data);
        } catch (err) {
            console.error("Erreur chargement quartiers", err);
            // Mock data
            setQuartiers([
                { id: 1, nom: "Agdal" },
                { id: 2, nom: "Hay Riad" },
                { id: 3, nom: "Océan" },
                { id: 4, nom: "Hassan" },
                { id: 5, nom: "Yacoub El Mansour" },
                { id: 6, nom: "Souissi" },
                { id: 7, nom: "Akkari" },
                { id: 8, nom: "Takaddoum" },
                { id: 9, nom: "Youssoufia" },
                { id: 10, nom: "Médina" },
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuartiers();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await createQuartier(newQuartier);
            setShowModal(false);
            setNewQuartier({ nom: "" });
            fetchQuartiers();
        } catch (err) {
            console.error("Erreur création quartier", err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce quartier ?")) {
            try {
                await deleteQuartier(id);
                fetchQuartiers();
            } catch (err) {
                console.error("Erreur suppression quartier", err);
            }
        }
    };

    const filteredQuartiers = quartiers.filter((q) =>
        q.nom?.toLowerCase().includes(search.toLowerCase())
    );

    const colors = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f97316", "#ec4899"];

    return (
        <div className="app-container">
            <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

            <main className={`main-content ${sidebarCollapsed ? "main-content-expanded" : ""}`}>
                <Navbar title="Quartiers" subtitle="Gestion des zones géographiques de Rabat" />

                <div className="page">
                    <div className="page-header">
                        <div>
                            <h1 className="page-title">Liste des Quartiers</h1>
                            <p className="page-subtitle">{quartiers.length} quartiers au total</p>
                        </div>
                        <button className="btn-primary" onClick={() => setShowModal(true)}>
                            <Plus size={18} />
                            Nouveau Quartier
                        </button>
                    </div>

                    {loading ? (
                        <Loader />
                    ) : (
                        <>
                            {/* Map Section */}
                            <div className="chart-container" style={{ marginBottom: "24px" }}>
                                <div className="chart-header">
                                    <h3 className="chart-title">
                                        <Map size={18} style={{ marginRight: "8px", color: "var(--primary-400)" }} />
                                        Carte Interactive - Rabat
                                    </h3>
                                    <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                                        Cliquez sur les zones pour voir les détails
                                    </div>
                                </div>
                                <InteractiveMap
                                    height="300px"
                                    onQuartierClick={(q) => setSelectedQuartier(q)}
                                />
                            </div>

                            {/* Selected Quartier Info */}
                            {selectedQuartier && (
                                <div
                                    className="card animate-slide-up"
                                    style={{
                                        marginBottom: "24px",
                                        background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))",
                                        border: "1px solid rgba(59, 130, 246, 0.3)"
                                    }}
                                >
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                            <div style={{
                                                width: 50,
                                                height: 50,
                                                borderRadius: "12px",
                                                background: "linear-gradient(135deg, var(--primary-500), var(--accent-cyan))",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}>
                                                <MapPin size={24} color="white" />
                                            </div>
                                            <div>
                                                <h4 style={{ fontSize: "1.25rem", marginBottom: "4px" }}>{selectedQuartier.nom}</h4>
                                                <span style={{ color: "#64748b" }}>{selectedQuartier.agents} agents • {selectedQuartier.compteurs} compteurs</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setSelectedQuartier(null)}
                                            style={{ background: "transparent", padding: "8px", boxShadow: "none" }}
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Search */}
                            <div style={{ marginBottom: "24px" }}>
                                <div className="data-table-search" style={{ display: "inline-flex" }}>
                                    <Search size={18} color="#64748b" />
                                    <input
                                        type="text"
                                        placeholder="Rechercher un quartier..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        style={{ width: "300px" }}
                                    />
                                </div>
                            </div>

                            {/* Grid of quartiers */}
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                                    gap: "20px",
                                }}
                            >
                                {filteredQuartiers.map((quartier, index) => (
                                    <div
                                        key={quartier.id}
                                        className="card animate-slide-up"
                                        style={{
                                            animationDelay: `${index * 0.05}s`,
                                            position: "relative",
                                            overflow: "hidden",
                                        }}
                                    >
                                        {/* Color bar */}
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                width: "100%",
                                                height: "4px",
                                                background: colors[index % colors.length],
                                            }}
                                        ></div>

                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                                <div
                                                    style={{
                                                        width: 50,
                                                        height: 50,
                                                        borderRadius: "12px",
                                                        background: `${colors[index % colors.length]}20`,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                    }}
                                                >
                                                    <MapPin size={24} color={colors[index % colors.length]} />
                                                </div>
                                                <div>
                                                    <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "4px" }}>
                                                        {quartier.nom}
                                                    </h3>
                                                    <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
                                                        Rabat, Maroc
                                                    </span>
                                                </div>
                                            </div>

                                            <div style={{ display: "flex", gap: "8px" }}>
                                                <button
                                                    style={{
                                                        width: 36,
                                                        height: 36,
                                                        padding: 0,
                                                        background: "var(--bg-tertiary)",
                                                        boxShadow: "none",
                                                    }}
                                                    title="Modifier"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(quartier.id)}
                                                    style={{
                                                        width: 36,
                                                        height: 36,
                                                        padding: 0,
                                                        background: "rgba(239, 68, 68, 0.1)",
                                                        color: "#ef4444",
                                                        boxShadow: "none",
                                                    }}
                                                    title="Supprimer"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {filteredQuartiers.length === 0 && (
                                <div className="empty-state">
                                    <div className="empty-state-icon">
                                        <MapPin size={32} />
                                    </div>
                                    <h3 className="empty-state-title">Aucun quartier trouvé</h3>
                                    <p className="empty-state-text">
                                        Aucun quartier ne correspond à votre recherche.
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>

            {/* Modal Create */}
            {showModal && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "rgba(0, 0, 0, 0.6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000,
                    }}
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="card animate-slide-up"
                        style={{ width: "400px", maxWidth: "90%" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
                            <h3>Nouveau Quartier</h3>
                            <button
                                onClick={() => setShowModal(false)}
                                style={{ background: "transparent", padding: "4px", boxShadow: "none" }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleCreate}>
                            <div style={{ marginBottom: "20px" }}>
                                <label>Nom du quartier</label>
                                <input
                                    type="text"
                                    placeholder="Ex: Agdal"
                                    value={newQuartier.nom}
                                    onChange={(e) => setNewQuartier({ ...newQuartier, nom: e.target.value })}
                                    required
                                />
                            </div>

                            <button type="submit" style={{ width: "100%" }}>
                                <Plus size={18} />
                                Créer le quartier
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Quartiers;
