import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ toggleJarvis, isJarvisActive }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navbar ${isOpen ? "open" : ""}`}>
      <div className="container">
        <NavLink className="navbar-brand" to={"/"}>
          🚀 Quiz App
        </NavLink>

        {/* Hamburger Menu */}
        <div className="hamburger" onClick={handleToggle}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div className="navbar-links">
          <NavLink className="nav-link" to={"/admin"} onClick={handleToggle}>
            Admin
          </NavLink>
          <NavLink className="nav-link" to={"/quiz-stepper"} onClick={handleToggle}>
            Take Quiz
          </NavLink>
        </div>

        {/* Jarvis Assistant Button */}
        <div className="">
        <button 
          className={`nav-button ${isJarvisActive ? 'active' : ''}`} 
          onClick={toggleJarvis}
        >
          {isJarvisActive ? "Hide Assistant" : "Show Assistant"}
        </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
