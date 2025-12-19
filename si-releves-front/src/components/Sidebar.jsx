import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import EnergiFlowLogo, { EnergiFlowIcon } from "./EnergiFlowLogo";
import {
  LayoutDashboard,
  FileText,
  Users,
  Gauge,
  UserCog,
  KeyRound,
  LogOut,
  MapPin,
  History,
  ChevronLeft,
  ChevronRight,
  FileDown,
} from "lucide-react";
import "../styles/layout.css";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const { role, logout } = useAuth();
  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + "/");

  // Use internal state if not controlled
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const isCollapsed = collapsed !== undefined ? collapsed : internalCollapsed;
  const toggleCollapsed = setCollapsed || setInternalCollapsed;

  const menuItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/releves", icon: FileText, label: "Relevés" },
    { path: "/agents", icon: Users, label: "Agents" },
    { path: "/compteurs", icon: Gauge, label: "Compteurs" },
    { path: "/quartiers", icon: MapPin, label: "Quartiers" },
    { path: "/rapports", icon: FileDown, label: "Rapports PDF" },
  ];

  const adminItems = [
    { path: "/admin/utilisateurs", icon: UserCog, label: "Utilisateurs" },
    { path: "/admin/logs", icon: History, label: "Logs Connexion" },
  ];

  const settingsItems = [
    { path: "/change-password", icon: KeyRound, label: "Mot de passe" },
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? "sidebar-collapsed" : ""}`}>
      {/* Toggle Button */}
      <button
        className="sidebar-toggle"
        onClick={() => toggleCollapsed(!isCollapsed)}
        title={isCollapsed ? "Ouvrir le menu" : "Fermer le menu"}
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Logo - EnergiFlow */}
      <div className="sidebar-header">
        <Link to="/" style={{ textDecoration: "none" }}>
          {isCollapsed ? (
            <EnergiFlowIcon size={36} />
          ) : (
            <EnergiFlowLogo size={42} textSize="1.3rem" />
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {/* Main Menu */}
        <div className="sidebar-section">
          {!isCollapsed && <div className="sidebar-section-title">Menu Principal</div>}
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${isActive(item.path) ? "active" : ""}`}
              title={isCollapsed ? item.label : ""}
            >
              <item.icon className="sidebar-link-icon" size={20} />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </div>

        {/* Admin Menu */}
        {role === "SUPERADMIN" && (
          <div className="sidebar-section">
            {!isCollapsed && <div className="sidebar-section-title">Administration</div>}
            {adminItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-link ${isActive(item.path) ? "active" : ""}`}
                title={isCollapsed ? item.label : ""}
              >
                <item.icon className="sidebar-link-icon" size={20} />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            ))}
          </div>
        )}

        {/* Settings */}
        <div className="sidebar-section">
          {!isCollapsed && <div className="sidebar-section-title">Paramètres</div>}
          {settingsItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${isActive(item.path) ? "active" : ""}`}
              title={isCollapsed ? item.label : ""}
            >
              <item.icon className="sidebar-link-icon" size={20} />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className={`sidebar-user ${isCollapsed ? "sidebar-user-collapsed" : ""}`}>
          <div className="sidebar-user-avatar">
            {role === "SUPERADMIN" ? "SA" : role === "AGENT" ? "AG" : "U"}
          </div>
          {!isCollapsed && (
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">
                {role === "SUPERADMIN" ? "Super Admin" : role === "AGENT" ? "Agent" : "Utilisateur"}
              </div>
              <div className="sidebar-user-role">{role}</div>
            </div>
          )}
          <button
            className="sidebar-logout-btn"
            onClick={logout}
            title="Déconnexion"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
