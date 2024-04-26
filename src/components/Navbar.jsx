import { Link } from "react-router-dom";
function Navbar() {
  const handleLogout = () => {
    localStorage.clear();
  };
  return (
    <nav className="navbar">
    <div className="container">
      <Link to="/" className="logo font-poppins">
        Activity 4: React + API
      </Link>
      <ul className="nav-links">
        <li>
          <Link to="/products" className="font-poppins">
            Products
          </Link>
        </li>
        <li>
          <Link to="/orders" className="font-poppins">
            Orders
          </Link>
        </li>
        <li>
          <button onClick={handleLogout} className="logout-btn font-poppins">
            Logout
          </button>
        </li>
      </ul>
    </div>
  </nav>
  );
}

export default Navbar;