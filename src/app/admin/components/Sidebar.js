"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";

export default function Sidebar() {
  const router = useRouter();

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
    <div className="navbar-vertical navbar">
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
                    <a className="navbar-brand text-center" href="/">
                      <img src="/images/logo2.png" alt="Logo" style={{ width: "70%", height: "100%" }} />
                    </a>
                  </div>
                  <ul className="navbar-nav flex-column accordion">
                    <div className="nav-item">
                      <Link href="/admin/dashboard" className="nav-link active">
                        <img
                          src="/icons/home.svg"
                          alt="home"
                          className="nav-icon me-2"
                        />
                        Dashboard
                      </Link>
                    </div>

                    <div className="nav-item">
                      <div className="navbar-heading">Page Documentation</div>
                    </div>
                    <div className="nav-item">
                      <a className="nav-link " href="/documentation">
                        <img src="/icons/users.svg" alt="users" className="nav-icon me-2" /> Users
                      </a>
                    </div>
                    <li className="nav-item">
                      <a className="nav-link " data-bs-toggle="collapse" data-bs-target="#navDashboard" aria-expanded="false" aria-controls="navDashboard" href="">
                        <img src="/icons/help-circle.svg" alt="questions" className="nav-icon me-2" /> Questions
                      </a>
                    </li>
                    <li className="nav-item collapse">
                      <ul className="nav flex-column list-group">
                        <li className="nav-item">
                          <a className="nav-link " href="">Add Question</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link " href="">View Questions</a>
                        </li>
                      </ul>
                    </li>
                    <div className="nav-item">
                      <Link href="/admin/plan" className="nav-link">
                        <img
                          src="/icons/dollar-sign.svg"
                          alt="plans"
                          className="nav-icon me-2"
                        />
                        Plans
                      </Link>
                    </div>
                    <div className="nav-item">
                      <a className="nav-link " href="">
                        <img src="/icons/book.svg" alt="lessons" className="nav-icon me-2" />Lessons
                      </a>
                    </div>

                    <div className="nav-item">
                      <a className="nav-link " href="">
                        <img src="/icons/file-text.svg" alt="pages" className="nav-icon me-2" />Pages
                      </a>
                    </div>

                    <div className="nav-item">
                      <a className="nav-link " href="">
                        <img src="/icons/settings.svg" alt="settings" className="nav-icon me-2" />Settings
                      </a>
                    </div>

                    <div className="nav-item">
                      <a
                        className="nav-link"
                        href=""
                        onClick={handleLogout}  // Call the logout function
                      >
                        <img
                          src="/icons/log-out.svg"
                          alt="logout"
                          className="nav-icon me-2"
                        />
                        Logout
                      </a>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
