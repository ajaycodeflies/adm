"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import AdminLayout from "../components/AdminLayout";
import Link from "next/link";
import Image from "next/image";

export default function ProfilePage() {
    const router = useRouter();
    const [profile, setProfile] = useState({
        firstName: "Admin",
        lastName: "",
        email: "N/A",
        phone: "N/A",
        profileImage: "/images/admin/profile.jpg",
    });
    useEffect(() => {
        const sessionToken = Cookies.get("session_token");
        if (!sessionToken) {
            router.push("/admin/login");
        } else {
            fetchProfile();
        }
    }, [router]);

    const fetchProfile = async () => {
        try {
            const response = await fetch("/api/admin/profile", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
    
            if (data.success) {
                setProfile({
                    firstName: data.data.firstName || "Admin",
                    lastName: data.data.lastName || "",
                    email: data.data.email || "N/A",
                    phone: data.data.phone || "N/A",
                    profileImage: data.data.profileImage || "/images/admin/default-profile.jpg",
                });
                console.log("Profile data:", data.data);
            } else {
                console.error("Failed to fetch profile:", data.message);
            }
        } catch (err) {
            console.error("Error fetching profile:", err);
        }
    };
    

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
    
        const updatedProfile = {
            fullName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            phone: formData.get("phone"),
        };
    
        if (formData.get("profileImage")) {
            updatedProfile.profileImage = formData.get("profileImage");
        }
    
        try {
            const response = await fetch("/api/admin/profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProfile),
            });
    
            const data = await response.json();
            if (data.success) {
                alert("Profile updated successfully!");
                fetchProfile();
            } else {
                alert("Failed to update profile.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 container-fluid">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                        <div className="border-bottom pb-4 mb-4 ">
                            <h3 className="mb-0 fw-bold">Profile</h3>
                        </div>
                    </div>
                </div>
                <div className="align-items-center row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                        <div className="pt-20 rounded-top" style={{ backgroundImage: "url(/images/admin/profile-cover.jpg)", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center center" }}></div>
                        <div className="bg-white rounded-bottom smooth-shadow-sm ">
                            <div className="d-flex align-items-center justify-content-between pt-4 pb-6 px-4">
                                <div className="d-flex align-items-center">
                                    <div className="avatar-xxl avatar-indicators avatar-online me-2 position-relative d-flex justify-content-end align-items-end mt-n10">
                                        <Image src="/images/admin/profile.jpg" alt="admin" className="avatar-xxl rounded-circle border border-4 border-white-color-40" /><a className="position-absolute top-0 right-0 me-2" data-bs-toggle="tooltip" data-placement="top" title="" data-original-title="Verified" href="/pages/profile#!"></a></div>
                                    <div className="lh-1">
                                        <h2 className="mb-0">Admin<a className="text-decoration-none" data-bs-toggle="tooltip" data-placement="top" title="" data-original-title="Beginner" href="/pages/profile#!"></a></h2>
                                        {/* <p className="mb-0 d-block">@admin</p> */}
                                    </div>
                                </div>
                                {/* <div><a className="btn btn-outline-primary d-none d-md-block" href="/pages/profile#">Edit Profile</a></div> */}
                            </div>
                            <ul className="nav nav-lt-tab px-4" id="pills-tab" role="tablist">
                                <li className="nav-item">
                                    <Link className="nav-link active" href="/admin/profile#">
                                        Edit Profile
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="py-6">
                    <div className="row">
                        <div className="mb-6 col-xl-6 col-lg-12 col-md-12 col-12">
                            <div className="card">
                                <div className="card-body" >
                                    <div>
                                        <form onSubmit={handleUpdateProfile}>
                                            <div className="mb-3 row">
                                                <label htmlFor="profileImage" className="col-sm-4 col-form-label">Profile</label>
                                                <div className="col-md-8">
                                                    <Image
                                                        src={profile.profileImage || "/images/admin/profile.jpg"}
                                                        alt="Profile"
                                                        className="rounded-circle avatar avatar-lg me-3"
                                                    />
                                                    <input type="file" className="form-control" id="profileImage" name="profileImage" />
                                                </div>
                                            </div>
                                            <div className="mb-3 row">
                                                <label htmlFor="firstName" className="col-sm-4 col-form-label">Full Name</label>
                                                <div className="col-md-4">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="firstName"
                                                        name="firstName"
                                                        defaultValue={profile.firstName}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="lastName"
                                                        name="lastName"
                                                        defaultValue={profile.lastName}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 row">
                                                <label htmlFor="email" className="col-sm-4 col-form-label">Email</label>
                                                <div className="col-md-8">
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        id="email"
                                                        name="email"
                                                        defaultValue={profile.email}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 row">
                                                <label htmlFor="phone" className="col-sm-4 col-form-label">Phone</label>
                                                <div className="col-md-8">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="phone"
                                                        name="phone"
                                                        defaultValue={profile.phone}
                                                    />
                                                </div>
                                            </div>
                                            <div className="align-items-center row">
                                                <label className="col-sm-4 form-label" htmlFor="password">Password</label>
                                                <div className="col-md-8 col-12">
                                                    <input type="password" id="password" className="form-control" />
                                                    <span className="small text-danger">Enter password if you want change</span>
                                                </div>
                                                <div className="mt-4 col-md-8 col-12 offset-md-4">
                                                    <button type="submit" className="btn btn-primary">Save Changes</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
