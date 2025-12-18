import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import { getAgentById, assignAgentToQuartier } from "../api/agents";
import api from "../api/axios";
import "../styles/layout.css";

const AgentDetail = () => {
  const { id } = useParams();

  const [agent, setAgent] = useState(null);
  const [quartiers, setQuartiers] = useState([]);
  const [quartierId, setQuartierId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const agentRes = await getAgentById(id);
        setAgent(agentRes.data);
        setQuartierId(agentRes.data.quartier?.id || "");

        const quartiersRes = await api.get("/quartiers");
        setQuartiers(quartiersRes.data);
      } catch (error) {
        console.error("Erreur chargement agent", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAssignQuartier = async () => {
    if (!quartierId) return;

    setSaving(true);
    try {
      await assignAgentToQuartier(id, quartierId);
      alert("Quartier mis à jour avec succès");
    } catch (error) {
      console.error("Erreur affectation quartier", error);
      alert("Erreur lors de la mise à jour");
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
          <h2 style={{ marginBottom: "20px" }}>Détail de l’agent</h2>

          {loading && <Loader />}

          {!loading && agent && (
            <div className="card">
              <p><strong>Nom :</strong> {agent.nom}</p>
              <p><strong>Prénom :</strong> {agent.prenom}</p>
              <p><strong>Téléphone personnel :</strong> {agent.telephonePersonnel}</p>
              <p><strong>Téléphone professionnel :</strong> {agent.telephoneProfessionnel}</p>

              <hr style={{ margin: "20px 0" }} />

              <label><strong>Quartier d’affectation</strong></label>
              <select
                value={quartierId}
                onChange={(e) => setQuartierId(e.target.value)}
              >
                <option value="">-- Sélectionner un quartier --</option>
                {quartiers.map((q) => (
                  <option key={q.id} value={q.id}>
                    {q.nom}
                  </option>
                ))}
              </select>

              <button
                onClick={handleAssignQuartier}
                disabled={saving}
                style={{ marginTop: "10px" }}
              >
                {saving ? "Enregistrement..." : "Enregistrer"}
              </button>

              <div style={{ marginTop: "20px" }}>
                <Link to="/agents">← Retour à la liste</Link>
              </div>
            </div>
          )}

          {!loading && !agent && (
            <p>Agent introuvable</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentDetail;
