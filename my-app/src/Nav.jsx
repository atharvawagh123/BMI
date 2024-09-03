import React from "react";
import "./Nav.css";
import ab from "./photo/ab.png";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={ab} alt="Logo" className="navbar-logo" />
        <span className="navbar-name">GYM</span>
      </div>
      <div className="navbar-right">
        <Link to="/" className="navbar-link">
          Home
        </Link>
        <Link to="/blog" className="navbar-link">
          blog
        </Link>
        <Link to="/login" className="navbar-link">
         login
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
