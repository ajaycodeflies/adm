"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
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
            <div className="bg-primary pt-10 pb-21"></div>
            <div className="mt-n22 px-6 container-fluid">
                <div className="my-6 row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                        <div className="h-100 card">
                            <div className="bg-white py-4 card-header">
                                <h4 className="mb-0">All Plans </h4>
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
                                            <td className="align-middle">4-Week Plan</td>
                                            <td className="align-middle">
                                                70$
                                            </td>
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
                                            <td className="align-middle">12-Week Plan</td>
                                            <td className="align-middle">
                                                100$
                                            </td>
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