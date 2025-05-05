"use client";

import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import Link from "next/link";
import Image from "next/image";
import ShowToast from "../components/ShowToast";

export default function ProfilePage() {
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("");
    const [editUser, setEditUser] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const showToast = (message, type = "error") => {
        setToastMessage("");
        setToastType(type);
        setTimeout(() => {
            setToastMessage(message);
        }, 10);
    };

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

    // Function to handle opening the edit modal
    const openEditModal = (user) => {
        setEditUser({
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            mobile: user.mobile,
            status: user.status,
        });
        setModalVisible(true);
        // setEditUser(user);
        setModalVisible(true);
    };

    // Function to handle saving the edited user
    const saveEditUser = async () => {
        if (
            !editUser ||
            !editUser.first_name ||
            editUser.first_name.trim().length === 0 ||
            !editUser.email ||
            editUser.status === undefined
        ) {
            return showToast("Please fill in all required fields.", "error");
        }

        try {
            // Only include password if it's filled
            const payload = {
                userId: editUser._id,
                first_name: editUser.first_name,
                last_name: editUser.last_name,
                email: editUser.email,
                mobile: editUser.mobile,
                status: editUser.status,
            };

            if (editUser.password && editUser.password.trim().length > 0) {
                payload.password = editUser.password;
            }

            const response = await fetch(`/api/admin/users/`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
                timeout: 10000,
            });

            const result = await response.json();

            if (response.ok) {
                const updatedUser = result;
                console.log(updatedUser);
                if (updatedUser) {
                    setUsers((prevUsers) =>
                        prevUsers.map((user) =>
                            user._id === updatedUser._id ? updatedUser : user
                        )
                    );
                    fetchUsers(currentPage);
                    setModalVisible(false);
                    showToast("User updated successfully", "success");
                } else {
                    const error =
                        result.error || "Failed to update the user. Please try again.";
                    showToast(error, "error");
                }
            } else {
                showToast(result.error || "Failed to update the user. Please try again.", "error");
            }
        } catch (error) {
            console.error("Error saving edited user:", error);
            showToast("Failed to update the user. Please try again.", "error");
        }
    };


    // Function to handle closing the modal
    const closeModal = () => {
        setModalVisible(false);
        setEditUser(null);
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
                                                            <button
                                                                className="btn btn-sm btn-primary"
                                                                onClick={() => openEditModal(user)}
                                                            >
                                                                Edit
                                                            </button>
                                                            &nbsp;
                                                            <button
                                                                className="btn btn-sm btn-danger"
                                                                onClick={() => handleDeleteUser(user._id)}
                                                            >
                                                                Delete
                                                            </button>
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
            {/* Edit User Modal */}
            {modalVisible && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-lg" style={{ maxWidth: '700px' }}>
                        <div className="modal-content shadow-lg rounded-3">
                            <div className="modal-header">
                                <h5 className="modal-title text-white">Edit User</h5>
                                <button
                                    type="button"
                                    className="btn-close text-red"
                                    onClick={closeModal}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body p-4">
                                <div className="mb-3">
                                    <label className="form-label">First Name <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editUser.first_name}
                                        onChange={(e) =>
                                            setEditUser({ ...editUser, first_name: e.target.value })
                                        }
                                        placeholder="Enter first name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Last Name <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editUser.last_name}
                                        onChange={(e) =>
                                            setEditUser({ ...editUser, last_name: e.target.value })
                                        }
                                        placeholder="Enter last name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email <span className="text-danger">*</span></label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={editUser.email}
                                        onChange={(e) =>
                                            setEditUser({ ...editUser, email: e.target.value })
                                        }
                                        placeholder="Enter email"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Mobile <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editUser.mobile}
                                        onChange={(e) =>
                                            setEditUser({ ...editUser, mobile: e.target.value })
                                        }
                                        placeholder="Enter mobile number"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={editUser.password || ""}
                                        onChange={(e) =>
                                            setEditUser({ ...editUser, password: e.target.value || null })
                                        }
                                        placeholder="Enter password"
                                    />
                                    <small className="form-text text-danger">
                                        Leave blank to keep the current password.
                                    </small>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Status <span className="text-danger">*</span></label>
                                    <select
                                        className="form-select"
                                        value={editUser.status}
                                        onChange={(e) =>
                                            setEditUser({ ...editUser, status: e.target.value })
                                        }
                                    >
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={saveEditUser}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast message component */}
            <ShowToast message={toastMessage} type={toastType} />
        </AdminLayout>
    );
}
