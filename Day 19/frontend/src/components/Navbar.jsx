import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // ✅ Import context
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user, logout, isAuthenticated } = useContext(AuthContext); // ✅ Use context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      {isAuthenticated ? (
        <>
          <span>Hello, {user.username}</span>
          <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <span>Not logged in</span>
          <button
            onClick={() => navigate("/login")}
            style={{ marginLeft: "10px" }}
          >
            Login
          </button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
