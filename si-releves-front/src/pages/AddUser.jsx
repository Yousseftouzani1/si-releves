import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import { createUser } from "../api/users";
import "../styles/layout.css";

const AddUser = () => {
  const navigate = useNavigate();

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!nom || !prenom || !email || !role) {
      setError("Tous les champs sont obligatoires");
      return;
    }

    setSaving(true);
    try {
      await createUser({
        nom: nom.toUpperCase(),      // règle CDC
        prenom: prenom,
        email,
        role,
      });

      alert("Utilisateur créé avec succès");
      navigate("/admin/utilisateurs");
    } catch (err) {
      console.error("Erreur création utilisateur", err);
      setError("Erreur lors de la création de l’utilisateur");
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
          <h2 style={{ marginBottom: "20px" }}>Ajouter un utilisateur</h2>

          <div className="card" style={{ maxWidth: "500px" }}>
            {error && (
              <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>
            )}

            <form onSubmit={handleSubmit}>
              <label>Nom</label>
              <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder="DRIOUECH"
              />

              <label>Prénom</label>
              <input
                type="text"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                placeholder="Ali"
              />

              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ali@ree.ma"
              />

              <label>Rôle</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">-- Sélectionner un rôle --</option>
                <option value="UTILISATEUR">Utilisateur</option>
                <option value="SUPERADMIN">Superadmin</option>
              </select>

              <button type="submit" disabled={saving}>
                {saving ? "Enregistrement..." : "Créer l’utilisateur"}
              </button>
            </form>

            <div style={{ marginTop: "15px" }}>
              <Link to="/admin/utilisateurs">← Retour à la liste</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
