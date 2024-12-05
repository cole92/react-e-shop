import { Link, Outlet } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
         <span className="navbar-brand">Navbar</span> {/* Prikaz staticnog imena */}
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
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/">HOME</Link> {/* Link ka pocetnoj ruti */}
              </li>
              <li className="nav-item">
                <Link to="basket/">BASKET</Link> {/* Link ka korpi */}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet /> {/* Prikazuje sadrzaj aktivne rute */}
    </div>
  );
};

export default NavBar;
