import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { changePassword } from "../api/auth";
import "../styles/layout.css";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [ancienMotDePasse, setAncienMotDePasse] = useState("");
  const [nouveauMotDePasse, setNouveauMotDePasse] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!ancienMotDePasse || !nouveauMotDePasse || !confirmation) {
      setError("Tous les champs sont obligatoires");
      return;
    }

    if (nouveauMotDePasse !== confirmation) {
      setError("La confirmation ne correspond pas");
      return;
    }

    setSaving(true);
    try {
      await changePassword(ancienMotDePasse, nouveauMotDePasse);
      setSuccess("Mot de passe modifié avec succès");

      // Redirection après succès
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      console.error("Erreur changement mot de passe", err);
      setError("Ancien mot de passe incorrect");
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
          <h2 style={{ marginBottom: "20px" }}>Changer le mot de passe</h2>

          <div className="card" style={{ maxWidth: "450px" }}>
            {error && (
              <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>
            )}
            {success && (
              <p style={{ color: "green", marginBottom: "10px" }}>{success}</p>
            )}

            <form onSubmit={handleSubmit}>
              <label>Ancien mot de passe</label>
              <input
                type="password"
                value={ancienMotDePasse}
                onChange={(e) => setAncienMotDePasse(e.target.value)}
              />

              <label>Nouveau mot de passe</label>
              <input
                type="password"
                value={nouveauMotDePasse}
                onChange={(e) => setNouveauMotDePasse(e.target.value)}
              />

              <label>Confirmation du mot de passe</label>
              <input
                type="password"
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
              />

              <button type="submit" disabled={saving}>
                {saving ? "Enregistrement..." : "Modifier le mot de passe"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
