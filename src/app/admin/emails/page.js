"use client";

import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import ShowToast from "../components/ShowToast";

export default function Email() {
    const [emails, setEmails] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("");

    const showToast = (message, type = "error") => {
        setToastMessage("");
        setToastType(type);
        setTimeout(() => {
            setToastMessage(message);
        }, 10);
    };

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

    const deleteEmail = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this email?");
        if (!confirmed) return;

        try {
            const response = await fetch(`/api/admin/emails?id=${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                showToast("Email deleted successfully", "success");
                fetchEmails(currentPage);
            } else {
                const error = await response.json();
                showToast(error.message || "Failed to delete email.", "error");
            }
        } catch (error) {
            console.error("Error deleting email:", error);
            showToast("Something went wrong. Please try again.", "error");
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
                                        {emails.length === 0 ? (
                                            <tr>
                                                <td colSpan="4" className="text-center py-4">
                                                    No records found
                                                </td>
                                            </tr>
                                        ) : (
                                            emails.map((email, index) => (
                                                <tr key={email._id}>
                                                    <td>{(currentPage - 1) * 10 + index + 1}</td>
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
                                                        <button
                                                            className="btn btn-sm btn-danger"
                                                            onClick={() => deleteEmail(email._id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>

                                                </tr>
                                            ))
                                        )}
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
            {/* Toast message component */}
            <ShowToast message={toastMessage} type={toastType} />
        </AdminLayout>
    );
}
