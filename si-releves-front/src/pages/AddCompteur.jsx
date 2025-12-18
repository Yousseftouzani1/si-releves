import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import { createCompteur } from "../api/compteurs";
import api from "../api/axios";
import "../styles/layout.css";

const AddCompteur = () => {
  const navigate = useNavigate();

  const [adresses, setAdresses] = useState([]);
  const [adresseId, setAdresseId] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdresses = async () => {
      try {
        // Adresses sans compteur
        const response = await api.get("/adresses/sans-compteur");
        setAdresses(response.data);
      } catch (err) {
        console.error("Erreur chargement adresses", err);
        setError("Impossible de charger les adresses");
      } finally {
        setLoading(false);
      }
    };

    fetchAdresses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!adresseId || !type) {
      setError("Veuillez sélectionner une adresse et un type");
      return;
    }

    setSaving(true);
    try {
      await createCompteur({ adresseId, type });
      alert("Compteur créé avec succès");
      navigate("/compteurs");
    } catch (err) {
      console.error("Erreur création compteur", err);
      setError("Erreur lors de la création du compteur");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="app-container">
      <Sidebar />

      <div className="content">
        <Navbar />

        <div className="page">
          <h2 style={{ marginBottom: "20px" }}>Ajouter un compteur</h2>

          {loading && <Loader />}

          {!loading && (
            <div className="card" style={{ maxWidth: "500px" }}>
              {error && (
                <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>
              )}

              <form onSubmit={handleSubmit}>
                <label>Adresse</label>
                <select
                  value={adresseId}
                  onChange={(e) => setAdresseId(e.target.value)}
                >
                  <option value="">-- Sélectionner une adresse --</option>
                  {adresses.map((adresse) => (
                    <option key={adresse.id} value={adresse.id}>
                      {adresse.adresseComplete}
                    </option>
                  ))}
                </select>

                <label>Type de compteur</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="">-- Sélectionner un type --</option>
                  <option value="EAU">Eau</option>
                  <option value="ELECTRICITE">Électricité</option>
                </select>

                <button type="submit" disabled={saving}>
                  {saving ? "Enregistrement..." : "Créer le compteur"}
                </button>
              </form>

              <div style={{ marginTop: "15px" }}>
                <Link to="/compteurs">← Retour à la liste</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCompteur;
