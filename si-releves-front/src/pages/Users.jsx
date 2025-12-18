import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import { getUsers } from "../api/users";
import "../styles/layout.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Erreur chargement utilisateurs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="app-container">
      <Sidebar />

      <div className="content">
        <Navbar />

        <div className="page">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h2>Liste des utilisateurs</h2>

            <Link to="/admin/utilisateurs/nouveau">
              <button>+ Ajouter un utilisateur</button>
            </Link>
          </div>

          {loading && <Loader />}

          {!loading && (
            <div className="card">
              {users.length === 0 ? (
                <p>Aucun utilisateur trouvé</p>
              ) : (
                <table width="100%">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Email</th>
                      <th>Rôle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.nom}</td>
                        <td>{user.prenom}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
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

export default Users;
