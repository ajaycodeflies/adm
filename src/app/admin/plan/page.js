"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import AdminLayout from "../components/AdminLayout";

export default function PlanPage() {
    const router = useRouter();

    useEffect(() => {
        const sessionToken = Cookies.get("session_token");
        if (!sessionToken) {
            router.push("/admin/login");
        }
    }, [router]);

    return (
        <AdminLayout>
            <div className="bg-blue-dark pt-10 pb-21"></div>
            <div className="mt-n22 px-6 container-fluid">
                <div className="my-6 row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                        <div className="h-100 card">
                            <div className="bg-white card-header d-flex justify-content-between align-items-center">
                                <h4 className="mb-0 text-blue-dark">All Plans </h4>
                                <button className="btn btn-sm btn-blue"><i class="bi bi-plus-lg"></i> Add</button>
                            </div>
                            <div className="table-responsive">
                                <table className="text-nowrap table">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Plan Name</th>
                                            <th>Amount</th>
                                            <th>Last Updated</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="align-middle">1-Week Plan</td>
                                            <td className="align-middle">
                                                30$
                                            </td>
                                            
                                            <td className="align-middle">3 May, 2023</td>
                                            <td className="align-middle">
                                                <div className="dropdown">
                                                    <Link href="/admin/plan" className="text-muted text-primary-hover">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted">
                                                            <circle cx="12" cy="12" r="1"></circle>
                                                            <circle cx="12" cy="5" r="1"></circle>
                                                            <circle cx="12" cy="19" r="1"></circle>
                                                        </svg>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="align-middle">4-Week Plan</td>
                                            <td className="align-middle">
                                                70$
                                            </td>
                                            <td className="align-middle">Today</td>
                                            <td className="align-middle">
                                                <div className="dropdown">
                                                    <Link href="/admin/plan" className="text-muted text-primary-hover">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted">
                                                            <circle cx="12" cy="12" r="1"></circle>
                                                            <circle cx="12" cy="5" r="1"></circle>
                                                            <circle cx="12" cy="19" r="1"></circle>
                                                        </svg>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="align-middle">12-Week Plan</td>
                                            <td className="align-middle">
                                                100$
                                            </td>
                                            <td className="align-middle">Yesterday</td>
                                            <td className="align-middle">
                                                <div className="dropdown">
                                                    <Link className="text-muted text-primary-hover" href="/admin/plan">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted">
                                                            <circle cx="12" cy="12" r="1"></circle>
                                                            <circle cx="12" cy="5" r="1"></circle>
                                                            <circle cx="12" cy="19" r="1"></circle>
                                                        </svg>
                                                    </Link>
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