import { Link } from "react-router-dom";
import { useContext } from "react";
import ReservesContext from "../../store/reserves-content";

const MainNavigation = () => {
  const reservesCtx = useContext(ReservesContext);
  return (
    <nav className="container navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Find Ottawa Parking
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-item nav-link active" to="/locations">
            Locations
          </Link>
          <Link className="nav-link" to="/reserves">
            My Reserves
            <span className="badge badge-info">
              {reservesCtx.totalReserves}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;
