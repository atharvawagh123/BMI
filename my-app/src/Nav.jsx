import React, { useState } from "react";
import "./Nav.css";
import ab from "./photo/ab.png";
import { Link } from "react-router-dom";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={ab} alt="Logo" className="navbar-logo" />
        <span className="navbar-name">Spotify Fit</span>
      </div>
      <button
        className="navbar-toggler"
        onClick={handleMenuToggle}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`navbar-right ${isMenuOpen ? "collapsed" : ""}`}>
        <Link to="/app/" className="navbar-link">
          Home
        </Link>
        <Link to="/app/blog" className="navbar-link">
          Blogs
        </Link>
        <Link to="/app/suggestion" className="navbar-link">
          Suggestion
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
