import { useAuth } from "../context/AuthContext";
import "../styles/layout.css";

const Navbar = () => {
  const { role, logout } = useAuth();

  return (
    <div className="navbar">
      <h1>SI Relevés</h1>

      <div>
        <span style={{ marginRight: "15px" }}>{role}</span>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
