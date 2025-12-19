import { useState, useEffect } from "react";
import { getPendingUsers, approveUser, rejectUser } from "../api/auth";
import { getUsers } from "../api/users";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { useToast } from "../context/ToastContext";
import {
  Plus,
  Search,
  UserCog,
  Shield,
  User,
  Eye,
  CheckCircle,
  XCircle,
  Users as UsersIcon,
  Clock,
  UserCheck,
  UserX
} from "lucide-react";
import { Link } from "react-router-dom";
import "../styles/layout.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const { success, error } = useToast();

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      console.error("Erreur chargement utilisateurs", err);
      // Mock data
      setUsers([
        { id: 1, nom: "ADMIN", prenom: "Super", email: "superadmin@ree.ma", role: "SUPERADMIN", actif: true },
        { id: 2, nom: "TOUZANI", prenom: "Youssef", email: "youssef@ree.ma", role: "UTILISATEUR", actif: true },
        { id: 3, nom: "ALAMI", prenom: "Mohammed", email: "agent@ree.ma", role: "AGENT", actif: true },
      ]);
    }
  };

  const fetchPendingUsers = async () => {
    try {
      const res = await getPendingUsers();
      setPendingUsers(res.data);
    } catch (err) {
      console.error("Erreur chargement utilisateurs en attente", err);
      // Mock data
      setPendingUsers([
        { id: 10, nom: "BENALI", prenom: "Sara", email: "sara.benali@gmail.com", role: "UTILISATEUR", dateInscription: "2024-12-18" },
        { id: 11, nom: "RACHIDI", prenom: "Ahmed", email: "ahmed.rachidi@gmail.com", role: "AGENT", dateInscription: "2024-12-19" },
      ]);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchUsers(), fetchPendingUsers()]);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleApprove = async (userId) => {
    try {
      await approveUser(userId);
      success("Utilisateur approuvé avec succès !");
      setPendingUsers(pendingUsers.filter(u => u.id !== userId));
      fetchUsers();
    } catch (err) {
      error("Erreur lors de l'approbation");
    }
  };

  const handleReject = async (userId) => {
    if (window.confirm("Êtes-vous sûr de vouloir rejeter cette demande ?")) {
      try {
        await rejectUser(userId);
        success("Demande rejetée");
        setPendingUsers(pendingUsers.filter(u => u.id !== userId));
      } catch (err) {
        error("Erreur lors du rejet");
      }
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.nom?.toLowerCase().includes(search.toLowerCase()) ||
      user.prenom?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
  );

  const getRoleConfig = (role) => {
    switch (role) {
      case "SUPERADMIN":
        return { icon: Shield, color: "#8b5cf6", label: "Super Admin" };
      case "AGENT":
        return { icon: UsersIcon, color: "#10b981", label: "Agent" };
      default:
        return { icon: User, color: "#3b82f6", label: "Utilisateur" };
    }
  };

  return (
    <div className="app-container">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      <main className={`main-content ${sidebarCollapsed ? "main-content-expanded" : ""}`}>
        <Navbar title="Utilisateurs" subtitle="Gestion des comptes et approbations" />

        <div className="page">
          <div className="page-header">
            <div>
              <h1 className="page-title">Gestion des Utilisateurs</h1>
              <p className="page-subtitle">{users.length} utilisateurs • {pendingUsers.length} en attente</p>
            </div>
            <Link to="/admin/utilisateurs/nouveau">
              <button className="btn-primary">
                <Plus size={18} />
                Nouvel Utilisateur
              </button>
            </Link>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
            <button
              onClick={() => setActiveTab("all")}
              style={{
                padding: "10px 20px",
                borderRadius: "10px",
                background: activeTab === "all" ? "var(--primary-500)" : "var(--bg-tertiary)",
                color: activeTab === "all" ? "white" : "var(--text-muted)",
                boxShadow: activeTab === "all" ? "0 4px 12px rgba(59, 130, 246, 0.3)" : "none",
                border: "none",
              }}
            >
              <UsersIcon size={16} style={{ marginRight: "8px" }} />
              Tous ({users.length})
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              style={{
                padding: "10px 20px",
                borderRadius: "10px",
                background: activeTab === "pending" ? "#f97316" : "var(--bg-tertiary)",
                color: activeTab === "pending" ? "white" : "var(--text-muted)",
                boxShadow: activeTab === "pending" ? "0 4px 12px rgba(249, 115, 22, 0.3)" : "none",
                border: "none",
                position: "relative",
              }}
            >
              <Clock size={16} style={{ marginRight: "8px" }} />
              En Attente
              {pendingUsers.length > 0 && (
                <span style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-6px",
                  width: "22px",
                  height: "22px",
                  background: "#ef4444",
                  borderRadius: "50%",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}>
                  {pendingUsers.length}
                </span>
              )}
            </button>
          </div>

          {loading ? (
            <Loader />
          ) : activeTab === "pending" ? (
            /* Pending Users */
            <div>
              {pendingUsers.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="empty-state-title">Aucune demande en attente</h3>
                  <p className="empty-state-text">
                    Toutes les demandes d'inscription ont été traitées.
                  </p>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
                  {pendingUsers.map((user, index) => {
                    const roleConfig = getRoleConfig(user.role);
                    const RoleIcon = roleConfig.icon;

                    return (
                      <div
                        key={user.id}
                        className="card animate-slide-up"
                        style={{ animationDelay: `${index * 0.05}s`, borderColor: "rgba(249, 115, 22, 0.3)" }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
                          <div
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: "50%",
                              background: `linear-gradient(135deg, ${roleConfig.color}, ${roleConfig.color}dd)`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "white",
                              fontWeight: 600,
                            }}
                          >
                            {user.prenom?.[0]}{user.nom?.[0]}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600 }}>{user.prenom} {user.nom}</div>
                            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{user.email}</div>
                          </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                          <span style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "6px 12px",
                            borderRadius: "20px",
                            fontSize: "0.8rem",
                            fontWeight: 500,
                            background: `${roleConfig.color}20`,
                            color: roleConfig.color,
                          }}>
                            <RoleIcon size={14} />
                            {roleConfig.label}
                          </span>
                          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                            {user.dateInscription}
                          </span>
                        </div>

                        <div style={{ display: "flex", gap: "10px" }}>
                          <button
                            onClick={() => handleApprove(user.id)}
                            style={{
                              flex: 1,
                              background: "rgba(16, 185, 129, 0.1)",
                              color: "#10b981",
                              border: "1px solid rgba(16, 185, 129, 0.3)",
                              boxShadow: "none",
                            }}
                          >
                            <UserCheck size={16} />
                            Approuver
                          </button>
                          <button
                            onClick={() => handleReject(user.id)}
                            style={{
                              flex: 1,
                              background: "rgba(239, 68, 68, 0.1)",
                              color: "#ef4444",
                              border: "1px solid rgba(239, 68, 68, 0.3)",
                              boxShadow: "none",
                            }}
                          >
                            <UserX size={16} />
                            Rejeter
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            /* All Users Table */
            <div className="data-table-container">
              <div className="data-table-header">
                <div className="data-table-search">
                  <Search size={18} color="#64748b" />
                  <input
                    type="text"
                    placeholder="Rechercher un utilisateur..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              {filteredUsers.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">
                    <UserCog size={32} />
                  </div>
                  <h3 className="empty-state-title">Aucun utilisateur trouvé</h3>
                  <p className="empty-state-text">
                    Aucun utilisateur ne correspond à votre recherche.
                  </p>
                </div>
              ) : (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Utilisateur</th>
                      <th>Email</th>
                      <th>Rôle</th>
                      <th>Statut</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user, index) => {
                      const roleConfig = getRoleConfig(user.role);
                      const RoleIcon = roleConfig.icon;

                      return (
                        <tr
                          key={user.id}
                          className="animate-slide-up"
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                              <div
                                style={{
                                  width: 40,
                                  height: 40,
                                  borderRadius: "50%",
                                  background: `linear-gradient(135deg, ${roleConfig.color}, ${roleConfig.color}dd)`,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: "white",
                                  fontWeight: 600,
                                  fontSize: "0.9rem",
                                }}
                              >
                                {user.prenom?.[0]}{user.nom?.[0]}
                              </div>
                              <div>
                                <div style={{ fontWeight: 600 }}>
                                  {user.prenom} {user.nom}
                                </div>
                                <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                                  ID: {user.id}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>{user.email}</td>
                          <td>
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                padding: "6px 12px",
                                borderRadius: "20px",
                                fontSize: "0.8rem",
                                fontWeight: 500,
                                background: `${roleConfig.color}20`,
                                color: roleConfig.color,
                              }}
                            >
                              <RoleIcon size={14} />
                              {roleConfig.label}
                            </span>
                          </td>
                          <td>
                            {user.actif ? (
                              <span
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "6px",
                                  padding: "6px 12px",
                                  borderRadius: "20px",
                                  fontSize: "0.8rem",
                                  fontWeight: 500,
                                  background: "rgba(16, 185, 129, 0.1)",
                                  color: "#10b981",
                                }}
                              >
                                <CheckCircle size={14} />
                                Actif
                              </span>
                            ) : (
                              <span
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "6px",
                                  padding: "6px 12px",
                                  borderRadius: "20px",
                                  fontSize: "0.8rem",
                                  fontWeight: 500,
                                  background: "rgba(239, 68, 68, 0.1)",
                                  color: "#ef4444",
                                }}
                              >
                                <XCircle size={14} />
                                Inactif
                              </span>
                            )}
                          </td>
                          <td>
                            <button
                              style={{
                                padding: "8px 12px",
                                fontSize: "0.8rem",
                                background: "var(--bg-tertiary)",
                                boxShadow: "none",
                              }}
                            >
                              <Eye size={14} />
                              Voir
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Users;
