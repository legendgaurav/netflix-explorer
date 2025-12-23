import { Link } from "react-router-dom";
import "../styles/global.css"
import { useState } from "react";

export default function Navbar({title, links}) {
    const [open, setOpen] = useState(false);

    return (
        <>
      <nav className="navbar">
        <h2 className="logo">{title}</h2>
        <ul className="nav-links desktop">
          {links.map((link) => (
            <li key={link.path}>
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>
        <div className="hamburger" onClick={() => setOpen(true)}>
          ☰
        </div>
      </nav>
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <span className="close" onClick={() => setOpen(false)}>✕</span>
        {links.map((link) => (
          <Link key={link.path} to={link.path} onClick={() => setOpen(false)}>{link.name}</Link>
        ))}
      </div>
      </>
    );
}