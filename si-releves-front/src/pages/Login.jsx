import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/layout.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, motDePasse);
      navigate("/dashboard");
    } catch (err) {
      setError("Email ou mot de passe incorrect" , err);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f6f8",
      }}
    >
      <div className="card" style={{ width: "350px" }}>
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
          Connexion
        </h2>

        {error && (
          <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            placeholder="admin@ree.ma"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Mot de passe</label>
          <input
            type="password"
            placeholder="********"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
          />

          <button type="submit" style={{ width: "100%" }}>
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
