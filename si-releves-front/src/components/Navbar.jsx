import { Bell, Search, Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import "../styles/layout.css";

const Navbar = ({ title, subtitle, onMenuClick }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        {onMenuClick && (
          <button className="navbar-menu-btn" onClick={onMenuClick}>
            <Menu size={20} />
          </button>
        )}
        <div>
          <h1 className="navbar-title">{title}</h1>
          {subtitle && <p className="navbar-subtitle">{subtitle}</p>}
        </div>
      </div>

      <div className="navbar-right">
        {/* Search */}
        <div className="navbar-search">
          <Search size={18} />
          <input type="text" placeholder="Rechercher..." />
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <button className="navbar-icon-btn">
          <Bell size={20} />
          <span className="navbar-badge">3</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
