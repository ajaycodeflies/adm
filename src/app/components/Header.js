"use client";
import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
const logo = "/images/logo.png";

export default function Header() {

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      <header className="header">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <Link className="navbar-brand" href="/">
              <Image src={logo} alt="ADM Digital Logo" width={150} height={100} />
            </Link>
            <button className="btn btn-light" type="button" onClick={toggleSidebar}>
              <i className="bi bi-list"></i>
            </button>
          </div>
        </nav>
      </header>
      <aside className={`sidebar ${isSidebarVisible ? 'show' : ''}`}>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid flex-row flex-wrap">
            <Link className="navbar-brand" href="#">
              <Image src={logo} alt="ADM Digital Logo" width={200} height={100} />
            </Link>
            <button className="btn btn-light" type="button" onClick={toggleSidebar}>
              <i className="bi bi-x-lg"></i>
            </button>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" href="/terms">Terms & Conditions</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/privacy">Privacy Policy</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/subscription">Subscription Terms</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/support">Support Center</Link>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
    </>
  );
}