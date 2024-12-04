"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import AdminLayout from "../components/AdminLayout";

export default function AdminDashboard() {
  const router = useRouter();
  
  useEffect(() => {
    const sessionToken = Cookies.get("session_token");
    if (!sessionToken) {
      router.push("/admin/login");
    }
  }, [router]);
  return (
    <AdminLayout>
      <div className="bg-primary pt-10 pb-21"></div>
      <div className="mt-n22 px-6 container-fluid">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-12">
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="mb-2 mb-lg-0">
                  <h3 className="mb-0  text-white">Dashboard</h3>
                </div>
                {/* <div><a className="btn btn-white" href="/#">Create New Project</a></div> */}
              </div>
            </div>
          </div>
          <div className="mt-6 col-xl-3 col-lg-6 col-md-12 col-12">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h4 className="mb-0">Plans</h4>
                  </div>
                  <div className="icon-shape icon-md bg-light-primary text-primary rounded-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="18" height="18" fill="currentColor">
                      <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z"></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <h1 className="fw-bold">3</h1>
                  <p className="mb-0"><span className="text-dark me-2">2</span> Purchased</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 col-xl-3 col-lg-6 col-md-12 col-12">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h4 className="mb-0">Active Users</h4>
                  </div>
                  <div className="icon-shape icon-md bg-light-primary text-primary rounded-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="18" height="18" fill="currentColor">
                      <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <h1 className="fw-bold">45</h1>
                  <p className="mb-0"><span className="text-dark me-2">128</span> Total</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 col-xl-3 col-lg-6 col-md-12 col-12">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h4 className="mb-0">Assessment Questions</h4>
                  </div>
                  <div className="icon-shape icon-md bg-light-primary text-primary rounded-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="18" height="18" fill="currentColor">
                      <path fillRule="evenodd" d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z"></path>
                      <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z"></path>
                      <path fillRule="evenodd" d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H2zm1 .5H2v1h1v-1z"></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <h1 className="fw-bold">180</h1>
                  <p className="mb-0"><span className="text-dark me-2">18</span> Steps</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 col-xl-3 col-lg-6 col-md-12 col-12">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h4 className="mb-0">Pages</h4>
                  </div>
                  <div className="icon-shape icon-md bg-light-primary text-primary rounded-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="18" height="18" fill="currentColor">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                      <path d="M8 13A5 5 0 1 1 8 3a5 5 0 0 1 0 10zm0 1A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                      <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
                      <path d="M9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <h1 className="fw-bold">7</h1>
                  <p className="mb-0"><span className="text-dark me-2">7</span> Total</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="mt-6 row">
          <div className="col-md-12 col-12">
            <div className="card">
              <div className="bg-white  py-4 card-header">
                <h4 className="mb-0">Active Projects</h4>
              </div>
              <div className="table-responsive">
                <table className="text-nowrap mb-0 table">
                  <thead className="table-light">
                    <tr>
                      <th>Project name</th>
                      <th>Hours</th>
                      <th>priority</th>
                      <th>Members</th>
                      <th>Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="align-middle">
                        <div className="d-flex align-items-center">
                          <div>
                            <div className="icon-shape icon-md border p-4 rounded-1 bg-white">
                              <img src="/images/brand/dropbox-logo.svg" alt="" className="" />
                            </div>
                          </div>
                          <div className="ms-3 lh-1">
                            <h5 className=" mb-1"><a className="text-inherit" href="/#">Dropbox Design System</a></h5>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">34</td>
                      <td className="align-middle"><span className="badge bg-warning">Medium</span></td>

                      <td className="align-middle text-dark">
                        <div className="float-start me-3"></div>
                        <div className="mt-2">
                          <div height={5} className="progress">
                            <div role="progressbar" className="progress-bar" width={15} aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>
              <div className="bg-white text-center card-footer"><a className="link-primary" href="/#">View All Projects</a></div>
            </div>
          </div>
        </div> */}


        <div className="my-6 row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <div className="h-100 card">
              <div className="bg-white py-4 card-header">
                <h4 className="mb-0">Latest Users </h4>
              </div>
              <div className="table-responsive">
                <table className="text-nowrap table">
                  <thead className="table-light">
                    <tr>
                      <th>Name</th>
                      <th>Purchased Plan Name</th>
                      <th>Last Activity</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="align-middle">
                        <div className="d-flex align-items-center">
                          <div>
                            <img src="/images/avatar/avatar-2.jpg" alt="" className="avatar-md avatar rounded-circle" />
                          </div>
                          <div className="ms-3 lh-1">
                            <h5 className=" mb-1">Anita Parmar</h5>
                            <p className="mb-0">anita@example.com</p>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">1-Week Plan</td>
                      <td className="align-middle">3 May, 2023</td>
                      <td className="align-middle">
                        <div className="dropdown">
                          <a className="text-muted text-primary-hover" href="/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted">
                              <circle cx="12" cy="12" r="1"></circle>
                              <circle cx="12" cy="5" r="1"></circle>
                              <circle cx="12" cy="19" r="1"></circle>
                            </svg>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="align-middle">
                        <div className="d-flex align-items-center">
                          <div>
                            <img src="/images/avatar/avatar-1.jpg" alt="" className="avatar-md avatar rounded-circle" />
                          </div>
                          <div className="ms-3 lh-1">
                            <h5 className=" mb-1">Jitu Chauhan</h5>
                            <p className="mb-0">jituchauhan@example.com</p>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">4-Week Plan</td>
                      <td className="align-middle">Today</td>
                      <td className="align-middle">
                        <div className="dropdown">
                          <a className="text-muted text-primary-hover" href="/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted">
                              <circle cx="12" cy="12" r="1"></circle>
                              <circle cx="12" cy="5" r="1"></circle>
                              <circle cx="12" cy="19" r="1"></circle>
                            </svg>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="align-middle">
                        <div className="d-flex align-items-center">
                          <div>
                            <img src="/images/avatar/avatar-3.jpg" alt="" className="avatar-md avatar rounded-circle" />
                          </div>
                          <div className="ms-3 lh-1">
                            <h5 className=" mb-1">Sandeep Chauhan</h5>
                            <p className="mb-0">sandeepchauhan@example.com</p>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">12-Week Plan</td>
                      <td className="align-middle">Yesterday</td>
                      <td className="align-middle">
                        <div className="dropdown">
                          <a className="text-muted text-primary-hover" href="/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted">
                              <circle cx="12" cy="12" r="1"></circle>
                              <circle cx="12" cy="5" r="1"></circle>
                              <circle cx="12" cy="19" r="1"></circle>
                            </svg>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="align-middle">
                        <div className="d-flex align-items-center">
                          <div>
                            <img src="/images/avatar/avatar-4.jpg" alt="" className="avatar-md avatar rounded-circle" />
                          </div>
                          <div className="ms-3 lh-1">
                            <h5 className=" mb-1">Amanda Darnell</h5>
                            <p className="mb-0">amandadarnell@example.com</p>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">1-Week Plan</td>
                      <td className="align-middle">3 May, 2023</td>
                      <td className="align-middle">
                        <div className="dropdown">
                          <a className="text-muted text-primary-hover" href="/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted">
                              <circle cx="12" cy="12" r="1"></circle>
                              <circle cx="12" cy="5" r="1"></circle>
                              <circle cx="12" cy="19" r="1"></circle>
                            </svg>
                          </a>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
