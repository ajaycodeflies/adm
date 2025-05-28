"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
const logo = "/images/logo.png";

export default function Header() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const [isDarkMode, setIsDarkMode] = useState(false);
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

  return (
    <>
      <header className="header">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid px-0">
            <Link className="navbar-brand" href="/">
              <Image
                src={logo}
                alt="ADM Digital Logo"
                width={150}
                height={100}
              />
            </Link>
            <button className="btn" type="button" onClick={toggleSidebar}>
              <i className="bi bi-list"></i>
            </button>
          </div>
        </nav>
      </header>
      <aside className={`sidebar ${isSidebarVisible ? "show" : ""}`}>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid flex-row flex-wrap  px-0">
            <Link className="navbar-brand" href="#">
              <Image
                src={logo}
                alt="ADM Digital Logo"
                width={200}
                height={100}
              />
            </Link>
            <button className="btn" type="button" onClick={toggleSidebar}>
              <i className="bi bi-x-lg"></i>
            </button>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" href="/terms">
                  Terms & Conditions
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/privacy">
                  Privacy Policy
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/subscription">
                  Subscription Terms
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" href="/support">
                  Support Center
                </Link>
              </li> */}
            </ul>
          </div>
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
}
