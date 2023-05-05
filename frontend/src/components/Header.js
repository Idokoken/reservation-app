import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

function Header() {
  const { user } = useContext(UserContext);
  return (
    <div>
      <nav className="navbar sticky-top navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src="/assets/brand.png"
              alt=""
              width="30"
              height="30"
              className="d-inline-block align-text-top me-2"
              style={{ borderRadius: "50%" }}
            />
            PiTravel
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/product">
                  Anywhere
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  Any week
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Add Guests
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to={user ? "/account" : "/login"}>
                  <i className="fa-solid fa-bars me-1"></i>
                  <i className="fa fa-user me-1"></i>
                  {user && <div>{user.name}</div>}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
