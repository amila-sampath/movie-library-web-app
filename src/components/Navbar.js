import { Link } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-container">
      {/* Link to the home page */}
      <Link to="/" className="navbar-link">
        Home
      </Link>
      {/* Link to the favorites page */}
      <Link to="/favorites" className="navbar-link">
        Favorites
      </Link>
    </div>
  </nav>
);

export default Navbar;
