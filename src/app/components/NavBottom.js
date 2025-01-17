"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NavBottom = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();

  // Load user's preference from localStorage
  useEffect(() => {
    const darkModePreference = localStorage.getItem("darkmode-active");
    if (darkModePreference === "true") {
      setIsDarkMode(true);
      document.body.classList.add("darkmode-active");
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.body.classList.toggle("darkmode-active", newMode);
    localStorage.setItem("darkmode-active", newMode.toString());
  };

  const isActiveRoute = (path) => pathname === path;

  return (
    <>
      <aside className="nav-bottom">
        <nav className="navbar navbar-expand-lg">
          <ul className="navbar-nav">
            <li className={`nav-item ${isActiveRoute("/user/guides") ? "active" : ""}`}>
              <Link className="nav-link" href="/user/guides">
                <i className="bi bi-cast"></i>
                Guides
              </Link>
            </li>
            <li className={`nav-item ${isActiveRoute("/user/challenges") ? "active" : ""}`}>
              <Link className="nav-link" href="/user/challenges">
                <i className="bi bi-bullseye"></i>
                Challenges
              </Link>
            </li>
            <li className={`nav-item ${isActiveRoute("/user/aitools") ? "active" : ""}`}>
              <Link className="nav-link" href="/user/aitools">
                <i className="bi bi-stars"></i>
                AI Tools
              </Link>
            </li>
            <li className={`nav-item ${isActiveRoute("/user/profile") ? "active" : ""}`}>
              <Link className="nav-link" href="/user/profile">
                <i className="bi bi-person"></i>
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      {/* Dark Mode Toggle Button */}
      <button onClick={toggleDarkMode} className="darkmode-toggle-btn">
        {isDarkMode ? (
          <i className="bi bi-sun-fill" style={{ fontSize: "1.2rem" }}></i>
        ) : (
          <i className="bi bi-moon-fill" style={{ fontSize: "1.2rem" }}></i>
        )}
      </button>
    </>
  );
};

export default NavBottom;
