import { Link } from "react-router-dom";
import { useAuth } from "../security/AuthContext";

function Header() {
  const authContext = useAuth();
  const isAuthenticated = authContext.isAuthenticated;
  const logout = authContext.logout; // Get logout function

  function handleLogout() {
    logout(); // Call logout function from context
   // console.log("Logout successful");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="#">EMployee Management System</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Left Side Menu */}
          <ul className="navbar-nav me-auto">
            {/* <li className="nav-item active">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Features</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Pricing</Link>
            </li> */}
          </ul>

          {/* Right Side Menu (Login/Logout Button) */}
          <ul className="navbar-nav ms-auto">
            {isAuthenticated ? (
              <li className="nav-item">
                <button className="btn btn-secondary" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-primary" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
