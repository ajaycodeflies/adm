"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import AdminLayout from "../components/AdminLayout";
import Link from "next/link";
import Image from "next/image";

export default function ProfilePage() {
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();

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

    // Fetch users initially and when page changes
    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage]);

    return (
        <AdminLayout>
            <div className="p-6 container-fluid">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                        <div className="border-bottom pb-4 mb-4 ">
                            <h3 className="mb-0 fw-bold">Users List</h3>
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
                                            <th width="5%">Profile</th>
                                            <th>Email</th>
                                            <th>Mobile</th>
                                            <th>Status</th>
                                            <th>Last Activity</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr key={user._id}>
                                                <td className="align-middle">
                                                    <div class="d-flex align-items-center">
                                                        <div>
                                                            <div class="icon-shape icon-md border p-4 rounded-1 bg-white">
                                                                <Image
                                                                    src={user.avatar || "/images/avatar/avatar-2.jpg"}
                                                                    alt="avatar"
                                                                    className="avatar-md avatar rounded-circle"
                                                                    width={50}
                                                                    height={40}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div class="ms-3 lh-1">
                                                            <h5 class=" mb-1">
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
                                                        <Link href="" className="btn btn-sm btn-danger">
                                                            Delete
                                                        </Link>
                                                        {/* &nbsp;
                                                        <Link href="" className="btn btn-sm btn-info">
                                                            View
                                                        </Link> */}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
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
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
