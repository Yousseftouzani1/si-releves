import { Link } from "react-router-dom";
import "../styles/layout.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/releves">Relevés</Link>
      <Link to="/agents">Agents</Link>
      <Link to="/compteurs">Compteurs</Link>
      <Link to="/change-password">Mot de passe</Link>
    </div>
  );
};

export default Sidebar;
