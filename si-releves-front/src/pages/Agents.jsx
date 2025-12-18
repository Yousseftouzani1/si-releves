import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import { getAgents } from "../api/agents";
import "../styles/layout.css";

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await getAgents();
        setAgents(response.data);
      } catch (error) {
        console.error("Erreur chargement agents", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  return (
    <div className="app-container">
      <Sidebar />

      <div className="content">
        <Navbar />

        <div className="page">
          <h2 style={{ marginBottom: "20px" }}>Liste des agents</h2>

          {loading && <Loader />}

          {!loading && (
            <div className="card">
              {agents.length === 0 ? (
                <p>Aucun agent trouvé</p>
              ) : (
                <table width="100%">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Téléphone</th>
                      <th>Quartier</th>
                      <th>Détails</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agents.map((agent) => (
                      <tr key={agent.id}>
                        <td>{agent.nom}</td>
                        <td>{agent.prenom}</td>
                        <td>{agent.telephoneProfessionnel}</td>
                        <td>{agent.quartier?.nom || "-"}</td>
                        <td>
                          <Link to={`/agents/${agent.id}`}>
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

export default Agents;
