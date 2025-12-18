import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import { getReleves } from "../api/releves";
import { Link } from "react-router-dom";
import "../styles/layout.css";

const Releves = () => {
  const [releves, setReleves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReleves = async () => {
      try {
        const response = await getReleves();
        setReleves(response.data);
      } catch (error) {
        console.error("Erreur chargement relevés", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReleves();
  }, []);

  return (
    <div className="app-container">
      <Sidebar />

      <div className="content">
        <Navbar />

        <div className="page">
          <h2 style={{ marginBottom: "20px" }}>Liste des relevés</h2>

          {loading && <Loader />}

          {!loading && (
            <div className="card">
              {releves.length === 0 ? (
                <p>Aucun relevé trouvé</p>
              ) : (
                <table width="100%">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Compteur</th>
                      <th>Type</th>
                      <th>Consommation</th>
                      <th>Détails</th>
                    </tr>
                  </thead>
                  <tbody>
                    {releves.map((releve) => (
                      <tr key={releve.id}>
                        <td>{releve.dateReleve}</td>
                        <td>{releve.compteur?.numero}</td>
                        <td>{releve.compteur?.type}</td>
                        <td>{releve.consommation}</td>
                        <td>
                          <Link to={`/releves/${releve.id}`}>
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

export default Releves;
