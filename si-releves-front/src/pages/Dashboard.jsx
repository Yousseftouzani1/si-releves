import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import InteractiveMap from "../components/InteractiveMap";
import { getDashboardStats } from "../api/dashboard";
import {
  FileText,
  Users,
  Gauge,
  MapPin,
  TrendingUp,
  TrendingDown,
  Activity,
  Droplets,
  Zap,
  Calendar,
  Clock,
  Target,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  PieChart,
  Sparkles
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart as RechartsPie, Pie, Cell } from "recharts";
import "../styles/layout.css";

// Mock data for charts
const monthlyData = [
  { name: "Jan", eau: 4200, elec: 3800 },
  { name: "Fév", eau: 3800, elec: 4100 },
  { name: "Mar", eau: 5100, elec: 4300 },
  { name: "Avr", eau: 4600, elec: 3900 },
  { name: "Mai", eau: 5400, elec: 4800 },
  { name: "Juin", eau: 4900, elec: 5200 },
];

const typeDistribution = [
  { name: "Eau", value: 58, color: "#06b6d4" },
  { name: "Électricité", value: 42, color: "#f97316" },
];

const Dashboard = () => {
  const { role } = useAuth();
  const { success } = useToast();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [stats, setStats] = useState({
    totalReleves: 0,
    totalAgents: 0,
    totalCompteurs: 0,
    totalQuartiers: 0,
    relevesAujourdHui: 0,
    compteursEau: 0,
    compteursElectricite: 0,
  });
  const [selectedQuartier, setSelectedQuartier] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getDashboardStats();
        setStats(res.data);
      } catch (err) {
        console.error("Erreur chargement stats", err);
        // Mock data
        setStats({
          totalReleves: 1247,
          totalAgents: 24,
          totalCompteurs: 856,
          totalQuartiers: 10,
          relevesAujourdHui: 47,
          compteursEau: 498,
          compteursElectricite: 358,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Different dashboard views based on role
  const renderSuperAdminDashboard = () => (
    <>
      {/* KPI Grid - 6 cards */}
      <div className="kpi-grid" style={{ gridTemplateColumns: "repeat(6, 1fr)" }}>
        <div className="kpi-card animate-slide-up">
          <div className="kpi-card-header">
            <div className="kpi-card-icon blue"><FileText size={24} /></div>
            <div className="kpi-card-trend up"><TrendingUp size={12} /> +12%</div>
          </div>
          <div className="kpi-card-value">{stats.totalReleves.toLocaleString()}</div>
          <div className="kpi-card-label">Relevés Totaux</div>
        </div>

        <div className="kpi-card animate-slide-up" style={{ animationDelay: "0.05s" }}>
          <div className="kpi-card-header">
            <div className="kpi-card-icon purple"><Users size={24} /></div>
          </div>
          <div className="kpi-card-value">{stats.totalAgents}</div>
          <div className="kpi-card-label">Agents Actifs</div>
        </div>

        <div className="kpi-card animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="kpi-card-header">
            <div className="kpi-card-icon cyan"><Droplets size={24} /></div>
          </div>
          <div className="kpi-card-value">{stats.compteursEau}</div>
          <div className="kpi-card-label">Compteurs Eau</div>
        </div>

        <div className="kpi-card animate-slide-up" style={{ animationDelay: "0.15s" }}>
          <div className="kpi-card-header">
            <div className="kpi-card-icon orange"><Zap size={24} /></div>
          </div>
          <div className="kpi-card-value">{stats.compteursElectricite}</div>
          <div className="kpi-card-label">Compteurs Élec</div>
        </div>

        <div className="kpi-card animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="kpi-card-header">
            <div className="kpi-card-icon green"><MapPin size={24} /></div>
          </div>
          <div className="kpi-card-value">{stats.totalQuartiers}</div>
          <div className="kpi-card-label">Quartiers</div>
        </div>

        <div className="kpi-card animate-slide-up" style={{ animationDelay: "0.25s" }}>
          <div className="kpi-card-header">
            <div className="kpi-card-icon pink"><Calendar size={24} /></div>
            <div className="kpi-card-trend up"><TrendingUp size={12} /> +8%</div>
          </div>
          <div className="kpi-card-value">{stats.relevesAujourdHui}</div>
          <div className="kpi-card-label">Aujourd'hui</div>
        </div>
      </div>

      {/* Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px", marginBottom: "24px" }}>
        <div className="chart-container animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <div className="chart-header">
            <h3 className="chart-title">
              <BarChart3 size={18} style={{ marginRight: "8px", color: "var(--primary-400)" }} />
              Évolution des Relevés
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorEau" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorElec" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} />
              <YAxis stroke="var(--text-muted)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "8px"
                }}
              />
              <Area type="monotone" dataKey="eau" stroke="#06b6d4" fillOpacity={1} fill="url(#colorEau)" strokeWidth={2} />
              <Area type="monotone" dataKey="elec" stroke="#f97316" fillOpacity={1} fill="url(#colorElec)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container animate-slide-up" style={{ animationDelay: "0.35s" }}>
          <div className="chart-header">
            <h3 className="chart-title">
              <PieChart size={18} style={{ marginRight: "8px", color: "var(--primary-400)" }} />
              Distribution
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <RechartsPie>
              <Pie
                data={typeDistribution}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {typeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </RechartsPie>
          </ResponsiveContainer>
          <div style={{ display: "flex", justifyContent: "center", gap: "24px" }}>
            {typeDistribution.map((item) => (
              <div key={item.name} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: item.color }}></div>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map & Quick Actions */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
        <div className="chart-container animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <div className="chart-header">
            <h3 className="chart-title">
              <MapPin size={18} style={{ marginRight: "8px", color: "var(--primary-400)" }} />
              Carte des Quartiers - Rabat
            </h3>
          </div>
          <InteractiveMap height="350px" onQuartierClick={setSelectedQuartier} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Selected Quartier */}
          {selectedQuartier && (
            <div className="card animate-slide-up" style={{
              background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))",
              borderColor: "rgba(59, 130, 246, 0.3)"
            }}>
              <h4 style={{ marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <MapPin size={18} color="var(--primary-400)" />
                {selectedQuartier.nom}
              </h4>
              <div style={{ display: "flex", gap: "16px" }}>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700 }}>{selectedQuartier.agents}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Agents</div>
                </div>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700 }}>{selectedQuartier.compteurs}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Compteurs</div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="card animate-slide-up" style={{ animationDelay: "0.45s" }}>
            <h4 style={{ marginBottom: "16px" }}>Actions Rapides</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Link to="/releves" style={{ textDecoration: "none" }}>
                <button style={{ width: "100%", justifyContent: "space-between", background: "var(--bg-tertiary)", boxShadow: "none" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <FileText size={16} /> Voir les relevés
                  </span>
                  <ChevronRight size={16} />
                </button>
              </Link>
              <Link to="/agents" style={{ textDecoration: "none" }}>
                <button style={{ width: "100%", justifyContent: "space-between", background: "var(--bg-tertiary)", boxShadow: "none" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Users size={16} /> Gérer les agents
                  </span>
                  <ChevronRight size={16} />
                </button>
              </Link>
              <Link to="/compteurs" style={{ textDecoration: "none" }}>
                <button style={{ width: "100%", justifyContent: "space-between", background: "var(--bg-tertiary)", boxShadow: "none" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Gauge size={16} /> Gérer les compteurs
                  </span>
                  <ChevronRight size={16} />
                </button>
              </Link>
            </div>
          </div>

          {/* Alerts */}
          <div className="card animate-slide-up" style={{ animationDelay: "0.5s" }}>
            <h4 style={{ marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
              <AlertTriangle size={18} color="#fbbf24" />
              Alertes
            </h4>
            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#fbbf24" }}></span>
                3 compteurs sans relevé depuis 30j
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981" }}></span>
                Tous les agents actifs
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderUserDashboard = () => (
    <>
      {/* Simplified KPI Grid for users */}
      <div className="kpi-grid">
        <div className="kpi-card animate-slide-up">
          <div className="kpi-card-header">
            <div className="kpi-card-icon blue"><FileText size={24} /></div>
          </div>
          <div className="kpi-card-value">{stats.totalReleves.toLocaleString()}</div>
          <div className="kpi-card-label">Relevés</div>
        </div>

        <div className="kpi-card animate-slide-up" style={{ animationDelay: "0.05s" }}>
          <div className="kpi-card-header">
            <div className="kpi-card-icon cyan"><Droplets size={24} /></div>
          </div>
          <div className="kpi-card-value">{stats.compteursEau}</div>
          <div className="kpi-card-label">Compteurs Eau</div>
        </div>

        <div className="kpi-card animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="kpi-card-header">
            <div className="kpi-card-icon orange"><Zap size={24} /></div>
          </div>
          <div className="kpi-card-value">{stats.compteursElectricite}</div>
          <div className="kpi-card-label">Compteurs Élec</div>
        </div>

        <div className="kpi-card animate-slide-up" style={{ animationDelay: "0.15s" }}>
          <div className="kpi-card-header">
            <div className="kpi-card-icon purple"><Users size={24} /></div>
          </div>
          <div className="kpi-card-value">{stats.totalAgents}</div>
          <div className="kpi-card-label">Agents</div>
        </div>
      </div>

      {/* Chart */}
      <div className="chart-container animate-slide-up" style={{ animationDelay: "0.2s", marginBottom: "24px" }}>
        <div className="chart-header">
          <h3 className="chart-title">
            <BarChart3 size={18} style={{ marginRight: "8px", color: "var(--primary-400)" }} />
            Évolution des Relevés (Lecture seule)
          </h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="colorEau2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} />
            <YAxis stroke="var(--text-muted)" fontSize={12} />
            <Tooltip contentStyle={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: "8px" }} />
            <Area type="monotone" dataKey="eau" stroke="#06b6d4" fillOpacity={1} fill="url(#colorEau2)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Map */}
      <div className="chart-container animate-slide-up" style={{ animationDelay: "0.25s" }}>
        <div className="chart-header">
          <h3 className="chart-title">
            <MapPin size={18} style={{ marginRight: "8px", color: "var(--primary-400)" }} />
            Carte des Quartiers
          </h3>
        </div>
        <InteractiveMap height="400px" onQuartierClick={setSelectedQuartier} />
      </div>
    </>
  );

  const renderAgentDashboard = () => (
    <>
      {/* Agent-specific header */}
      <div className="card animate-slide-up" style={{
        marginBottom: "24px",
        background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1))",
        borderColor: "rgba(16, 185, 129, 0.3)"
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{
              width: 60,
              height: 60,
              borderRadius: "16px",
              background: "linear-gradient(135deg, #10b981, #06b6d4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Target size={28} color="white" />
            </div>
            <div>
              <h2 style={{ marginBottom: "4px" }}>Bonjour, Agent 👋</h2>
              <p style={{ color: "var(--text-muted)" }}>Voici vos objectifs du jour</p>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "2rem", fontWeight: 700, color: "#10b981" }}>12/15</div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Relevés aujourd'hui</div>
          </div>
        </div>
      </div>

      {/* Agent KPIs */}
      <div className="kpi-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)", marginBottom: "24px" }}>
        <div className="kpi-card animate-slide-up" style={{ animationDelay: "0.05s" }}>
          <div className="kpi-card-header">
            <div className="kpi-card-icon green"><CheckCircle size={24} /></div>
          </div>
          <div className="kpi-card-value">12</div>
          <div className="kpi-card-label">Relevés Effectués</div>
        </div>

        <div className="kpi-card animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="kpi-card-header">
            <div className="kpi-card-icon orange"><Clock size={24} /></div>
          </div>
          <div className="kpi-card-value">3</div>
          <div className="kpi-card-label">En Attente</div>
        </div>

        <div className="kpi-card animate-slide-up" style={{ animationDelay: "0.15s" }}>
          <div className="kpi-card-header">
            <div className="kpi-card-icon purple"><MapPin size={24} /></div>
          </div>
          <div className="kpi-card-value">Agdal</div>
          <div className="kpi-card-label">Mon Quartier</div>
        </div>
      </div>

      {/* Today's tasks */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        <div className="card animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <h3 style={{ marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
            <FileText size={20} color="var(--primary-400)" />
            Mes relevés récents
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { numero: "000000123", type: "EAU", heure: "10:30" },
              { numero: "000000456", type: "ELECTRICITE", heure: "11:15" },
              { numero: "000000789", type: "EAU", heure: "14:00" },
            ].map((r, i) => (
              <div key={i} style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px",
                background: "var(--bg-tertiary)",
                borderRadius: "10px"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  {r.type === "EAU" ? <Droplets size={16} color="#06b6d4" /> : <Zap size={16} color="#f97316" />}
                  <span style={{ fontFamily: "monospace" }}>{r.numero}</span>
                </div>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{r.heure}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-container animate-slide-up" style={{ animationDelay: "0.25s" }}>
          <div className="chart-header">
            <h3 className="chart-title">
              <MapPin size={18} style={{ marginRight: "8px", color: "var(--primary-400)" }} />
              Mon Quartier
            </h3>
          </div>
          <InteractiveMap height="250px" onQuartierClick={setSelectedQuartier} />
        </div>
      </div>
    </>
  );

  return (
    <div className="app-container">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      <main className={`main-content ${sidebarCollapsed ? "main-content-expanded" : ""}`}>
        <Navbar
          title="Dashboard"
          subtitle={
            role === "SUPERADMIN"
              ? "Vue complète du système"
              : role === "AGENT"
                ? "Tableau de bord agent"
                : "Vue en lecture seule"
          }
        />

        <div className="page">
          {/* Welcome banner */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "24px"
          }}>
            <div>
              <h1 className="page-title" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Sparkles size={24} color="var(--primary-400)" />
                Bienvenue sur EnergiFlow
              </h1>
              <p className="page-subtitle">
                {role === "SUPERADMIN" && "Accès administrateur complet"}
                {role === "UTILISATEUR" && "Consultation des données"}
                {role === "AGENT" && "Saisie des relevés terrain"}
              </p>
            </div>
            <div style={{
              padding: "8px 16px",
              borderRadius: "20px",
              background: role === "SUPERADMIN" ? "rgba(139, 92, 246, 0.1)" : role === "AGENT" ? "rgba(16, 185, 129, 0.1)" : "rgba(59, 130, 246, 0.1)",
              color: role === "SUPERADMIN" ? "#8b5cf6" : role === "AGENT" ? "#10b981" : "#3b82f6",
              fontSize: "0.85rem",
              fontWeight: 500
            }}>
              {role}
            </div>
          </div>

          {/* Render dashboard based on role */}
          {loading ? (
            <div className="loader"></div>
          ) : (
            <>
              {role === "SUPERADMIN" && renderSuperAdminDashboard()}
              {role === "UTILISATEUR" && renderUserDashboard()}
              {role === "AGENT" && renderAgentDashboard()}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
