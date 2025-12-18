import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import { getDashboardKpis } from "../api/dashboard";
import "../styles/layout.css";

const Dashboard = () => {
  const [kpis, setKpis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKpis = async () => {
      try {
        const response = await getDashboardKpis();
        setKpis(response.data);
      } catch (error) {
        console.error("Erreur chargement KPIs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKpis();
  }, []);

  return (
    <div className="app-container">
      <Sidebar />

      <div className="content">
        <Navbar />

        <div className="page">
          <h2 style={{ marginBottom: "20px" }}>Dashboard</h2>

          {loading && <Loader />}

          {!loading && kpis && (
            <div style={styles.grid}>
              <div className="card">
                <h3>Taux de couverture</h3>
                <p style={styles.value}>{kpis.tauxCouverture} %</p>
              </div>

              <div className="card">
                <h3>Relèves / jour</h3>
                <p style={styles.value}>{kpis.relevesParJour}</p>
              </div>

              <div className="card">
                <h3>Consommation eau</h3>
                <p style={styles.value}>{kpis.consommationMoyenneEau} m³</p>
              </div>

              <div className="card">
                <h3>Consommation électricité</h3>
                <p style={styles.value}>
                  {kpis.consommationMoyenneElectricite} kWh
                </p>
              </div>
            </div>
          )}

          {!loading && !kpis && (
            <p>Impossible de charger les données du dashboard.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
  },
  value: {
    fontSize: "24px",
    fontWeight: "bold",
    marginTop: "10px",
    color: "#2563eb",
  },
};

export default Dashboard;
