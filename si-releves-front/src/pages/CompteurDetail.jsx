import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import { getCompteurById, getRelevesByCompteur } from "../api/compteurs";
import "../styles/layout.css";

const CompteurDetail = () => {
  const { id } = useParams();

  const [compteur, setCompteur] = useState(null);
  const [releves, setReleves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const compteurRes = await getCompteurById(id);
        setCompteur(compteurRes.data);

        const relevesRes = await getRelevesByCompteur(id);
        setReleves(relevesRes.data);
      } catch (error) {
        console.error("Erreur chargement compteur", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="app-container">
      <Sidebar />

      <div className="content">
        <Navbar />

        <div className="page">
          <h2 style={{ marginBottom: "20px" }}>Détail du compteur</h2>

          {loading && <Loader />}

          {!loading && compteur && (
            <>
              {/* Informations compteur */}
              <div className="card" style={{ marginBottom: "20px" }}>
                <p><strong>Numéro :</strong> {compteur.numero}</p>
                <p><strong>Type :</strong> {compteur.type}</p>
                <p><strong>Adresse :</strong> {compteur.adresse?.adresseComplete}</p>
                <p><strong>Index actuel :</strong> {compteur.indexActuel}</p>
                <p><strong>Date dernière relève :</strong> {compteur.dateDerniereReleve || "-"}</p>
              </div>

              {/* Historique des relevés */}
              <div className="card">
                <h3 style={{ marginBottom: "10px" }}>Historique des relevés</h3>

                {releves.length === 0 ? (
                  <p>Aucun relevé pour ce compteur</p>
                ) : (
                  <table width="100%">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Ancien index</th>
                        <th>Nouvel index</th>
                        <th>Consommation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {releves.map((r) => (
                        <tr key={r.id}>
                          <td>{r.dateReleve}</td>
                          <td>{r.ancienIndex}</td>
                          <td>{r.nouvelIndex}</td>
                          <td>{r.consommation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              <div style={{ marginTop: "20px" }}>
                <Link to="/compteurs">← Retour à la liste</Link>
              </div>
            </>
          )}

          {!loading && !compteur && (
            <p>Compteur introuvable</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompteurDetail;
