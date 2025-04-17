"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import AdminLayout from "../components/AdminLayout";
import Link from "next/link";
import Image from "next/image";
import ShowToast from "../components/ShowToast";

export default function ProfilePage() {
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("");
    const showToast = (message, type = "error") => {
        setToastMessage("");
        setToastType(type);
        setTimeout(() => {
            setToastMessage(message);
        }, 10);
    };

    useEffect(() => {
        const sessionToken = Cookies.get("session_token");
        if (!sessionToken) {
            router.push("/admin/login");
        }
    }, [router]);

    const fetchUsers = async (page = 1) => {
        try {
            const response = await fetch(`/api/admin/users?page=${page}&limit=10`);
            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }
            const data = await response.json();
            setUsers(data.users);
            setTotalPages(data.totalPages);
            setCurrentPage(data.currentPage);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!confirm("Are you sure you want to delete this user?")) return;

        try {
            const response = await fetch(`/api/admin/users?id=${userId}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
                showToast("User deleted successfully", "success");
            } else {
                console.error("Failed to delete user:", data.message);
                showToast("Failed to delete user. Please try again.", "error");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            showToast("Something went wrong. Please try again.", "error");
        }
    };

    // Fetch users initially and when page changes
    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage]);

    return (
        <AdminLayout>
            <div className="p-6 container-fluid">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                        <div className="border-bottom pb-4 mb-4 d-flex justify-content-between align-items-center">
                            <h3 className="mb-0 fw-bold">User List</h3>
                            <Link href="/admin/users/create" className="btn btn-sm btn-blue">
                                <i className="bi bi-plus-lg"></i> Create
                            </Link>
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
                                            <th width="5%">Profile</th>
                                            <th>Email</th>
                                            <th>Mobile</th>
                                            <th>Status</th>
                                            <th>Last Activity</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.length === 0 ? (
                                            <tr>
                                                <td colSpan="7" className="text-center">
                                                    No users found.
                                                </td>
                                            </tr>
                                        ) : (
                                            users.map((user, index) => (
                                                <tr key={user._id}>
                                                    <td>{(currentPage - 1) * 10 + index + 1}</td>
                                                    <td className="align-middle">
                                                        <div className="d-flex align-items-center">
                                                            <div>
                                                                <div className="icon-shape icon-md border p-4 rounded-1 bg-white">
                                                                    <Image
                                                                        src={user?.profile || "/images/avatar/avatar-2.jpg"}
                                                                        alt="avatar"
                                                                        className="avatar-md avatar rounded-circle"
                                                                        width={50}
                                                                        height={40}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="ms-3 lh-1">
                                                                <h5 className=" mb-1">
                                                                    {user.first_name} {user.last_name}
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="align-middle">{user.email}</td>
                                                    <td className="align-middle">{user.mobile}</td>
                                                    <td className="align-middle">
                                                        {user.status ? (
                                                            <span className="badge bg-success">Active</span>)
                                                            : (
                                                                <span className="badge bg-danger">Inactive</span>
                                                            )}
                                                    </td>
                                                    <td className="align-middle">
                                                        {new Intl.DateTimeFormat("en-US", {
                                                            day: "2-digit",
                                                            month: "short",
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                            hour12: true,
                                                        }).format(new Date(user.created_at))}
                                                    </td>
                                                    <td className="align-middle">
                                                        <div className="dropdown">
                                                            <Link href="" className="btn btn-sm btn-primary">
                                                                Edit
                                                            </Link>
                                                            &nbsp;
                                                            <button
                                                                className="btn btn-sm btn-danger"
                                                                onClick={() => handleDeleteUser(user._id)}
                                                            >
                                                                Delete
                                                            </button>
                                                            {/* &nbsp;
                                                        <Link href="" className="btn btn-sm btn-info">
                                                            View
                                                        </Link> */}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}

                                    </tbody>
                                </table>
                                {/* Pagination controls */}
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
