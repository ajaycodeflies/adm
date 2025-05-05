import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/admin.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Header({ onToggleSidebar }) {
  const router = useRouter();
  const [isNotificationShow, setIsNotificationShow] = useState(false);
  const [isProfileShow, setIsProfileShow] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
      });
      const data = await response.json();
      if (response.ok) {
        router.push("/admin/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleNotificationButtonClick = () => {
    setIsNotificationShow(!isNotificationShow);
  };

  const handleProfileButtonClick = () => {
    setIsProfileShow(!isProfileShow);
  };


  return (
    <>
      <div className="header">
        <nav className="navbar-classNameic navbar navbar-expand-lg navbar navbar-expand navbar-light">
          <div className="d-flex justify-content-between w-100">
            <div className="d-flex align-items-center">
              <button
                id="nav-toggle"
                className="nav-icon"
                onClick={onToggleSidebar}
                aria-label="Toggle navigation"
              >
                <i className="bi bi-list"></i>
              </button>
              <div className="ms-lg-3 d-none d-md-none d-lg-block">
                <form className="d-flex align-items-center">
                  <input placeholder="Search" type="search" className="form-control" />
                </form>
              </div>
            </div>
            <div className="navbar-right-wrap ms-2 d-flex nav-top-wrap navbar-nav">
              <ul className="navbar-right-wrap ms-auto d-flex nav-top-wrap navbar-nav gap-2">
                <li className="stopevent dropdown">
                  <button
                    className="btn btn-light btn-icon rounded-circle indicator indicator-primary text-muted"
                    id="dropdownNotification"
                    aria-expanded="false"
                    onClick={handleNotificationButtonClick}>
                    <Image src="/icons/bell.svg" alt="Bell Icon" className="fe-icon" width={24} height={24} />
                  </button>
                  <div data-bs-popper="static" className={`dashboard-dropdown notifications-dropdown dropdown-menu-lg dropdown-menu-end py-0 dropdown-menu dropdown-menu-end ${isNotificationShow ? 'show' : ''}`} aria-labelledby="dropdownNotification">
                    <div data-rr-ui-dropdown-item="" className="mt-3  ">
                      <div className="border-bottom px-3 pt-0 pb-3 d-flex justify-content-between align-items-end">
                        <span className="h4 mb-0">Notifications</span>
                        <Link className="text-muted" href="/">
                          <span className="align-middle">
                            <Image src="/icons/settings.svg" alt="Settings Icon" className="fe-icon" width={16} height={16} />
                          </span>
                        </Link>
                      </div>
                      <div
                        data-simplebar="init"
                        className="simplebar-scrollable-y"
                        style={{ maxHeight: '300px' }}
                      >
                        <div className="simplebar-wrapper" style={{ margin: '0px' }}>
                          <div className="simplebar-height-auto-observer-wrapper">
                            <div className="simplebar-height-auto-observer"></div>
                          </div>
                          <div className="simplebar-mask">
                            <div className="simplebar-offset" style={{ right: '0px', bottom: '0px' }}>
                              <div className="simplebar-content-wrapper" tabIndex="0" role="region" aria-label="scrollable content" style={{ height: 'auto', overflow: 'hidden scroll' }}>
                                <div className="simplebar-content" style={{ padding: '0px' }}>
                                  <div className="list-group list-group-flush">
                                    <div className="bg-light list-group-item">
                                      <div className="row">
                                        <div className="col">
                                          <Link className="text-muted" href="/">
                                            <h5 className=" mb-1">Rishi Chopra</h5>
                                            <p className="mb-0"> Mauris blandit erat id nunc blandit, ac eleifend dolor pretium.</p>
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="list-group-item">
                                      <div className="row">
                                        <div className="col">
                                          <Link className="text-muted" href="/">
                                            <h5 className=" mb-1">Neha Kannned</h5>
                                            <p className="mb-0"> Proin at elit vel est condimentum elementum id in ante. Maecenas et sapien metus.</p>
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="list-group-item">
                                      <div className="row">
                                        <div className="col">
                                          <Link className="text-muted" href="/">
                                            <h5 className=" mb-1">Nirmala Chauhan</h5>
                                            <p className="mb-0"> Morbi maximus urna lobortis elit sollicitudin sollicitudieget elit vel pretium.</p>
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="list-group-item">
                                      <div className="row">
                                        <div className="col">
                                          <Link className="text-muted" href="/">
                                            <h5 className=" mb-1">Sina Ray</h5>
                                            <p className="mb-0"> Sed aliquam augue sit amet mauris volutpat hendrerit sed nunc eu diam.</p>
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="simplebar-placeholder" style={{ width: '352px', height: '395px' }}></div>
                        </div>
                        <div className="simplebar-track simplebar-horizontal" style={{ visibility: 'hidden' }}>
                          <div className="simplebar-scrollbar" style={{ width: '0px', display: 'none' }}></div>
                        </div>
                        <div className="simplebar-track simplebar-vertical" style={{ visibility: 'visible' }}>
                          <div className="simplebar-scrollbar" style={{ height: '227px', transform: ' translate3d(0px, 0px, 0px)', display: 'block' }}></div>
                        </div>
                      </div>
                      <div className="border-top px-3 pt-3 pb-3">
                        <a className="text-purple-dark fw-semi-bold" href="/dashboard/notification-history">See all Notifications</a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="ms-2 dropdown">
                  <button className="btn btn-light btn-icon rounded-circle indicator indicator-primary text-muted" id="dropdownUser" aria-expanded="false" onClick={handleProfileButtonClick}>
                    <Image src="/icons/user.svg" alt="profile" className="fe-icon" width={24} height={24} />
                  </button>
                  <div data-bs-popper="static" className={`dropdown-menu dropdown-menu-end dropdown-menu dropdown-menu-end ${isProfileShow ? 'show' : ''}`} aria-labelledby="dropdownUser">
                    <Link className="dropdown-item" href="/admin/profile">
                      <Image src="/icons/edit.svg" alt="avatar" className="fe-icon" width={16} height={16} />  &nbsp; Edit Profile
                    </Link>
                    <Link href="" className="dropdown-item" onClick={handleLogout}>
                      <Image src="/icons/log-out.svg" alt="sign out" className="fe-icon" width={16} height={16} /> &nbsp; Logout
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
