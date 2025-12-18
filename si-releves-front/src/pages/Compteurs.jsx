import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import { getCompteurs } from "../api/compteurs";
import "../styles/layout.css";

const Compteurs = () => {
  const [compteurs, setCompteurs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompteurs = async () => {
      try {
        const response = await getCompteurs();
        setCompteurs(response.data);
      } catch (error) {
        console.error("Erreur chargement compteurs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompteurs();
  }, []);

  return (
    <div className="app-container">
      <Sidebar />

      <div className="content">
        <Navbar />

        <div className="page">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h2>Liste des compteurs</h2>

            <Link to="/compteurs/nouveau">
              <button>+ Ajouter un compteur</button>
            </Link>
          </div>

          {loading && <Loader />}

          {!loading && (
            <div className="card">
              {compteurs.length === 0 ? (
                <p>Aucun compteur trouvé</p>
              ) : (
                <table width="100%">
                  <thead>
                    <tr>
                      <th>Numéro</th>
                      <th>Type</th>
                      <th>Adresse</th>
                      <th>Index actuel</th>
                      <th>Détails</th>
                    </tr>
                  </thead>
                  <tbody>
                    {compteurs.map((compteur) => (
                      <tr key={compteur.id}>
                        <td>{compteur.numero}</td>
                        <td>{compteur.type}</td>
                        <td>{compteur.adresse?.adresseComplete || "-"}</td>
                        <td>{compteur.indexActuel}</td>
                        <td>
                          <Link to={`/compteurs/${compteur.id}`}>
                            Voir
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Compteurs;
