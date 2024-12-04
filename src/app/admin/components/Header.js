import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/admin.css";
import Image from "next/image";

export default function Header() {
  return (
    <div className="header">
      <nav className="navbar-classNameic navbar navbar-expand-lg navbar navbar-expand navbar-light">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center">
            <a id="nav-toggle" className="nav-icon me-2 icon-xs" href="/#">
              <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </a>
            <div className="ms-lg-3 d-none d-md-none d-lg-block">
              <form className="d-flex align-items-center">
                <input placeholder="Search" type="search" className="form-control" />
              </form>
            </div>
          </div>
          <div className="navbar-right-wrap ms-2 d-flex nav-top-wrap navbar-nav">
            <ul className="navbar-right-wrap ms-auto d-flex nav-top-wrap navbar-nav">
              <li className="stopevent dropdown">
                <a className="btn btn-light btn-icon rounded-circle indicator indicator-primary text-muted  " id="dropdownNotification" aria-expanded="false"><img src="/icons/bell.svg" alt="Bell Icon" className="fe-icon" /></a>
                <div data-bs-popper="static" className="dashboard-dropdown notifications-dropdown dropdown-menu-lg dropdown-menu-end py-0 dropdown-menu dropdown-menu-end" aria-labelledby="dropdownNotification">
                  <div data-rr-ui-dropdown-item="" className="mt-3  ">
                    <div className="border-bottom px-3 pt-0 pb-3 d-flex justify-content-between align-items-end"><span className="h4 mb-0">Notifications</span><a className="text-muted" href="/"><span className="align-middle"><img src="/icons/settings.svg" alt="Settings Icon" className="fe-icon" /> </span></a></div>
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
                                        <a className="text-muted" href="/#">
                                          <h5 className=" mb-1">Rishi Chopra</h5>
                                          <p className="mb-0"> Mauris blandit erat id nunc blandit, ac eleifend dolor pretium.</p>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="list-group-item">
                                    <div className="row">
                                      <div className="col">
                                        <a className="text-muted" href="/#">
                                          <h5 className=" mb-1">Neha Kannned</h5>
                                          <p className="mb-0"> Proin at elit vel est condimentum elementum id in ante. Maecenas et sapien metus.</p>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="list-group-item">
                                    <div className="row">
                                      <div className="col">
                                        <a className="text-muted" href="/#">
                                          <h5 className=" mb-1">Nirmala Chauhan</h5>
                                          <p className="mb-0"> Morbi maximus urna lobortis elit sollicitudin sollicitudieget elit vel pretium.</p>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="list-group-item">
                                    <div className="row">
                                      <div className="col">
                                        <a className="text-muted" href="/#">
                                          <h5 className=" mb-1">Sina Ray</h5>
                                          <p className="mb-0"> Sed aliquam augue sit amet mauris volutpat hendrerit sed nunc eu diam.</p>
                                        </a>
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
                    <div className="border-top px-3 pt-3 pb-3"><a className="text-link fw-semi-bold" href="/dashboard/notification-history">See all Notifications</a></div>
                  </div>
                </div>
              </li>
              <li className="ms-2 dropdown">
                <a className="rounded-circle  " id="dropdownUser" aria-expanded="false">
                  <div className="avatar avatar-md avatar-indicators avatar-online">
                    <img alt="avatar" src="/images/admin/profile.jpg" className="rounded-circle" />
                  </div>
                </a>
                <div data-bs-popper="static" className="dropdown-menu dropdown-menu-end  dropdown-menu dropdown-menu-end" aria-labelledby="dropdownUser">
                  <div data-rr-ui-dropdown-item="" className="px-4 pb-0 pt-2  ">
                    <div className="lh-1 ">
                      <h5 className="mb-1"> John E. Grainger</h5>
                      <a className="text-inherit fs-6" href="/#">View my profile</a>
                    </div>
                    <div className=" dropdown-divider mt-3 mb-2"></div>
                  </div>
                  <a aria-selected="false" data-rr-ui-dropdown-item="" className="dropdown-item" role="button" tabIndex="0" href="#">
                    <img src="/images/admin/profile.jpg" alt="avatar" className="avatar avatar-xs me-2" />  Edit Profile
                    </a>
                    <a data-rr-ui-dropdown-item="" className="dropdown-item" role="button" tabIndex="0" href="#">
                      <img src="/icons/logout.svg" alt="sign out" className="avatar avatar-xs me-2" /> Sign Out
                    </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
