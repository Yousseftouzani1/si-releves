import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import { getReleveById } from "../api/releves";
import "../styles/layout.css";

const ReleveDetail = () => {
  const { id } = useParams();
  const [releve, setReleve] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReleve = async () => {
      try {
        const response = await getReleveById(id);
        setReleve(response.data);
      } catch (error) {
        console.error("Erreur chargement relevé", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReleve();
  }, [id]);

  return (
    <div className="app-container">
      <Sidebar />

      <div className="content">
        <Navbar />

        <div className="page">
          <h2 style={{ marginBottom: "20px" }}>Détail du relevé</h2>

          {loading && <Loader />}

          {!loading && releve && (
            <div className="card">
              <p><strong>Date :</strong> {releve.dateReleve}</p>
              <p><strong>Compteur :</strong> {releve.compteur?.numero}</p>
              <p><strong>Type :</strong> {releve.compteur?.type}</p>
              <p><strong>Ancien index :</strong> {releve.ancienIndex}</p>
              <p><strong>Nouvel index :</strong> {releve.nouvelIndex}</p>
              <p><strong>Consommation :</strong> {releve.consommation}</p>

              <Link to="/releves" style={{ display: "inline-block", marginTop: "15px" }}>
                ← Retour à la liste
              </Link>
            </div>
          )}

          {!loading && !releve && (
            <p>Relevé introuvable</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReleveDetail;
