"use client";

import React, {useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import ShowToast from "../../components/ShowToast";
import Link from "next/link";

export default function UserCreate() {
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("");

    const showToast = (message, type = "error") => {
        setToastMessage("");
        setToastType(type);
        setTimeout(() => {
            setToastMessage(message);
        }, 10);
    };

    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        password: "",
        status: "1",
        profile: null,
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setUser((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            setUser((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("first_name", user.first_name);
        formData.append("last_name", user.last_name);
        formData.append("email", user.email);
        formData.append("mobile", user.mobile);
        formData.append("password", user.password);
        formData.append("status", user.status === "1" ? "1" : "0");
        if (user.profile) {
            formData.append("profile", user.profile);
        }

        try {
            const response = await fetch("/api/admin/users", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                showToast("New user created successfully", "success");
                setUser({
                    first_name: "",
                    last_name: "",
                    email: "",
                    mobile: "",
                    password: "",
                    status: "1",
                    profile: null,
                });
            } else {
                const errorMessage = Array.isArray(data.errors)
                    ? data.errors.join(" ")
                    : data.message || "Failed to create user.";
                console.error("Failed to add user:", errorMessage);
                showToast(errorMessage, "error");
            }
        } catch (error) {
            console.error("Error creating user:", error);
            showToast("Something went wrong while creating user.", "error");
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 container-fluid">
                <div className="align-items-center row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                        <div className="bg-white rounded-bottom smooth-shadow-sm">
                            <div className="d-flex align-items-center justify-content-between pt-4 pb-6 px-4">
                                <h3 className="mb-0 fw-bold">Create New User</h3>
                                <Link href="/admin/users" className="btn btn-sm btn-blue">
                                    <i className="bi bi-list"></i> Users List
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-6">
                    <div className="row">
                        <div className="mb-6 col-xl-7 col-lg-12 col-md-12 col-12">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-4">
                                            <div className="mb-3">
                                                <label className="form-label">First Name</label>
                                                <input
                                                    type="text"
                                                    name="first_name"
                                                    className="form-control"
                                                    placeholder="Enter First Name"
                                                    value={user.first_name}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Last Name</label>
                                                <input
                                                    type="text"
                                                    name="last_name"
                                                    className="form-control"
                                                    placeholder="Enter Last Name"
                                                    value={user.last_name}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Email</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    className="form-control"
                                                    placeholder="Enter Email"
                                                    value={user.email}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Mobile</label>
                                                <input
                                                    type="number"
                                                    name="mobile"
                                                    className="form-control"
                                                    placeholder="Enter Mobile"
                                                    value={user.mobile}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Password</label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    className="form-control"
                                                    placeholder="Enter Password"
                                                    value={user.password}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Status</label>
                                                <select
                                                    name="status"
                                                    className="form-select"
                                                    value={user.status}
                                                    onChange={handleChange}
                                                >
                                                    <option value="1">Active</option>
                                                    <option value="0">Inactive</option>
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Profile</label>
                                                <input
                                                    type="file"
                                                    name="profile"
                                                    className="form-control"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary">
                                            Save User
                                        </button>
                                    </form>
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
