"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import AdminLayout from "../components/AdminLayout";
import Link from "next/link";

export default function Email() {
    const [emails, setEmails] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();

    useEffect(() => {
        const sessionToken = Cookies.get("session_token");
        if (!sessionToken) {
            router.push("/admin/login");
        }
    }, [router]);

    const fetchEmails = async (page = 1) => {
        try {
            const response = await fetch(`/api/admin/emails?page=${page}&limit=10`);
            if (!response.ok) {
                throw new Error("Failed to fetch emails");
            }
            const data = await response.json();
            setEmails(data.emails);
            setTotalPages(data.totalPages);
            setCurrentPage(data.currentPage);
        } catch (error) {
            console.error("Error fetching emails:", error);
        }
    };

    // Fetch emails initially and when page changes
    useEffect(() => {
        fetchEmails(currentPage);
    }, [currentPage]);

    return (
        <AdminLayout>
            <div className="p-6 container-fluid">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                        <div className="border-bottom pb-4 mb-4 ">
                            <h3 className="mb-0 fw-bold">Email List</h3>
                        </div>
                    </div>
                </div>
                <div className="my-6 row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                        <div className="h-100">
                            <div className="table-responsive">
                                <table className="text-nowrap table">
                                    <thead className="table-light">
                                        <tr>
                                            <th>#</th>
                                            <th>Email</th>
                                            <th>Reg Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {emails.map((email, index) => (
                                            <tr key={email._id}>
                                                <td>{index + 1}</td>
                                                <td>{email.email}</td>
                                                <td className="align-middle">
                                                    {new Intl.DateTimeFormat("en-US", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        hour12: true,
                                                    }).format(new Date(email.created_at))}
                                                </td>
                                                <td className="align-middle">
                                                    <div className="dropdown">
                                                        <Link href="" className="btn btn-sm btn-danger">
                                                            Delete
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="pagination-controls mt-5" style={{ marginLeft: "25px" }}>
                                    <button
                                        className="btn btn-sm btn-primary"
                                        onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                                        disabled={currentPage <= 1}
                                        style={{ marginRight: "10px" }}
                                    >
                                        Previous
                                    </button>
                                    <span>Page {currentPage} of {totalPages}</span>
                                    <button
                                        className="btn btn-sm btn-primary"
                                        onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
                                        disabled={currentPage >= totalPages}
                                        style={{ marginLeft: "10px" }}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
