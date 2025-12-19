import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { createCompteur } from "../api/compteurs";
import { getQuartiers } from "../api/quartiers";
import { useToast } from "../context/ToastContext";
import {
  ArrowLeft,
  Save,
  Loader2,
  Gauge,
  Droplets,
  Zap,
  MapPin,
  Home,
  Hash,
  Calendar,
  User,
  Building
} from "lucide-react";
import "../styles/layout.css";

const AddCompteur = () => {
  const navigate = useNavigate();
  const { success, error } = useToast();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quartiers, setQuartiers] = useState([]);

  const [formData, setFormData] = useState({
    numero: "",
    type: "EAU",
    indexActuel: 0,
    adresse: {
      rue: "",
      ville: "Rabat",
      codePostal: "",
      pays: "Maroc"
    },
    quartierId: "",
    proprietaire: "",
    dateInstallation: new Date().toISOString().split('T')[0],
    statut: "ACTIF",
    marque: "",
    modele: "",
    puissance: ""
  });

  useEffect(() => {
    const fetchQuartiers = async () => {
      try {
        const res = await getQuartiers();
        setQuartiers(res.data);
      } catch (err) {
        // Mock data
        setQuartiers([
          { id: 1, nom: "Agdal" },
          { id: 2, nom: "Hay Riad" },
          { id: 3, nom: "Souissi" },
          { id: 4, nom: "Hassan" },
          { id: 5, nom: "Yacoub El Mansour" },
        ]);
      }
    };
    fetchQuartiers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("adresse.")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        adresse: { ...formData.adresse, [field]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Auto-generate compteur number
  const generateNumero = () => {
    const random = Math.floor(100000000 + Math.random() * 900000000);
    setFormData({ ...formData, numero: random.toString() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation du numéro (9 chiffres)
    if (!/^\d{9}$/.test(formData.numero)) {
      error("Le numéro de compteur doit contenir exactement 9 chiffres");
      return;
    }

    setLoading(true);
    try {
      await createCompteur(formData);
      success("Compteur créé avec succès !");
      navigate("/compteurs");
    } catch (err) {
      error("Erreur lors de la création du compteur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      <main className={`main-content ${sidebarCollapsed ? "main-content-expanded" : ""}`}>
        <Navbar title="Nouveau Compteur" subtitle="Enregistrer un nouveau compteur" />

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
              {/* Informations Compteur */}
              <div className="card">
                <h3 style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <Gauge size={20} color="var(--primary-400)" />
                  Informations Compteur
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {/* Numéro */}
                  <div>
                    <label style={styles.label}>
                      <Hash size={14} /> Numéro de compteur (9 chiffres)
                    </label>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <input
                        type="text"
                        name="numero"
                        placeholder="000000000"
                        value={formData.numero}
                        onChange={handleChange}
                        maxLength={9}
                        pattern="\d{9}"
                        required
                        style={{ ...styles.input, fontFamily: "monospace", letterSpacing: "2px" }}
                      />
                      <button
                        type="button"
                        onClick={generateNumero}
                        style={{ whiteSpace: "nowrap", background: "var(--bg-tertiary)", boxShadow: "none" }}
                      >
                        Générer
                      </button>
                    </div>
                  </div>

                  {/* Type */}
                  <div>
                    <label style={styles.label}>Type de compteur</label>
                    <div style={{ display: "flex", gap: "12px" }}>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, type: "EAU" })}
                        style={{
                          flex: 1,
                          padding: "16px",
                          borderRadius: "12px",
                          border: `2px solid ${formData.type === "EAU" ? "#06b6d4" : "var(--border-color)"}`,
                          background: formData.type === "EAU" ? "rgba(6, 182, 212, 0.1)" : "var(--bg-tertiary)",
                          color: formData.type === "EAU" ? "#06b6d4" : "var(--text-muted)",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "8px",
                          boxShadow: "none",
                        }}
                      >
                        <Droplets size={28} />
                        <span style={{ fontWeight: 600 }}>Eau</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, type: "ELECTRICITE" })}
                        style={{
                          flex: 1,
                          padding: "16px",
                          borderRadius: "12px",
                          border: `2px solid ${formData.type === "ELECTRICITE" ? "#f97316" : "var(--border-color)"}`,
                          background: formData.type === "ELECTRICITE" ? "rgba(249, 115, 22, 0.1)" : "var(--bg-tertiary)",
                          color: formData.type === "ELECTRICITE" ? "#f97316" : "var(--text-muted)",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "8px",
                          boxShadow: "none",
                        }}
                      >
                        <Zap size={28} />
                        <span style={{ fontWeight: 600 }}>Électricité</span>
                      </button>
                    </div>
                  </div>

                  {/* Index initial */}
                  <div>
                    <label style={styles.label}>Index initial</label>
                    <input
                      type="number"
                      name="indexActuel"
                      value={formData.indexActuel}
                      onChange={handleChange}
                      min={0}
                      style={styles.input}
                    />
                  </div>

                  {/* Quartier */}
                  <div>
                    <label style={styles.label}>
                      <MapPin size={14} /> Quartier
                    </label>
                    <select
                      name="quartierId"
                      value={formData.quartierId}
                      onChange={handleChange}
                      required
                      style={styles.input}
                    >
                      <option value="">Sélectionner un quartier</option>
                      {quartiers.map((q) => (
                        <option key={q.id} value={q.id}>{q.nom}</option>
                      ))}
                    </select>
                  </div>

                  {/* Date installation */}
                  <div>
                    <label style={styles.label}>
                      <Calendar size={14} /> Date d'installation
                    </label>
                    <input
                      type="date"
                      name="dateInstallation"
                      value={formData.dateInstallation}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>
                </div>
              </div>

              {/* Adresse & Propriétaire */}
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div className="card">
                  <h3 style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                    <Home size={20} color="var(--primary-400)" />
                    Adresse d'installation
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div>
                      <label style={styles.label}>Rue</label>
                      <input
                        type="text"
                        name="adresse.rue"
                        placeholder="123 Avenue Mohammed V"
                        value={formData.adresse.rue}
                        onChange={handleChange}
                        required
                        style={styles.input}
                      />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "12px" }}>
                      <div>
                        <label style={styles.label}>Ville</label>
                        <input
                          type="text"
                          name="adresse.ville"
                          value={formData.adresse.ville}
                          onChange={handleChange}
                          required
                          style={styles.input}
                        />
                      </div>
                      <div>
                        <label style={styles.label}>Code Postal</label>
                        <input
                          type="text"
                          name="adresse.codePostal"
                          placeholder="10000"
                          value={formData.adresse.codePostal}
                          onChange={handleChange}
                          style={styles.input}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h3 style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                    <User size={20} color="var(--primary-400)" />
                    Propriétaire
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div>
                      <label style={styles.label}>Nom complet</label>
                      <input
                        type="text"
                        name="proprietaire"
                        placeholder="Mohammed Alami"
                        value={formData.proprietaire}
                        onChange={handleChange}
                        style={styles.input}
                      />
                    </div>

                    <div>
                      <label style={styles.label}>Statut</label>
                      <select
                        name="statut"
                        value={formData.statut}
                        onChange={handleChange}
                        style={styles.input}
                      >
                        <option value="ACTIF">Actif</option>
                        <option value="SUSPENDU">Suspendu</option>
                        <option value="RESILIE">Résilié</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Caractéristiques techniques (optionnel) */}
                <div className="card">
                  <h3 style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                    <Building size={20} color="var(--primary-400)" />
                    Caractéristiques (optionnel)
                  </h3>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div>
                      <label style={styles.label}>Marque</label>
                      <input
                        type="text"
                        name="marque"
                        placeholder="Itron"
                        value={formData.marque}
                        onChange={handleChange}
                        style={styles.input}
                      />
                    </div>
                    <div>
                      <label style={styles.label}>Modèle</label>
                      <input
                        type="text"
                        name="modele"
                        placeholder="CYBLE"
                        value={formData.modele}
                        onChange={handleChange}
                        style={styles.input}
                      />
                    </div>
                  </div>
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
                    Créer le compteur
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

export default AddCompteur;
