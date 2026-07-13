import { Link, useNavigate } from "react-router-dom";
import "./index.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="site-navbar">
      <Link to="/" className="site-logo">
        Resume<span>ATS</span>
      </Link>
      <div className="site-nav-links">
        <Link to="/">Home</Link>
        {token ? (
          <>
            <Link to="/your-resumes">Your Resumes</Link>
            <button onClick={handleLogout} className="nav-logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="nav-cta-btn">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;