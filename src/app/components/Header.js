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
        <nav class="navbar navbar-expand-lg">
          <div class="container-fluid">
            <Link class="navbar-brand" href="#">
              <Image src={logo} alt="ADM Digital Logo" width={200} height={100} />
            </Link>
            <button class="btn btn-light" type="button" onClick={toggleSidebar}>
              <i className="bi bi-list"></i>
            </button>
          </div>
        </nav>
      </header>
      <aside className={`sidebar ${isSidebarVisible ? 'show' : ''}`}>
        <nav class="navbar navbar-expand-lg">
          <div class="container-fluid flex-row flex-wrap">
            <Link class="navbar-brand" href="#">
              <Image src={logo} alt="ADM Digital Logo" width={200} height={100} />
            </Link>
            <button class="btn btn-light" type="button" onClick={toggleSidebar}>
              <i class="bi bi-x-lg"></i>
            </button>
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link active" href="/terms">Terms & Conditions</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" href="/privacy">Privacy Policy</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" href="/subscription">Subscription Terms</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" href="/support">Support Center</Link>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
    </>
  );
}