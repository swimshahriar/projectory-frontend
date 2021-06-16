import React from "react";
import { NavLink } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";

// styles
import "./Header.css";

// link lists
const navLinks = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Categories",
    url: "/categories",
  },
  {
    title: "About",
    url: "/about",
  },
  {
    title: "Login",
    url: "/?login=open",
  },
  {
    title: "Join",
    url: "/?register=open",
  },
];

const Header = () => {
  return (
    <div className="header">
      <h1>Projectory</h1>
      <nav className="header__list" id="nav">
        {navLinks.map((link, idx) => (
          <li key={idx}>
            <NavLink
              to={link.url}
              onClick={() =>
                document.getElementById("nav").classList.remove("show")
              }
            >
              {link.title}
            </NavLink>
          </li>
        ))}
      </nav>
      <div
        className="header__menu"
        onClick={() => document.getElementById("nav").classList.toggle("show")}
      >
        <HiMenuAlt3 />
      </div>
    </div>
  );
};

export default Header;
