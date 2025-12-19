import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { createQuartier } from "../api/quartiers";
import { useToast } from "../context/ToastContext";
import {
    ArrowLeft,
    Save,
    Loader2,
    MapPin,
    Building,
    Users,
    Gauge,
    Map
} from "lucide-react";
import "../styles/layout.css";

const AddQuartier = () => {
    const navigate = useNavigate();
    const { success, error } = useToast();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        nom: "",
        ville: "Rabat",
        description: "",
        codePostal: "",
        superficie: "",
        population: "",
        coordonnees: {
            latitude: 34.0209,
            longitude: -6.8416
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("coordonnees.")) {
            const field = name.split(".")[1];
            setFormData({
                ...formData,
                coordonnees: { ...formData.coordonnees, [field]: parseFloat(value) || 0 }
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.nom.trim()) {
            error("Le nom du quartier est obligatoire");
            return;
        }

        setLoading(true);
        try {
            await createQuartier(formData);
            success("Quartier créé avec succès !");
            navigate("/quartiers");
        } catch (err) {
            error("Erreur lors de la création du quartier");
        } finally {
            setLoading(false);
        }
    };

    // Preset locations for Rabat quartiers
    const presetLocations = [
        { name: "Agdal", lat: 33.9866, lng: -6.8498 },
        { name: "Hay Riad", lat: 33.9534, lng: -6.8708 },
        { name: "Souissi", lat: 33.9722, lng: -6.8567 },
        { name: "Hassan", lat: 34.0172, lng: -6.8277 },
        { name: "Yacoub El Mansour", lat: 33.9939, lng: -6.8633 },
        { name: "L'Océan", lat: 34.0259, lng: -6.8409 },
        { name: "Médina", lat: 34.0312, lng: -6.8345 },
        { name: "Akkari", lat: 34.0072, lng: -6.8456 },
    ];

    return (
        <div className="app-container">
            <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

            <main className={`main-content ${sidebarCollapsed ? "main-content-expanded" : ""}`}>
                <Navbar title="Nouveau Quartier" subtitle="Ajouter une zone de gestion" />

                <div className="page">
                    <div className="page-header">
                        <button
                            onClick={() => navigate(-1)}
                            style={{ background: "var(--bg-tertiary)", boxShadow: "none" }}
                        >
                            <ArrowLeft size={18} />
                            Retour
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                            {/* Informations Quartier */}
                            <div className="card">
                                <h3 style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                                    <MapPin size={20} color="var(--primary-400)" />
                                    Informations du Quartier
                                </h3>

                                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                    {/* Nom */}
                                    <div>
                                        <label style={styles.label}>Nom du quartier *</label>
                                        <input
                                            type="text"
                                            name="nom"
                                            placeholder="Ex: Agdal, Hay Riad..."
                                            value={formData.nom}
                                            onChange={handleChange}
                                            required
                                            style={styles.input}
                                        />
                                    </div>

                                    {/* Quickfill */}
                                    <div>
                                        <label style={styles.label}>Remplissage rapide</label>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                            {presetLocations.map((loc) => (
                                                <button
                                                    key={loc.name}
                                                    type="button"
                                                    onClick={() => setFormData({
                                                        ...formData,
                                                        nom: loc.name,
                                                        coordonnees: { latitude: loc.lat, longitude: loc.lng }
                                                    })}
                                                    style={{
                                                        padding: "6px 12px",
                                                        fontSize: "0.8rem",
                                                        borderRadius: "20px",
                                                        background: formData.nom === loc.name ? "var(--primary-500)" : "var(--bg-tertiary)",
                                                        color: formData.nom === loc.name ? "white" : "var(--text-muted)",
                                                        border: "none",
                                                        boxShadow: "none",
                                                    }}
                                                >
                                                    {loc.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Ville */}
                                    <div>
                                        <label style={styles.label}>
                                            <Building size={14} /> Ville
                                        </label>
                                        <input
                                            type="text"
                                            name="ville"
                                            value={formData.ville}
                                            onChange={handleChange}
                                            required
                                            style={styles.input}
                                        />
                                    </div>

                                    {/* Code Postal */}
                                    <div>
                                        <label style={styles.label}>Code Postal</label>
                                        <input
                                            type="text"
                                            name="codePostal"
                                            placeholder="10000"
                                            value={formData.codePostal}
                                            onChange={handleChange}
                                            style={styles.input}
                                        />
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label style={styles.label}>Description</label>
                                        <textarea
                                            name="description"
                                            placeholder="Description du quartier..."
                                            value={formData.description}
                                            onChange={handleChange}
                                            rows={3}
                                            style={{ ...styles.input, resize: "vertical" }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Statistiques & Coordonnées */}
                            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                                <div className="card">
                                    <h3 style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                                        <Users size={20} color="var(--primary-400)" />
                                        Statistiques (optionnel)
                                    </h3>

                                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                                            <div>
                                                <label style={styles.label}>Superficie (km²)</label>
                                                <input
                                                    type="number"
                                                    name="superficie"
                                                    placeholder="2.5"
                                                    value={formData.superficie}
                                                    onChange={handleChange}
                                                    step="0.1"
                                                    style={styles.input}
                                                />
                                            </div>
                                            <div>
                                                <label style={styles.label}>Population</label>
                                                <input
                                                    type="number"
                                                    name="population"
                                                    placeholder="50000"
                                                    value={formData.population}
                                                    onChange={handleChange}
                                                    style={styles.input}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card">
                                    <h3 style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                                        <Map size={20} color="var(--primary-400)" />
                                        Coordonnées GPS
                                    </h3>

                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                                        <div>
                                            <label style={styles.label}>Latitude</label>
                                            <input
                                                type="number"
                                                name="coordonnees.latitude"
                                                value={formData.coordonnees.latitude}
                                                onChange={handleChange}
                                                step="0.0001"
                                                style={styles.input}
                                            />
                                        </div>
                                        <div>
                                            <label style={styles.label}>Longitude</label>
                                            <input
                                                type="number"
                                                name="coordonnees.longitude"
                                                value={formData.coordonnees.longitude}
                                                onChange={handleChange}
                                                step="0.0001"
                                                style={styles.input}
                                            />
                                        </div>
                                    </div>

                                    {/* Mini map preview */}
                                    <div style={{
                                        marginTop: "16px",
                                        height: "150px",
                                        borderRadius: "12px",
                                        background: "var(--bg-tertiary)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        border: "1px solid var(--border-color)",
                                    }}>
                                        <div style={{ textAlign: "center", color: "var(--text-muted)" }}>
                                            <MapPin size={32} style={{ marginBottom: "8px", opacity: 0.5 }} />
                                            <div style={{ fontSize: "0.8rem" }}>
                                                {formData.coordonnees.latitude.toFixed(4)}, {formData.coordonnees.longitude.toFixed(4)}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Info box */}
                                <div style={{
                                    padding: "16px",
                                    borderRadius: "12px",
                                    background: "rgba(59, 130, 246, 0.1)",
                                    border: "1px solid rgba(59, 130, 246, 0.2)",
                                }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                                        <Gauge size={16} color="var(--primary-400)" />
                                        <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>À savoir</span>
                                    </div>
                                    <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>
                                        Les quartiers permettent d'organiser les compteurs et d'affecter les agents
                                        à des zones géographiques spécifiques pour optimiser les relevés.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Submit */}
                        <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                style={{ background: "var(--bg-tertiary)", boxShadow: "none" }}
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary"
                                style={{ opacity: loading ? 0.7 : 1 }}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Création...
                                    </>
                                ) : (
                                    <>
                                        <Save size={18} />
                                        Créer le quartier
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

const styles = {
    label: {
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "0.85rem",
        fontWeight: 500,
        color: "var(--text-muted)",
        marginBottom: "8px",
    },
    input: {
        width: "100%",
        padding: "12px 14px",
        fontSize: "0.9rem",
        background: "var(--bg-tertiary)",
        border: "1px solid var(--border-color)",
        borderRadius: "10px",
        color: "var(--text-primary)",
    },
};

export default AddQuartier;
