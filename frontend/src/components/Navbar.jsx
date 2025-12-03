import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Employee App</Link>
        <button className="hamburger" onClick={()=>setIsOpen(!isOpen)}>☰</button>
      </div>
      <ul className={`navbar-links ${isOpen ? "open" : ""}`}>
        <li><Link to="/dashboard">Dashboard</Link></li>
        {role==="admin" && <li><Link to="/add-employee">Add Employee</Link></li>}
        <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
}

export default Navbar;
