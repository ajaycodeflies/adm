"use client";

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";
import Image from 'next/image';

export default function Sidebar({ isExpanded }) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle logout
  const handleLogout = async () => {
    const sessionToken = Cookies.get("session_token");

    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session_token: sessionToken }),
      });

      // Remove the session token from cookies
      Cookies.remove("session_token");

      // Redirect to login page
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <aside className={isExpanded ? 'dashboard-sidebar hide' : 'dashboard-sidebar'}>
      <div
        data-simplebar="init"
        style={{ maxHeight: '100vh' }}
        className="simplebar-scrollable-y"
      >
        <div className="simplebar-wrapper" style={{ margin: '0px' }}>
          <div className="simplebar-height-auto-observer-wrapper">
            <div className="simplebar-height-auto-observer"></div>
          </div>
          <div className="simplebar-mask">
            <div
              className="simplebar-offset"
              style={{ right: '0px', bottom: '0px' }}
            >
              <div
                className="simplebar-content-wrapper"
                tabIndex="0"
                role="region"
                aria-label="scrollable content"
                style={{ height: 'auto', overflow: 'hidden scroll' }}
              >
                <div
                  className="simplebar-content"
                  style={{ padding: '0px' }}
                >
                  <div className="nav-scroller">
                    <Link className="navbar-brand" href="/">
                      <Image src="/images/logo.png" alt="Logo" width={200} height={100} />
                    </Link>
                  </div>
                  <ul className="navbar-nav flex-column accordion">
                    <li className="nav-item">
                      <Link href="/admin/dashboard" className="nav-link active">
                        <Image
                          src="/icons/home.svg"
                          alt="home"
                          className="nav-icon me-2"
                          width={20}
                          height={20}
                        />
                        Dashboard
                      </Link>
                    </li>

                    <li className="nav-item">
                      {/* <div className="navbar-heading">Page Documentation</div> */}
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link " href="/admin/users">
                        <Image src="/icons/users.svg" alt="users" className="nav-icon me-2" width={20} height={20} /> Users
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        data-bs-toggle="collapse"
                        data-bs-target="#navDashboard"
                        aria-expanded={isOpen}
                        aria-controls="navDashboard"
                        href="#"
                        onClick={toggleDropdown}
                      >
                        <Image src="/icons/help-circle.svg" alt="questions" className="nav-icon me-2" width={20} height={20} />
                        Questions
                      </Link>
                      <ul className={`nav flex-column list-group collapse ${isOpen ? 'show' : ''}`}>
                        <li className="nav-item">
                          <Link className="nav-link" href="/admin/questions/create">
                           - Add Question
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" href="/admin/questions">
                           - View Questions
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <Link href="/admin/plan" className="nav-link">
                        <Image
                          src="/icons/dollar-sign.svg"
                          alt="plans"
                          className="nav-icon me-2"
                          width={20}
                          height={20}
                        />
                        Plans
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link " href="">
                        <Image src="/icons/book.svg" alt="lessons" className="nav-icon me-2" width={20} height={20} />Lessons
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link " href="">
                        <Image src="/icons/file-text.svg" alt="pages" className="nav-icon me-2" width={20} height={20} />Pages
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link " href="">
                        <Image src="/icons/settings.svg" alt="settings" className="nav-icon me-2" width={20} height={20} />Settings
                      </Link>
                    </li>
                    <li className="nav-item">
                      <div className="navbar-heading">Management</div>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link " href="/admin/profile">
                        <Image src="/icons/user.svg" alt="profile" className="nav-icon me-2" width={20} height={20} />Profile
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        href=""
                        onClick={handleLogout}  // Call the logout function
                      >
                        <Image
                          src="/icons/log-out.svg"
                          alt="logout"
                          className="nav-icon me-2"
                          width={20}
                          height={20}
                        />
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
