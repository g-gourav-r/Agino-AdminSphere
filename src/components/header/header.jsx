import { useNavigate } from "react-router-dom";

function Header({ currentPage }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('sessionId');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg d-flex justify-content-between mx-2 mt-1 p-0 rounded">
      <div className="container-fluid header">
        <a className="navbar-brand" href="#">AdminSphere</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className={`px-2 nav-link ${currentPage === 'chat' ? 'active' : ''}`}
                aria-current="page"
                onClick={() => navigate("/chat")}
              >
                Users
              </a>
            </li>
            <li className="nav-item">
              <a
                className="px-2 nav-link disabled"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                Reports
              </a>
            </li>
            <li className="nav-item">
              <a
                className="px-2 nav-link disabled"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                Dashboard
              </a>
            </li>
          </ul>
          <div className="d-flex">
            <button className="btn-black p-2 r-4" type="button" onClick={handleLogout}>
              <i className="bi bi-person me-2"></i>Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;